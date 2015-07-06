import sys
import os
import logging
import logging.handlers
import zmq
import time
import datetime
import traceback

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import json
from pyblinktrade.json_encoder import JsonEncoder

from errors import *

class TradeApplication(object):
  @classmethod
  def instance(cls):
    if not hasattr(cls, "_instance"):
      cls._instance = cls()
    return cls._instance

  def initialize(self, options, instance_name):
    self.publish_queue = []
    self.options = options
    self.instance_name = instance_name

    self.order_matcher_disabled = False
    if options.has_option('order_matcher_disabled'):
      self.order_matcher_disabled = True

    from models import Base, db_bootstrap
    db_engine = options.sqlalchemy_engine + '://' + \
                os.path.expanduser(options.sqlalchemy_connection_string)
    engine = create_engine( db_engine, echo=options.db_echo)
    Base.metadata.create_all(engine)


    self.db_session = scoped_session(sessionmaker(bind=engine))
    db_bootstrap(self.db_session)

    from session_manager import SessionManager
    self.session_manager = SessionManager(timeout_limit=self.options.session_timeout_limit)

    self.context = zmq.Context()
    self.input_socket = self.context.socket(zmq.REP)
    self.input_socket.bind(self.options.trade_in)

    self.publisher_socket = self.context.socket(zmq.PUB)
    self.publisher_socket.bind(self.options.trade_pub)

    input_log_file_handler = logging.handlers.TimedRotatingFileHandler(
      os.path.expanduser(self.options.trade_log), when='MIDNIGHT')
    input_log_file_handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))

    self.replay_logger = logging.getLogger(self.instance_name)
    self.replay_logger.setLevel(logging.INFO)
    self.replay_logger.addHandler(input_log_file_handler)

    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.DEBUG)
    ch.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
    self.replay_logger.addHandler(ch)

    self.replay_logger.info('START')

    self.log_start_data()



  def log(self, command, key, value=None):
    if len(logging.getLogger().handlers):
      logging.getLogger().handlers = []  # workaround to avoid stdout logging from the root logger

    log_msg = command + ',' + key
    if value:
      try:
        log_msg += ',' + value
      except Exception,e :
        try:
          log_msg += ',' + str(value)
        except Exception,e :
          try:
            log_msg += ',' + unicode(value)
          except Exception,e :
            log_msg += ', [object]'

    self.replay_logger.info(  log_msg )

  def log_start_data(self):
    self.log('PARAM','BEGIN')
    self.log('PARAM','trade_in'                     ,self.options.trade_in)
    self.log('PARAM','trade_pub'                    ,self.options.trade_pub)
    self.log('PARAM','trade_log'                    ,self.options.trade_log)
    self.log('PARAM','session_timeout_limit'        ,self.options.session_timeout_limit)
    self.log('PARAM','db_echo'                      ,self.options.db_echo)
    self.log('PARAM','sqlalchemy_engine'            ,self.options.sqlalchemy_engine)
    self.log('PARAM','sqlalchemy_connection_string' ,self.options.sqlalchemy_connection_string)
    self.log('PARAM','test_mode'                    ,self.options.test_mode)
    self.log('PARAM','dev_mode'                     ,self.options.dev_mode)
    self.log('PARAM','satoshi_mode'                 ,self.options.satoshi_mode)
    self.log('PARAM','order_matcher_disabled'       ,self.order_matcher_disabled)
    self.log('PARAM','global_email_language'        ,self.options.global_email_language)
    self.log('PARAM','END')


    from models import User, Deposit, DepositMethods, Order, Withdraw, Broker, \
      Currency, Instrument, ApiAccess, Balance, Position, GreenAddresses

    green_address_list = self.db_session.query(GreenAddresses)
    for green_address_entity in green_address_list:
      self.log('DB_ENTITY', 'GREEN_ADDRESS', green_address_entity)

    currencies = self.db_session.query(Currency)
    for currency in currencies:
      self.log('DB_ENTITY', 'CURRENCY', currency)

    instruments = self.db_session.query(Instrument)
    for instrument in instruments:
      self.log('DB_ENTITY', 'INSTRUMENT', instrument)

    users = self.db_session.query(User)
    for user in users:
      self.log('DB_ENTITY', 'USER', user)

    api_access_list = self.db_session.query(ApiAccess)
    for api_access_entity in api_access_list:
      self.log('DB_ENTITY', 'API_ACCESS', api_access_entity)

    # log all users on the replay log
    brokers = self.db_session.query(Broker)
    for broker in brokers:
      Broker.cache_broker(broker.id, broker)
      self.log('DB_ENTITY', 'BROKER', broker)

    deposit_options = self.db_session.query(DepositMethods)
    for deposit_option in deposit_options:
      self.log('DB_ENTITY', 'DEPOSIT_OPTION',  deposit_option)

    deposits = self.db_session.query(Deposit)
    for deposit in deposits:
      self.log('DB_ENTITY', 'DEPOSIT',  repr(deposit))

    withdraws = self.db_session.query(Withdraw)
    for withdraw in withdraws:
      self.log('DB_ENTITY', 'WITHDRAW', withdraw )

    balance_list = self.db_session.query(Balance)
    for balance_entity in balance_list:
      self.log('DB_ENTITY', 'BALANCE', balance_entity )

    position_list = self.db_session.query(Position)
    for position_entity in position_list:
      self.log('DB_ENTITY', 'POSITION', position_entity )

    orders = self.db_session.query(Order).filter(Order.status.in_(("0", "1"))).order_by(Order.created)
    for order in orders:
      self.log('DB_ENTITY','ORDER',order)

  def publish(self, key, data):
    print key, data
    self.publish_queue.append([ key, data ])

  def run(self):
    from pyblinktrade.message import JsonMessage, InvalidMessageException
    from market_data_publisher import MarketDataPublisher
    from execution import OrderMatcher
    from models import Order

    orders = self.db_session.query(Order).filter(Order.status.in_(("0", "1"))).order_by(Order.created)
    for order in orders:
      OrderMatcher.get( order.symbol  ).match(self.db_session, order, self.order_matcher_disabled)

    while True:
      raw_message = self.input_socket.recv()

      msg_header              = raw_message[:3]
      session_id              = raw_message[4:20]
      json_raw_message        = raw_message[21:].strip()

      try:
        msg = None
        if json_raw_message:
          try:
            msg = JsonMessage(json_raw_message)
          except InvalidMessageException, e:
            self.log('IN', 'TRADE_IN_REQ_ERROR',  raw_message)
            raise InvalidMessageError()

          # never write passwords in the log file
          if msg.has('Password'):
            raw_message = raw_message.replace(msg.get('Password'), '*')
          if msg.has('NewPassword'):
            raw_message = raw_message.replace(msg.get('NewPassword'), '*')

        self.log('IN', 'TRADE_IN_REQ' ,raw_message )

        if msg:
          if msg.isMarketDataRequest(): # Market Data Request
            req_id = msg.get('MDReqID')
            market_depth = msg.get('MarketDepth')
            instruments = msg.get('Instruments')
            entries = msg.get('MDEntryTypes')
            transact_time = msg.get('TransactTime')

            timestamp = None
            if transact_time:
              timestamp = transact_time
            else:
              trade_date = msg.get('TradeDate')
              if not trade_date:
                trade_date = time.strftime("%Y%m%d", time.localtime())

              self.log('OUT', 'TRADEDATE', trade_date)
              timestamp = datetime.datetime.strptime(trade_date, "%Y%m%d")

            self.log('OUT', 'TIMESTAMP', timestamp )
            
            if len(instruments) > 1:
              raise  InvalidMessageError()

            instrument = instruments[0]

            om = OrderMatcher.get(instrument)
            response_message = MarketDataPublisher.generate_md_full_refresh( self.db_session, instrument, market_depth, om, entries, req_id, timestamp )
            response_message = 'REP,' + json.dumps( response_message , cls=JsonEncoder)
          elif msg.isTradeHistoryRequest():

              page        = msg.get('Page', 0)
              page_size   = msg.get('PageSize', 100)
              offset      = page * page_size

              columns = [ 'TradeID' , 'Market',   'Side',          'Price',          'Size',
                          'BuyerID' , 'SellerID', 'BuyerUsername' ,'SellerUsername', 'Created',
                          'OrderId' , 'CounterOrderID']

              trade_list = MarketDataPublisher.generate_trade_history(self.db_session, page_size, offset )

              response_message = 'REP,' + json.dumps({
                  'MsgType'           : 'U33', # TradeHistoryResponse
                  'TradeHistoryReqID' : -1,
                  'Page'              : page,
                  'PageSize'          : page_size,
                  'Columns'           : columns,
                  'TradeHistoryGrp'   : trade_list
              }, cls=JsonEncoder)

          else:
            response_message = self.session_manager.process_message( msg_header, session_id, msg )
        else:
          response_message = self.session_manager.process_message( msg_header, session_id, msg )

      except TradeRuntimeError, e:
        self.db_session.rollback()
        self.session_manager.close_session(session_id)
        response_message = 'ERR,{"MsgType":"ERROR", "Description":"' + e.error_description.replace("'", "") + '", "Detail": ""}'

      except Exception,e:
        traceback.print_exc()
        self.db_session.rollback()
        self.session_manager.close_session(session_id)
        response_message = 'ERR,{"MsgType":"ERROR", "Description":"Unknow error", "Detail": "'  + str(e) + '"}'

      # send the response
      self.log('OUT', 'TRADE_IN_REP', response_message )
      self.input_socket.send_unicode(response_message)

      # publish all publications
      for key, message in self.publish_queue:
        self.log('OUT', 'TRADE_PUB', str([ key, message]) )
        self.publisher_socket.send_multipart( [ '^' + str(key) + '$' ,  json.dumps(message, cls=JsonEncoder)] )
      self.publish_queue = []

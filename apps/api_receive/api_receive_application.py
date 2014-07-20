import logging

import tornado.ioloop
import tornado.web
from tornado.options import  options

from sqlalchemy.orm import scoped_session, sessionmaker

from create_receive_handler import ReceiveHandler
from wallet_notify_handler import  WalletNotifyHandler

from bitcoinrpc.authproxy import AuthServiceProxy

class ApiReceiveApplication(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r"/api/receive", ReceiveHandler),
      (r"/api/walletnotify/(?P<txid>[^\/]+)", WalletNotifyHandler),
      ]
    settings = dict(
      cookie_secret='cookie_secret'
    )
    tornado.web.Application.__init__(self, handlers, **settings)

    input_log_file_handler = logging.handlers.TimedRotatingFileHandler( options.log, when='MIDNIGHT')
    formatter = logging.Formatter('%(asctime)s - %(message)s')
    input_log_file_handler.setFormatter(formatter)

    self.bitcoind = AuthServiceProxy(options.rpc_url, options.rpc_username, options.rpc_password )


    self.replay_logger = logging.getLogger("REPLAY")
    self.replay_logger.setLevel(logging.INFO)
    self.replay_logger.addHandler(input_log_file_handler)
    self.replay_logger.info('START')

    from models import engine, db_bootstrap
    self.db_session = scoped_session(sessionmaker(bind=engine))
    db_bootstrap(self.db_session)

    self.log_start_data()

  def log(self, command, key, value=None):
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
    self.log('PARAM','port'                  ,options.port)
    self.log('PARAM','log'                   ,options.log)
    self.log('PARAM','db_echo'               ,options.db_echo)
    self.log('PARAM','db_engine'             ,options.db_engine)
    self.log('PARAM','rpc_url'               ,options.rpc_url)
    self.log('PARAM','rpc_username'          ,options.rpc_username)
    self.log('PARAM','END')

    from models import ForwardingAddress
    fwd_address_list = self.db_session.query(ForwardingAddress)
    for fwd_address in fwd_address_list:
      self.log('DB_ENTITY', 'FORWARDING_ADDRESS', fwd_address)

    bitcoin_info = self.bitcoind.getinfo()
    self.log('INFO', 'BITCOIND_GETINFO', str(bitcoin_info))

  def clean_up(self):
    pass




import logging

import tornado.ioloop
import tornado.web
from tornado.options import  options
from tornado import httpclient
from functools import partial


from sqlalchemy.orm import scoped_session, sessionmaker

from create_receive_handler import ReceiveHandler
from wallet_notify_handler import  WalletNotifyHandler
from block_notify_handler import BlockNotifyHandler

from bitcoinrpc.authproxy import AuthServiceProxy

class ApiReceiveApplication(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r"/api/receive", ReceiveHandler),
      (r"/api/walletnotify/(?P<txid>[^\/]+)", WalletNotifyHandler),
      (r"/api/blocknotify/(?P<hash>[^\/]+)", BlockNotifyHandler),
      ]
    settings = dict(
      cookie_secret='cookie_secret'
    )
    tornado.web.Application.__init__(self, handlers, **settings)

    input_log_file_handler = logging.handlers.TimedRotatingFileHandler( options.log, when='MIDNIGHT')
    formatter = logging.Formatter('%(asctime)s - %(message)s')
    input_log_file_handler.setFormatter(formatter)

    self.bitcoind = AuthServiceProxy(options.rpc_url, options.rpc_username, options.rpc_password )
    self.paytxfee = self.bitcoind.getinfo()['paytxfee']


    self.replay_logger = logging.getLogger("REPLAY")
    self.replay_logger.setLevel(logging.INFO)
    self.replay_logger.addHandler(input_log_file_handler)
    self.replay_logger.info('START')

    from models import engine, db_bootstrap
    self.db_session = scoped_session(sessionmaker(bind=engine))
    db_bootstrap(self.db_session)

    self.log_start_data()

  def invoke_callback_url(self, forwarding_address):
    url = forwarding_address.get_callback_url()
    self.log('EXECUTE', 'curl ' + url)

    http_client = httpclient.AsyncHTTPClient()
    http_client.fetch(url, partial(self.on_handle_callback_url, forwarding_address.id ))


  def on_handle_callback_url(self, forwarding_address_id, response ):
    from models import ForwardingAddress
    forwarding_address = ForwardingAddress.get_by_id(self.db_session, forwarding_address_id)

    if response.error:
      self.log('ERROR', str(response.error))
      forwarding_address.callback_number_of_errors += 1
      self.db_session.add(forwarding_address)
      self.db_session.commit()
    else:
      if response.body == '*ok*':
        forwarding_address.is_confirmed_by_client = True
        self.db_session.add(forwarding_address)
        self.db_session.commit()


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




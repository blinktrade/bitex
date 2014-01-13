import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

import pickle
import logging

from datetime import timedelta
from jsonrpc import ServiceProxy
import tornado.ioloop

import time
from bitex.secret import Secret
from bitex.client import BitExThreadedClient

logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s',filename='bitcoiner.log',level=logging.DEBUG)

class Bitcoiner:
  def __init__(self, config):
    self.processed_transactions = []
    self.config = config
    self.ws = None
    self.connection = None

  def on_message(self, sender, msg):
    if msg['MsgType'] == 'C':
      pass
    else:
      print 'received ' , msg
      print ''

  def connect_bitcoind(self):
    connection_string = "%s://%s:%s@%s:%d" % (self.config.bitcoind_protocol,
                                              self.config.bitcoind_key,
                                              self.config.bitcoind_secret,
                                              self.config.bitcoind_host,
                                              self.config.bitcoind_port )
    return ServiceProxy(connection_string)

  def connect_bitex(self):
    ws = BitExThreadedClient('wss://%s:%s/trade'%(self.config.om_host, self.config.om_port) )
    ws.signal_recv.connect(self.on_message)
    ws.connect()
    ws.login( self.config.om_user , self.config.om_pwd )
    return ws

  def create_N_address(self, number_of_new_address):
    if not self.connection:
      self.connection = self.connect_bitcoind()

    if not self.ws:
      self.ws = self.connect_bitex()

    for x in xrange(number_of_new_address+1):
      print 'creating addrss' ,x,'....'
      bitcoin_address = self.connection.getnewaddress()

      print bitcoin_address

      self.ws.sendMsg( {'MsgType':'BITCOIN_NEW_ADDRESS', 'BtcAddress': bitcoin_address } )



  def run(self):
    self.load_file()
    self.connection = self.connect_bitcoind()
    while  True:
      try:
        self.ws = self.connect_bitex()
        tornado.ioloop.IOLoop.instance().add_timeout(timedelta(seconds=1), self.check_positions)
        tornado.ioloop.IOLoop.instance().start()

      except KeyboardInterrupt:
        print 'Exiting'
        self.ws.close()
        tornado.ioloop.IOLoop.instance().stop()
        break

      except Exception, e:
        print 'Error ', e
        print 'reconnecting in 1 sec'
        time.sleep(1)

  def load_file(self):
    try:
      output = open('data.pkl', 'r+')
      try:
        self.processed_transactions = pickle.load(output)
      except EOFError:
        print 'error reading'
    except IOError:
      pass

  def save_file(self):
    output = open('data.pkl', 'wb')
    pickle.dump(self.processed_transactions, output)

  def check_positions(self):
    for transaction in  self.connection.listunspent():
      transaction_id = transaction['txid']
      if transaction_id in self.processed_transactions:
        continue

      transaction_details =  self.connection.gettransaction(transaction_id)
      for detail in transaction_details['details']:
        if detail['category'] == 'receive':
          amount = int(round(float(detail['amount']) * 1e8))
          self.ws.sendMsg( {'MsgType':'BTC_DEPOSIT', 'BtcAddress': detail['address'], 'Amount':  amount } )

      self.processed_transactions.append(transaction_id)
      self.save_file()

    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(seconds=1), self.check_positions)

from bitex.json_encoder import  JsonEncoder
from json import dumps, loads
import base64

import zmq

class BitexApi(object):
  def __init__(self, request_socket):
    self.request_socket = request_socket
    self.connection_id = None

  def open_session(self):
    if self.connection_id is not None:
      raise RuntimeError()

    self.connection_id = base64.b32encode(os.urandom(10))
    self.request_socket.send( "OPN," + self.connection_id)
    dummy_response = self.request_socket.recv()

  def close_session(self):
    if self.connection_id is None:
      raise RuntimeError()
    self.request_socket.send( "CLS," + self.connection_id)
    dummy_response = self.request_socket.recv()

  def request(self, msg):
    self.request_socket.send_unicode( 'REQ,' + self.connection_id + ',' +  dumps( msg, cls=JsonEncoder ) )
    response_message = self.request_socket.recv()
    raw_resp_message_header = response_message[:3]
    raw_resp_message        = response_message[4:].strip()

    if raw_resp_message_header != 'REP':
      if raw_resp_message:
        return loads(raw_resp_message)
      return {}

    if raw_resp_message:
      return loads(raw_resp_message)

    return {}

  def login(self, username, password):
    if self.connection_id is None:
      raise RuntimeError()

    # send Login Message
    loginMsg = {
      'UserReqID': 'initial',
      'MsgType' : 'BE',
      'Username': username,
      'Password': password,
      'UserReqTyp': '1'
    }
    return self.request(loginMsg)


  def testRequest(self):
    return self.request({'MsgType': '1', 'TestReqID':'1'})


class BitexAdminApi(BitexApi):
  def getNumberOfBitcoinAdresses(self):
    res = self.request({'MsgType': 'S2'})
    return res['NOfBtcAddress']



def main():
  import argparse
  parser = argparse.ArgumentParser(description='bitcoiner parameters')

  parser.add_argument("--file", dest="config_filename", default=os.path.join(ROOT_PATH, "config/", "bitcoin.conf"),
                      help="configuration file", metavar="f")

  parser.add_argument("--new_address", dest="number_of_new_address", type=int, default=0, help="Number of address to create" )

  parser.add_argument("--encrypt", dest="encrypt", action='store_const', default=False, const=True, help="encrypt file")

  args = parser.parse_args()
  print args.config_filename

  config = Secret( args.config_filename )
  if args.encrypt:
    config.prompt_encrypt()
    return


  if config.prompt_decrypt() == config.S_FAIL_FATAL:
    print 'Error reading ' + args.config_filename + ' config file'
    return

  print "running bitcoiner with the following configuration ..."
  print config.bitcoind_protocol
  print config.bitcoind_host
  print config.bitcoind_port
  print config.bitcoind_key
  print ""
  print config.trade_in_connection_string
  print config.trade_user
  print config.trade_pwd


  zmq_context = zmq.Context()
  trade_in_socket = zmq_context.socket(zmq.REQ)
  trade_in_socket.connect( config.trade_in_connection_string )

  trade_admin_api = BitexAdminApi(trade_in_socket)
  trade_admin_api.open_session()
  trade_admin_api.login(config.trade_user, config.trade_pwd )


  #bitcoind_connection = self.connect_bitcoind()
  while  True:
    try:
      # check if trade is running out of bitcoin addresses
      print trade_admin_api.getNumberOfBitcoinAdresses()


      # go to bitcoind and create 20 addresses


      # register those 20 bitcoin addresses in trade


      # sleep another 20 seconds
      time.sleep(20)
    except KeyboardInterrupt:
      print 'Exiting'
      break

    except Exception, e:
      print 'Error ', e
      print 'reconnecting in 1 sec'
      time.sleep(1)


  trade_admin_api.close_session()

if __name__ == '__main__':
  main()

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

  print config.om_host
  print config.om_port
  print config.om_user

  bitcoiner = Bitcoiner( config )

  if args.number_of_new_address  > 0:
    bitcoiner.create_N_address(args.number_of_new_address )
  else:
    bitcoiner.run()

if __name__ == '__main__':
  main()

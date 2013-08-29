import pickle
import json
import os
import sys
import logging

from datetime import timedelta
from jsonrpc import ServiceProxy
import tornado.ioloop

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from bitex.secret import Secret
from bitex.client import BitExThreadedClient

logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s',filename='bitcoiner.log',level=logging.DEBUG)

class BtcServer:

    def __init__(self):
        self.processed_transactions = []
        self.secret = Secret()
        self.ws = None

    def on_message(self, sender, msg):
        if msg['MsgType'] == 'C':
          pass 
        else:
          print 'received ' , msg
          print ''

    def start(self):
        if self.secret.prompt_decrypt() != self.secret.S_FAIL_FATAL:
            self.load_file()
            self.connection = ServiceProxy("http://%s:%s@127.0.0.1:8332" % (self.secret.key, self.secret.secret))
            while  True:
                try:
                    self.ws = BitExThreadedClient('wss://test.bitex.com.br:8449/trade')
                    self.ws.signal_recv.connect(self.on_message)
                    self.ws.connect()
                    self.ws.login('bzero','senha123')
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
  BtcServer().start()

if __name__ == '__main__':
  main()

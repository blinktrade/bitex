import os
import sys
import json
import socket

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from bitex.secret import Secret
from jsonrpc import ServiceProxy

from tornado import ioloop
from tornado.iostream import IOStream

from bitex.signals import Signal

bitcoin_updates_signal = Signal()

class Bitcoin:
  def __init__(self):
    self.secret = Secret()
    self.connection = None

  def onstream_close(self):
    if self.stream:
        self.stream = None

  def onstream_receive(self, data):
    if self.stream:
        msg = json.loads(str(data.rstrip()))
        bitcoin_updates_signal(0, msg)
        self.stream.read_until("\r\n", self.onstream_receive)

  def connect(self):
    if self.secret.prompt_decrypt() != self.secret.S_FAIL_FATAL:
        self.connection = ServiceProxy("http://%s:%s@127.0.0.1:8332" % (self.secret.key, self.secret.secret))
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0)
            sock.setsockopt(socket.SOL_TCP, socket.TCP_NODELAY, 1)
            sock.connect(('localhost', 60025))
            self.stream = IOStream(sock)
            self.stream.set_close_callback(self.onstream_close)
            self.stream.read_until("\r\n", self.onstream_receive)
        except socket.error, e:
            print 'socket error: ', e
    else:
        print 'esqueceu a senha truta ?'
        sys.exit(99)

  def getposition(self, address):
    if self.stream:
        self.stream.write(json.dumps({ 'address': address }))
        self.stream.write('\r\n')
  
  def getnewaddress(self):
    if self.connection != None:
        return self.connection.getnewaddress()

def on_bitcoin_updates_signal( msg ):
  print 'msg:', msg
 
if __name__ == "__main__":
    btc = Bitcoin()
    bitcoin_updates_signal.connect(on_bitcoin_updates_signal)
    btc.connect()
    #print btc.getnewaddress()
    ioloop.IOLoop.instance().start()
    raw_input("close it ?")

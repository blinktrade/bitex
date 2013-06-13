import os
import sys
import json
import socket

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from bitex.secret import Secret
from jsonrpc import ServiceProxy

class Bitcoin:
  def __init__(self):
    self.secret = Secret()
    self.connection = None

  def connect(self):
    if self.secret.prompt_decrypt() != self.secret.S_FAIL_FATAL:
        self.connection = ServiceProxy("http://%s:%s@127.0.0.1:8332" % (self.secret.key, self.secret.secret))
    else:
        print 'esqueceu a senha truta ?'
        sys.exit(99)

  def getnewaddress(self):
    if self.connection != None:
        return self.connection.getnewaddress()

if __name__ == "__main__":
    btc = Bitcoin()
    btc.connect()
    #print btc.getnewaddress()
    raw_input("close it ?")

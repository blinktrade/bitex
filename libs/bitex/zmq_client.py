import base64
import os

class TradeClientException(Exception):
  pass



class TradeClient(object):
  def  __init__(self, socket):
    self.connection_id = None
    self.socket = socket

  def connect(self):
    self.socket.send( "OPN," + base64.b32encode(os.urandom(10)))
    open_response = self.socket.recv()
    if open_response[:3] == 'OPN':
      self.connection_id = open_response[4:]
      return 

    raise TradeClientException()

  def login(self, username, password ):
    pass
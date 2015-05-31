import base64
import os

import zmq
from zmq.eventloop.zmqstream import  ZMQStream

from pyblinktrade.message_builder import MessageBuilder
from pyblinktrade.message import JsonMessage, InvalidMessageException

class TradeClientException(Exception):
  def __init__(self, error_message, detail = None):
    self.error_message = error_message
    self.detail = None
    super(TradeClientException, self).__init__()

  def __str__(self):
    if self.detail:
      return self.error_message + '( detail:%s)'%self.detail
    return self.error_message



class TradeClient(object):
  def  __init__(self, zmq_context, trade_in_socket, trade_pub = None, reopen=True):
    self.zmq_context      = zmq_context
    self.connection_id    = None
    self.trade_in_socket  = trade_in_socket
    self.is_logged        = False
    self.user_id          = None
    self.reopen           = reopen
    self.trade_pub        = trade_pub

    self.trade_pub_socket = None
    self.trade_pub_socket_stream = None

    if self.trade_pub:
      self.trade_pub_socket = self.zmq_context.socket(zmq.SUB)
      self.trade_pub_socket.connect(self.trade_pub)
      self.trade_pub_socket_stream = ZMQStream(self.trade_pub_socket)
      self.trade_pub_socket_stream.on_recv(self._on_trade_publish)

  def _on_trade_publish(self, message):
    self.on_trade_publish(message)

  def on_trade_publish(self, message):
    pass

  def connect(self):
    if not self.trade_pub_socket and self.trade_pub:
      self.trade_pub_socket = self.zmq_context.socket(zmq.SUB)
      self.trade_pub_socket.connect(self.trade_pub)
      self.trade_pub_socket_stream = ZMQStream(self.trade_pub_socket)
      self.trade_pub_socket_stream.on_recv(self._on_trade_publish)

    self.trade_in_socket.send( "OPN," + base64.b32encode(os.urandom(10)))
    response_message = self.trade_in_socket.recv()
    opt_code    = response_message[:3]
    raw_message = response_message[4:]

    if opt_code != 'OPN':
      if opt_code == 'ERR':
        raise TradeClientException( error_message = raw_message )

      raise TradeClientException( error_message = 'Protocol Error: Unknown message opt_code received' )

    self.connection_id = raw_message


  def close(self):
    if self.trade_pub_socket_stream:
      self.trade_pub_socket_stream.close()
      self.trade_pub_socket_stream = None
      self.trade_pub_socket.close()
      self.trade_pub_socket = None

    if self.connection_id:
      self.trade_in_socket.send( "CLS," + self.connection_id  )
      response_message = self.trade_in_socket.recv()
    self.connection_id = None

  def isConnected(self):
    return self.connection_id is not None

  def getBrokerList(self, status_list):
    page = 0
    page_size = 100

    broker_list = []
    columns = []
    while True:
      res = self.sendJSON(MessageBuilder.getBrokerList( status_list, None, page, page_size ))
      columns = res.get('Columns')
      broker_list.extend(res.get('BrokerListGrp'))
      if len(res.get('BrokerListGrp')) < page_size:
        break
      page += 1

    return broker_list, columns

  def getLastTrades(self, last_trade_id, page=0):

      if last_trade_id is None:
          last_trade_id = 1

      rep_msg = self.sendJSON({ 'MsgType': 'U32',
                                'TradeHistoryReqID': -1,
                                'Page': page,
                                'PageSize': 100 })

      result_list = []

      if rep_msg.isTradeHistoryResponse():
          last_processed = 0
          trade_list = rep_msg.get('TradeHistoryGrp')
          if not trade_list :
            return result_list
          for trade in trade_list:
             if last_trade_id <= trade[0]:
               last_processed = trade[0]
               if last_processed != last_trade_id:
                  result_list.append(trade)


          if last_processed != last_trade_id:
             return result_list + self.getLastTrades(last_trade_id, page+1)

      return result_list


  def getSecurityList(self):
    resp =  self.sendJSON({  'MsgType' : 'x',
                            'SecurityReqID': 'getSecurityList',
                            'SecurityListRequestType': 0})
    return resp



  def sendString(self, string_msg):
    if not self.isConnected() and self.reopen:
      self.connect()

    self.trade_in_socket.send_unicode( "REQ," +  self.connection_id + ',' + string_msg)

    response_message        = self.trade_in_socket.recv()
    raw_resp_message_header = response_message[:3]
    raw_resp_message        = response_message[4:].strip()

    rep_msg = None
    if raw_resp_message:
      try:
        rep_msg = JsonMessage(raw_resp_message)
      except Exception:
        pass

    if raw_resp_message_header == 'CLS' and rep_msg and not rep_msg.isErrorMessage():
      self.close()
      if self.reopen:
        self.connect()
      return rep_msg

    if raw_resp_message_header != 'REP':
      self.close()
      if self.reopen:
        self.connect()

      if rep_msg and rep_msg.isErrorMessage():
        raise TradeClientException(rep_msg.get('Description'), rep_msg.get('Detail'))
      raise TradeClientException('Invalid request: ' + raw_resp_message )


    if rep_msg and rep_msg.isUserResponse():
      if rep_msg.get("UserStatus") == 1:
        self.user_id = rep_msg.get("UserID")
        self.is_logged = True

        if self.trade_pub_socket:
          self.trade_pub_socket.setsockopt(zmq.SUBSCRIBE, '^' + str(self.user_id) + '$')

    return rep_msg

  def sendJSON(self, json_msg):
    import json
    return self.sendString(json.dumps(json_msg))

  def sendMessage(self, msg):
    return self.sendString(msg.raw_message)
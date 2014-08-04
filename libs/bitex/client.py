import random

if __name__ == '__main__':
  import os
  import sys

  ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
  sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
  sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))


from ws4py.client.threadedclient import WebSocketClient
import json
import time

from signals import Signal

class BitExThreadedClient(WebSocketClient):
  signal_heartbeat                = Signal()
  signal_logged                   = Signal()
  signal_error_login              = Signal()
  signal_execution_report         = Signal()
  signal_balance                  = Signal()  # U3
  signal_security_list            = Signal()  # y
  signal_news                     = Signal()  # B
  signal_error                    = Signal()  #ERROR



  signal_book_bid_clear           = Signal()
  signal_book_bid_new_order       = Signal()
  signal_book_bid_update_order    = Signal()
  signal_book_bid_delete_order    = Signal()
  signal_book_bid_delete_thru     = Signal()
  signal_book_offer_clear         = Signal()
  signal_book_offer_new_order     = Signal()
  signal_book_offer_update_order  = Signal()
  signal_book_offer_delete_order  = Signal()
  signal_book_offer_delete_thru   = Signal()

  signal_trade_clear              = Signal()
  signal_trade                    = Signal()

  signal_recv                     = Signal()
  signal_send                     = Signal()

  is_logged = False

  def send(self, payload, binary=False):
    self.signal_send(self, payload)
    super(BitExThreadedClient, self).send(payload, binary)

  def login(self, user, password):
    loginMsg = {
      'UserReqID': 'initial',
      'MsgType' : 'BE',
      'Username': user,
      'Password':password,
      'UserReqTyp': '1'
    }
    self.send(json.dumps(loginMsg))

  def testRequest(self, request_id=None):
    if request_id:
      self.send(json.dumps({'MsgType': '1', 'TestReqID': request_id }))
    else:
      self.send(json.dumps({'MsgType': '1', 'TestReqID': int(time.time()*1000)}))

  def requestBalances(self, request_id = None, client_id = None):
    if not request_id:
      request_id = random.randint(1,10000000)
    msg = {
      'MsgType': 'U2',
      'BalanceReqID': request_id
    }
    if client_id:
      msg['ClientID'] = client_id
    self.send(json.dumps(msg))



  def requestMarketData(self,  request_id,  symbols, entry_types, subscription_type='1', market_depth=0 ,update_type = '1'):
    subscribe_msg = {
      'MsgType' : 'V',
      'MDReqID': request_id,
      'SubscriptionRequestType': subscription_type,
      'MarketDepth': market_depth,
      'MDUpdateType': update_type,  #
      'MDEntryTypes': entry_types,  # bid , offer, trade
      'Instruments': symbols
    }
    self.send(json.dumps(subscribe_msg))

  def sendLimitedBuyOrder(self, symbol, qty, price, clientOrderId ):
    msg = {
      'MsgType': 'D',
      'ClOrdID': str(clientOrderId),
      'Symbol': symbol,
      'Side': '1',
      'OrdType': '2',
      'Price': price,
      'OrderQty': qty
    }
    self.send(json.dumps(msg))

  def sendLimitedSellOrder(self, symbol, qty, price, clientOrderId ):
    msg = {
      'MsgType': 'D',
      'ClOrdID': str(clientOrderId),
      'Symbol': symbol,
      'Side': '2',
      'OrdType': '2',
      'Price': price,
      'OrderQty': qty
    }
    self.send(json.dumps(msg))

  def sendMsg(self, msg ):
    self.send(json.dumps(msg))

  def received_message(self, message):
    msg = json.loads(str(message))

    self.signal_recv(self, msg)

    if msg['MsgType'] == '0':
      self.signal_heartbeat(self, msg)
    elif msg['MsgType'] == 'BF':
      if msg['UserStatus'] == 1:
        self.is_logged = True
        self.signal_logged(self, msg)
      else:
        self.signal_error_login(self, msg)
    elif msg['MsgType'] == '8':
      self.signal_execution_report(self, msg)

    elif msg['MsgType'] == 'U3':
      self.signal_balance(self, msg)

    elif msg['MsgType'] == 'y':
      self.signal_security_list(self, msg)

    elif msg['MsgType'] == 'B':
      self.signal_news(self, msg)

    elif msg['MsgType'] == 'ERROR':
      self.signal_error(self, msg)


    elif msg['MsgType'] == 'X':  # Market Data Incremental Refresh
      if msg['MDBkTyp'] == '3': # Order Depth
        for entry in msg['MDIncGrp']:
          if entry['MDEntryType'] == '0':
            if entry['MDUpdateAction'] == '0':
              self.signal_book_bid_new_order(self, entry )
            elif entry['MDUpdateAction'] == '1':
              self.signal_book_bid_update_order(self, entry )
            elif entry['MDUpdateAction'] == '2':
              self.signal_book_bid_delete_order(self, entry )
            elif entry['MDUpdateAction'] == '3':
              self.signal_book_bid_delete_thru(self, entry )
          elif entry['MDEntryType'] == '1':
            if entry['MDUpdateAction'] == '0':
              self.signal_book_offer_new_order(self, entry )
            elif entry['MDUpdateAction'] == '1':
              self.signal_book_offer_update_order(self, entry )
            elif entry['MDUpdateAction'] == '2':
              self.signal_book_offer_delete_order(self, entry )
            elif entry['MDUpdateAction'] == '3':
              self.signal_book_offer_delete_thru(self, entry )
          elif entry['MDEntryType'] == '2':
            self.signal_trade(self, entry )


    elif msg['MsgType'] == 'W':  # Market Data Refresh
      if  msg['MarketDepth'] != 1  :# Has Market Depth
        self.signal_book_bid_clear(self, "")
        self.signal_book_offer_clear(self, "")
        self.signal_trade_clear(self, "")

        for entry in msg['MDFullGrp']:
          if entry['MDEntryType'] == '0':
            self.signal_book_bid_new_order(self, entry )
          elif entry['MDEntryType'] == '1':
            self.signal_book_offer_new_order(self, entry )
          elif entry['MDEntryType'] == '2':
            self.signal_trade(self, entry )



if __name__ == '__main__':
  ws = BitExThreadedClient('wss://localhost:8449/trade')
  try:
    def on_login(sender, msg):
      ws.testRequest()
      ws.requestMarketData( 'md', ['BTCBRL'], ['0','1', '2'] )


    def on_message(sender, msg):
      print 'received ' , msg
      print ''

    ws.signal_logged.connect(on_login)
    ws.signal_recv.connect(on_message)

    ws.connect()
    ws.login('r','r')

    ws.run_forever()
  except KeyboardInterrupt:
    ws.close()

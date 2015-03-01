import random

from ws4py.client.threadedclient import WebSocketClient
import json
import time

from pyblinktrade.signals import Signal

class BitExThreadedClient(WebSocketClient):
  signal_heartbeat                = Signal()
  signal_logged                   = Signal()
  signal_error_login              = Signal()
  signal_execution_report         = Signal()
  signal_balance                  = Signal()  # U3
  signal_security_list            = Signal()  # y
  signal_news                     = Signal()  # B
  signal_error                    = Signal()  #ERROR

  signal_deposit_refresh          = Signal()
  signal_deposit_response         = Signal()
  signal_process_deposit_response = Signal()

  signal_verify_customer_response = Signal()
  signal_verify_customer_update   = Signal()


  signal_connection_open          = Signal()
  signal_connection_closed        = Signal()

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
  is_connected = False

  def closed(self, code, reason):
    print 'BitExThreadedClient::closed'
    self.is_connected = False
    self.is_logged = False
    self.signal_connection_closed(self, (code, reason))

  def opened(self):
    self.is_connected = True
    self.is_logged = False
    self.signal_connection_open(self)

  def send(self, payload, binary=False):
    if self.is_connected:
      self.signal_send(self, payload)
      super(BitExThreadedClient, self).send(payload, binary)

  def login(self, broker_id, user, password):
    if not user or not password:
      raise ValueError('Invalid parameters')

    loginMsg = {
      'UserReqID': 'initial',
      'MsgType' : 'BE',
      'BrokerID': broker_id,
      'Username': user,
      'Password':password,
      'UserReqTyp': '1',
      'FingerPrint': 9999
    }
    self.send(json.dumps(loginMsg))

  def testRequest(self, request_id=None):
    if request_id:
      self.send(json.dumps({'MsgType': '1', 'TestReqID': request_id }))
    else:
      self.send(json.dumps({'MsgType': '1', 'TestReqID': int(time.time()*1000)}))

  def verifyCustomer(self , client_id, verify, verification_data, opt_request_id=None):
    if not opt_request_id:
      opt_request_id = random.randint(1,10000000)

    msg = {
      'MsgType': 'B8',
      'VerifyCustomerReqID': opt_request_id,
      'ClientID': client_id,
      'Verify':  verify,
      'VerificationData': verification_data
    }

    self.send(json.dumps(msg))

    return opt_request_id


  def processDeposit(self,
                     action,
                     opt_request_id = None,
                     opt_secret=None,
                     opt_depositId=None,
                     opt_reasonId=None,
                     opt_reason=None,
                     opt_amount=None,
                     opt_percent_fee=None,
                     opt_fixed_fee=None):
    if not opt_request_id:
      opt_request_id = random.randint(1,10000000)

    msg = {
      'MsgType': 'B0',
      'ProcessDepositReqID': opt_request_id,
      'Action': action
    }

    if opt_secret:
      msg['Secret'] = opt_secret

    if opt_depositId:
      msg['DepositID'] = opt_depositId

    if opt_reasonId:
      msg['ReasonID'] = opt_reasonId

    if opt_reason:
      msg['Reason'] = opt_reason

    if opt_amount:
      msg['Amount'] = opt_amount

    if opt_percent_fee:
      msg['PercentFee'] = opt_percent_fee

    if opt_fixed_fee:
      msg['FixedFee'] = opt_fixed_fee

    self.send(json.dumps(msg))

    return opt_request_id

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

    return request_id

  def requestMarketData(self,  request_id,  symbols, entry_types, subscription_type='1', market_depth=0 ,update_type = '1'):
    if not symbols or not entry_types:
      raise ValueError('Invalid parameters')

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

    return request_id

  def sendLimitedBuyOrder(self, symbol, qty, price, clientOrderId ):
    if not symbol or not qty or  not qty or not price or not clientOrderId:
      raise ValueError('Invalid parameters')

    if qty <= 0 or price <= 0:
      raise ValueError('Invalid qty or price')

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
    if not symbol or not qty or  not qty or not price or not clientOrderId:
      raise ValueError('Invalid parameters')

    if qty <= 0 or price <= 0:
      raise ValueError('Invalid qty or price')

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

    elif msg['MsgType'] == 'B1': #Process Deposit Response
      self.signal_process_deposit_response(self, msg)

    elif msg['MsgType'] == 'B9': #Verification Customer Response
      self.signal_verify_customer_response(self, msg)

    elif msg['MsgType'] == 'B11': #Verification Customer Update
      self.signal_verify_customer_update(self, msg)

    elif msg['MsgType'] == 'U19': #Deposit Response
      self.signal_deposit_response(self, msg)

    elif msg['MsgType'] == 'U23': #Deposit Refresh
      self.signal_deposit_refresh(self, msg)

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

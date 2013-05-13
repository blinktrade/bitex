import threading
import websocket
import time

from bitex.signals import  Signal

from json import loads, dumps

class OrderMatcherClient(object):
  def __init__(self, ws_url, username, password, symbols):
    self.ws_url = ws_url
    self.username = username
    self.password = password
    self.symbols = symbols

    self._terminating = False
    self.connected = False
    self.logged = False

    self._recv_thread = None
    self._time_last_received = 0

    self.signal_recv                    = Signal()

    self.signal_book_bid_clear          = Signal()
    self.signal_book_bid_new_order      = Signal()
    self.signal_book_bid_update_order   = Signal()
    self.signal_book_bid_delete_order   = Signal()
    self.signal_book_bid_delete_thru    = Signal()
    self.signal_book_offer_clear        = Signal()
    self.signal_book_offer_new_order    = Signal()
    self.signal_book_offer_update_order = Signal()
    self.signal_book_offer_delete_order = Signal()
    self.signal_book_offer_delete_thru  = Signal()

    self.signal_trade_clear             = Signal()
    self.signal_trade                   = Signal()

  def _recv_thread_func(self):
    reconnect_time = 1

    while not self._terminating:  #loop 0 (connect, reconnect)
      try:
        self.socket = websocket.WebSocket()

        self.socket.connect(self.ws_url)
        self._time_last_received = time.time()
        self.connected = True

        # send Login Message
        loginMsg = {
          'MsgType' : 'BE',
          'Username': self.username,
          'Password': self.password
        }
        self.send( dumps(loginMsg))


        while not self._terminating:
          str_json = self.socket.recv()
          self._time_last_received = time.time()
          msg = loads(str_json)
          self.signal_recv(self, msg)

          if msg['MsgType'] == 'BF':
            if msg['UserStatus'] == 1:
              self.logged = True

              # send Market Data Subscribe
              subscribe_msg = {
                'MsgType' : 'V',
                'MDReqID': 'md_full_refresh',
                'SubscriptionRequestType': '1',
                'MarketDepth': 0,
                'MDUpdateType': '1',  #
                'MDEntryTypes': ['0', '1', '2'],  # bid , offer, trade
                'Instruments': self.symbols
              }
              self.send(dumps(subscribe_msg))
            else:
              self.logged = False


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

      except Exception as exc:
        self.connected = False
        if not self._terminating:
          if self.socket:
            self.socket.close()
          time.sleep(reconnect_time)

  def start(self):
    """start the client"""
    self._recv_thread = threading.Thread(None, self._recv_thread_func)
    self._recv_thread.daemon = True
    self._recv_thread.start()

  def stop(self):
    """stop the client"""
    self._terminating = True
    if self.socket:
      self.socket.sock.close()


  def send(self, json_str):
    if self.connected:
      try:
        self.socket.send(json_str)
      except Exception as exc:
        self.connected = False
        self.socket.close()

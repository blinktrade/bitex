__author__ = 'rodrigo'


from market_data_signals import *

import  datetime

from tornado import  websocket
import json

from models import  User, Order, balance_signal, user_message_signal

from order_matcher.execution import OrderMatcher, execution_report_signal

from bitex.message import JsonMessage


class JsonEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, datetime.datetime):
      return obj.strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(obj, datetime.date):
      return obj.strftime('%Y-%m-%d')
    if isinstance(obj, datetime.time):
      return obj.strftime('%H:%M:%S')
    return json.JSONEncoder.default(self, obj)

class OrderMatcherHandler(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(OrderMatcherHandler, self).__init__(application, request, **kwargs)
    self.is_logged = 0
    self.user = None  # The authenticated user

    self.md_subscriptions = {}

  def on_execution_report(self, sender, rpt):
    self.write_message( str(rpt) )

  def on_send_json_msg_to_user(self, sender, json_msg):
    self.write_message( str(json.dumps(json_msg, cls=JsonEncoder )) )

  def on_message(self, raw_message):
    msg = JsonMessage(raw_message)
    if not msg.is_valid():
      self.close()
      return

    if  msg.type == '1': # TestRequest
      # send the heart beat back
      self.write_message( '{"MsgType":"0", "TestReqID":"%s"}'%msg.get("TestReqID"))
      return

    elif  msg.type == 'V':  # Market Data Request
      req_id = msg.get('MDReqID')
      if int(msg.get('SubscriptionRequestType')) == 0: # Snapshot
        # Generate a FullRefresh
        market_depth = msg.get('MarketDepth')
        instruments = msg.get('Instruments')
        entries = msg.get('MDEntryTypes')

        for instrument in  instruments:
          om = OrderMatcher.get(instrument)
          md = generate_md_full_refresh( self.application.session, instrument, market_depth, om, entries )
          self.write_message( str(json.dumps(md, cls=JsonEncoder )) )


      elif int(msg.get('SubscriptionRequestType')) == 1:  # Snapshot + Updates
        if req_id not in self.md_subscriptions:
          self.md_subscriptions[req_id] = []

        market_depth = msg.get('MarketDepth')
        instruments = msg.get('Instruments')
        entries = msg.get('MDEntryTypes')
        for instrument in  instruments:
          om = OrderMatcher.get(instrument)
          md = generate_md_full_refresh(self.application.session, instrument, market_depth, om, entries )
          self.write_message( str(json.dumps(md, cls=JsonEncoder )) )

          for entry in entries:
            self.md_subscriptions[req_id].append( MdSubscriptionHelper(req_id,
                                                                       market_depth,
                                                                       entry,
                                                                       instrument,
                                                                       self.on_send_json_msg_to_user ) )

      elif int(msg.get('SubscriptionRequestType')) == 2: # Disable previous Snapshot + Update Request
        if req_id in self.md_subscriptions:
          del self.md_subscriptions[req_id]
      return


    if not self.is_logged:
      if msg.type == 'U0': # signup
        # signup the user

        # TODO: Create a wallet address

        # create the user on Database
        u = User( username    = msg.get('Username'),
                  first_name  = msg.get('FirstName'),
                  last_name   = msg.get('LastName'),
                  email       = msg.get('Email'),
                  password    = msg.get('Password'))

        self.application.session.add(u)
        self.application.session.commit()


      # The logon message must be the first message
      if msg.type  != 'BE' and msg.type != 'U0':
        self.close()
        return

      # Authenticate the user
      self.user = User.authenticate(self.application.session, msg.get('Username'),msg.get('Password'))
      if not self.user:

        login_response = {
          'MsgType': 'BF',
          'Username': '',
          'UserStatus': 3,
          'UserStatusText': 'Invalid Username or Password'
        }
        self.write_message( json.dumps(login_response) )

        # TODO: improve security.
        # Block the user accounts after 3 attempts
        # close the all connections from the blocked user
        # Block the ip for 24hs
        self.close()
        return
      self.is_logged = True

      # Send the login response
      login_response = {
        'MsgType': 'BF',
        'Username': self.user.username,
        'UserStatus': 1
      }
      self.write_message( json.dumps(login_response) )


      # subscribe to all execution reports for this user account.
      execution_report_signal.connect(  self.on_execution_report, self.user.id )

      # subscribe to balance updates for this user account
      balance_signal.connect( self.on_send_json_msg_to_user, self.user.id  )

      # subscribe to all emails sent to this user account:
      user_message_signal.connect( self.on_send_json_msg_to_user, self.user.id )

      # subscribe to all emails broadcast to all users :
      user_message_signal.connect( self.on_send_json_msg_to_user )


      # add the user to the session/
      self.application.session.add(self.user)
      self.application.session.commit()

      self.user.publish_balance_update()
      return

    # The user is logged

    # handle system messages
    if self.user.is_system:
      if self._handle_system_messages(msg):
        return

    # handle staff messages
    if self.user.is_staff:
      if self._handle_staff_messages(msg):
        return

    # handle all other messages
    if msg.type == 'D':  # New Order Single
      # process the new order.
      order = Order( user_id          = self.user.id,
                     account_id       = self.user.account_id,
                     user             = self.user,
                     username         = self.user.username,
                     client_order_id  = msg.get('ClOrdID'),
                     symbol           = msg.get('Symbol'),
                     side             = msg.get('Side'),
                     type             = msg.get('OrdType'),
                     price            = msg.get('Price'),
                     order_qty        = msg.get('OrderQty'))

      self.application.session.add( order)
      self.application.session.commit() # just to assign an ID for the order.

      OrderMatcher.get(msg.get('Symbol')).match(self.application.session, order)

      self.application.session.commit()
      return

    elif  msg.type == 'F' : # Cancel Order Request
      if  msg.has('OrigClOrdID'):
        order = self.application.session.query(Order).\
        filter(Order.status.in_(("0", "1"))).\
        filter_by( user_id = self.user.id ).\
        filter_by( client_order_id =  msg.get('OrigClOrdID')  ).first()
      else:
        order = self.application.session.query(Order).\
        filter(Order.status.in_(("0", "1"))).\
        filter_by( user_id = self.user.id ).\
        filter_by( id =  msg.get('OrderID')  ).first()


      OrderMatcher.get( order.symbol ).cancel(self.application.session, order)
      return


    elif msg.type == 'U2': # Request for Balances
      self.user.publish_balance_update(msg.get('BalanceReqID'))
      return

    elif msg.type == 'U4': # Request for Open Orders
      orders = self.application.session.query(Order).\
      filter(Order.status.in_(("0", "1"))).\
      filter_by( user_id = self.user.id ).\
      order_by(Order.created.desc())

      order_list = []
      for order in orders:
        order_list.append( {
          'ClOrdID': order.client_order_id,
          'OrderID': order.id,
          'CumQty': order.cum_qty,
          'OrdStatus': order.status,
          'LeavesQty': order.leaves_qty,
          'CxlQty': order.cxl_qty,
          'AvgPx': order.average_price,
          'Symbol': order.symbol,
          'Side': order.side,
          'OrdType': order.type,
          })

      open_orders_response_msg = {
        'MsgType': 'U5',
        'OpenOrdersReqID': msg.get('OpenOrdersReqID'),
        'OrdListGrp' : order_list
      }

      self.write_message( str(json.dumps(open_orders_response_msg, cls=JsonEncoder )) )
      return

    elif msg.type == 'U6': # BTC Withdraw Request
      self.user.withdraw_btc( session = self.application.session,
                              amount  = msg.get('Amount'),
                              wallet  = msg.get('Wallet') )
      return


    elif msg.type == 'U8': # BRL Withdraw Request
      self.user.withdraw_brl( session       = self.application.session,
                              amount        = msg.get('Amount'),
                              bank_number   = msg.get('BankNumber'),
                              bank_name     = msg.get('BankName'),
                              account_name  = msg.get('AccountName'),
                              account_number= msg.get('AccountNumber'),
                              account_branch= msg.get('AccountBranch'),
                              cpf_cnpj      = msg.get('CPFCNPJ'))
      return

    else:
      # invalid message - Close the connection ....
      self.close()

  def _handle_system_messages(self, msg):
    if not self.user.is_system:
      self.close()
      return False

    if msg.type == 'DEPOSIT':
      user = self.application.session.query(User).filter_by(id= msg.get('UserID') ).first()
      if user:
        deposit = user.deposit(session       = self.application.session,
                               currency      = msg.get('Currency'),
                               amount        = msg.get('Amount'),
                               origin        = msg.get('Origin'))

      result = {
        'MsgType'   : 'DEPOSIT_RESPONSE',
        'DepositId' : deposit.id
      }
      self.on_send_json_msg_to_user( sender=None, json_msg=result )

      return True

    if msg.type == 'ADMIN_SELECT':
      page      = msg.get('Page', 0)
      page_size = msg.get('PageSize', 100)
      columns   = msg.get('Columns', [])
      table     = msg.get('Table', '')

      offset    = page * page_size

      # TODO: Check all parameters to avoid an sql injection :(


      # This is definitively not secure, but this code will only run with inside a system account.
      raw_sql = 'SELECT '
      raw_sql += ','.join(columns)
      raw_sql += ' FROM ' + table
      raw_sql += ' LIMIT ' + str(page_size)
      raw_sql += ' OFFSET ' + str(offset)

      result_set = self.application.session.execute(raw_sql)
      result = {
        'MsgType' : 'ADMIN_SELECT_RESPONSE',
        'Page': page,
        'PageSize': page_size,
        'Table': table,
        'Columns': columns,
        'ResultSet': [ [ l for l in res ] for res in  result_set ]
      }

      self.on_send_json_msg_to_user( sender=None, json_msg=result )
      return True

    return  False

  def _handle_staff_messages(self, msg):
    if not self.user.is_staff:
      self.close()
      return  False
    return  False


  def on_close(self):
    pass


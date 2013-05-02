#!/usr/bin/env python

import os
import json
import  logging

from datetime import timedelta
from tornado import  websocket
import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template

from execution import  OrderMatcher, execution_report_signal
from message import  JsonMessage

from sqlalchemy.orm import scoped_session, sessionmaker
from models import  User, engine, Order, balance_signal
import config


from market_data_signals import *

import  datetime
class JsonEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, datetime.datetime):
      return obj.strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(obj, datetime.date):
      return obj.strftime('%Y-%m-%d')
    if isinstance(obj, datetime.time):
      return obj.strftime('%H:%M:%S')
    return json.JSONEncoder.default(self, obj)

class TradeConnectionWS(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(TradeConnectionWS, self).__init__(application, request, **kwargs)
    self.is_logged = 0
    self.user = None  # The authenticated user

    self.md_subscriptions = {}

  def on_execution_report(self, sender, rpt):
    self.write_message( str(rpt) )

  def on_market_data(self, sender, md):
    self.write_message( str(json.dumps(md, cls=JsonEncoder )) )

  def on_balance_update(self, sender, balance_update_msg):
    self.write_message( str(json.dumps(balance_update_msg, cls=JsonEncoder )) )


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
                                                                       self.on_market_data ) )

      elif int(msg.get('SubscriptionRequestType')) == 2: # Disable previous Snapshot + Update Request
        if req_id in self.md_subscriptions:
          del self.md_subscriptions[req_id]



      logging.info('received '  + str(msg) )
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
          'Username': self.user.username,
          'UserStatus': 3
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
      balance_signal.connect( self.on_balance_update, self.user.id  )

      # add the user to the session/
      self.application.session.add(self.user)
      self.application.session.commit()


      self.user.publish_balance_update()

      return


    elif msg.type == 'D':  # New Order Single
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


  def on_close(self):
    pass


class Application(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r'/trade',   TradeConnectionWS),
      (r"/(.*)",tornado.web.StaticFileHandler, {"path": "./static/", "default_filename":"index.html" },),
    ]
    settings = dict(
      cookie_secret=config.cookie_secret
    )
    tornado.web.Application.__init__(self, handlers, **settings)
    # Have one global connection.
    self.session = scoped_session(sessionmaker(bind=engine))

    # check BTC deposits every 5 seconds
    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(seconds=5), self.cron_check_btc_deposits)

    # Load all open orders
    orders = self.session.query(Order).filter(Order.status.in_(("0", "1"))).order_by(Order.created)
    for order in orders:
      OrderMatcher.get( order.symbol  ).match(self.session, order)

    
  def cron_check_btc_deposits(self):
    # TODO: Invoke bitcoind rpc process to check for all deposits



    # run it again 5 seconds later...
    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(seconds=5), self.cron_check_btc_deposits)




def main():
  application = Application()

  ssl_options={
    "certfile": os.path.join(os.path.dirname(__file__), "ssl/", "certificate.pem"),
    "keyfile": os.path.join(os.path.dirname(__file__), "ssl/", "privatekey.pem"),
  }
  print "starting server with " + str(ssl_options)
  
  http_server = tornado.httpserver.HTTPServer(application,ssl_options=ssl_options)
  http_server.listen(8443)



  tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
  main()

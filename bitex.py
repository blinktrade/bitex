#!/usr/bin/env python

import os
import json
import  logging

from tornado import  websocket
import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template

from execution import  OrderMatcher, execution_report_signal
from message import  PublicClientMessage, LoggedClientMessage

from sqlalchemy.orm import scoped_session, sessionmaker
from models import  User, engine, Order
import config

class PublicMarketDataConnectionWS(websocket.WebSocketHandler):
  def on_message(self, raw_message):
    msg = PublicClientMessage(raw_message)
    if not msg.is_valid():
      self.close()
      return

    # echo the message for now
    self.write_message(u"You said: " + raw_message)



class TradeConnectionWS(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(TradeConnectionWS, self).__init__(application, request, **kwargs)
    self.is_logged = 0
    self.user = None  # The authenticated user

  def on_execution_report(self, sender, rpt):
    self.write_message( str(rpt) )

  def on_message(self, raw_message):
    msg = LoggedClientMessage(raw_message)
    if not msg.is_valid():
      self.close()
      return

    if not self.is_logged:
      # The logon message must be the first message
      if msg.type  != 'A':
        self.close()
        return

      # Authenticate the user
      self.user = User.authenticate(self.application.session, msg.get('Username'),msg.get('Password'))
      if not self.user:
        # TODO: improve security.
        # Block the user accounts after 3 attempts
        # close the all connections from the blocked user
        # Block the ip for 24hs
        self.close()
        return
      self.is_logged = True

      # subscribe to all execution reports for this account.
      execution_report_signal.connect(  self.on_execution_report, self.user.account_id )

      # add the user to the session/
      self.application.session.add(self.user)
      self.application.session.commit()
      return

    if  msg.type == '1': # TestRequest
      # send the heart beat back
      self.write_message( '{"MsgType":"0", "TestReqID":"%s"}'%msg.get("TestReqID"))
      return

    elif msg.type == 'D':  # New Order Single
      # process the new order.

      print ('***************** create the order')
      order = Order( user_id          = self.user.id,
                     account_id       = self.user.account_id,
                     user             = self.user,
                     client_order_id  = msg.get('ClOrdID'),
                     symbol           = msg.get('Symbol'),
                     side             = msg.get('Side'),
                     type             = msg.get('OrdType'),
                     price            = msg.get('Price'),
                     order_qty        = msg.get('OrderQty'))

      self.application.session.add( order)
      self.application.session.commit() # just to assign an ID for the order.

      print ('***************** Order id is : ' + str( order.id) )

      OrderMatcher.get(msg.get('Symbol')).match(self.application.session, order)


      print ('***************** Match done oder_id: ' + str( order.id) )

      self.application.session.commit()
      return

  def on_close(self):
    pass


class Application(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r'/public', PublicMarketDataConnectionWS),
      (r'/trade',   TradeConnectionWS),
      (r"/(.*)",tornado.web.StaticFileHandler, {"path": "./static/", "default_filename":"test_ws.html" },),
    ]
    settings = dict(
      cookie_secret=config.cookie_secret
    )
    tornado.web.Application.__init__(self, handlers, **settings)
    # Have one global connection.
    self.session = scoped_session(sessionmaker(bind=engine))


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

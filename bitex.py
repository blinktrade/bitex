import os
import json

from tornado import  websocket
import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template

from users import authenticate
from message import  PublicClientMessage, LoggedClientMessage
from orders import  process_new_order_single

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
    self.client_id = None

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
      self.client_id = authenticate(msg.get('Username'),msg.get('Password'))
      if not self.client_id:
        self.close()
        return

      self.is_logged = True


    if msg.type == '0':  # Heartbeat
      # echo the heartbeat back
      self.write( raw_message )
      return

    elif msg.type == 'D':  # New Order Single
      # process the new order.
      order = process_new_order_single( self.client_id,
                                        msg.get('ClOrdID'),
                                        msg.get('Symbol'),
                                        msg.get('Side'),
                                        msg.get('OrdType'),
                                        msg.get('Price'),
                                        msg.get('OrderQty'))


      # TODO: send an execution report to the user

      return


    self.write_message(u"You said: " + raw_message)

  def on_close(self):
    pass



def main():
  application = tornado.web.Application([
    (r'/public', PublicMarketDataConnectionWS),
    (r'/trade',   TradeConnectionWS),

    (r"/(.*)",tornado.web.StaticFileHandler, {"path": "./static/", "default_filename":"test_ws.html" },),
  ])

  ssl_options={
    "certfile": os.path.join(os.path.dirname(__file__), "ssl/", "certificate.pem"),
    "keyfile": os.path.join(os.path.dirname(__file__), "ssl/", "privatekey.pem"),
  }
  print "starting server with " + str(ssl_options)

  http_server = tornado.httpserver.HTTPServer(application,ssl_options=ssl_options)
  http_server.listen(5000)
  tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
  main()

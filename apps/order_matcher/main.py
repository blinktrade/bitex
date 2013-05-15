#!/usr/bin/env python

import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from datetime import timedelta

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template
from tornado.options import define, options

define("port", default=8443, help="port" )
define("db_echo", default=False, help="Prints every database command on the stdout" )
define("db_engine", default="sqlite:///" + os.path.join(ROOT_PATH, "db/", "bitex.sqlite"), help="SQLAlchemy database engine string")
define("ws_url", default="wss://www.bitex.com.br:8443/trade", help="Websocket trade host")
define("certfile",default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_certificate.pem") , help="Certificate file" )
define("keyfile", default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_privatekey.pem") , help="Private key file" )

tornado.options.parse_config_file(os.path.join(ROOT_PATH, "config/", "order_match.conf"))
tornado.options.parse_command_line()


from sqlalchemy.orm import scoped_session, sessionmaker

from order_matcher import config
from order_matcher.models import   engine, Order
from order_matcher.execution import  OrderMatcher
from order_matcher.views import OrderMatcherHandler

class AdminHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))
    self.write( loader.load("admin.html").generate( ws_url=options.ws_url  ) )

class BitExHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))
    self.write( loader.load("bitex.html").generate(ws_url=options.ws_url) )


class OrderMatcherApplication(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r'/trade', OrderMatcherHandler),
      (r'/admin/.*', AdminHandler),

      (r"/images/(.*)",  tornado.web.StaticFileHandler, {"path": os.path.join(ROOT_PATH, 'static/images') }),
      (r"/css/(.*)",  tornado.web.StaticFileHandler, {"path": os.path.join(ROOT_PATH, 'static/css') }),
      (r"/js/(.*)",  tornado.web.StaticFileHandler, {"path": os.path.join(ROOT_PATH, 'static/js') }),

      (r'/.*', BitExHandler)
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

  print 'port', options.port
  print 'ws_url', options.ws_url
  print 'db_echo', options.db_echo
  print 'db_engine', options.db_engine
  print 'certfile', options.certfile
  print 'keyfile', options.keyfile


  application = OrderMatcherApplication()

  ssl_options={
    "certfile": options.certfile,
    "keyfile": options.keyfile,
  }
  http_server = tornado.httpserver.HTTPServer(application,ssl_options=ssl_options)
  http_server.listen(options.port)

  tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
  main()

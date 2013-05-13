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

from sqlalchemy.orm import scoped_session, sessionmaker

from order_matcher import config
from order_matcher.models import   engine, Order
from order_matcher.execution import  OrderMatcher
from order_matcher.views import OrderMatcherHandler

class AdminHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))
    self.write( loader.load("admin.html").generate() )

class BitExHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))
    self.write( loader.load("bitex.html").generate() )


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
  application = OrderMatcherApplication()

  ssl_options={
    "certfile": os.path.join(ROOT_PATH, "ssl/", "order_matcher_certificate.pem"),
    "keyfile": os.path.join(ROOT_PATH, "ssl/", "order_matcher_privatekey.pem"),
  }
  http_server = tornado.httpserver.HTTPServer(application,ssl_options=ssl_options)
  http_server.listen(8443)

  tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
  main()

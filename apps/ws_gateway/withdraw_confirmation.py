__author__ = 'rodrigo'

import os
import sys

import tornado.ioloop
import tornado.web
import tornado.httpclient

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

class WithdrawConfirmationHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))

    token = self.get_argument("token", default="", strip=False)
    self.write( loader.load("withdraw_confirmation.html").generate( token=token ) )

  def post(self, *args, **kwargs):
    token = self.get_argument("token", default="", strip=False)

    withdraw_request_message = self.application.application_trade_client.sendString(
      '{"MsgType":"U24", "Token":' + str(token) + '}' )


class WithdrawConfirmedHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))

    token = self.get_argument("token", default="", strip=False)
    self.write( loader.load("withdraw_confirmed.html").generate( token=token ) )

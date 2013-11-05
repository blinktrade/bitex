__author__ = 'rodrigo'

import os
import sys

import tornado.ioloop
import tornado.web
import tornado.httpclient

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

class AccountVerificationHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    loader = tornado.template.Loader(os.path.join(ROOT_PATH, 'static'))

    user_id = self.get_argument("user_id", default="-1", strip=False)
    username = self.get_argument("username", default="", strip=False)
    self.write( loader.load("account_verification.html").generate( user_id=user_id, username=username ) )

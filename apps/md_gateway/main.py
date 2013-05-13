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

from md_gateway import  config

class MdGatewayApplication(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r'/trade', MdGatewayHandler)
      ]
    settings = dict(
      cookie_secret=config.cookie_secret
    )
    tornado.web.Application.__init__(self, handlers, **settings)


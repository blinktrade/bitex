#!/usr/bin/env python

#  Copyright (c) 2013 Bitex
#
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.


import os
import sys
import  logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

import  base64

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template
from tornado.options import define, options

from tornado import  websocket

import zmq
from zmq.eventloop.zmqstream import  ZMQStream


define("port", default=8443, help="port" )
define("certfile",default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_certificate.pem") , help="Certificate file" )
define("keyfile", default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_privatekey.pem") , help="Private key file" )
define("ws_gateway_log", default=os.path.join(ROOT_PATH, "logs/", "ws_gateway_log.log"), help="logging" )

define("zmq_trade", default="tcp://127.0.0.1:5555", help="trade zmq queue" )


tornado.options.parse_config_file(os.path.join(ROOT_PATH, "config/", "ws_gateway.conf"))
tornado.options.parse_command_line()

class WebSocketHandler(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(WebSocketHandler, self).__init__(application, request, **kwargs)

    self.connection_id = base64.b32encode(os.urandom(10))

    self.application.replay_log.info('CREATED,' + self.connection_id)

  def open(self):
    self.application.replay_log.info('CONNECTED,' + self.connection_id)
    self.application.on_client_open( self.connection_id, self)

  def on_message(self, raw_message):
    self.application.replay_log.info('IN,' + self.connection_id + ',' + raw_message)
    self.application.on_client_message(self, raw_message)

  def on_close(self):
    self.application.replay_log.info('DISCONNECTED,' + self.connection_id)
    self.application.on_client_close( self)

class WebSocketGatewayApplication(tornado.web.Application):
  def __init__(self, opt):
    handlers = [
      (r'/', WebSocketHandler)
    ]
    settings = dict(
      cookie_secret='cookie_secret'
    )
    tornado.web.Application.__init__(self, handlers, **settings)

    self.replay_log = logging.getLogger("REPLAY")

    self.zmq_context = zmq.Context()

    self.trade_socket = self.zmq_context.socket(zmq.REQ)
    self.trade_socket.connect(opt.zmq_trade)

    self.connections = {}

  def close_client_connection(self, ws_client):
    del self.connections[ws_client.connection_id]
    ws_client.close()

  def on_client_open(self, connection_id, ws_client):
    self.connections[connection_id] = ws_client
    self.trade_socket.send( "OPN," + connection_id  )

    response_message = self.trade_socket.recv()
    opt_code    = response_message[:3]
    raw_message = response_message[4:]

    if opt_code != 'OPN':
      if opt_code == 'ERR':
        ws_client.write_message(raw_message)
      self.close_client_connection(ws_client)
      return

    ws_client.write_message(raw_message)

  def on_client_close(self, ws_client):
    if ws_client.connection_id in self.connections:
      del self.connections[ws_client.connection_id]
      self.trade_socket.send( "CLS," + ws_client.connection_id  )
      response_message = self.trade_socket.recv()

  def on_client_message(self, ws_client, raw_message):
    self.trade_socket.send_unicode( "REQ," +  ws_client.connection_id + ',' + raw_message  )
    response_message = self.trade_socket.recv()
    opt_code    = response_message[:3]
    raw_message = response_message[4:]

    if opt_code != 'REP':
      if raw_message:
        ws_client.write_message(raw_message)
      self.close_client_connection(ws_client)
      return

    ws_client.write_message(raw_message)


def main():
  print 'port', options.port
  print 'certfile', options.certfile
  print 'keyfile', options.keyfile
  print 'zmq_trade', options.zmq_trade
  print 'order_matcher_log', options.ws_gateway_log

  input_log_file_handler = logging.handlers.TimedRotatingFileHandler( options.ws_gateway_log, when='MIDNIGHT')
  formatter = logging.Formatter('%(asctime)s - %(message)s')
  input_log_file_handler.setFormatter(formatter)

  replay_logger = logging.getLogger("REPLAY")
  replay_logger.setLevel(logging.INFO)
  replay_logger.addHandler(input_log_file_handler)

  replay_logger.info('START')
  replay_logger.info('PARAM,BEGIN')
  replay_logger.info('PARAM,port,' + str(options.port))
  replay_logger.info('PARAM,certfile,' + str(options.certfile))
  replay_logger.info('PARAM,keyfile,' + str(options.keyfile))
  replay_logger.info('PARAM,zmq_trade,' + str(options.zmq_trade))
  replay_logger.info('PARAM,ws_gateway_log,' + str(options.ws_gateway_log))
  replay_logger.info('PARAM,END')

  from zmq.eventloop import ioloop
  ioloop.install()

  application = WebSocketGatewayApplication(options)

  ssl_options={
    "certfile": options.certfile,
    "keyfile" : options.keyfile,
  }

  server = tornado.httpserver.HTTPServer(application,ssl_options=ssl_options)
  server.listen(options.port)




  tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
  main()

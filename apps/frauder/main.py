#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import traceback
import argparse
import ConfigParser
from appdirs import site_config_dir

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert(0, os.path.join( os.path.dirname(__file__), '../' ) )

import time
from util import send_email

from pyblinktrade.message_builder import MessageBuilder
from pyblinktrade.message import JsonMessage
from pyblinktrade.project_options import ProjectOptions

import logging, logging.handlers

import json
import zmq

from trade.zmq_client  import TradeClient, TradeClientException

def convertCamelCase2Underscore(name):
  import re
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def run_application(options, instance_name):
  input_log_file_handler = logging.handlers.TimedRotatingFileHandler(
    os.path.expanduser(options.mailer_log), when='MIDNIGHT')
  input_log_file_handler.setFormatter(logging.Formatter(u"%(asctime)s - %(message)s"))

  app_logger = logging.getLogger(instance_name)
  app_logger.setLevel(logging.INFO)
  app_logger.addHandler(input_log_file_handler)

  ch = logging.StreamHandler(sys.stdout)
  ch.setLevel(logging.DEBUG)
  ch.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
  app_logger.addHandler(ch)

  app_logger.info('START')
  def log(command, key, value=None):
    log_msg = u'%s, %s, %s' %(command, key, value if value else None)
    app_logger.info(unicode(log_msg))


  log('PARAM', 'BEGIN')
  log('PARAM', 'trade_in',                      options.trade_in)
  log('PARAM', 'trade_pub',                     options.trade_pub)
  log('PARAM', 'app_log',                       options.app_log)
  log('PARAM', 'maxmind_license_key',           options.maxmind_license_key)
  log('PARAM', 'END')

  context = zmq.Context()
  socket = context.socket(zmq.SUB)
  socket.connect(options.trade_pub)
  socket.setsockopt(zmq.SUBSCRIBE, "^FRAUDER$")

  trade_in_socket = context.socket(zmq.REQ)
  trade_in_socket.connect(options.trade_in)

  application_trade_client = TradeClient( context, trade_in_socket)
  application_trade_client.connect()

  login_response = application_trade_client.sendJSON( MessageBuilder.login( 8999999,
                                                                            options.frauder_username,
                                                                            options.frauder_password))
  if login_response.get('UserStatus') != 1:
    raise RuntimeError("Invalid user id")

  brokers = {}
  broker_list, broker_list_columns = application_trade_client.getBrokerList(['1'])
  for b in  broker_list:
    brokers[b[0]] = { "params": b }


  while True:
    try:
      raw_email_message = socket.recv()
      log('IN', 'TRADE_IN_PUB', raw_email_message)

      msg = JsonMessage(raw_email_message)

      if not msg.isAccessLog():
        continue

      try:
        broker_id = msg.get('BrokerID')

      except Exception as ex:
        traceback.print_exc()
        log('ERROR', 'EXCEPTION', str(ex))
        time.sleep(1)

    except KeyboardInterrupt:
      app_logger.info('END')
      break

    except Exception as ex:
      time.sleep(1)


def main():
  parser = argparse.ArgumentParser(description="Blinktrade Fraud application")
  parser.add_argument('-i', "--instance", action="store", dest="instance", help='Instance name', type=str)
  parser.add_argument('-c', "--config",
                      action="store",
                      dest="config",
                      default=os.path.expanduser('~/.blinktrade/bitex.ini'),
                      help='Configuration file', type=str)
  arguments = parser.parse_args()

  if not arguments.instance:
    parser.print_help()
    return

  candidates = [ os.path.join(site_config_dir('blinktrade'), 'bitex.ini'),
                 os.path.expanduser('~/.blinktrade/bitex.ini'),
                 arguments.config]
  config = ConfigParser.SafeConfigParser()
  config.read( candidates )

  options = ProjectOptions(config, arguments.instance)

  if not options.maxmind_license_key or\
     not options.trade_in or\
     not options.frauder_username or\
     not options.frauder_password or\
     not options.trade_pub or \
     not options.app_log :
    raise RuntimeError("Invalid configuration file")

  run_application(options, arguments.instance)


if __name__ == '__main__':
  main()

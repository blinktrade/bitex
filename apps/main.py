#!/usr/bin/env python

import sys
import os
import ConfigParser
import json
import multiprocessing
from functools import partial
import  time
import logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from pyblinktrade.project_options import ProjectOptions


def trade_instance(instance_name, project_options):
  print instance_name
  from trade.trade_application import  TradeApplication
  app = TradeApplication.instance()
  app.initialize(project_options)
  app.run()


def ws_gateway_instance( instance_name , project_options):
  print instance_name
  from ws_gateway.main import run_application
  run_application(project_options)

def mailer_instance( instance_name , project_options):
  print instance_name
  from mailer.main import run_application
  run_application(project_options)

def api_receive_instance( instance_name , project_options):
  print instance_name
  time.sleep(20)

def main():
  candidates = [ os.path.join(ROOT_PATH, 'config/bitex.ini'), os.path.expanduser('~/.bitex/bitex.ini') ]
  config = ConfigParser.SafeConfigParser()
  config.read( candidates )

  processes = []
  for section_name in config.sections():
    project_options = ProjectOptions(config, section_name)
    if section_name[:5] == 'trade':
      p = multiprocessing.Process(name=section_name, target=partial(trade_instance,section_name, project_options )  )
    elif section_name[:10] == 'ws_gateway':
      p = multiprocessing.Process(name=section_name, target=partial(ws_gateway_instance,section_name, project_options )  )
    elif section_name[:6] == 'mailer':
      p = multiprocessing.Process(name=section_name, target=partial(mailer_instance,section_name, project_options )  )
    elif section_name[:11] == 'api_receive':
      p = multiprocessing.Process(name=section_name, target=partial(api_receive_instance,section_name, project_options )  )
    else:
      raise RuntimeError("Invalid section name")
    processes.append(p)

  # start all sub processes
  for p in  processes:
    p.daemon  = True
    p.start()

  # wait for them to finish
  for p in processes:
    logging.debug('waiting %s', p.name )
    p.join()


if __name__ == '__main__':
  main()

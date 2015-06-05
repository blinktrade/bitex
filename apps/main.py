#!/usr/bin/env python

import sys
import os
import ConfigParser
import json
import multiprocessing
import time
import logging
import argparse
from appdirs import site_config_dir
from functools import partial

from Queue import Queue
from threading import Thread


ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert(0, os.path.join(ROOT_PATH, 'apps'))

from pyblinktrade.project_options import ProjectOptions


def trade_instance(instance_name, project_options):
  from trade.trade_application import TradeApplication
  app = TradeApplication.instance()
  app.initialize(project_options, instance_name)
  app.run()


def ws_gateway_instance(instance_name, project_options):
  from ws_gateway.main import run_application
  run_application(project_options, instance_name)

def mailer_instance(instance_name, project_options):
  from mailer.main import run_application
  run_application(project_options, instance_name)


def main():
  parser = argparse.ArgumentParser(description="Blinktrade")
  parser.add_argument('-c',
                      "--config",
                      action="store",
                      dest="config",
                      help='Configuration file', type=str)
  arguments = parser.parse_args()


  candidates = [ os.path.join(site_config_dir('blinktrade'), 'bitex.ini'),
                 os.path.expanduser('~/.blinktrade/bitex.ini'),
                 arguments.config ]

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
    else:
      raise RuntimeError("Invalid section name")
    processes.append(p)

  # start all sub processes
  for p in processes:
    p.daemon = True
    p.start()

  # wait for them to finish
  for p in processes:
    logging.debug('waiting %s', p.name )
    p.join()


if __name__ == '__main__':
  main()

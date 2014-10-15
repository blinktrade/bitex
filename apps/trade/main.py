#!/usr/bin/env python
import os
import sys
import ConfigParser
import argparse
from appdirs import site_config_dir

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from pyblinktrade.project_options import ProjectOptions
from trade_application import TradeApplication

def main():
  parser = argparse.ArgumentParser(description="Blinktrade Trade application")
  parser.add_argument('-i', "--instance",
                      action="store",
                      dest="instance",
                      help='Instance name',
                      type=str)
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

  if not options.trade_in or \
     not options.trade_pub or \
     not options.trade_log or \
     not options.global_email_language or \
     not options.sqlalchemy_connection_string or \
     not options.sqlalchemy_engine:
    raise RuntimeError("Invalid configuration file")

  application = TradeApplication.instance()
  application.initialize(options, arguments.instance)
  application.run()

if __name__ == "__main__":
  main()

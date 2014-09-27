#!/usr/bin/env python
import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from tornado.options import define, options
import tornado

define("port", type=int  ,help="port")
define("log", help="logging" )
define("db_echo", default=False,help="Prints every database command on the stdout" )
define("db_engine",  help="SQLAlchemy database engine string")
define("config", help="config file", callback=lambda path: tornado.options.parse_config_file(path, final=False))
define("rpc_url",  help="Bitcoind rpc url")
define("rpc_username",  help="Bitcoind rpc username")
define("rpc_password",  help="Bitcoind rpc password")

from api_receive_application import ApiReceiveApplication

def main():
  tornado.options.parse_command_line()
  if not options.log or \
     not options.port or \
     not options.rpc_url or \
     not options.rpc_username or\
     not options.rpc_password or\
     not options.db_engine:
    tornado.options.print_help()
    return

  application = ApiReceiveApplication()
  application.listen(options.port)

  try:
    tornado.ioloop.IOLoop.instance().start()
  except KeyboardInterrupt:
    application.clean_up()

if __name__ == "__main__":
  main()

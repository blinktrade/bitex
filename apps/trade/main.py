import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))


from tornado.options import define, options
import tornado

define("trade_in", help="zmq input queue")
define("trade_pub",help="zmq publisher queue")
define("trade_log", help="logging" )
define("session_timeout_limit", type=int, help="Session timeout")
define("db_echo", default=False,help="Prints every database command on the stdout" )
define("db_engine",  help="SQLAlchemy database engine string")
define("test_mode", default=False, help="Test mode")
define("satoshi_mode", default=False, help="Satoshi mode")
define("dev_mode", default=False, help="Dev mode")
define("config", help="config file", callback=lambda path: tornado.options.parse_config_file(path, final=False))

from trade_application import application

def main():
  tornado.options.parse_command_line()
  if not options.trade_in or \
     not options.trade_pub or \
     not options.trade_log or \
     not options.db_engine:
    tornado.options.print_help()
    return

  application.initialize()
  application.run()

if __name__ == "__main__":
  main()

import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))


from tornado.options import define
import tornado

define("trade_in", default="tcp://127.0.0.1:5755", help="zmq input queue")
define("trade_pub", default="tcp://127.0.0.1:5756", help="zmq publisher queue")
define("trade_log", default=os.path.join(ROOT_PATH, "logs/", "trade.log"), help="logging" )
define("session_timeout_limit", default=0, help="Session timeout")
define("db_echo", default=False, help="Prints every database command on the stdout" )
define("db_engine", default="sqlite:///" + os.path.join(ROOT_PATH, "db/", "bitex.sqlite"), help="SQLAlchemy database engine string")

tornado.options.parse_config_file(os.path.join(ROOT_PATH, "config/", "trade.conf"))
tornado.options.parse_command_line()

from trade_application import application

def main():
  application.initialize()
  application.run()

if __name__ == "__main__":
  main()

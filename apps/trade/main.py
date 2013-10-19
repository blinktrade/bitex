import os
import sys
import  logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from tornado.options import define, options
import tornado
import zmq

from bitex.message import JsonMessage


define("trade_in", default="tcp://127.0.0.1:5555", help="port")
define("trade_log", default=os.path.join(ROOT_PATH, "logs/", "trade.log"), help="logging" )
define("session_timeout_limit", default=300, help="Session timeout")
define("db_echo", default=False, help="Prints every database command on the stdout" )
define("db_engine", default="sqlite:///" + os.path.join(ROOT_PATH, "db/", "bitex.sqlite"), help="SQLAlchemy database engine string")

tornado.options.parse_config_file(os.path.join(ROOT_PATH, "config/", "trade.conf"))
tornado.options.parse_command_line()

from sqlalchemy.orm import scoped_session, sessionmaker

from models import engine, Order, User, BoletoOptions, Boleto
from session_manager import SessionManager
from trade.exceptions import *



def main():
  print 'trade_in', options.trade_in
  print 'trade_log', options.trade_log

  input_log_file_handler = logging.handlers.TimedRotatingFileHandler( options.trade_log, when='MIDNIGHT')
  formatter = logging.Formatter('%(asctime)s - %(message)s')
  input_log_file_handler.setFormatter(formatter)

  replay_logger = logging.getLogger("REPLAY")
  replay_logger.setLevel(logging.INFO)
  replay_logger.addHandler(input_log_file_handler)

  replay_logger.info('START')
  replay_logger.info('PARAM,BEGIN')
  replay_logger.info('PARAM,trade_in,' + str(options.trade_in))
  replay_logger.info('PARAM,trade_log,' + str(options.trade_log))
  replay_logger.info('PARAM,session_timeout_limit,' + str(options.session_timeout_limit))
  replay_logger.info('PARAM,db_echo,' + str(options.db_echo))
  replay_logger.info('PARAM,db_engine,' + str(options.db_engine))
  replay_logger.info('PARAM,END')


  db_session = scoped_session(sessionmaker(bind=engine))


  # log all users on the replay log
  users = db_session.query(User)
  for user in users:
    replay_logger.info('DB_ENTITY,' + str(user))

  boleto_options = db_session.query(BoletoOptions)
  for boleto in boleto_options:
    replay_logger.info('DB_ENTITY,' + str(boleto))


  orders = db_session.query(Order).filter(Order.status.in_(("0", "1"))).order_by(Order.created)
  for order in orders:
    replay_logger.info('DB_ENTITY,' + str(order))
    #OrderMatcher.get( order.symbol  ).match(self.session, order)


  context = zmq.Context()
  socket = context.socket(zmq.REP)
  socket.bind(options.trade_in)

  session_manager = SessionManager(db_session, timeout_limit=options.session_timeout_limit)

  while True:
    raw_message = socket.recv()

    op_code                 = raw_message[:3]
    session_id              = raw_message[4:20]
    json_raw_message        = raw_message[21:].strip()

    try:
      msg = None
      if json_raw_message:
        msg = JsonMessage(json_raw_message)
        if not msg.is_valid():
          replay_logger.info('IN,' + raw_message)
          raise InvalidMessageError()
        else:
          # never write passwords in the log file
          if msg.has('Password'):
            raw_message = raw_message.replace(msg.get('Password'), '*')
          if msg.has('NewPassword'):
            raw_message = raw_message.replace(msg.get('NewPassword'), '*')

      replay_logger.info('IN,' + raw_message )

      response_message = session_manager.process_message( op_code, session_id, msg )

    except TradeRuntimeError, e:
      session_manager.close_session(session_id)
      response_message = 'ERR,{"MsgType":"ERROR", "Description":"' + e.error_description + '", "Detail": ""}'

    except Exception,e:
      session_manager.close_session(session_id)
      response_message = 'ERR,{"MsgType":"ERROR", "Description":"Unknow error", "Detail": "'  + str(e) + '"}'

      # echo the message
    replay_logger.info('OUT,' + response_message )
    socket.send_unicode(response_message)


if __name__ == "__main__":
  main()

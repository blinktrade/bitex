import os
import sys
import  logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from tornado.options import define, options
import tornado
import zmq

import datetime
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

def login_required(func):
  def decorator(session_manager,*args, **kwargs):
    if not session_manager.is_logged:
      return session_manager.close_session( session_manager.current_session_id )
    return func(session_manager, *args, **kwargs)
  return decorator

class SessionManager(object):
  def __init__(self, db_session, timeout_limit = 300 ):
    self.db_session = db_session
    self.sessions = {}
    self.timeout_limit = timeout_limit
    self.is_logged = False
    self.current_session_id = None

  def open_session(self, session_id):
    if session_id in self.sessions:
      return 'CLS,' + session_id

    self.sessions[session_id] = [0, datetime.datetime.now()]
    return 'OPN,' + session_id

  def close_session(self, session_id):
    if session_id not in self.sessions:
      return 'CLS,' + session_id
    del self.sessions[session_id]
    return 'CLS,' + session_id

  def process_message(self, raw_message):
    op_code                 = raw_message[:3]
    session_id              = raw_message[4:20]
    json_raw_message        = raw_message[21:]
    self.current_session_id = session_id

    if op_code == 'OPN':
      return self.open_session(session_id)

    elif op_code == 'CLS':
      return self.close_session(session_id)

    # wrong opt_code
    if op_code != 'REQ':
      return self.close_session(session_id)

    # wrong session id
    if session_id not in self.sessions:
      return self.close_session(session_id)

    # Check if the session is expired
    session_time = self.sessions[session_id][1]
    if datetime.timedelta(seconds=self.timeout_limit) + session_time < datetime.datetime.now():
      return self.close_session(session_id)

    self.sessions[session_id][0] += 1  # increment the number of received messages
    self.sessions[session_id][1] = datetime.datetime.now() # update session time, so we can timeout old sessions.

    msg = JsonMessage(json_raw_message)
    if not msg.is_valid():
      return  self.close_session(session_id)

    if  msg.type == '1': # TestRequest
      return self.processTestRequest(msg)

    elif msg.type == 'BE': # login
      return self.processLogin(msg)

    elif msg.type == 'D':  # New Order Single
      return self.processNewOrderSingle(msg)

    elif  msg.type == 'F' : # Cancel Order Request
      return self.processCancelOrderRequest(msg)

    elif msg.type == 'U0': # signup
      return self.processSignup(msg)

    elif msg.type == 'U2': # Request for Balances
      return self.processRequestForBalances(msg)

    elif msg.type == 'U4': # Request for Open Orders
      return self.processRequestForOpenOrders(msg)

    elif msg.type == 'U6': # BTC Withdraw Request
      return self.processBTCWithdrawRequest(msg)

    elif msg.type == 'U8': # BRL Withdraw Request
      return self.processBRLWithdrawRequest(msg)

    elif msg.type == 'U10': # Request password request
      return self.processRequestPasswordRequest(msg)

    elif msg.type == 'U12': # Password request
      return self.processPasswordRequest(msg)

    elif msg.type == 'U16':  #Enable Disable Two Factor Authentication
      return self.processEnableDisableTwoFactorAuth(msg)

    elif msg.type == 'U18': #Generate Boleto
      return self.processGenerateBoleto(msg)


    return self.close_session(session_id)


  def processTestRequest(self, msg):
    return 'REP,{"MsgType":"0", "TestReqID":"%s"}'%int(msg.get("TestReqID"))

  def processLogin(self, msg):
    pass

  @login_required
  def processNewOrderSingle(self, msg):
    pass

  @login_required
  def processCancelOrderRequest(self, msg):
    pass

  @login_required
  def processSignup(self, msg):
    pass

  @login_required
  def processRequestForBalances(self, msg):
    pass

  @login_required
  def processRequestForOpenOrders(self, msg):
    pass

  @login_required
  def processBTCWithdrawRequest(self, msg):
    pass

  @login_required
  def processBRLWithdrawRequest(self, msg):
    pass

  def processRequestPasswordRequest(self, msg):
    pass

  def processPasswordRequest(self, msg):
    pass

  @login_required
  def processEnableDisableTwoFactorAuth(self, msg):
    pass

  @login_required
  def processGenerateBoleto(self, msg):
    pass

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
    replay_logger.info('IN,' + raw_message)

    try:
      response_message = str(session_manager.process_message(raw_message))
    except Exception,e:
      response_message = 'ERR, {"MsgType":"ERROR", "Technical": "'  + str(e) + '"}'

      # echo the message
    socket.send(response_message)


if __name__ == "__main__":
  main()

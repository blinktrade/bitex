import datetime

from trade.exceptions import *

from trade.session import  Session

class SessionManager(object):
  def __init__(self, db_session, timeout_limit = 300 ):
    self.db_session = db_session
    self.sessions = {}
    self.timeout_limit = timeout_limit

  def open_session(self, session_id):
    if session_id in self.sessions:
      return 'CLS,' + session_id

    self.sessions[session_id] = [0, datetime.datetime.now(), Session( session_id, self.db_session )  ]
    return 'OPN,' + session_id

  def close_session(self, session_id):
    if session_id not in self.sessions:
      return 'CLS,' + session_id
    del self.sessions[session_id]
    return 'CLS,' + session_id

  def process_message(self, op_code, session_id, msg):
    if op_code == 'OPN':
      return self.open_session(session_id)

    elif op_code == 'CLS':
      return self.close_session(session_id)

    # wrong opt_code
    if op_code != 'REQ':
      self.close_session(session_id)
      raise InvalidOptCodeError()

    # wrong session id
    if session_id not in self.sessions:
      self.close_session(session_id)
      raise InvalidSessionError()


    # Check if the session is expired
    session_time = self.sessions[session_id][1]
    if datetime.timedelta(seconds=self.timeout_limit) + session_time < datetime.datetime.now():
      raise SessionTimeoutError()

    self.sessions[session_id][0] += 1  # increment the number of received messages
    self.sessions[session_id][1] = datetime.datetime.now() # update session time, so we can timeout old sessions.

    if not msg:
      raise InvalidMessageError()

    session = self.sessions[session_id][2]
    response = session.process_message(msg)

    if session.should_end:
      self.close_session(session_id)
      return 'CLS,' + response

    return 'REP,' + response


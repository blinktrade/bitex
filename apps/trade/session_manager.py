import datetime


from session import  Session
from errors import *

class SessionManager(object):
  def __init__(self, timeout_limit=0):
    self.sessions = {}
    self.timeout_limit = timeout_limit

    self.publish_queue = []

  def open_session(self, session_id, msg):
    if session_id in self.sessions:
      return 'CLS,' + session_id

    remote_ip = None
    client_version = None
    if msg:
      remote_ip       = msg.get('RemoteIp', None)
      client_version  = msg.get('ClientVersion', None)

    self.sessions[session_id] = [0, datetime.datetime.now(), Session( session_id, remote_ip, client_version )  ]
    return 'OPN,' + session_id

  def close_session(self, session_id):
    if session_id not in self.sessions:
      return 'CLS,' + session_id
    del self.sessions[session_id]
    return 'CLS,' + session_id

  def process_message(self, msg_header, session_id, msg):
    if msg_header == 'OPN':
      return self.open_session(session_id, msg)

    elif msg_header == 'CLS':
      return self.close_session(session_id)

    # wrong opt_code
    if msg_header != 'REQ':
      self.close_session(session_id)
      raise InvalidOptCodeError()

    # wrong session id
    if session_id not in self.sessions:
      self.close_session(session_id)
      raise InvalidSessionError()


    # Check if the session is expired
    session_time = self.sessions[session_id][1]
    if self.timeout_limit:
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


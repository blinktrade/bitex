from errors import *

def login_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None :
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

def staff_user_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None or session.user.is_staff == False:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

def broker_user_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None or session.user.is_broker == False:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

def system_user_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None or session.user.is_system == False:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

def verified_user_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None or session.user.verified < 2:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator



def verify_permission(func):
  def decorator(session, msg):
    if '*' in session.permission_list:
      return func(session, msg)

    msg_type = msg['MsgType']
    if msg_type not in session.permission_list:
      raise NotAuthorizedError()

    msg_permission_filter_list = session.permission_list[msg_type]
    for permission_filter in msg_permission_filter_list:
      field = permission_filter[0]
      operator = permission_filter[1]
      value = permission_filter[2]
      if operator == 'eq':
        if field not in msg:
          raise NotAuthorizedError()
        if msg[field] != value:
          raise NotAuthorizedError()
      elif operator == 'in':
        if field in msg:
          if msg[field] in value:
            raise NotAuthorizedError()
      elif operator == 'ne':
        if field in msg:
          if msg[field] == value:
            raise NotAuthorizedError()
      elif operator == 'gt':
        if field not in msg:
          raise NotAuthorizedError()
        if msg[field] <= value:
          raise NotAuthorizedError()
      elif operator == 'ge':
        if field not in msg:
          raise NotAuthorizedError()
        if msg[field] < value:
          raise NotAuthorizedError()
      elif operator == 'lt':
        if field not in msg:
          raise NotAuthorizedError()
        if msg[field] >= value:
          raise NotAuthorizedError()
      elif operator == 'le':
        if field not in msg:
          raise NotAuthorizedError()
        if msg[field] > value:
          raise NotAuthorizedError()

    return func(session, msg)
  return decorator

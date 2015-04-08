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

    if msg.type not in session.permission_list:
      raise NotAuthorizedError()


    msg_permission_filter_list = session.permission_list[msg.type]
    if not msg_permission_filter_list:
      return func(session, msg)

    def pass_filter(msg, field, operator, value):
      if operator == 'eq':
        if not msg.has(field):
          return False
        if msg.get(field) != value:
          return False
      elif operator == 'in':
        if not msg.has(field):
          return False
        if msg.get(field) not in value:
          return False
      elif operator == 'ne':
        if msg.has(field):
          if msg.get(field) == value:
            return False
      elif operator == 'gt':
        if not msg.has(field):
          return False
        if msg.get(field) <= value:
          return False
      elif operator == 'ge':
        if not msg.has(field):
          return False
        if msg.get(field) < value:
          return False
      elif operator == 'lt':
        if not msg.has(field):
          return False
        if msg.get(field) >= value:
          return False
      elif operator == 'le':
        if not msg.has(field):
          return False
        if msg.get(field) > value:
          return False
      return True


    passed_one_of_the_filters = False
    for permission_filter in msg_permission_filter_list:
      passed_on_all_the_filters = True
      for x in xrange(0, len(permission_filter), 3):
        field = permission_filter[x+0]
        operator = permission_filter[x+1]
        value = permission_filter[x+2]

        if not pass_filter(msg, field, operator, value):
          passed_on_all_the_filters = False
          break

      if not passed_on_all_the_filters:
        continue

      passed_one_of_the_filters = True
      break

    if not passed_one_of_the_filters:
      raise NotAuthorizedError

    return func(session, msg)
  return decorator

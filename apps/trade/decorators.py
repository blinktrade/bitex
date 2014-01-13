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

def system_user_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None or session.user.is_system == False:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

def verified_user_required(func):
  def decorator(session,*args, **kwargs):
    if session.user is None or session.user.verified == False:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

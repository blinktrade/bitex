from trade.exceptions import *

def login_required(func):
  def decorator(session,*args, **kwargs):
    if not session.is_logged:
      raise NotAuthorizedError()
    return func(session, *args, **kwargs)
  return decorator

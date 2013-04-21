__author__ = 'rodrigo'

class User(object):
  def __init__(self):
    self.id         = None
    self.account_id = None

  def get_account_id(self):
    return self.account_id


def authenticate(user, password):
  # TODO: Authenticate the user
  user = User()
  user.id = 1
  user.account_id = 1

  # return the User ID
  return user


def has_margin( user_id, order ):
  return True

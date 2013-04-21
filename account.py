__author__ = 'rodrigo'

class Account(object):
  def __init__(self):
    self.balance_brl = 0
    self.balance_btc = 0

  @staticmethod
  def get_by_id(id):

    # TODO: get the account data from database.
    acct = Account()
    acct.balance_brl = 10000
    acct.balance_btc = 10

    return acct


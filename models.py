__author__ = 'rodrigo'
from utils import smart_str
import hashlib

import datetime

from errors import OrderNotFound


from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import  relationship, backref

engine = create_engine('sqlite:///bitex.sqlite', echo=False)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


def get_hexdigest(algorithm, salt, raw_password):
  """
  Returns a string of the hexdigest of the given plaintext password and salt
  using the given algorithm ('md5', 'sha1' or 'crypt').
  """
  raw_password, salt = smart_str(raw_password), smart_str(salt)
  if algorithm == 'sha1':
    return hashlib.sha1(salt + raw_password).hexdigest()
  raise Exception("Got unknown password algorithm type in password.")


class User(Base):
  __tablename__   = 'users'
  id              = Column(Integer, primary_key=True)
  username        = Column(String(15), nullable=False, index=True, unique=True )
  first_name      = Column(String(30), nullable=False)
  last_name       = Column(String(30), nullable=False)
  email           = Column(String(75), nullable=False, index=True, unique=True)
  password        = Column(String(128), nullable=False)

  balance_btc     = Column(Integer, nullable=False, default=0)
  balance_ltc     = Column(Integer, nullable=False, default=0)
  balance_brl     = Column(Integer, nullable=False, default=0)
  balance_usd     = Column(Integer, nullable=False, default=0)
  bitcoin_address = Column(String(50), nullable=True, index=True)

  verified        = Column(Integer, nullable=False, default=0)
  is_staff        = Column(Boolean, nullable=False, default=False)

  created         = Column(DateTime, default=datetime.datetime.now, nullable=False)
  last_login      = Column(DateTime, default=datetime.datetime.now, nullable=False)


  def __repr__(self):
    return "<User('%s', btc:%d, brl:%d )>" % (self.username, self.balance_btc, self.balance_brl )

  def __init__(self, *args, **kwargs):
    if 'password' in kwargs:
      kwargs['password'] = self.set_password(kwargs.get('password'))
    super(User, self).__init__(*args, **kwargs)

  @property
  def account_id(self):
    return self.id

  def set_password(self, raw_password):
    import random
    algo = 'sha1'
    salt = get_hexdigest(algo, str(random.random()), str(random.random()))[:5]
    hsh = get_hexdigest(algo, salt, raw_password)
    self.password = '%s$%s$%s' % (algo, salt, hsh)
    return  self.password

  def check_password(self, raw_password):
    algo, salt, hsh = self.password.split('$')
    return hsh == get_hexdigest(algo, salt, raw_password)

  @staticmethod
  def authenticate(session, user, password):
    user = session.query(User).filter_by(username=user).first()
    if not user:
      user = session.query(User).filter_by(email=user).first()
    if user and user.check_password(password):
      # update the last login
      user.last_login = datetime.datetime.now()
      return user
    return None


class Deposit(Base):
  __tablename__   = 'deposits'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('deposits', order_by=id))
  account_id      = Column(Integer,       nullable=False)
  currency        = Column(String(3),     nullable=False)
  value           = Column(Integer,       nullable=False)
  status          = Column(Integer,       nullable=False)
  when            = Column(DateTime,      default=datetime.datetime.now, nullable=False)
  origin          = Column(String(255),   nullable=False)


class WithdrawBTC(Base):
  __tablename__   = 'withdraws_btc'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('withdraws_btc', order_by=id))
  amount          = Column(Integer,       nullable=False)
  wallet          = Column(String,        nullable=False)
  status          = Column(Integer,       nullable=False)
  when            = Column(DateTime,      default=datetime.datetime.now, nullable=False)

class WithdrawBRL(Base):
  __tablename__   = 'withdraws_brl'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('withdraws_brl', order_by=id))
  amount          = Column(Integer,       nullable=False)
  bank_number     = Column(Integer,       nullable=False)
  bank_name       = Column(String,        nullable=False)
  account_name    = Column(String,        nullable=False)
  account_number  = Column(String,        nullable=False)
  account_branch  = Column(String,        nullable=False)  # Agencia
  cpf_cnpj        = Column(String,        nullable=False)
  status          = Column(Integer,       nullable=False)
  when            = Column(DateTime,      default=datetime.datetime.now, nullable=False)




class Order(Base):
  __tablename__   = 'orders'

  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('orders', order_by=id))
  account_id      = Column(Integer,       nullable=False)
  client_order_id = Column(String(30),    nullable=False, index=True)
  status          = Column(String(1),     nullable=False, default='0')
  symbol          = Column(String(12),    nullable=False)
  side            = Column(String(1),     nullable=False)
  type            = Column(String(1),     nullable=False)
  price           = Column(Integer,       nullable=False)
  order_qty       = Column(Integer,       nullable=False)
  cum_qty         = Column(Integer,       nullable=False, default=0)
  leaves_qty      = Column(Integer,       nullable=False, default=0)
  created         = Column(DateTime,      nullable=False, default=datetime.datetime.now, index=True)
  last_price      = Column(Integer,       nullable=False, default=0)
  last_qty        = Column(Integer,       nullable=False, default=0)
  average_price   = Column(Integer,       nullable=False, default=0)
  cxl_qty         = Column(Integer,       nullable=False, default=0)

  def __init__(self, *args, **kwargs):
    if 'order_qty' in kwargs and 'leaves_qty' not in kwargs:
      kwargs['leaves_qty'] = kwargs.get('order_qty')
    super(Order, self).__init__(*args, **kwargs)

  def __cmp__(self, other):
    if self.is_buy and other.is_buy:
      if self.price > other.price:
        return -1
      elif self.price < other.price:
        return  1
      elif self.created > other.created:
        return  -1
      else:
        return  1
    elif self.is_sell and other.is_sell:
      if self.price < other.price:
        return -1
      elif self.price > other.price:
        return  1
      elif self.created < other.created:
        return  -1
      else:
        return  1

  def match(self, other, execute_qty):
    if self.is_buy and other.is_sell:
      if self.price >= other.price:
        return min( execute_qty, other.leaves_qty)
    elif self.is_sell and other.is_buy:
      if self.price <= other.price:
        return min( execute_qty, other.leaves_qty)
    return  0

  def get_available_qty_to_execute(self, side, qty, price, total_executed_qty = 0):
    """This function returns qty that are available for execution"""

    price_attribute = 'balance_' + self.symbol[:3].lower()
    qty_attribute   = 'balance_' + self.symbol[3:].lower()

    if side == '1' and  not hasattr( self.user, price_attribute ):
      return 0

    if side == '2' and  not hasattr( self.user, qty_attribute ):
      return 0

    balance_price = getattr( self.user,price_attribute, 0)
    balance_qty   = getattr( self.user,qty_attribute, 0)


    if side == '1' : # buy
      qty_to_buy = min( qty, int((float(balance_price)/float(price)) * 1e8) )
      return qty_to_buy
    elif side == '2': # Sell
      qty_to_sell = min( qty, balance_qty - total_executed_qty )
      return qty_to_sell
    return  qty

  def cancel_qty(self, qty):
    if qty == 0:
      return
    self.cxl_qty += qty
    self.leaves_qty -= qty
    self._adjust_status()

  def _adjust_status(self):
    if self.cum_qty == self.order_qty:
      self.status = '2' # Fill
    elif self.cum_qty + self.cxl_qty == self.order_qty :
      self.status = '4' # Canceled
    elif 0 < self.cum_qty < self.order_qty :
      self.status = '1' # Partial fill
    else:
      self.status = '0' # New Order

  def execute(self, qty, price ):
    if qty == 0:
      return

    total_value = int(float(price) * float(qty)/1e8)

    # adjust balances
    price_attribute = 'balance_' + self.symbol[:3].lower()
    qty_attribute   = 'balance_' + self.symbol[3:].lower()
    if hasattr( self.user, qty_attribute ) and hasattr( self.user, price_attribute ):
      balance_price = getattr( self.user,price_attribute, 0)
      balance_qty   = getattr( self.user,qty_attribute, 0)
      if self.side == '1' :
        setattr(self.user , price_attribute, balance_price -  total_value )
        setattr(self.user , qty_attribute,   balance_qty   +  qty)
      elif self.side == '2': # Sell
        setattr(self.user , price_attribute, balance_price +  total_value )
        setattr(self.user , qty_attribute,   balance_qty   -  qty)

    #if self.side == '1': # Buy
    #  self.user.balance_brl -= total_value
    #  self.user.balance_btc += qty
    #elif self.side == '2': # Sell
    #  self.user.balance_brl += total_value
    #  self.user.balance_btc -= qty


    self.average_price = ((price * qty) + (self.cum_qty * self.average_price )) / ( self.cum_qty + qty )
    self.cum_qty += qty
    self.leaves_qty -= qty
    self.last_price = price
    self.last_qty = qty
    self._adjust_status()

  @property
  def has_leaves_qty(self):
    return self.leaves_qty > 0

  def __repr__(self):
    return "<Order(id:%s, price:%d, order_qty:%d, leaves_qty:%d, cum_qty:%d, cxl_qty:%d, last_price:%d, status:%s)>" % \
           (self.id,  self.price,  self.order_qty ,self.leaves_qty, self.cum_qty, self.cxl_qty , self.last_price, self.status)

  @property
  def is_buy(self):
    return self.side == '1'

  @property
  def is_sell(self):
    return  self.side == '2'


  @staticmethod
  def get_order( session, order_id=None, client_order_id=None ):
    return  None

  @staticmethod
  def cancel_order(session, user_id, order_id, client_order_id ):
    order = Order.get_order(session,  order_id, client_order_id)

    # TODO: Make sure the order belong to the same user
    if order.user_id != user_id:
      raise OrderNotFound


class Trade(Base):
  __tablename__     = 'trade'
  id                = Column(String,        primary_key=True)
  order_id          = Column(Integer,       ForeignKey('orders.id'))
  counter_order_id  = Column(Integer,       ForeignKey('orders.id'))
  buyer_username    = Column(String(15),    nullable=False)
  seller_username   = Column(String(15),    nullable=False)
  side              = Column(String(1),     nullable=False)
  symbol            = Column(String(12),    nullable=False)
  size              = Column(Integer,       nullable=False)
  price             = Column(Integer,       nullable=False)
  when              = Column(DateTime,      nullable=False, index=True)
  trade_type        = Column(Integer,       nullable=False, default=0)  # regular trade

  def __repr__(self):
    return "<Trade('%d', buy_order:%d, sell_order:%d, side:%s, size:%d, price:%d )>"\
    % (self.id, self.buy_order_id , self.sell_order_id, self.side, self.size, self.price)


Base.metadata.create_all(engine)

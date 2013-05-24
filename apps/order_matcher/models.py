# -*- coding: utf-8 -*-

import os
import hashlib
import smtplib

import datetime
from bitex.utils import smart_str
from bitex.signals import Signal
from bitex.errors import OrderNotFound

from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import  relationship, backref
from sqlalchemy.ext.declarative import declarative_base

from tornado.options import  options

engine = create_engine( options.db_engine, echo=options.db_echo)
Base = declarative_base()

balance_signal                  = Signal()
user_message_signal             = Signal()
btc_hot_wallet_transfer_signal  = Signal()
ltc_hot_wallet_transfer_signal  = Signal()
brl_bank_transfer_signal        = Signal()


def get_hexdigest(algorithm, salt, raw_password):
  """
  Returns a string of the hexdigest of the given plaintext password and salt
  using the given algorithm ('bcrypt' or 'sha1').
  """
  raw_password, salt = smart_str(raw_password), smart_str(salt)
  if algorithm == 'sha1':
    return hashlib.sha1(salt + raw_password).hexdigest()
  elif algorithm == 'bcrypt':
    import bcrypt
    return bcrypt.hashpw(raw_password, salt)
  raise Exception("Got unknown password algorithm type in password.")


class User(Base):
  __tablename__   = 'users'
  id              = Column(Integer, primary_key=True)
  username        = Column(String(15), nullable=False, index=True, unique=True )
  email           = Column(String(75), nullable=False, index=True, unique=True)

  password_algo   = Column(String(8), nullable=False)
  password_salt   = Column(String(128), nullable=False)
  password        = Column(String(128), nullable=False)

  balance_btc     = Column(Integer, nullable=False, default=0)
  balance_ltc     = Column(Integer, nullable=False, default=0)
  balance_brl     = Column(Integer, nullable=False, default=0)
  balance_usd     = Column(Integer, nullable=False, default=0)
  bitcoin_address = Column(String(50), nullable=True, index=True)

  verified        = Column(Integer, nullable=False, default=0)
  is_staff        = Column(Boolean, nullable=False, default=False)
  is_system       = Column(Boolean, nullable=False, default=False)

  daily_withdraw_btc_limit = Column(Integer, nullable=False, default=0)
  daily_withdraw_ltc_limit = Column(Integer, nullable=False, default=0)
  daily_withdraw_brl_limit = Column(Integer, nullable=False, default=0)
  daily_withdraw_usd_limit = Column(Integer, nullable=False, default=0)

  daily_withdraw_btc = Column(Integer, nullable=False, default=0)
  daily_withdraw_ltc = Column(Integer, nullable=False, default=0)
  daily_withdraw_brl = Column(Integer, nullable=False, default=0)
  daily_withdraw_usd = Column(Integer, nullable=False, default=0)

  last_withdraw_btc = Column(DateTime, nullable=True)
  last_withdraw_ltc = Column(DateTime, nullable=True)
  last_withdraw_brl = Column(DateTime, nullable=True)
  last_withdraw_usd = Column(DateTime, nullable=True)

  created         = Column(DateTime, default=datetime.datetime.now, nullable=False)
  last_login      = Column(DateTime, default=datetime.datetime.now, nullable=False)


  def __repr__(self):
    return "<User(id=%d, username='%s', email='%s'," \
           " balance_btc=%d, balance_ltc=%d, balance_brl=%d, balance_usd=%d, bitcoin_address='%s'," \
           " verified=%d, is_staff=%s, is_system=%s, created='%s', last_login='%s'," \
           " daily_withdraw_btc_limit=%d, daily_withdraw_ltc_limit=%d, daily_withdraw_brl_limit=%d, daily_withdraw_usd_limit=%d,"\
           " daily_withdraw_btc=%d, daily_withdraw_ltc=%d, daily_withdraw_brl=%d, daily_withdraw_usd=%d," \
           " last_withdraw_btc='%s', last_withdraw_ltc='%s', last_withdraw_brl='%s', last_withdraw_usd='%s' )>" \
          % (self.id, self.username, self.email,
             self.balance_btc, self.balance_ltc, self.balance_brl, self.balance_usd, self.bitcoin_address,
             self.verified, self.is_staff, self.is_system,self.created, self.last_login,
             self.daily_withdraw_btc_limit, self.daily_withdraw_ltc_limit, self.daily_withdraw_brl_limit, self.daily_withdraw_usd_limit,
             self.daily_withdraw_btc, self.daily_withdraw_ltc, self.daily_withdraw_brl, self.daily_withdraw_usd,
             self.last_withdraw_btc, self.last_withdraw_ltc,self.last_withdraw_brl,self.last_withdraw_usd)

  def __init__(self, *args, **kwargs):
    if 'password' in kwargs:
      kwargs['password'] = self.set_password(kwargs.get('password'))
    super(User, self).__init__(*args, **kwargs)

  @property
  def account_id(self):
    return self.id

  def update_balance(self, operation, currency_symbol, value ):
    balance_attribute = 'balance_' + currency_symbol.lower()

    if hasattr( self,  balance_attribute ):
      current_balance = getattr( self, balance_attribute, 0)

      if operation == 'CREDIT':
        setattr(self , balance_attribute, current_balance + value )
      elif operation == 'DEBIT':
        setattr(self , balance_attribute, current_balance - value )


  def publish_balance_update(self, reqId = None):
    balance_update_msg = {
      'MsgType': 'U3',
      'balance_brl': self.balance_brl,
      'balance_usd': self.balance_usd,
      'balance_btc': self.balance_btc,
      'balance_ltc': self.balance_ltc,
      }
    if reqId:
      balance_update_msg['BalanceReqID'] = reqId

    balance_signal( self.id, balance_update_msg )

  def set_password(self, raw_password):
    import random
    self.password_algo = 'sha1'
    self.password_salt = get_hexdigest(self.password_algo, str(random.random()), str(random.random()))[:5]
    self.password = get_hexdigest(self.password_algo, self.password_salt, raw_password)
    return  self.password

  def check_password(self, raw_password):
    return self.password == get_hexdigest(self.password_algo, self.password_salt, raw_password)

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

  def deposit(self, session, currency, amount, origin):
    deposit = Deposit( user_id=self.id,
                       account_id=self.account_id,
                       currency=currency.upper(),
                       amount=amount,
                       origin=origin,
                       status=2)
    session.add(deposit)

    self.update_balance( 'CREDIT', currency, amount )
    deposit.status = '2'

    session.commit()

    formatted_amount = ""
    if currency == 'BTC':
      formatted_amount =  u'BTC {0:.8f}'.format(amount/1.e8)
    elif currency == 'BRL':
      formatted_amount =  u'R$ {0:.2f}'.format(amount/1.e5)

    msg = u"Depósito de " + formatted_amount + u" realizado em sua conta."
    UserEmail.create( session = session,
                      user_id = self.id,
                      subject = msg )

    self.publish_balance_update()

    return deposit


  def withdraw_btc(self, session, amount, wallet):
    withdraw_btc =  WithdrawBTC( user_id  = self.id,
                                 username = self.username,
                                 amount   = amount,
                                 wallet   = wallet)
    session.add(withdraw_btc)
    session.commit()

    UserEmail.create( session = session,
                      user_id = self.id,
                      subject = u"Registrado pedido de saque de BTC número %d." % withdraw_btc.id )


    if self.daily_withdraw_btc < self.daily_withdraw_btc_limit:
      if not self.last_withdraw_btc:
        self.last_withdraw_btc = datetime.datetime.now()

      if self.last_withdraw_btc.date() == datetime.datetime.now().date():
        self.daily_withdraw_btc += amount
      else:
        self.last_withdraw_btc = datetime.datetime.now()
        self.daily_withdraw_btc = amount

    session.commit()

    # Check if the user has exceed his daily limit for the hot wallet
    if self.daily_withdraw_btc < self.daily_withdraw_btc_limit:
      # Initiate the BTC transfer
      btc_hot_wallet_transfer_msg = {
        'MsgType'     : 'U10',
        'TransferId'  : withdraw_btc.id,
        'to'          : wallet,
        'amount'      : amount,
        'when'        : withdraw_btc.created
      }

      btc_hot_wallet_transfer_signal( self.id, btc_hot_wallet_transfer_msg )

    self.publish_balance_update()

  def withdraw_brl(self, session, amount, bank_number,bank_name,account_name,
                   account_number,account_branch,cpf_cnpj ):

    withdraw_brl =  WithdrawBRL( user_id        = self.id,
                                 amount         = amount,
                                 bank_number    = bank_number,
                                 bank_name      = bank_name     ,
                                 account_name   = account_name  ,
                                 account_number = account_number,
                                 account_branch = account_branch,
                                 cpf_cnpj       = cpf_cnpj)
    session.add(withdraw_brl)
    session.commit()

    UserEmail.create( session = session,
                      user_id = self.id,
                      subject = u"Registrado pedido de saque de R$ número %d." % withdraw_brl.id )

    if self.daily_withdraw_brl < self.daily_withdraw_brl_limit:
      if not self.last_withdraw_brl:
        self.last_withdraw_brl = datetime.datetime.now()

      if self.last_withdraw_brl.date() == datetime.datetime.now().date():
        self.daily_withdraw_brl += amount
      else:
        self.last_withdraw_brl = datetime.datetime.now()
        self.daily_withdraw_brl = amount

    session.commit()

    # Check if the user has exceed his daily limit for the hot wallet
    if self.daily_withdraw_brl < self.daily_withdraw_brl_limit:
      # Initiate the BTC transfer
      brl_bank_transfer_msg = {
        'MsgType'     : 'U10',
        'TransferId'  : withdraw_brl.id,
        'to'          : account_number,
        'amount'      : amount,
        'when'        : withdraw_brl.created
      }

      brl_bank_transfer_signal( self.id, brl_bank_transfer_msg )

    self.publish_balance_update()


class Deposit(Base):
  __tablename__   = 'deposits'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('deposits', order_by=id))
  account_id      = Column(Integer,       nullable=False)
  currency        = Column(String(3),     nullable=False)
  amount          = Column(Integer,       nullable=False)
  status          = Column(Integer,       nullable=False, default=0)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)
  origin          = Column(String(255),   nullable=False)

class UserEmail(Base):
  __tablename__   = 'user_email'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('withdraws_btc', order_by=id))
  subject         = Column(String,        nullable=False)
  body            = Column(String,        nullable=True)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)

  @staticmethod
  def create( session, user_id, subject, body = None ):
    user_email = UserEmail( user_id = user_id,
                            subject = subject,
                            body    = body)
    session.add(user_email)
    session.commit()

    msg = {
      'MsgType' : 'C',
      'OrigTime': user_email.created,
      'Subject' : subject,
    }

    if body:
      msg['Body'] = body

    user_message_signal( user_id, msg )

    try:
       smtpObj = smtplib.SMTP('127.0.0.1')
       smtpObj.ehlo()
       smtpObj.sendmail('bzero@bitex.com.br', [ user_email.user.email ], body)
    except smtplib.SMTPException as ex:
       print "Error: unable to send email to " + str(user_email.user.email)

    return  user_email



class WithdrawBTC(Base):
  __tablename__   = 'withdraws_btc'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  username        = Column(String,        nullable=False)
  amount          = Column(Integer,       nullable=False)
  wallet          = Column(String,        nullable=False)
  status          = Column(Integer,       nullable=False, default=0)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)

class WithdrawBRL(Base):
  __tablename__   = 'withdraws_brl'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  username        = Column(String,        nullable=False)
  amount          = Column(Integer,       nullable=False)
  bank_number     = Column(Integer,       nullable=False)
  bank_name       = Column(String,        nullable=False)
  account_name    = Column(String,        nullable=False)
  account_number  = Column(String,        nullable=False)
  account_branch  = Column(String,        nullable=False)  # Agencia
  cpf_cnpj        = Column(String,        nullable=False)
  status          = Column(Integer,       nullable=False, default=0)
  created        = Column(DateTime,      default=datetime.datetime.now, nullable=False)




class Order(Base):
  __tablename__   = 'orders'

  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('orders', order_by=id))
  username        = Column(String(15),    nullable=False )
  account_id      = Column(Integer,       nullable=False)
  client_order_id = Column(String(30),    nullable=False, index=True)
  status          = Column(String(1),     nullable=False, default='0', index=True)
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

    if 'user' in kwargs and 'username' not in kwargs:
      kwargs['username'] = kwargs.get('user').username

    super(Order, self).__init__(*args, **kwargs)


  def __repr__(self):
    return "<Order(id=%d, user_id=%d, username='%s',account_id=%d, client_order_id='%s', " \
           "symbol='%s', side='%s', type='%s', price=%d, order_qty=%d, cum_qty=%d, leaves_qty=%d, " \
           "created='%s', last_price=%d,  cxl_qty=%d, last_qty=%d, status='%s', average_price=%d)>" \
            % (self.id, self.user_id, self.username, self.account_id, self.client_order_id,
               self.symbol, self.side, self.type, self.price,  self.order_qty, self.cum_qty, self.leaves_qty,
               str(self.created), self.last_price, self.cxl_qty , self.last_qty, self.status, self.average_price)

  def __cmp__(self, other):
    if self.is_buy and other.is_buy:
      if self.price > other.price:
        return -1
      elif self.price < other.price:
        return  1
      #elif self.created > other.created:
      #  return  -1
      else:
        return  0
    elif self.is_sell and other.is_sell:
      if self.price < other.price:
        return -1
      elif self.price > other.price:
        return  1
      #elif self.created < other.created:
      #  return  -1
      else:
        return  0

  def has_match(self, other):
    if self.is_buy and other.is_sell and self.price >= other.price:
        return True
    elif self.is_sell and other.is_buy and self.price <= other.price:
        return True
    return  False


  def match(self, other, execute_qty):
    if self.is_buy and other.is_sell:
      if self.price >= other.price:
        return min( execute_qty, other.leaves_qty)
    elif self.is_sell and other.is_buy:
      if self.price <= other.price:
        return min( execute_qty, other.leaves_qty)
    return  0

  def get_available_qty_to_execute(self, side, qty, price):
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
      qty_to_sell = min( qty, balance_qty )
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
    from_symbol = self.symbol[:3].lower()
    to_symbol = self.symbol[3:].lower()
    if self.side == '1' :  # BUY
      self.user.update_balance( 'DEBIT',  from_symbol, total_value )
      self.user.update_balance( 'CREDIT', to_symbol  , qty )
    elif self.side == '2': # Sell
      self.user.update_balance( 'CREDIT', from_symbol, total_value )
      self.user.update_balance( 'DEBIT',  to_symbol  , qty )


    self.average_price = ((price * qty) + (self.cum_qty * self.average_price )) / ( self.cum_qty + qty )
    self.cum_qty += qty
    self.leaves_qty -= qty
    self.last_price = price
    self.last_qty = qty
    self._adjust_status()

    self.user.publish_balance_update()

  @property
  def is_cancelled(self):
    return self.status == '4'

  @property
  def has_leaves_qty(self):
    return self.leaves_qty > 0


  @property
  def is_buy(self):
    return self.side == '1'

  @property
  def is_sell(self):
    return  self.side == '2'


  @staticmethod
  def get_order( session, order_id=None, client_order_id=None ):
    if  client_order_id is not None:
      order = session.query(Order).\
                filter_by( user_id = self.user.id ).\
                filter_by( client_order_id =  client_order_id  ).first()
    else:
      order = session.query(Order).\
                filter_by( user_id = self.user.id ).\
                filter_by( id =  order_id  ).first()

    return  order

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
  symbol            = Column(String(12),    nullable=False, index=True)
  size              = Column(Integer,       nullable=False)
  price             = Column(Integer,       nullable=False)
  created           = Column(DateTime,      nullable=False, index=True)
  trade_type        = Column(Integer,       nullable=False, default=0)  # regular trade

  def __repr__(self):
    return "<Trade('%d', buy_order:%d, sell_order:%d, side:%s, size:%d, price:%d )>"\
    % (self.id, self.buy_order_id , self.sell_order_id, self.side, self.size, self.price)

  @staticmethod
  def get_last_100_trades(session, symbol):
    trades = session.query(Trade).filter_by(symbol=symbol).order_by(Trade.created.desc() ).limit(100)
    return trades


Base.metadata.create_all(engine)

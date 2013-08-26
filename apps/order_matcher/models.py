# -*- coding: utf-8 -*-

import os
import hashlib

import hmac, base64, struct, hashlib, time

import datetime
from bitex.utils import smart_str
from bitex.signals import Signal
from bitex.errors import OrderNotFound

from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import or_, exists
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Numeric, Text, Date
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

def generate_two_factor_secret():
  return base64.b32encode(os.urandom(10))

def get_hotp_token(secret, intervals_no):
  key = base64.b32decode(secret, True)
  msg = struct.pack(">Q", intervals_no)
  h = hmac.new(key, msg, hashlib.sha1).digest()
  o = ord(h[19]) & 15
  h = (struct.unpack(">I", h[o:o+4])[0] & 0x7fffffff) % 1000000
  return h

def get_totp_token(secret):
  return get_hotp_token(secret, intervals_no=int(time.time())//30)


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


class NeedSecondFactorException(Exception):
  pass

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

  two_factor_enabled  = Column(Boolean, nullable=False, default=False)
  two_factor_secret   = Column(String(50), nullable=True, index=False)


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

  def btc_balance_update(self, amount, confirmations):
    if amount != balance_btc:
        delta = balance_btc - amount
        if delta > 0:
            self.update_balance('CREDIT', 'BTC', delta)
        else:
            self.update_balance('DEBIT', 'BTC', delta)

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

  def new_address(self, btc_address):
    self.bitcoin_address = btc_address

  def set_password(self, raw_password):
    import random
    self.password_algo = 'sha1'
    self.password_salt = get_hexdigest(self.password_algo, str(random.random()), str(random.random()))[:5]
    self.password = get_hexdigest(self.password_algo, self.password_salt, raw_password)
    return  self.password

  def check_password(self, raw_password):
    return self.password == get_hexdigest(self.password_algo, self.password_salt, raw_password)

  @staticmethod
  def get_user( session, username=None, email=None):
    if username and email:
      filter_obj = or_( User.username==username, User.email==email )
    elif username:
      filter_obj = or_( User.username==username )
    elif email:
      filter_obj = or_( User.email==email )
    else:
      return  None
    user = session.query(User).filter( filter_obj  ).first()
    if user:
      return  user
    return None

  @staticmethod
  def authenticate(session, user, password, second_factor=None):
    user = User.get_user( session, user, user)

    if user.two_factor_enabled and second_factor is None:
      raise NeedSecondFactorException

    if user and user.check_password(password):

      if user.two_factor_enabled:
        if second_factor is None or int(second_factor) != get_totp_token(user.two_factor_secret):
          raise NeedSecondFactorException

      # update the last login
      user.last_login = datetime.datetime.now()
      return user
    return None

  def enable_two_factor(self, enable, secret, second_factor):
    if enable:
      if secret and second_factor is not None and second_factor.isdigit() and  int(second_factor) == get_totp_token(secret):
        self.two_factor_enabled = True
        self.two_factor_secret = secret
        return self.two_factor_secret
      elif secret:
        return  secret
      else:
        return generate_two_factor_secret()
    else:
      self.two_factor_enabled = False
      return ""

  def request_reset_password(self, session):
    UserPasswordReset.create( session, self.id )

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

    session.flush()

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
    session.flush()

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

    session.flush()

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
    session.flush()

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

    session.flush()

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

class UserPasswordReset(Base):
  __tablename__   = 'user_password_reset'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('user_password_reset', order_by=id))
  token           = Column(String,        nullable=False, index=True)
  used            = Column(Boolean,       default=False)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)

  @staticmethod
  def get_valid_token(session, token):
    req = session.query(UserPasswordReset).filter_by(token = token ).first()
    if not req:
      return  None

    # Check if the token was already used
    if req.used:
      return  None

    #TODO: Check if the token is at least 1 minute old


    return  req

  @staticmethod
  def change_user_password(session, token, new_password):
    req = UserPasswordReset.get_valid_token(session, token)
    if not req:
      return  False

    req.used = True
    session.add(req)

    user = req.user
    user.set_password(new_password)

    session.add(user)
    session.flush()

    return  True

  @staticmethod
  def create( session, user_id ):
    import uuid
    token = uuid.uuid4().hex

    req = UserPasswordReset( user_id = user_id,
                             token = token )
    session.add(req)
    session.flush()


    subject = u"Redefina a sua senha."
    body = u"Entre com o seguinte código de segurança para resetar a sua senha: %s" % token

    UserEmail.create( session = session,
                      user_id = user_id,
                      subject = subject,
                      body = body )


class UserEmail(Base):
  __tablename__   = 'user_email'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('user_email', order_by=id))
  subject         = Column(String,        nullable=False)
  body            = Column(String,        nullable=True)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)

  @staticmethod
  def create( session, user_id, subject, body = None ):
    user_email = UserEmail( user_id = user_id,
                            subject = subject,
                            body    = body)
    session.add(user_email)
    session.flush()

    msg = {
      'MsgType' : 'C',
      'OrigTime': user_email.created,
      'To': user_email.user.email,
      'Subject' : subject,
      'Body': ''
    }

    if body:
      msg['Body'] = body

    user_message_signal( user_id, msg )

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

class Boleto(Base):
  __tablename__       = 'boleto'

  id                  = Column(Integer,   primary_key=True)

  # Informações Gerais
  codigo_banco        = Column(String(3),  nullable=False)

  carteira            = Column(String(5),  nullable=False)
  aceite              = Column(String(1),  nullable=False, default='N')
  valor_documento     = Column(Numeric(9,2), nullable=False)
  valor               = Column(Numeric(9,2), nullable=True)
  data_vencimento     = Column(Date,   nullable=False, index=True)
  data_documento      = Column(Date,   nullable=False, index=True, default=datetime.date.today)
  data_processamento  = Column(Date,   nullable=True, index=True)
  numero_documento    = Column(String(11), nullable=False)

  # Informações do Cedente
  agencia_cedente     = Column(String(4),  nullable=False)
  conta_cedente       = Column(String(7),  nullable=False)
  cedente             = Column(String(255),nullable=False)
  cedente_documento   = Column(String(50), nullable=False)
  cedente_cidade      = Column(String(255),nullable=False)
  cedente_uf          = Column(String(2),  nullable=False)
  cedente_endereco    = Column(String(255),nullable=False)
  cedente_bairro      = Column(String(255),nullable=False)
  cedente_cep         = Column(String(9),  nullable=False)


  # Informações do Sacado
  sacado_nome        = Column(String(255),nullable=False)
  sacado_documento   = Column(String(255),nullable=True)
  sacado_cidade      = Column(String(255),nullable=True)
  sacado_uf          = Column(String(2),  nullable=True)
  sacado_endereco    = Column(String(255),nullable=True)
  sacado_bairro      = Column(String(255),nullable=True)
  sacado_cep         = Column(String(9),  nullable=True)

  # Informações Opcionais
  quantidade         = Column(String(10), nullable=True)
  especie_documento  = Column(String(255),nullable=True)
  especie            = Column(String(2),  nullable=False, default='R$')
  moeda              = Column(String(2),  nullable=False, default='9')
  demonstrativo      = Column(Text,  nullable=True)
  local_pagamento    = Column(String(255),nullable=True, default=u"Pagável em qualquer banco, lotérica ou agência " \
                                                                 u"dos correios até a data de vencimento")
  instrucoes         = Column(Text,nullable=False, default=u"Não receber após 30 dias.")

  def __unicode__(self):
    return self.numero_documento


  def print_pdf_pagina(self, pdf_file):
    from pyboleto import bank

    ClasseBanco = bank.get_class_for_codigo(self.codigo_banco)

    boleto_dados = ClasseBanco()

    for field in self.__table__.columns:
      val = getattr(self, field.name)
      if val:
        setattr(boleto_dados, field.name, val)

    setattr(boleto_dados, 'nosso_numero', getattr(self, 'numero_documento'))

    pdf_file.drawBoleto(boleto_dados)


class BoletoOptions(Base):
  __tablename__         = 'boleto_options'

  id                    = Column(Integer,    primary_key=True)

  description           = Column(String(255),nullable=False)

  codigo_banco          = Column(String(3),  nullable=False)
  carteira              = Column(String(5),  nullable=False)

  last_numero_documento = Column(Integer,    nullable=False)

  agencia_cedente       = Column(String(4),  nullable=False)
  conta_cedente         = Column(String(7),  nullable=False)
  cedente               = Column(String(255),nullable=False)
  cedente_documento     = Column(String(50), nullable=False)
  cedente_cidade        = Column(String(255),nullable=False)
  cedente_uf            = Column(String(2),  nullable=False)
  cedente_endereco      = Column(String(255),nullable=False)
  cedente_bairro        = Column(String(255),nullable=False)
  cedente_cep           = Column(String(9),  nullable=False)

  def generate_boleto(self,session, user, value):
    self.last_numero_documento +=  1

    boleto = Boleto()
    boleto.codigo_banco       = self.codigo_banco
    boleto.carteira           = self.carteira
    boleto.numero_documento   = str(self.last_numero_documento)
    boleto.valor_documento    = value
    boleto.valor              = value
    boleto.data_vencimento    = datetime.date.today() + datetime.timedelta(days=5)
    boleto.data_documento     = datetime.date.today()

    boleto.agencia_cedente    = self.agencia_cedente
    boleto.conta_cedente      = self.conta_cedente
    boleto.cedente            = self.cedente
    boleto.cedente_documento  = self.cedente_documento
    boleto.cedente_cidade     = self.cedente_cidade
    boleto.cedente_uf         = self.cedente_uf
    boleto.cedente_endereco   = self.cedente_endereco
    boleto.cedente_bairro     = self.cedente_bairro
    boleto.cedente_cep        = self.cedente_cep

    boleto.sacado_nome        = user.username
    boleto.sacado_documento   = user.id
    boleto.sacado_endereco    = user.email

    session.add(self)
    session.add(boleto)
    session.flush()

    return boleto



Base.metadata.create_all(engine)

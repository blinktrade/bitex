# -*- coding: utf-8 -*-

import os
import hashlib

import logging
import hmac, base64, struct, hashlib, time

import datetime
from bitex.utils import smart_str
from bitex.errors import OrderNotFound

from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import and_, or_, exists
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Numeric, Text, Date, UniqueConstraint
from sqlalchemy.orm import  relationship, backref
from sqlalchemy.ext.declarative import declarative_base
import json

from bitex.json_encoder import JsonEncoder

from tornado.options import  options

engine = create_engine( options.db_engine, echo=options.db_echo)
Base = declarative_base()

from trade_application import application


from sqlalchemy.ext.declarative import DeclarativeMeta

class AlchemyJSONEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj.__class__, DeclarativeMeta):
      # an SQLAlchemy class
      fields = {}
      for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
        data = obj.__getattribute__(field)
        try:
          json.dumps(data) # this will fail on non-encodable values, like other classes
          fields[field] = data
        except TypeError:
          fields[field] = None
        # a json-encodable dict
      return fields

    return json.JSONEncoder.default(self, obj)


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


class Currency(Base):
  __tablename__   = 'currencies'
  code            = Column(String(4), primary_key=True)
  sign            = Column(String(2))
  description     = Column(String(15), nullable=False)
  is_crypto       = Column(Boolean, nullable=False)
  pip             = Column(Integer, default=10000000)
  format_python   = Column(String(25))
  format_js       = Column(String(25))

  @staticmethod
  def get_currencies(session):
    return  [ x for x in session.query(Currency)]

  @staticmethod
  def get_currency(session, code):
    return  session.query(Currency).filter_by(code=code).first()

  @staticmethod
  def format_number(session, currency_code, number):
    #TODO: Optimize this query because this data never changes
    currency = Currency.get_currency(session, currency_code)
    return currency.format_python.format( number )

  def __repr__(self):
    return u"<Currency(code=%r, sign=%r, description=%r, is_crypto=%r, pip=%r, format_python=%r, format_js=%r)>" % (
      self.code, self.sign, self.description, self.is_crypto, self.pip, self.format_python, self.format_js
    )

class Instrument(Base):
  __tablename__   = 'instruments'
  symbol          = Column(String(12), primary_key=True)
  currency        = Column(String(4) , ForeignKey('currencies.code'))
  description     = Column(String(12), nullable=False )

  @staticmethod
  def get_instruments(session, request_type=None) :
    return  [ x for x in session.query(Instrument)]

  @staticmethod
  def get_instrument(session, symbol):
    return  session.query(Instrument).filter_by(symbol=symbol).first()

  def __repr__(self):
    return u"<Instrument(symbol=%r, currency=%r, description=%r)>" % (self.symbol, self.currency, self.description)


class User(Base):
  __tablename__   = 'users'
  id              = Column(Integer, primary_key=True)
  username        = Column(String(15), nullable=False, index=True, unique=True )
  email           = Column(String(75), nullable=False, index=True, unique=True)

  broker_id       = Column(Integer, ForeignKey('users.id'))
  broker          = relationship("User", remote_side=[id])

  state           = Column(String(30),    nullable=False)
  country_code    = Column(String(2),     nullable=False)

  password_algo   = Column(String(8), nullable=False)
  password_salt   = Column(String(128), nullable=False)
  password        = Column(String(128), nullable=False)

  verified        = Column(Integer, nullable=False, default=0)
  is_staff        = Column(Boolean, nullable=False, default=False)
  is_system       = Column(Boolean, nullable=False, default=False)
  is_broker       = Column(Boolean, nullable=False, default=False)

  created         = Column(DateTime, default=datetime.datetime.now, nullable=False)
  last_login      = Column(DateTime, default=datetime.datetime.now, nullable=False)

  two_factor_enabled  = Column(Boolean, nullable=False, default=False)
  two_factor_secret   = Column(String(50), nullable=True, index=False)


  def __repr__(self):
    return u"<User(id=%r, username=%r, email=%r,  broker_id=%r, " \
           u" password_algo=%r, password_salt=%r, password=%r,"\
           u" state=%r, country_code=%r, "\
           u" verified=%r, is_staff=%r, is_system=%r, is_broker=%r,  created=%r, last_login=%r )>" \
          % (self.id, self.username, self.email, self.broker_id,
             self.password_algo, self.password_salt, self.password,
             self.state, self.country_code,
             self.verified, self.is_staff, self.is_system, self.is_broker, self.created, self.last_login)

  def __init__(self, *args, **kwargs):
    if 'password' in kwargs:
      kwargs['password'] = self.set_password(kwargs.get('password'))
    super(User, self).__init__(*args, **kwargs)

  @property
  def account_id(self):
    return self.id

  def set_password(self, raw_password):
    import random
    self.password_algo = 'sha1'
    self.password_salt = get_hexdigest(self.password_algo, str(random.random()), str(random.random()))[:5]
    self.password = get_hexdigest(self.password_algo, self.password_salt, raw_password)
    return  self.password

  def check_password(self, raw_password):
    return self.password == get_hexdigest(self.password_algo, self.password_salt, raw_password)

  @staticmethod
  def get_user( session, username=None, email=None, user_id=None ):
    if user_id:
      filter_obj = or_(User.id == user_id)
    elif username and email:
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
  def get_list(session, broker_id, status_list, country = None, state=None, client_id=None,  page_size = None, offset = None, sort_column = None, sort_order='ASC'):
    query = session.query(User).filter( User.verified.in_( status_list ) ).filter(User.broker_id==broker_id)

    if country:
      query = query.filter(User.country_code == country)
    if state:
      query = query.filter(User.state == state)

    if client_id:
      query = query.filter( or_( User.username.like(client_id), User.email.like(client_id) ) )


    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)
    if sort_column:
      if sort_order == 'ASC':
        query = query.order(sort_column)
      else:
        query = query.order(sort_column).desc()
    return query


  @staticmethod
  def authenticate(session, user, password, second_factor=None):
    user = User.get_user( session, user, user)

    if user and  user.two_factor_enabled and second_factor is None:
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

    Balance.update_balance(session, 'CREDIT', self.account_id, self.broker_id, currency, amount)
    deposit.status = '2'

    session.flush()

    formatted_amount = Currency.format_number( session, currency, amount / 1.e8 )

    msg = u"Depósito de " + formatted_amount + u" realizado em sua conta."
    UserEmail.create( session = session,
                      user_id = self.id,
                      subject = msg )

    return deposit

  def withdraw_btc(self, session, amount, wallet):
    obsolete_code = """
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

      application.publish( self.id, btc_hot_wallet_transfer_msg )

    """

  def withdraw_brl(self, session, amount, bank_number,bank_name,account_name,
                   account_number,account_branch,cpf_cnpj ):

    obsolete_code = """
    UserEmail.create( session = session,
                      user_id = self.id,
                      subject = u"Registrado pedido de saque de R$ número %r." % withdraw_brl.id )

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

      application.publish( self.id, brl_bank_transfer_msg )

    """

class Balance(Base):
  __tablename__         = 'balances'
  id                    = Column(Integer,       primary_key=True)
  account_id            = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  broker_id             = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  currency              = Column(String(4),     ForeignKey('currencies.code') ,nullable=False )
  balance               = Column(Integer,       nullable=False, default=0)
  last_update           = Column(DateTime, default=datetime.datetime.now, nullable=False)

  __table_args__ = (UniqueConstraint('account_id', 'broker_id', 'currency', name='_balance_uc'), )

  def __repr__(self):
    return u"<Balance(id=%r, account_id=%r, broker_id=%r, currency=%r, balance=%r)>" % (
      self.id, self.account_id,  self.broker_id, self.currency, self.balance )

  @staticmethod
  def get_balances_by_account(session, account_id):
    return session.query(Balance).filter_by(account_id = account_id)

  @staticmethod
  def get_balances_by_account_broker(session, account_id, broker_id):
    return session.query(Balance).filter_by(account_id = account_id).filter_by(broker_id = broker_id )

  @staticmethod
  def get_balance(session, account_id, broker_id, currency ):
    currency  = currency.strip().upper()
    balance_obj = session.query(Balance).filter_by(account_id = account_id ).filter_by(broker_id = broker_id ).filter_by(currency = currency).first()
    if not balance_obj:
      return 0
    return balance_obj.balance

  @staticmethod
  def update_balance(session,operation, account_id, broker_id, currency, value ):
    currency  = currency.strip().upper()
    balance_obj = session.query(Balance).filter_by(account_id = account_id ).filter_by(broker_id = broker_id ).filter_by(currency = currency).first()
    if not balance_obj:
      balance_obj = Balance(account_id  = account_id,
                            currency    = currency,
                            broker_id   = broker_id,
                            balance     = 0)

    if operation == 'CREDIT':
      balance_obj.balance = balance_obj.balance + value
    elif operation == 'DEBIT':
      balance_obj.balance = balance_obj.balance - value

    session.add(balance_obj)

    balance_update_msg = dict()
    balance_update_msg['MsgType'] = 'U3'
    balance_update_msg[currency] = balance_obj.balance
    application.publish( account_id,  balance_update_msg  )

    return balance_obj.balance


class Ledger(Base):
  __tablename__         = 'ledger'
  id                    = Column(Integer,       primary_key=True)
  currency              = Column(String(4),     ForeignKey('currencies.code'),nullable=False)
  account_id            = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  broker_id             = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  payee_id              = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  payeee_broker_id      = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  operation             = Column(String(1),     nullable=False)
  amount                = Column(Integer,       nullable=False)
  balance               = Column(Integer,       nullable=False)
  created               = Column(DateTime,      default=datetime.datetime.now, nullable=False)
  description           = Column(String(255))

  def __repr__(self):
    return u"<Ledger(id=%r, currency=%r, account_id=%r, broker_id=%r, payee_id=%r, payeee_broker_id=%r," \
                    u"operation=%r,amount=%r,balance=%r,created=%r,description=%r)>" % (
      self.id, self.currency, self.account_id, self.broker_id, self.payee_id, self.payeee_broker_id,
      self.operation, self.amount, self.balance, self.created, self.description)

  @staticmethod
  def deposit(session, account_id, payee_id, broker_id, payeee_broker_id, currency, amount, description=None):
    balance = Balance.update_balance(session, 'CREDIT', account_id, broker_id, currency, amount)
    ledger = Ledger( currency         = currency,
                     account_id       = account_id,
                     payee_id         = payee_id,
                     broker_id        = broker_id,
                     payeee_broker_id = payeee_broker_id,
                     operation        = 'C',
                     amount           = amount,
                     balance          = balance,
                     description      = description )
    session.add(ledger)


  @staticmethod
  def execute_order(session, order, counter_order, symbol, qty, price):
    total_value = int(float(price) * float(qty)/1e8)

      # adjust balances
    to_symbol = symbol[:3].upper()   #BTC
    from_symbol = symbol[3:].upper() #BRL

    balance = Balance.update_balance(session, 'DEBIT' if order.is_buy else 'CREDIT', order.account_id, order.broker_id, from_symbol, total_value )
    order_record_debit = Ledger( currency         = from_symbol,
                                 account_id       = order.account_id,
                                 broker_id        = order.broker_id,
                                 payee_id         = counter_order.account_id,
                                 payeee_broker_id = counter_order.broker_id,
                                 operation        = 'D'  if order.is_buy else 'C',
                                 amount           = total_value,
                                 balance          = balance,
                                 description      = 'Trade')
    session.add(order_record_debit)


    balance = Balance.update_balance(session, 'CREDIT' if order.is_buy else 'DEBIT', counter_order.account_id, counter_order.broker_id, from_symbol, total_value )
    counter_order_record_credit = Ledger(currency     = from_symbol,
                                         account_id   = counter_order.account_id,
                                         broker_id    = counter_order.broker_id,
                                         payee_id     = order.account_id,
                                         payeee_broker_id = order.broker_id,
                                         operation    = 'C'  if order.is_buy else 'D',
                                         amount       = total_value,
                                         balance      = balance,
                                         description  = 'Trade')
    session.add(counter_order_record_credit)


    balance = Balance.update_balance(session, 'CREDIT' if order.is_buy else 'DEBIT', order.account_id, order.broker_id, to_symbol, qty )
    order_record_credit = Ledger(currency     = to_symbol,
                                 account_id   = order.account_id,
                                 broker_id    = order.broker_id,
                                 payee_id     = counter_order.account_id,
                                 payeee_broker_id = counter_order.broker_id,
                                 operation    = 'C'  if order.is_buy else 'D',
                                 amount       = qty,
                                 balance      = balance,
                                 description  = 'Trade')
    session.add(order_record_credit)

    balance = Balance.update_balance(session, 'DEBIT' if order.is_buy else 'CREDIT', counter_order.account_id, counter_order.broker_id, to_symbol, qty )
    counter_order_record_debit = Ledger(currency     = to_symbol,
                                        account_id   = counter_order.account_id,
                                        broker_id    = counter_order.broker_id,
                                        payee_id     = order.account_id,
                                        payeee_broker_id = order.broker_id,
                                        operation    = 'D' if order.is_buy else 'C',
                                        amount       = qty,
                                        balance      = balance,
                                        description  = 'Trade')
    session.add(counter_order_record_debit)


class Broker(Base):
  __tablename__         = 'brokers'
  id                    = Column(Integer,       ForeignKey('users.id'),  unique=True)
  user                  = relationship("User",  backref=backref('brokers', order_by=id))
  short_name            = Column(String(30),    primary_key=True)
  business_name         = Column(String(30),    nullable=False)
  address               = Column(String(255),   nullable=False)
  state                 = Column(String(30),    nullable=False)
  zip_code              = Column(String(12),    nullable=False)
  country_code          = Column(String(2),     nullable=False)
  country               = Column(String(20),    nullable=False)
  phone_number_1        = Column(String(15),    nullable=False)
  phone_number_2        = Column(String(15))
  skype                 = Column(String(30),    nullable=False)
  email                 = Column(String(15))

  verification_jotform  = Column(String(50),    nullable=False)

  currencies            = Column(String(255),   nullable=False)
  tos_url               = Column(String(255),   nullable=False)

  boleto_fee            = Column(Integer,       nullable=False, default=0)
  withdraw_brl_bank_fee = Column(Integer,       nullable=False, default=0)
  withdraw_wallet_fee   = Column(Integer,       nullable=False, default=0)
  withdraw_swift_fee    = Column(Integer,       nullable=False, default=0)
  withdraw_ach_fee      = Column(Integer,       nullable=False, default=0)

  transaction_fee_buy   = Column(Integer,       nullable=False, default=0)
  transaction_fee_sell  = Column(Integer,       nullable=False, default=0)

  status                = Column(String(1),     nullable=False, default='0', index=True)
  ranking               = Column(Integer,       nullable=False, default=0, index=True)




  @staticmethod
  def get_broker(session, broker_id):
    return session.query(Broker).filter_by(id = broker_id ).first()

  @staticmethod
  def get_list(session, status_list, country = None, page_size = None, offset = None):
    query = session.query(Broker).filter(Broker.status.in_( status_list ) )
    if country:
      query = query.filter_by( country = country )
    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)
    return query


  def __repr__(self):
    return u"<Broker(id=%r, short_name=%r, business_name=%r,  " \
           u"address=%r, state=%r, zip_code=%r, country_code=%r,country=%r, phone_number_1=%r, phone_number_2=%r, skype=%r, email=%r," \
           u"verification_jotform=%r, currencies=%r, tos_url=%r, " \
           u"boleto_fee=%r ,withdraw_brl_bank_fee=%r,withdraw_wallet_fee=%r,withdraw_swift_fee=%r,withdraw_ach_fee=%r," \
           u"transaction_fee_buy=%r,transaction_fee_sell=%r, " \
           u"status=%r, ranking=%r )>"% (
      self.id, self.short_name, self.business_name,
      self.address, self.state, self.zip_code, self.country_code, self.country, self.phone_number_1, self.phone_number_2, self.skype,self.email,
      self.verification_jotform, self.currencies, self.tos_url,
      self.boleto_fee, self.withdraw_brl_bank_fee, self.withdraw_wallet_fee, self.withdraw_swift_fee, self.withdraw_ach_fee,
      self.transaction_fee_buy, self.transaction_fee_sell,
      self.status, self.ranking )


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

  def __repr__(self):
    return u"<Deposit(id=%r, user_id=%r, account_id=%r, currency=%r, amount='%r', status=%r, created=%r, origin=%r)>" % (
      self.id, self.user_id, self.account_id, self.currency, self.amount, self.status, self.created, self.origin )


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

    UserEmail.create( session = session,
                      user_id = user_id,
                      subject = u"Redefina a sua senha.",
                      template= "password_reset_ptBR.txt",
                      params= '{"token":"' + token + '"}')


class UserEmail(Base):
  __tablename__   = 'user_email'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('user_email', order_by=id))
  subject         = Column(String,        nullable=False)
  body            = Column(String,        nullable=True)
  template        = Column(String,        nullable=True)
  params          = Column(String,        nullable=True)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)

  @staticmethod
  def create( session, user_id, subject, template=None, params=None, body = None ):
    user_email = UserEmail( user_id = user_id,
                            subject = subject,
                            body    = body)
    session.add(user_email)
    session.flush()

    msg = {
      'MsgType' : 'C',
      'EmailThreadID': user_email.id,
      'OrigTime': user_email.created,
      'To': user_email.user.email,
      'Subject' : subject,
      'EmailType': '0',
      'RawDataLength': 0,
      'RawData': '',
      'Template':'',
      'Params':'{}'
    }

    if body:
      msg['RawData'] = body
      msg['RawDataLength'] = len(body)

    if template:
      msg['Template'] = template

    if params:
      msg['Params'] = params

    application.publish( user_id, msg )

    application.publish( 'EMAIL' , msg )

    return  user_email


class Withdraw(Base):
  __tablename__   = 'withdraws'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  account_id      = Column(Integer,       ForeignKey('users.id'))
  username        = Column(String,        nullable=False)
  currency        = Column(String,        nullable=False)
  amount          = Column(Integer,       nullable=False)

  type            = Column(String,        nullable=False)

  # withdraw to digital currencies
  wallet          = Column(String)

  # withdraw to Brazilian banks
  bank_number     = Column(String) # Brazilian banks have a number
  bank_name       = Column(String)
  account_name    = Column(String)
  account_number  = Column(String)
  account_branch  = Column(String)  # Agencia
  cpf_cnpj        = Column(String)

  # withdraw to international banks
  address         = Column(String)
  city            = Column(String)
  postal_code     = Column(String)
  region_state    = Column(String)
  country         = Column(String)
  bank_swift      = Column(String)
  intermediate_swift = Column(String)

  # for US Banks
  routing_number  = Column(String)

  confirmation_token = Column(String,     index=True, unique=True)
  status          = Column(String(1),     nullable=False, default='0', index=True)
  created         = Column(DateTime,      nullable=False, default=datetime.datetime.now, index=True)
  reason          = Column(String)

  def as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}

  @staticmethod
  def user_confirm(session, confirmation_token):
    withdraw_data = session.query(Withdraw).filter_by(confirmation_token=confirmation_token).first()
    if not withdraw_data:
      return  None

    withdraw_data.status = '1'
    session.add(withdraw_data)
    session.flush()

    ##### Doing the withdraw manually during launch
    # TODO: Check if the user has enough balance to complete the operation
    # TODO: Check if the user has exceed the 24 hours withdraw limit
    # TODO: update the user balance
    # TODO: execute the transfer
    # TODO: change the withdraw status to confirmed by the user

    return  withdraw_data

  @staticmethod
  def get_list(session, user_id, status_list, page_size, offset):
    return session.query(Withdraw).filter_by( user_id = user_id)\
                                  .filter(Withdraw.status.in_( status_list ))\
                                  .order_by(Withdraw.created.desc()).limit( page_size ).offset( offset )


  @staticmethod
  def create(session, user, *args, **kwargs ):
    import uuid
    confirmation_token = uuid.uuid4().hex

    withdraw_record = Withdraw(user_id            = user.id,
                               account_id         = user.id,
                               username           = user.username,
                               type               = kwargs.get('Type'         ).upper(),
                               currency           = kwargs.get('Currency'     ),
                               amount             = kwargs.get('Amount'       ),
                               confirmation_token = confirmation_token)

    withdraw_record.wallet              = kwargs.get('Wallet'       ) if 'Wallet'        in kwargs else None
    withdraw_record.bank_number         = kwargs.get('BankNumber'   ) if 'BankNumber'    in kwargs else None
    withdraw_record.bank_name           = kwargs.get('BankName'     ) if 'BankName'      in kwargs else None
    withdraw_record.account_name        = kwargs.get('AccountName'  ) if 'AccountName'   in kwargs else None
    withdraw_record.account_number      = kwargs.get('AccountNumber') if 'AccountNumber' in kwargs else None
    withdraw_record.account_branch      = kwargs.get('AccountBranch') if 'AccountBranch' in kwargs else None
    withdraw_record.cpf_cnpj            = kwargs.get('CPFCNPJ'      ) if 'CPFCNPJ'       in kwargs else None
    withdraw_record.address             = kwargs.get('Address'      ) if 'Address'       in kwargs else None
    withdraw_record.city                = kwargs.get('City'         ) if 'City'          in kwargs else None
    withdraw_record.postal_code         = kwargs.get('PostalCode'   ) if 'PostalCode'    in kwargs else None
    withdraw_record.region_state        = kwargs.get('RegionState'  ) if 'RegionState'   in kwargs else None
    withdraw_record.country             = kwargs.get('Country'      ) if 'Country'       in kwargs else None
    withdraw_record.bank_swift          = kwargs.get('BankSwift'    ) if 'BankSwift'     in kwargs else None
    withdraw_record.intermediate_swift  = kwargs.get('IntermediateSwift') if 'IntermediateSwift' in kwargs else None
    session.add(withdraw_record)
    session.flush()

    formatted_amount = Currency.format_number( session, withdraw_record.currency, withdraw_record.amount / 1.e8 )

    template_name       = "withdraw_confirmation_%s_ptBR.txt" % withdraw_record.type.lower()
    template_parameters =  withdraw_record.as_dict()
    template_parameters['amount'] = formatted_amount

    UserEmail.create( session = session,
                      user_id = user.id,
                      subject = u"[BitEx] Confirm withdraw operation.",
                      template=template_name,
                      params  = json.dumps(template_parameters, cls=JsonEncoder))

    return withdraw_record




  @staticmethod
  def create_brl_bank_transfer_withdraw(session, user, amount, bank_number,
                                        bank_name, account_name, account_number, account_branch, cpf_cnpj):
    import uuid
    confirmation_token = uuid.uuid4().hex
    withdraw_record = Withdraw(user_id        = user.id,
                               account_id     = user.id,
                               username       = user.username,
                               currency       = 'BRL',
                               type           = 'BBT',  # BBT - Brazil Bank Transfer
                               amount         = amount,
                               bank_number    = bank_number,
                               bank_name      = bank_name,
                               account_name   = account_name,
                               account_number = account_number,
                               account_branch = account_branch,
                               cpf_cnpj       = cpf_cnpj,
                               confirmation_token = confirmation_token)
    session.add(withdraw_record)
    session.flush()

    formatted_amount = Currency.format_number( session, 'BRL', amount / 1.e8 )

    UserEmail.create( session = session,
                      user_id = user.id,
                      subject = u"[BitEx] Confirme a operação de saque.",
                      template= "withdraw_confirmation_bbt_ptBR.txt",
                      params= '{"token":"' + confirmation_token + '", '\
                              '"amount":"' + formatted_amount + '", '\
                              '"username":"' + user.username + '",'\
                              '"currency":"BRL",'\
                              '"created":"' + str(withdraw_record.created) + '",'\
                              '"bank_number":"' + bank_number + '",'\
                              '"bank_name":"' + bank_name + '",'\
                              '"account_name":"' + account_name + '",'\
                              '"account_number":"' + account_number + '",'\
                              '"account_branch":"' + account_branch + '",'\
                              '"cpf_cnpj":"' + cpf_cnpj + '"}')
    return withdraw_record

  @staticmethod
  def create_crypto_coin_withdraw( session, user, currency, amount, wallet ):
    import uuid
    confirmation_token = uuid.uuid4().hex
    withdraw_record = Withdraw(user_id    = user.id,
                               account_id = user.id,
                               username   = user.username,
                               currency   = currency,
                               type       = 'CRY',  # CRY - Crypto Coin Transfer
                               amount     = amount,
                               wallet     = wallet,
                               confirmation_token = confirmation_token)

    session.add(withdraw_record)
    session.flush()

    formatted_amount = Currency.format_number( session, currency, amount / 1.e8 )

    UserEmail.create( session = session,
                      user_id = user.id,
                      subject = u"[BitEx] Confirme a operação de saque.",
                      template= "withdraw_confirmation_cry_ptBR.txt",
                      params= '{"token":"' + confirmation_token + '", ' \
                               '"amount":"' + formatted_amount + '", '\
                               '"username":"' + user.username + '",'\
                               '"currency":"' + currency + '",'\
                               '"created":"' + str(withdraw_record.created) + '",'\
                               '"wallet":"' + wallet + '"}')
    return withdraw_record

  def __repr__(self):
    return u"<Withdraw(id=%r, user_id=%r, account_id=%r, username=%r, currency=%r, type=%r, amount='%r', " \
           u"wallet=%r, "\
           u"bank_number=%r, bank_name=%r, account_name=%r, account_number=%r, account_branch=%r, cpf_cnpj=%r, "\
           u"address=%r, city=%r, postal_code=%r, region_state=%r, country=%r, bank_swift=%r, intermediate_swift=%r, " \
           u"routing_number=%r,"\
           u"confirmation_token=%r, status=%r, created=%r, reason=%r)>" % (
      self.id, self.user_id, self.account_id, self.username, self.currency, self.type,self.amount,
      self.wallet,
      self.bank_number, self.bank_name, self.account_name, self.account_number, self.account_branch, self.cpf_cnpj,
      self.address, self.city, self.postal_code, self.region_state, self.country, self.bank_swift, self.intermediate_swift,
      self.routing_number,
      self.confirmation_token, self.status, self.created, self.reason)


class Order(Base):
  __tablename__   = 'orders'

  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  foreign_keys=[user_id])
  username        = Column(String(15),    nullable=False )
  account_id      = Column(Integer,       ForeignKey('users.id'))
  account_user    = relationship("User",  foreign_keys=[account_id] )
  account_username= Column(String(15),    nullable=False )
  broker_id       = Column(Integer,       ForeignKey('users.id'))
  broker_user     = relationship("User",  foreign_keys=[broker_id] )
  broker_username = Column(String(15),    nullable=False )
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
  fee             = Column(Integer,       nullable=False, default=0)

  
  def __init__(self, *args, **kwargs):
    if 'order_qty' in kwargs and 'leaves_qty' not in kwargs:
      kwargs['leaves_qty'] = kwargs.get('order_qty')

    if 'user' in kwargs and 'username' not in kwargs:
      kwargs['username'] = kwargs.get('user').username

    super(Order, self).__init__(*args, **kwargs)


  def __repr__(self):
    return "<Order(id=%r, user_id=%r, username=%r,account_id=%r,account_username=%r, client_order_id=%r, " \
           "broker_id=%r, broker_username=%r," \
           "symbol=%r, side=%r, type=%r, price=%r, order_qty=%r, cum_qty=%r, leaves_qty=%r, " \
           "created=%r, last_price=%r,  cxl_qty=%r, last_qty=%r, status=%r, average_price=%r, fee=%r)>" \
            % (self.id, self.user_id, self.username, self.account_id, self.account_username, self.client_order_id,
               self.broker_id, self.broker_username,
               self.symbol, self.side, self.type, self.price,  self.order_qty, self.cum_qty, self.leaves_qty,
               self.created, self.last_price, self.cxl_qty , self.last_qty, self.status, self.average_price, self.fee)

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

  @staticmethod
  def get_order_by_client_order_id(session, status_list, user_id, client_order_id):
    return session.query(Order).filter(Order.status.in_( status_list  )).filter_by( user_id = user_id ).filter_by( client_order_id =  client_order_id  ).first()

  @staticmethod
  def get_order_by_order_id(session, status_list, order_id):
    return session.query(Order).filter(Order.status.in_( status_list  )).filter_by( id = order_id  ).first()

  @staticmethod
  def get_list_by_user_id(session, status_list, user_id, page_size=None, offset=None ):
    if not page_size:
      return session.query(Order).filter(Order.status.in_(status_list)).filter_by( user_id = user_id ).order_by(Order.created.desc())
    else:
      return session.query(Order).filter(Order.status.in_(status_list)).filter_by( user_id = user_id ).order_by(Order.created.desc()).limit( page_size ).offset( offset )

  @staticmethod
  def get_list_by_account_id(session, status_list, user_id, page_size=None, offset=None ):
    if not page_size:
      return session.query(Order).filter(Order.status.in_(status_list)).filter_by( account_id = user_id ).order_by(Order.created.desc())
    else:
      return session.query(Order).filter(Order.status.in_(status_list)).filter_by( account_id = user_id ).order_by(Order.created.desc()).limit( page_size ).offset( offset )

  def match(self, other, execute_qty):
    if self.is_buy and other.is_sell:
      if self.price >= other.price:
        return min( execute_qty, other.leaves_qty)
    elif self.is_sell and other.is_buy:
      if self.price <= other.price:
        return min( execute_qty, other.leaves_qty)
    return  0

  def get_available_qty_to_execute(self, session, side, qty, price):
    """This function returns qty that are available for execution"""
    balance_price =  Balance.get_balance(session, self.account_id, self.broker_id, self.symbol[3:])
    balance_qty   =  Balance.get_balance(session, self.account_id, self.broker_id, self.symbol[:3])

    if side == '1' : # buy
      qty_to_buy = min( qty, int((float(balance_price)/float(price)) * 1e8))
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

    self.average_price = ((price * qty) + (self.cum_qty * self.average_price )) / ( self.cum_qty + qty )
    self.cum_qty += qty
    self.leaves_qty -= qty
    self.last_price = price
    self.last_qty = qty
    self._adjust_status()

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
    return "<Trade(id=%r, order_id:%r, counter_order_id:%r, buyer_username=%r,seller_username=%r,  " \
           "side:%r, symbol=%r, size:%r, price:%r, created=%r, trade_type=%r )>"\
    % (self.id, self.order_id, self.counter_order_id, self.buyer_username, self.seller_username,
       self.side, self.symbol, self.size, self.price, self.created, self.trade_type)

  @staticmethod
  def create(session, order,counter_order, symbol, size,price):
    buyer_username = order.account_user.username
    seller_username = counter_order.account_user.username
    if order.is_sell:
      tmp_username = buyer_username
      buyer_username = seller_username
      seller_username = tmp_username

    Ledger.execute_order(session, order, counter_order, symbol, size, price)

    trade =  Trade( id                = str(order.id) + '.' + str(counter_order.id),
                    order_id          = order.id,
                    counter_order_id  = counter_order.id,
                    buyer_username    = buyer_username,
                    seller_username   = seller_username,
                    side              = order.side,
                    symbol            = symbol,
                    size              = size,
                    price             = price,
                    created           = datetime.datetime.now())
    session.add(trade)

    return trade


  @staticmethod
  def get_last_100_trades(session, symbol):
    trades = session.query(Trade).filter_by(symbol=symbol).order_by(Trade.created.desc() ).limit(100)
    return trades

class Boleto(Base):
  __tablename__        = 'boleto'

  id                   = Column(Integer,   primary_key=True)
  broker_id            = Column(Integer,    ForeignKey('users.id'))

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

  def __repr__(self):
    return u"<Boleto(id=%r, broker_id=%r, " \
           u"codigo_banco=%r,carteira=%r,aceite=%r,valor_documento=%r, valor=%r, " \
           u"data_vencimento=%r,data_documento=%r, data_processamento=%r, numero_documento=%r," \
           u"agencia_cedente=%r,  conta_cedente=%r, cedente=%r, cedente_documento=%r ,cedente_cidade=%r," \
           u"cedente_uf=%r , cedente_endereco=%r, cedente_bairro=%r, cedente_cep=%r, " \
           u"sacado_nome=%r,sacado_documento=%r,sacado_cidade=%r,sacado_uf=%r,sacado_endereco=%r,sacado_bairro=%r,sacado_cep=%r," \
           u"quantidade=%r,especie_documento=%r,especie=%r,moeda=%r,demonstrativo=%r,local_pagamento=%r," \
           u"instrucoes=%r )>" % (
      self.id, self.broker_id,
      self.codigo_banco, self.carteira, self.aceite, self.valor_documento, self.valor,
      self.data_vencimento, self.data_documento, self.data_processamento, self.numero_documento,
      self.agencia_cedente, self.conta_cedente, self.cedente, self.cedente_documento, self.cedente_cidade,
      self.cedente_uf, self.cedente_endereco, self.cedente_bairro, self.cedente_cep,
      self.sacado_nome, self.sacado_documento, self.sacado_cidade, self.sacado_uf, self.sacado_endereco, self.sacado_bairro, self.cedente_cep,
      self.quantidade, self.especie_documento, self.especie, self.moeda, self.demonstrativo, self.local_pagamento,
      self.instrucoes)

  def __unicode__(self):
    return self.numero_documento

  @staticmethod
  def get_boleto(session, boleto_id):
    return session.query(Boleto).filter_by(id=boleto_id).first()

  @staticmethod
  def process_boleto_payment(session, broker_id, boleto_id, currency, amount ):
    boleto = session.query(Boleto).filter_by(id= boleto_id ).filter_by(broker_id=broker_id).first()

    #TODO: implement boleto payment.
    pass

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
  broker_id             = Column(Integer,    ForeignKey('users.id'), index=True)

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

  def __repr__(self):
    return u"<BoletoOptions(id=%r, broker_id=%r, description=%r, codigo_banco=%r, carteira=%r,last_numero_documento=%r,  "\
           u"agencia_cedente=%r, conta_cedente=%r, cedente=%r, cedente_documento=%r, cedente_cidade=%r, " \
           u"cedente_uf=%r, cedente_endereco=%r, cedente_bairro=%r,cedente_cep=%r )>"\
    % (self.id, self.broker_id, self.description, self.codigo_banco, self.carteira, self.last_numero_documento,
       self.agencia_cedente, self.conta_cedente, self.cedente, self.cedente_documento, self.cedente_cidade,
      self.cedente_uf, self.cedente_endereco, self.cedente_bairro, self.cedente_cep)

  @staticmethod
  def get_boleto_option(session, boleto_option_id):
    return session.query(BoletoOptions).filter_by(id=boleto_option_id).first()

  @staticmethod
  def get_list(session, broker_id):
    return  session.query(BoletoOptions).filter_by(broker_id=broker_id)

  def generate_boleto(self,session, user, value):
    self.last_numero_documento +=  1

    boleto = Boleto()
    boleto.broker_id          = self.broker_id
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

    session.add(self)
    session.add(boleto)
    session.flush()

    return boleto



Base.metadata.create_all(engine)

def db_bootstrap(session):
  if not User.get_user(session, 'admin'):
    e = User(id=0, username='admin', email='admin@bitex.com.br',  broker_id=None, password='abc12345',
             country_code='', state='',
             verified=1, is_staff=True, is_system=False, is_broker=True)

    session.add(e)
    session.commit()

  if not User.get_user(session, 'nybitcoincenter'):
    e = User(id=9000001, username='nybitcoincenter', email='admin@nybitcoincenter.com',  broker_id=None, password='abc12345',
             country_code='US', state='NY',
             verified=1, is_staff=False, is_system=False, is_broker=True)

    session.add(e)
    session.commit()

  if not Broker.get_broker(session, 0):
    e = Broker(id=0, short_name=u'None', business_name=u'None',
               address=u'', state=u'', zip_code=u'', country='', country_code='',
               phone_number_1='+1 (917) 753-1359', phone_number_2=None, skype='blinktrade', email=None,
               verification_jotform='https://secure.jotform.us/form/31441083828150?user_id=%s&username=%s',
               currencies='BTC', tos_url=u'http://bitex.com.br/tos/bitex/',
               boleto_fee=None ,withdraw_brl_bank_fee=None,withdraw_wallet_fee=None,withdraw_swift_fee=None,
               withdraw_ach_fee=None,transaction_fee_buy=None,transaction_fee_sell=None, status=u'1', ranking=0)
    session.add(e)
    session.commit()

  if not Broker.get_broker(session, 9000001):
    e = Broker(id=9000001, short_name=u'NyBitcoinCenter', business_name=u'Bitcoin Center NYC',
               address=u'40 Broad Street', state=u'NY', zip_code=u'10004', country_code='US', country='United States',
               phone_number_1='+1 (646) 879-5357', phone_number_2=None, skype='nycbitcoincenter', email='NYCBitcoinCenter@gmail.com',
               verification_jotform='https://secure.jotform.us/form/31441083828150?user_id=%s&username=%s',
               currencies='USD', tos_url=u'http://nycbitcoincenter.com/tos/bitex/',
               boleto_fee=None ,withdraw_brl_bank_fee=None,withdraw_wallet_fee=None,withdraw_swift_fee=None,
               withdraw_ach_fee=None,transaction_fee_buy=None,transaction_fee_sell=None, status=u'1', ranking=1)
    session.add(e)
    session.commit()


  currencies = [
    [ 'USD' , '$'       , 'Dollar'   ,  False, 100        , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'BRL' , 'R$'      , 'Real'     ,  False, 100        , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'EUR' , u'\u20ac' , 'Euro'     ,  False, 100        , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'ARS' , '$'       , 'Peso'     ,  False, 100        , '{:,.2f}', u'$ #,##0.00;($ #,##0.00)'  ],
    [ 'GBP' , u'\u00a3' , 'Pound'    ,  False, 100        , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'JPY' , u'\u00a5' , 'Yen'      ,  False, 1          , '{:,.2f}', u'\u00a4 #,0;(\u00a4 #0)'  ],
    [ 'CNY' , u'\u00a5' , 'Yuan'     ,  False, 100        , '{:,.2f}', u'\u00a5 #,##0.00;(\u00a5 #,##0.00)'  ],

    #[ 'BTC' , u'\u0e3f' , 'Bitcoin'  ,  True,  100000000  , '{:,.8f}', u'\u0e3f #,##0.00000000;(\u0e3f #,##0.00000000)'],
    #[ 'LTC' , u'\u0141' , 'Litecoin' ,  True,  100000000  , '{:,.8f}', u'\u0141 #,##0.00000000;(\u0141 #,##0.00000000)']

    [ 'BTC' , u'\u0e3f' , 'Bitcoin'  ,  True,  100000  , '{:,.5f}', u'\u0e3f #,##0.000;(\u0e3f #,##0.000)'],
    [ 'LTC' , u'\u0141' , 'Litecoin' ,  True,  100000  , '{:,.5f}', u'\u0141 #,##0.000;(\u0141 #,##0.000)']
  ]
  for c in currencies:
    if Currency.get_currency(session,c[0]) :
      continue
    e = Currency(code= c[0], sign=c[1], description=c[2], is_crypto=c[3], pip=c[4], format_python=c[5], format_js=c[6])
    session.add(e)
    session.commit()

  instruments = [
    ['BTCUSD', 'USD', "BTC / USD" ],
  ]
  for inst in instruments:
    if Instrument.get_instrument(session, inst[0]):
      continue
    e = Instrument(symbol=inst[0], currency=inst[1], description=inst[2])
    session.add(e)
    session.commit()


  # create 1000 test users for the NYC Bitcoin Center - Satoshi square
  for x in xrange(2, 1000):
    if not User.get_user(session, str(x)):
      e = User(id=x, username=str(x), email= str(x) + '@nybitcoincenter.com',  broker_id=9000001, password='password' + str(x),
               country_code='US', state='NY',
               verified=1, is_staff=False, is_system=False, is_broker=False)
      session.add(e)

      # credit each user with 100 BTC, 100k USD and 200k BRL
      Ledger.deposit(session, x, 1, 9000001, 9000001, 'BTC', 100e8)
      Ledger.deposit(session, x, 1, 9000001, 9000001, 'USD', 100000e8)
      Ledger.deposit(session, x, 1, 9000001, 9000001, 'BRL', 250000e8)
      session.commit()


  if not BoletoOptions.get_boleto_option(session, 1 ):
    bo = BoletoOptions(id=1, broker_id=9000001,
                       description=u'Banco Itau', codigo_banco=u'341', carteira=u'127',
                       last_numero_documento=5028,
                       agencia_cedente=u'4000', conta_cedente=u'44444',
                       cedente=u'BitEx', cedente_documento=u'1000', cedente_cidade=u'Sao Paulo',
                       cedente_uf=u'SP', cedente_endereco=u'Av. XXXXX',
                       cedente_bairro=u'Bela Cintra',cedente_cep=u'11000-000' )
    session.add(bo)
    session.commit()



  #TODO: create a BoletoOption

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

from tornado import template

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

class UserAlreadyExistsException(Exception):
  pass

class BrokerDoesNotExistsException(Exception):
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
  human_format_python   = Column(String(25))
  human_format_js       = Column(String(25))

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
    return u"<Currency(code=%r, sign=%r, description=%r, is_crypto=%r, pip=%r, format_python=%r, format_js=%r, human_format_python=%r, human_format_js=%r)>" % (
      self.code, self.sign, self.description, self.is_crypto, self.pip, self.format_python, self.format_js, self.human_format_python, self.human_format_js
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

  broker_id       = Column(Integer, ForeignKey('users.id'), index=True )
  broker          = relationship("User", remote_side=[id])
  broker_username = Column(String(15), index=True)

  state           = Column(String(30), index=True )
  country_code    = Column(String(2),  nullable=False, index=True)

  password_algo   = Column(String(8), nullable=False)
  password_salt   = Column(String(128), nullable=False)
  password        = Column(String(128), nullable=False)

  verified        = Column(Integer, nullable=False, default=0, index=True)
  verification_data = Column(String(255), index=True )
  is_staff        = Column(Boolean, nullable=False, default=False)
  is_system       = Column(Boolean, nullable=False, default=False)
  is_broker       = Column(Boolean, nullable=False, default=False)

  created         = Column(DateTime, default=datetime.datetime.now, nullable=False)
  last_login      = Column(DateTime, default=datetime.datetime.now, nullable=False)

  two_factor_enabled  = Column(Boolean, nullable=False, default=False)
  two_factor_secret   = Column(String(50), nullable=True, index=False)

  transaction_fee_buy   = Column(Integer, nullable=True, default=0)
  transaction_fee_sell  = Column(Integer, nullable=True, default=0)

  def __repr__(self):
    return u"<User(id=%r, username=%r, email=%r,  broker_id=%r, " \
           u" password_algo=%r, password_salt=%r, password=%r,"\
           u" state=%r, country_code=%r, transaction_fee_buy=%r, transaction_fee_sell=%r,"\
           u" verified=%r, verification_data=%r, is_staff=%r, is_system=%r, is_broker=%r,  created=%r, last_login=%r )>" \
          % (self.id, self.username, self.email, self.broker_id,
             self.password_algo, self.password_salt, self.password,
             self.state, self.country_code, self.transaction_fee_buy, self.transaction_fee_sell,
             self.verified, self.verification_data, self.is_staff, self.is_system, self.is_broker, self.created, self.last_login)

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
  def signup(session, username, email, password, state, country_code, broker_id):
    if User.get_user( session, username=username , email=email):
      raise UserAlreadyExistsException()

    broker = Broker.get_broker( session, broker_id)
    if not broker:
      raise BrokerDoesNotExistsException()

    # signup the user
    # create the user on Database
    u = User( username            = username,
              email               = email,
              password            = password,
              state               = state,
              country_code        = country_code,
              broker_id           = broker_id,
              broker_username     = broker.user.username)

    session.add(u)
    session.commit()

    UserEmail.create( session = session,
                      user_id = u.id,
                      subject = u"Welcome to BitEX",
                      template= "welcome",
                      language= 'ptBR',
                      params=  json.dumps( {
                        'username': u.username,
                        'email': u.email,
                        'state': u.state,
                        'country_code': u.country_code,
                        'id': u.id,
                        'broker_id': u.broker_id,
                        'broker_username': u.broker_username}))


    return u, broker


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

  def set_verified(self, session, verified, verification_data = None ):
    if self.verified != verified:
      self.verified = verified

      if verification_data:
        self.verification_data = str(verification_data)

      session.add(self)
      session.flush()

      verify_customer_refresh_msg = dict()
      verify_customer_refresh_msg['MsgType'] = 'B11'
      verify_customer_refresh_msg['ClientID'] = self.id
      verify_customer_refresh_msg['BrokerID'] = self.broker_id
      verify_customer_refresh_msg['Username'] = self.username
      verify_customer_refresh_msg['Verified'] = self.verified
      verify_customer_refresh_msg['VerificationData'] = verification_data

      application.publish( self.id,  verify_customer_refresh_msg  )

      if self.verified == 1:
        UserEmail.create( session = session,
                          user_id = self.broker_id,
                          subject = u"Customer has submitted his data",
                          template= "customer_verification_submit",
                          language= 'ptBR',
                          params=  json.dumps({
                            'username': self.username,
                            'email': self.email,
                            'state': self.state,
                            'country_code': self.country_code,
                            'id': self.id,
                            'broker_id': self.broker_id,
                            'verified': self.verified,
                            'verification_data': verification_data,
                            'broker_username': self.broker_username}))
      elif self.verified > 1:
        UserEmail.create( session = session,
                          user_id = self.id,
                          subject = u"Your account has been verified",
                          template= "your_account_has_been_verified",
                          language= 'ptBR',
                          params=  json.dumps({
                            'username': self.username,
                            'email': self.email,
                            'state': self.state,
                            'country_code': self.country_code,
                            'id': self.id,
                            'broker_id': self.broker_id,
                            'verified': self.verified,
                            'verification_data': verification_data,
                            'broker_username': self.broker_username}))
      return True
    return False

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
    balance_update_msg['ClientID'] = account_id
    balance_update_msg[broker_id] = { currency: balance_obj.balance }
    application.publish( account_id,  balance_update_msg  )

    return balance_obj.balance


class Ledger(Base):
  __tablename__         = 'ledger'
  id                    = Column(Integer,       primary_key=True)
  currency              = Column(String(4),     ForeignKey('currencies.code'),nullable=False)
  account_id            = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  account_name          = Column(String,        nullable=False)
  broker_id             = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  broker_name           = Column(String,        nullable=False)
  payee_id              = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  payee_name            = Column(String,        nullable=False)
  payee_broker_id       = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  payee_broker_name     = Column(String,        nullable=False)
  operation             = Column(String(1),     nullable=False)
  amount                = Column(Integer,       nullable=False)
  balance               = Column(Integer,       nullable=False)
  reference             = Column(String(25),    nullable=False)
  created               = Column(DateTime,      default=datetime.datetime.now, nullable=False)
  description           = Column(String(255))

  def __repr__(self):
    return u"<Ledger(id=%r, currency=%r, account_id=%r, broker_id=%r, payee_id=%r, payee_broker_id=%r," \
                    u"operation=%r,amount=%r,balance=%r,reference=%r, created=%r,description=%r)>" % (
      self.id, self.currency, self.account_id, self.broker_id, self.payee_id, self.payee_broker_id,
      self.operation, self.amount, self.balance, self.reference, self.created, self.description)


  @staticmethod
  def get_list(session, broker_id, account_id, operation_list, page_size, offset, currency=None, filter_array=[]):
    query = session.query(Ledger).filter( Ledger.operation.in_( operation_list ) ).filter(Ledger.broker_id==broker_id)

    if currency:
      query = query.filter( Ledger.currency == currency)

    if account_id:
      query = query.filter( Ledger.account_id == account_id  )

    for filter in filter_array:
      if filter:
        if filter.isdigit():
          query = query.filter( or_( Ledger.description.like('%' + filter + '%' ),
                                     Ledger.reference == filter,
                                     Ledger.amount == int(filter) * 1e8,
                                     Ledger.balance == int(filter) * 1e8
                                     ))
        else:
          query = query.filter( or_( Ledger.description.like('%' + filter + '%' ),
                                     Ledger.reference == filter
                                     ))

    query = query.order_by(Ledger.created)

    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)

    return query

  @staticmethod
  def transfer(session, from_account_id, from_account_name, from_broker_id, from_broker_name, to_account_id, to_account_name, to_broker_id, to_broker_name, currency, amount, reference=None, description=None):
    balance = Balance.update_balance(session, 'DEBIT', from_account_id, from_broker_id, currency, amount)
    ledger = Ledger( currency         = currency,
                     account_id       = from_account_id,
                     account_name     = from_account_name,
                     payee_id         = to_account_id,
                     payee_name       = to_account_name,
                     broker_id        = from_broker_id,
                     broker_name      = from_broker_name,
                     payee_broker_id  = to_broker_id,
                     payee_broker_name= to_broker_name,
                     operation        = 'D',
                     amount           = amount,
                     balance          = balance,
                     reference        = reference,
                     description      = description )
    session.add(ledger)

    balance = Balance.update_balance(session, 'CREDIT', to_account_id, to_broker_id, currency, amount)
    ledger = Ledger( currency         = currency,
                     account_id       = to_account_id,
                     account_name     = to_account_name,
                     payee_id         = from_account_id,
                     payee_name       = from_account_name,
                     broker_id        = to_broker_id,
                     broker_name      = to_broker_name,
                     payee_broker_id  = from_broker_id,
                     payee_broker_name= from_broker_name,
                     operation        = 'C',
                     amount           = amount,
                     balance          = balance,
                     reference        = reference,
                     description      = description )
    session.add(ledger)


  @staticmethod
  def deposit(session, account_id, account_name, payee_id, payee_name, broker_id, broker_name, payee_broker_id, payee_broker_name, currency, amount, reference=None, description=None):
    balance = Balance.update_balance(session, 'CREDIT', account_id, broker_id, currency, amount)
    ledger = Ledger( currency         = currency,
                     account_id       = account_id,
                     account_name     = account_name,
                     payee_id         = payee_id,
                     payee_name       = payee_name,
                     broker_id        = broker_id,
                     broker_name      = broker_name,
                     payee_broker_id  = payee_broker_id,
                     payee_broker_name= payee_broker_name,
                     operation        = 'C',
                     amount           = amount,
                     balance          = balance,
                     reference        = reference,
                     description      = description )
    session.add(ledger)


  @staticmethod
  def withdraw(session, account_id, account_name, payee_id, payee_name, broker_id, broker_name, payee_broker_id, payee_broker_name, currency, amount, reference=None, description=None):
    balance = Balance.update_balance(session, 'DEBIT', account_id, broker_id, currency, amount)
    ledger = Ledger( currency         = currency,
                     account_id       = account_id,
                     account_name     = account_name,
                     payee_id         = payee_id,
                     payee_name       = payee_name,
                     broker_id        = broker_id,
                     broker_name      = broker_name,
                     payee_broker_id  = payee_broker_id,
                     payee_broker_name= payee_broker_name,
                     operation        = 'D',
                     amount           = amount,
                     balance          = balance,
                     reference        = reference,
                     description      = description )
    session.add(ledger)


  @staticmethod
  def execute_order(session, order, counter_order, symbol, qty, price, trade_id):
    total_value = int(float(price) * float(qty)/1e8)

      # adjust balances
    to_symbol = symbol[:3].upper()   #BTC
    from_symbol = symbol[3:].upper() #USD

    balance = Balance.update_balance(session, 'DEBIT' if order.is_buy else 'CREDIT', order.account_id, order.broker_id, from_symbol, total_value )
    order_record_debit = Ledger( currency         = from_symbol,
                                 account_id       = order.account_id,
                                 account_name     = order.account_username,
                                 broker_id        = order.broker_id,
                                 broker_name      = order.broker_username,
                                 payee_id         = counter_order.account_id,
                                 payee_name       = counter_order.account_username,
                                 payee_broker_id  = counter_order.broker_id,
                                 payee_broker_name= counter_order.broker_username,
                                 operation        = 'D'  if order.is_buy else 'C',
                                 amount           = total_value,
                                 balance          = balance,
                                 reference        = trade_id,
                                 description      = 'T')
    session.add(order_record_debit)


    balance = Balance.update_balance(session, 'CREDIT' if order.is_buy else 'DEBIT', counter_order.account_id, counter_order.broker_id, from_symbol, total_value )
    counter_order_record_credit = Ledger(currency     = from_symbol,
                                         account_id   = counter_order.account_id,
                                         account_name = counter_order.account_username,
                                         broker_id    = counter_order.broker_id,
                                         broker_name  = counter_order.broker_username,
                                         payee_id     = order.account_id,
                                         payee_name   = order.account_username,
                                         payee_broker_id = order.broker_id,
                                         payee_broker_name= order.broker_username,
                                         operation    = 'C'  if order.is_buy else 'D',
                                         amount       = total_value,
                                         balance      = balance,
                                         reference    = trade_id,
                                         description  = 'T')
    session.add(counter_order_record_credit)


    balance = Balance.update_balance(session, 'CREDIT' if order.is_buy else 'DEBIT', order.account_id, order.broker_id, to_symbol, qty )
    order_record_credit = Ledger(currency     = to_symbol,
                                 account_id   = order.account_id,
                                 account_name = order.account_username,
                                 broker_id    = order.broker_id,
                                 broker_name  = order.broker_username,
                                 payee_id     = counter_order.account_id,
                                 payee_name   = counter_order.account_username,
                                 payee_broker_id = counter_order.broker_id,
                                 payee_broker_name = counter_order.broker_username,
                                 operation    = 'C'  if order.is_buy else 'D',
                                 amount       = qty,
                                 balance      = balance,
                                 reference    = trade_id,
                                 description  = 'T')
    session.add(order_record_credit)

    balance = Balance.update_balance(session, 'DEBIT' if order.is_buy else 'CREDIT', counter_order.account_id, counter_order.broker_id, to_symbol, qty )
    counter_order_record_debit = Ledger(currency     = to_symbol,
                                        account_id   = counter_order.account_id,
                                        account_name = counter_order.account_username,
                                        broker_id    = counter_order.broker_id,
                                        broker_name  = counter_order.broker_username,
                                        payee_id     = order.account_id,
                                        payee_name   = order.account_username,
                                        payee_broker_id = order.broker_id,
                                        payee_broker_name= order.broker_username,
                                        operation    = 'D' if order.is_buy else 'C',
                                        amount       = qty,
                                        balance      = balance,
                                        reference    = trade_id,
                                        description  = 'T')
    session.add(counter_order_record_debit)

    def process_execution_fee(session,trade_id, order, currency, amount ):
      balance = Balance.update_balance(session, 'DEBIT', order.account_id, order.broker_id, currency, amount )
      order_fee_record = Ledger(currency          = currency,
                                account_id        = order.account_id,
                                account_name      = order.account_username,
                                broker_id         = order.broker_id,
                                broker_name       = order.broker_username,
                                payee_id          = order.broker_id,
                                payee_name        = order.broker_username,
                                payee_broker_id   = order.broker_id,
                                payee_broker_name = order.broker_username,
                                operation         = 'D',
                                amount            = amount,
                                balance           = balance,
                                reference         = trade_id,
                                description       = 'TF')
      session.add(order_fee_record)

      balance = Balance.update_balance(session, 'CREDIT', order.broker_id, order.broker_id, currency, amount )
      broker_fee_record  = Ledger(currency          = currency,
                                  account_id        = order.broker_id,
                                  account_name      = order.broker_username,
                                  broker_id         = order.broker_id,
                                  broker_name       = order.broker_username,
                                  payee_id          = order.account_id,
                                  payee_name        = order.account_username,
                                  payee_broker_id   = order.broker_id,
                                  payee_broker_name = order.broker_username,
                                  operation         = 'C',
                                  amount            = amount,
                                  balance           = balance,
                                  reference         = trade_id,
                                  description       = 'TF')
      session.add(broker_fee_record)

    order_fee_currency = to_symbol if order.is_buy else from_symbol
    order_fee_base_amount = qty if order.is_buy else total_value
    order_fee_amount =  order_fee_base_amount * (order.fee / 10000.)
    if order_fee_amount:
      process_execution_fee(session, trade_id, order,order_fee_currency, order_fee_amount )


    counter_order_fee_currency = to_symbol if counter_order.is_buy else from_symbol
    counter_order_fee_base_amount = qty if counter_order.is_buy else total_value
    counter_order_fee_amount =  counter_order_fee_base_amount * (counter_order.fee / 10000.)
    if counter_order_fee_amount:
      process_execution_fee(session, trade_id, counter_order,counter_order_fee_currency, counter_order_fee_amount )




class Broker(Base):
  __tablename__         = 'brokers'
  id                    = Column(Integer,       ForeignKey('users.id'),  unique=True)
  user                  = relationship("User",  backref=backref('brokers', order_by=id))
  short_name            = Column(String(30),    primary_key=True)
  business_name         = Column(String(30),    nullable=False)
  signup_label          = Column(String(30),    nullable=False)
  address               = Column(String(255),   nullable=False)
  city                  = Column(String(30),    nullable=False)
  state                 = Column(String(30),    nullable=False)
  zip_code              = Column(String(12),    nullable=False)
  country_code          = Column(String(2),     nullable=False)
  country               = Column(String(20),    nullable=False)
  phone_number_1        = Column(String(15),    nullable=False)
  phone_number_2        = Column(String(15))
  skype                 = Column(String(30),    nullable=False)
  email                 = Column(String(15))

  verification_jotform  = Column(String(255),    nullable=False)
  upload_jotform        = Column(String(255),    nullable=False)

  # emails
  withdraw_confirmation_email           = Column(String(255),    nullable=False)
  withdraw_confirmation_email_subject   = Column(String(255),    nullable=False)


  withdraw_structure    = Column(Text,          nullable=False)

  currencies            = Column(String(255),   nullable=False)
  crypto_currencies     = Column(Text,          nullable=False)
  tos_url               = Column(String(255),   nullable=False)

  fee_structure         = Column(Text,          nullable=False)
  transaction_fee_buy   = Column(Integer,       nullable=False, default=0)
  transaction_fee_sell  = Column(Integer,       nullable=False, default=0)

  status                = Column(String(1),     nullable=False, default='0', index=True)
  ranking               = Column(Integer,       nullable=False, default=0, index=True)
  support_url           = Column(String(255),   nullable=False)

  accept_customers_from = Column(Text,   nullable=False)
  is_broker_hub         = Column(Boolean, nullable=False, default=False)

  mem_cache   = {}

  @staticmethod
  def cache_broker(broker_id, broker):
    Broker.mem_cache[broker_id] = broker

  @staticmethod
  def get_broker(session, broker_id):
    if broker_id in Broker.mem_cache:
      return Broker.mem_cache[broker_id]
    broker = session.query(Broker).filter_by(id = broker_id ).first()
    Broker.cache_broker(broker_id, broker)
    return broker

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
           u"address=%r, city=%r, state=%r, zip_code=%r, country_code=%r,country=%r, phone_number_1=%r, phone_number_2=%r, skype=%r, email=%r," \
           u"verification_jotform=%r,upload_jotform=%r, currencies=%r, crypto_currencies=%r, tos_url=%r, " \
           u"fee_structure=%r, withdraw_structure=%r, withdraw_confirmation_email=%r,withdraw_confirmation_email_subject=%r , " \
           u"transaction_fee_buy=%r,transaction_fee_sell=%r, " \
           u"status=%r, ranking=%r, support_url=%r, is_broker_hub=%r ,accept_customers_from=%r )>"% (
      self.id, self.short_name, self.business_name,
      self.address, self.city, self.state, self.zip_code, self.country_code, self.country, self.phone_number_1, self.phone_number_2, self.skype,self.email,
      self.verification_jotform, self.upload_jotform, self.currencies, self.crypto_currencies,  self.tos_url,
      self.fee_structure , self.withdraw_structure, self.withdraw_confirmation_email, self.withdraw_confirmation_email_subject,
      self.transaction_fee_buy, self.transaction_fee_sell,
      self.status, self.ranking, self.support_url, self.is_broker_hub, self.accept_customers_from )


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
                      subject = u"Reset your password.",
                      template= "password_reset",
                      language= 'ptBR',
                      params= '{"token":"' + token + '"}')


class UserEmail(Base):
  __tablename__   = 'user_email'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('user_email', order_by=id))
  subject         = Column(String,        nullable=False)
  body            = Column(String,        nullable=True)
  template        = Column(String,        nullable=True)
  language        = Column(String,        nullable=True)
  params          = Column(String,        nullable=True)
  created         = Column(DateTime,      default=datetime.datetime.now, nullable=False)

  @staticmethod
  def create( session, user_id, subject, template=None, language=None, params=None, body = None ):
    user_email = UserEmail( user_id = user_id,
                            subject = subject)
    if template:
      user_email.template = template
    if language:
      user_email.language = language
    if params:
      user_email.params = params
    if body:
      user_email.body = body

    session.add(user_email)
    session.flush()

    msg = {
      'MsgType'       : 'C',
      'EmailThreadID' : user_email.id,
      'OrigTime'      : user_email.created,
      'To'            : user_email.user.email,
      'Subject'       : subject,
      'Language'      : language,
      'EmailType'     : '0',
      'RawDataLength' : 0,
      'RawData'       : '',
      'Template'      : '',
      'Params'        : '{}'
    }
    application.publish( user_id, msg )

    if body:
      msg['RawData'] = body
      msg['RawDataLength'] = len(body)

    if template:
      msg['Template'] = template

    if language:
      msg['Language'] = language

    if params:
      msg['Params'] = params


    application.publish( 'EMAIL' , msg )

    return  user_email


class Withdraw(Base):
  __tablename__   = 'withdraws'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  account_id      = Column(Integer,       ForeignKey('users.id'))
  broker_id       = Column(Integer,       ForeignKey('users.id'))
  broker_username = Column(String,        nullable=False)
  username        = Column(String,        nullable=False)
  currency        = Column(String,        nullable=False, index=True)
  amount          = Column(Integer,       nullable=False, index=True)

  method          = Column(String,        nullable=False, index=True)
  data            = Column(Text,          nullable=False, index=True)

  confirmation_token = Column(String,     index=True, unique=True)
  status          = Column(String(1),     nullable=False, default='0', index=True)
  created         = Column(DateTime,      nullable=False, default=datetime.datetime.now, index=True)
  reason_id       = Column(Integer)
  reason          = Column(String)

  percent_fee     = Column(Integer,    nullable=False, default=0)
  fixed_fee       = Column(Integer,    nullable=False, default=0)
  paid_amount     = Column(Integer,    nullable=False, default=0, index=True)

  def as_dict(self):
    import json
    obj = { c.name: getattr(self, c.name) for c in self.__table__.columns if c.name != 'data' }
    obj.update(json.loads(self.data))
    return obj


  @staticmethod
  def user_confirm(session, confirmation_token):
    withdraw_data = session.query(Withdraw).filter_by(confirmation_token=confirmation_token).first()
    if not withdraw_data:
      return  None

    withdraw_data.status = '1'
    session.add(withdraw_data)
    session.flush()

    return  withdraw_data

  def set_in_progress(self, session, percent_fee=0, fixed_fee=0):
    if self.status != '1':
      return

    self.percent_fee = percent_fee
    self.fixed_fee = fixed_fee

    total_percent_fee_value = ((self.amount - self.fixed_fee) * (self.percent_fee/10000.0))
    total_fees = total_percent_fee_value + self.fixed_fee
    self.paid_amount = self.amount + total_fees


    current_balance = Balance.get_balance(session, self.account_id, self.broker_id, self.currency)
    if self.paid_amount > current_balance:
      self.cancel(session, -1 ) # Insufficient funds
      return

    self.status = '2'
    Ledger.transfer(session,
                    self.account_id,        # from_account_id
                    self.username,          # from_account_name
                    self.broker_id,         # from_broker_id
                    self.broker_username,   # from_broker_name
                    self.broker_id,         # to_account_id
                    self.broker_username,   # to_account_name
                    self.broker_id,         # to_broker_id
                    self.broker_username,   # to_broker_name
                    self.currency,          # currency
                    self.amount,            # amount
                    str(self.id),           # reference
                    'W'                     # descriptions
    )


    session.add(self)
    session.flush()

  def set_as_complete(self, session, data=None):
    if self.status != '2':
      return

    new_data = {}
    new_data.update(json.loads(self.data))
    if data:
      new_data.update( data )
      if self.data != json.dumps(new_data):
        self.data = json.dumps(new_data)

    self.status = '4' # COMPLETE

    total_percent_fee_value = ((self.amount - self.fixed_fee) * (self.percent_fee/10000.0))
    total_fees = total_percent_fee_value + self.fixed_fee

    if total_fees:
      Ledger.transfer(session,
                      self.account_id,        # from_account_id
                      self.username,          # from_account_name
                      self.broker_id,         # from_broker_id
                      self.broker_username,   # from_broker_name
                      self.broker_id,         # to_account_id
                      self.broker_username,   # to_account_name
                      self.broker_id,         # to_broker_id
                      self.broker_username,   # to_broker_name
                      self.currency,          # currency
                      total_fees,             # amount
                      str(self.id),           # reference
                      'WF'                    # descriptions
                      )


    session.add(self)
    session.flush()

  def cancel(self, session, reason_id = None, reason=None):
    if self.status == '4':
      return  self

    if self.status == '2': # in progress or completed
      #revert the transaction
      Ledger.transfer(session,
                      self.broker_id,         # from_account_id
                      self.broker_username,   # from_account_name
                      self.broker_id,         # from_broker_id
                      self.broker_username,   # from_broker_name
                      self.account_id,        # to_account_id
                      self.username,          # to_account_name
                      self.broker_id,         # to_broker_id
                      self.broker_username,   # to_broker_name
                      self.currency,          # currency
                      total_fees,             # amount
                      str(self.id),           # reference
                      'W'                     # descriptions
      )

    self.status = '8' # CANCELLED
    self.reason_id = reason_id
    self.reason = reason

    session.add(self)
    session.flush()

    formatted_amount = Currency.format_number( session, self.currency, self.amount / 1.e8 )

    template_name       = "withdraw_cancelled_%s" % self.method.lower()
    template_parameters = self.as_dict()
    template_parameters['amount'] = formatted_amount

    UserEmail.create( session = session,
                      user_id = self.user_id ,
                      subject = u"Withdraw cancelled.",
                      template=template_name,
                      language='pt_BR',
                      params  = json.dumps(template_parameters, cls=JsonEncoder))
    return self


  @staticmethod
  def get_withdraw(session, withdraw_id):
    return session.query(Withdraw).filter_by(id=withdraw_id).first()


  @staticmethod
  def get_list(session, broker_id, account_id, status_list, page_size, offset, filter_array) :
    query = session.query(Withdraw).filter( Withdraw.status.in_( status_list ) ).filter(Withdraw.broker_id==broker_id)

    if account_id:
      query = query.filter( Withdraw.account_id == account_id  )

    for filter in filter_array:
      if filter:
        if filter.isdigit():
          query = query.filter( or_( Withdraw.data.like('%' + filter + '%' ),
                                     Withdraw.currency == filter,
                                     Withdraw.amount == int(filter) * 1e8,
                                     ))
        else:
          query = query.filter( or_( Withdraw.data.like('%' + filter + '%'),
                                     Withdraw.currency == filter ) )

    query = query.order_by(Withdraw.created.desc())

    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)

    return query

  @staticmethod
  def create(session, user, broker,  currency, amount, method, data):
    import uuid
    confirmation_token = uuid.uuid4().hex

    percent_fee = 0
    fixed_fee = 0

    withdraw_structure = json.loads(broker.withdraw_structure)
    for withdraw_method in withdraw_structure[currency]:
      if method == withdraw_method['method']:
        percent_fee = withdraw_method['percent_fee']
        fixed_fee = withdraw_method['fixed_fee']
        break

    withdraw_record = Withdraw(user_id            = user.id,
                               account_id         = user.id,
                               username           = user.username,
                               broker_id          = user.broker_id,
                               broker_username    = user.broker_username,
                               method             = method,
                               currency           = currency,
                               amount             = amount,
                               confirmation_token = confirmation_token,
                               percent_fee        = percent_fee,
                               fixed_fee          = fixed_fee,
                               data               = data )
    session.add(withdraw_record)
    session.flush()

    formatted_amount = Currency.format_number( session, withdraw_record.currency, withdraw_record.amount / 1.e8 )

    template_name       = broker.withdraw_confirmation_email.replace('{method}', withdraw_record.method.lower())
    template_parameters =  withdraw_record.as_dict()
    template_parameters['amount'] = formatted_amount

    UserEmail.create( session = session,
                      user_id = user.id,
                      subject =  broker.withdraw_confirmation_email_subject.replace('{currency}', currency),
                      template=template_name,
                      language='pt_BR',
                      params  = json.dumps(template_parameters, cls=JsonEncoder))

    return withdraw_record

  def __repr__(self):
    return u"<Withdraw(id=%r, user_id=%r, account_id=%r, broker_id=%r, username=%r, currency=%r, method=%r, amount='%r', " \
           u"broker_username=%r, data=%r, percent_fee=%r, fixed_fee-%r, "\
           u"confirmation_token=%r, status=%r, created=%r, reason_id=%r, reason=%r, paid_amount=%r)>" % (
      self.id, self.user_id, self.account_id, self.broker_id, self.username, self.currency, self.method,self.amount,
      self.broker_username, self.data, self.percent_fee, self.fixed_fee,
      self.confirmation_token, self.status, self.created, self.reason_id, self.reason, self.paid_amount)


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
  def create(session,user_id,account_id,user,username,account_user,account_username,broker_user,
             broker_username,client_order_id,symbol,side,type,price,order_qty,fee):
    order = Order( user_id          = user_id,
                   account_id       = account_id,
                   user             = user,
                   username         = username,
                   account_user     = account_user,
                   account_username = account_username,
                   broker_user      = broker_user,
                   broker_username  = broker_username ,
                   client_order_id  = client_order_id,
                   symbol           = symbol,
                   side             = side,
                   type             = type,
                   price            = price,
                   order_qty        = order_qty,
                   fee              = fee)
    session.add(order)
    return order



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


    Ledger.execute_order(session, order, counter_order, symbol, size, price, trade.id)


    return trade


  @staticmethod
  def get_last_trades(session, symbol, timestamp):
    trades = session.query(Trade).filter_by(symbol=symbol).filter(Trade.created >= timestamp).order_by(Trade.created.desc())
    return trades


class Deposit(Base):
  __tablename__           = 'deposit'

  id                      = Column(String(25), primary_key=True)
  user_id                 = Column(Integer,    ForeignKey('users.id'))
  account_id              = Column(Integer,    ForeignKey('users.id'))
  broker_id               = Column(Integer,    ForeignKey('users.id'))
  deposit_option_id       = Column(Integer,    ForeignKey('deposit_options.id'))
  deposit_option_name     = Column(String(15), nullable=False)
  username                = Column(String,     nullable=False)
  broker_username         = Column(String,     nullable=False)
  broker_deposit_ctrl_num = Column(Integer,    index=True)
  secret                  = Column(String(10), index=True)

  type                    = Column(String(3),  nullable=False, index=True)
  currency                = Column(String(3),  nullable=False, index=True)
  value                   = Column(Integer,    nullable=False, default=0, index=True)
  paid_value              = Column(Integer,    nullable=False, default=0, index=True)
  status                  = Column(String(1),  nullable=False, default='0', index=True) # 0-Pending, 1-Unconfirmed, 2-In-progress, 4-Complete, 8-Cancelled
  data                    = Column(Text,       nullable=False, index=True)
  created                 = Column(DateTime,   nullable=False, default=datetime.datetime.now, index=True)

  percent_fee             = Column(Integer,    nullable=False, default=0)
  fixed_fee               = Column(Integer,    nullable=False, default=0)

  reason_id               = Column(Integer)
  reason                  = Column(String)

  def __repr__(self):
    return u"<Deposit(id=%r, user_id=%r, account_id=%r, username=%r, broker_id=%r, deposit_option_id=%r, deposit_option_name=%r, broker_deposit_ctrl_num=%r," \
           u"secret=%r, type=%r, currency=%r, value=%r, created=%r, reason_id=%r, reason=%r, fixed_fee=%r, percent_fee=%r, data=%r)>" % (
      self.id,  self.user_id, self.account_id, self.username, self.broker_id, self.deposit_option_id, self.deposit_option_name, self.broker_deposit_ctrl_num,
      self.secret, self.type,  self.currency, self.value, self.created, self.reason_id, self.reason, self.fixed_fee, self.percent_fee, self.data )

  @staticmethod
  def create_crypto_currency_deposit(session, user, currency, input_address, destination, secret ):
    import uuid
    deposit_id = uuid.uuid4().hex

    deposit = Deposit(
      id                      = deposit_id,
      deposit_option_name     = 'deposit_' + currency.lower(),
      user_id                 = user.id,
      account_id              = user.id,
      username                = user.username,
      broker_username         = user.broker_username,
      broker_id               = user.broker_id,
      type                    = 'CRY',
      currency                = currency,
      secret                  = secret,
      percent_fee             = 0,
      fixed_fee               = 0,
      data                    = json.dumps( { 'InputAddress':input_address, 'Destination':destination } )
    )

    session.add(deposit)

    session.flush()

    return deposit

  @staticmethod
  def get_list(session, broker_id, account_id, status_list, page_size, offset, filter_array=[]):
    query = session.query(Deposit).filter( Deposit.status.in_( status_list ) ).filter(Deposit.broker_id==broker_id)

    if account_id:
      query = query.filter( Deposit.account_id == account_id  )

    if filter_array:
      for filter in filter_array:
        if filter.isdigit():
          query = query.filter( or_( Deposit.data.like('%' + filter + '%' ),
                                     Deposit.currency == filter,
                                     Deposit.deposit_option_name == filter,
                                     Deposit.value == int(filter) * 1e8,
                                     Deposit.paid_value == int(filter) * 1e8,
                                     Deposit.broker_deposit_ctrl_num == int(filter),
                                     ))
        else:
          query = query.filter( or_( Deposit.data.like('%' + filter + '%'),
                                     Deposit.currency == filter,
                                     Deposit.deposit_option_name == filter ) )

    query = query.order_by(Deposit.created.desc())

    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)


    return query


  @staticmethod
  def get_deposit(session, deposit_id=None, secret=None, broker_id=None, broker_control_number=None ):
    q = session.query(Deposit)
    if deposit_id:
      q = q.filter_by(id=deposit_id)
    if secret:
      q = q.filter_by(secret=secret)
    if broker_id:
      q = q.filter_by(broker_id=broker_id)
    if broker_control_number:
      q = q.filter_by(broker_deposit_ctrl_num=broker_control_number)
    return q.first()

  def cancel(self, session, reason_id, reason=None):
    if self.status == '4':
      Ledger.transfer(session,
                      self.account_id,        # from_account_id
                      self.username,          # from_account_name
                      self.broker_id,         # from_broker_id
                      self.broker_username,   # from_broker_name
                      self.broker_id,         # to_account_id
                      self.broker_username,   # to_account_name
                      self.broker_id,         # to_broker_id
                      self.broker_username,   # to_broker_name
                      self.currency,          # currency
                      self.paid_value,        # amount
                      str(self.id),           # reference
                      'D'                     # descriptions
      )


    self.status = '8'
    self.reason_id = reason_id
    self.reason = reason
    session.add(self)
    session.flush()

  def user_confirm(self, session, data=None):
    if self.status != '0':
      return

    new_data = {}
    new_data.update(json.loads(self.data))
    if data:
      new_data.update( data )
      if self.data != json.dumps(new_data):
        self.data = json.dumps(new_data)

    self.status = '1'

    session.add(self)
    session.flush()


  def set_in_progress(self, session, data=None):
    if self.status == '4' or self.status == '2':
      return

    self.status = '2'
    session.add(self)
    session.flush()


  def process_confirmation(self, session, amount, percent_fee=0, fixed_fee=0, data=None ):
    should_update = False
    new_data = {}
    new_data.update(json.loads(self.data))
    if data:
      new_data.update( data )
      if self.data != json.dumps(new_data):
        should_update = True

    should_confirm = False
    self.paid_value = amount

    if self.type == 'CRY' and data:
      broker = Broker.get_broker( session, self.broker_id  )
      broker_crypto_currencies = json.loads(broker.crypto_currencies)
      crypto_currency_param = None
      for crypto_currency_param in broker_crypto_currencies:
        if crypto_currency_param["CurrencyCode"] == self.currency:
          break

      if not crypto_currency_param:
        return

      for amount_start, amount_end, confirmations  in  crypto_currency_param["Confirmations"]:
        if amount_start < amount <= amount_end and data['Confirmations'] >= confirmations:
          should_confirm = True
          break

      if self.status == '0' or self.status == '1':
        self.status = '2'
        should_update = True
    else:
      should_confirm = True


    should_adjust_ledger = False
    if should_confirm and self.status != '4':
      self.paid_value = amount
      self.percent_fee = percent_fee
      self.fixed_fee = fixed_fee
      self.status = '4'
      should_adjust_ledger = True
      should_update = True


    elif  should_confirm and self.status == '4':
      # The user probably saved the deposit address and he is sending to the same address
      if self.type == 'CRY' and self.paid_value != amount:
        # TODO: Create another deposit
        # and process the deposit
        return


    if should_adjust_ledger:
      total_percent_fee_value = ((self.paid_value - self.fixed_fee) * (self.percent_fee/10000.0))
      total_fees = total_percent_fee_value + self.fixed_fee

      Ledger.transfer(session,
                      self.broker_id,         # from_account_id
                      self.broker_username,   # from_account_name
                      self.broker_id,         # from_broker_id
                      self.broker_username,   # from_broker_name
                      self.account_id,        # to_account_id
                      self.username,          # to_account_name
                      self.broker_id,         # to_broker_id
                      self.broker_username,   # to_broker_name
                      self.currency,          # currency
                      self.paid_value,        # amount
                      str(self.id),           # reference
                      'D'                     # descriptions
      )

      if total_fees:
        Ledger.transfer(session,
                        self.account_id,        # from_account_id
                        self.username,          # from_account_name
                        self.broker_id,         # from_broker_id
                        self.broker_username,   # from_broker_name
                        self.broker_id,         # to_account_id
                        self.broker_username,   # to_account_name
                        self.broker_id,         # to_broker_id
                        self.broker_username,   # to_broker_name
                        self.currency,          # currency
                        total_fees,             # amount
                        str(self.id),           # reference
                        'DF'                    # descriptions
        )

    if should_update:
      self.data = json.dumps(new_data)
      session.add(self)
      session.flush()


class DepositMethods(Base):
  __tablename__             = 'deposit_options'
  id                        = Column(Integer,    primary_key=True)
  broker_id                 = Column(Integer,    ForeignKey('users.id'), index=True)
  name                      = Column(String(15), nullable=False)
  description               = Column(String(255),nullable=False)
  disclaimer                = Column(String(255),nullable=False)
  type                      = Column(String(3),  nullable=False)
  broker_deposit_ctrl_num   = Column(Integer,    nullable=False)
  currency                  = Column(String(3),  nullable=False)
  percent_fee               = Column(Integer,    nullable=False, default=0)
  fixed_fee                 = Column(Integer,    nullable=False, default=0)
  parameters                = Column(Text,       nullable=False)

  def __repr__(self):
    return u"<DepositMethods(id=%r, broker_id=%r, name=%r description=%r, disclaimer=%r ," \
           u"type=%r, broker_deposit_ctrl_num=%r, currency=%r,percent_fee=%r, fixed_fee=%r, parameters=%r)>"\
    % (self.id, self.broker_id, self.name, self.description, self.disclaimer, self.type,
       self.broker_deposit_ctrl_num, self.currency, self.percent_fee, self.fixed_fee, self.parameters)

  @staticmethod
  def get_deposit_method(session, deposit_option_id):
    return session.query(DepositMethods).filter_by(id=deposit_option_id).first()

  @staticmethod
  def get_list(session, broker_id):
    return  session.query(DepositMethods).filter_by(broker_id=broker_id)

  def generate_deposit(self,session, user, value):
    self.broker_deposit_ctrl_num += 1
    import uuid
    deposit_id = uuid.uuid4().hex

    deposit = Deposit(
      id                      = deposit_id,
      user_id                 = user.id,
      account_id              = user.id,
      username                = user.username,
      broker_username         = user.broker_username,
      broker_id               = self.broker_id,
      deposit_option_id       = self.id,
      deposit_option_name     = self.name,
      type                    = self.type,
      currency                = self.currency,
      broker_deposit_ctrl_num = self.broker_deposit_ctrl_num,
      fixed_fee               = self.fixed_fee,
      percent_fee             = self.percent_fee,
      value                   = value
    )

    t = template.Template(self.parameters)

    template_parameters = { 'id':deposit_id,
                            'broker_deposit_ctrl_num': self.broker_deposit_ctrl_num,
                            'user' : user,
                            'current_date': datetime.date.today(),
                            'value' : value/1e8,
                            'currency': self.currency,
                            'broker_id': self.broker_id }
    deposit.data = t.generate( **template_parameters )

    session.add(self)
    session.add(deposit)
    session.flush()

    return deposit



Base.metadata.create_all(engine)

def db_bootstrap(session):
  user_verification_jotform   = 'https://secure.jotform.us/form/31441083828150'
  broker_verification_jotform = 'https://secure.jotform.us/form/41205503470139'
  upload_jotform              = 'https://secure.jotform.us/form/40783223144146'

  if options.test_mode:
    user_verification_jotform   = 'https://secure.jotform.us/form/41497993509976'
    broker_verification_jotform = 'https://secure.jotform.us/form/41497185058968'
    upload_jotform              = 'https://secure.jotform.us/form/41498093636969'

  if options.dev_mode:
    user_verification_jotform   = 'https://secure.jotform.us/form/41512334662953'
    broker_verification_jotform = 'https://secure.jotform.us/form/41512505300942'
    upload_jotform              = 'https://secure.jotform.us/form/41512817151952'


  import  json
  if not User.get_user(session, 'bitex'):
    e = User(id=-1, username='bitex', email='bitex@bitex.com.br',  broker_id=None, broker_username=None, password=base64.b32encode(os.urandom(10)),
             country_code='BR', state='SP',
             verified=1, is_staff=False, is_system=False, is_broker=True)
    session.add(e)
    session.commit()

  if not User.get_user(session, 'bitex_broker'):
    e = User(id=0, username='bitex_broker', email='bitex.broker@bitex.com.br',  broker_id=None, broker_username=None, password='abc12345',
             country_code='BR', state='SP',
             verified=1, is_staff=True, is_system=False, is_broker=True)
    session.add(e)
    session.commit()

  if options.test_mode:
    if not User.get_user(session, 'nybitcoincenter'):
      e = User(id=9000001, username='nybitcoincenter', email='admin@nybitcoincenter.com',  broker_id=0, broker_username='bitex', password='abc12345',
               country_code='US', state='NY',
               transaction_fee_buy=0,
               transaction_fee_sell=0,
               verified=1, is_staff=False, is_system=False, is_broker=True)
      session.add(e)
      session.commit()

    if not User.get_user(session, 'bitcointoyou'):
      e = User(id=9000002, username='bitcointoyou', email='andre@bitcointoyou.com',  broker_id=0, broker_username='bitcointoyou', password='abc12345',
               country_code='BR', state='MG',
               transaction_fee_buy=60,
               transaction_fee_sell=60,
               verified=1, is_staff=False, is_system=False, is_broker=True)
      session.add(e)
      session.commit()


    if not User.get_user(session, 'thiagostruck'):
      e = User(id=9000003, username='thiagostruck', email='tiagostruck@dors.com.br',  broker_id=0, broker_username='thiagostruck', password='abc12345',
               country_code='BR', state='SC',
               transaction_fee_buy=60,
               transaction_fee_sell=60,
               verified=1, is_staff=False, is_system=False, is_broker=True)
      session.add(e)
      session.commit()


    if not User.get_user(session, 'rafaelffdias'):
      e = User(id=9000004, username='rafaelffdias', email='rafaelffdias@gmail.com',  broker_id=0, broker_username='rafaelffdias', password='abc12345',
               country_code='BR', state='SC',
               transaction_fee_buy=60,
               transaction_fee_sell=60,
               verified=1, is_staff=False, is_system=False, is_broker=True)
      session.add(e)
      session.commit()

  if not Broker.get_broker(session, -1):
    e = Broker(id=-1,
               short_name=u'BitEx Waiting for a broker',
               business_name=u'BitEX - Bolsa Brasileira de Moedas Criptografadas LTDA - ME',
               address=u'Praça Dom José Gaspar, 76 - sl 81',
               signup_label='{MSG_NOTIFY_NEW_BROKER}',
               state=u'SP',
               zip_code=u'01047-010',
               city=u'São Paulo',
               country='Brazil',
               country_code='BR',
               phone_number_1='+55 (11) 2061-3325', phone_number_2=None, skype='blinktrade', email='support@bitex.com.br',
               verification_jotform= user_verification_jotform +'?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}',
               upload_jotform= upload_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
               currencies='',
               withdraw_structure=json.dumps({}),
               crypto_currencies=json.dumps([]),
               accept_customers_from=json.dumps([['*'],[]]),
               is_broker_hub=True,
               support_url='https://www.facebook.com/groups/bitex.support/',
               withdraw_confirmation_email = 'withdraw_confirmation_{method}',
               withdraw_confirmation_email_subject='[BitEx] Confirm {currency} withdraw operation.',
               tos_url=u'/tos.html',
               fee_structure="[]",
               transaction_fee_buy=0,
               transaction_fee_sell=0,
               status=u'1',
               ranking=0)
    session.add(e)
    session.commit()

  if not Broker.get_broker(session, 0):
    e = Broker(id=0,
               short_name=u'BitEX',
               business_name=u'BitEX - Bolsa Brasileira de Moedas Criptografadas LTDA - ME',
               address=u'Praça Dom José Gaspar, 76 - sl 81',
               signup_label='{MSG_BROKER_APPLY}',
               state=u'SP',
               zip_code=u'01047-010',
               city=u'São Paulo',
               country='Brazil',
               country_code='BR',
               phone_number_1='+55 (11) 2061-3325', phone_number_2=None, skype='blinktrade', email='support@bitex.com.br',
               verification_jotform=broker_verification_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}',
               upload_jotform= upload_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
               currencies='',
               withdraw_structure=json.dumps({
               'BTC': [
                     {
                     'method':'bitcoin',
                     'description':'Bitcoin withdraw',
                     'disclaimer': 'All withdraws are processed at 23:00 GMT.',
                     'percent_fee':0,
                     'fixed_fee':0,
                     'fields': [
                         {'side':'client', 'name': 'Wallet'        ,  'type':'text'  , 'value':""       , 'label':'Wallet',        'placeholder':'' },
                         {'side':'broker', 'name': 'TransactionID' ,  'type':'text'  , 'value':""       , 'label':'TransactionID', 'placeholder':'' },
                         {'side':'broker', 'name': 'Link'          ,  'type':'text'  , 'value':""       , 'label':'Link',          'placeholder':'' },
                     ]
                   }
               ]}),
               crypto_currencies=json.dumps([
                 {
                   "CurrencyCode": "BTC",
                   "CurrencyDescription":"Bitcoin",
                   "Confirmations":[ [0, 21000000e8, 6 ] ],
                   "Wallets": [
                       { "type":"cold", "address":"16tdTifYyEMYGMqaFjgqS6oLQ7ZZLt4E8r", "multisig":False,"signatures":[], "managed_by":"BitEx" },
                       { "type":"hot", "address":"1LFHd1VnA923Ljvz6SrmuoC2fTe5rF2w4Q", "multisig":False,"signatures":[], "managed_by":"BitEx" },
                   ]
                 }
               ]),
               accept_customers_from=json.dumps([['*'],[]]),
               is_broker_hub=True,
               support_url='https://www.facebook.com/groups/bitex.support/',
               withdraw_confirmation_email = 'withdraw_confirmation_{method}_enUS.txt',
               withdraw_confirmation_email_subject='[BitEx] Confirm {currency} withdraw operation.',
               tos_url=u'/tos.html',
               fee_structure="[]",
               transaction_fee_buy=0,
               transaction_fee_sell=0,
               status=u'1',
               ranking=1)
    session.add(e)
    session.commit()

  if options.test_mode:
    if not Broker.get_broker(session, 9000001):
      e = Broker(id=9000001,
                 short_name=u'NyBitcoinCenter',
                 business_name=u'Bitcoin Center NYC',
                 address=u'40 Broad Street',
                 signup_label='New York Bitcoin Center Broker',
                 city='New York',
                 state='NY',
                 zip_code='10004',
                 country_code='US',
                 country='United States',
                 phone_number_1='+1 (646) 879-5357', phone_number_2=None, skype='XXXXX', email='NYCBitcoinCenter@gmail.com',
                 verification_jotform= user_verification_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}',
                 upload_jotform= upload_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
                 currencies='USD',
                 withdraw_structure=json.dumps( {
                   'BTC': [
                       {
                       'method':'bitcoin',
                       'description':'Bitcoin withdrawal',
                       'disclaimer': '',
                       'percent_fee':0,
                       'fixed_fee':0,
                       'fields': [
                           {'side':'client', 'name': 'Wallet'        ,  'type':'text'  , 'value':""       , 'label':'Wallet',        'placeholder':'' },
                           {'side':'broker', 'name': 'TransactionID' ,  'type':'text'  , 'value':""       , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'          ,  'type':'text'  , 'value':""       , 'label':'Link',          'placeholder':'' },
                       ]
                     }
                   ],
                   'USD': [ {
                       'method':'paypal',
                       'description':'Saque direto via paypal',
                       'disclaimer':'Realizado na hora. O Paypal poderá cobrar taxas adicionais',
                       'percent_fee': 30, # 0.3 percent
                       'fixed_fee': 0,
                       'fields': [
                           {'side':'client',  'name': 'Email'          ,  'type':'text'  , 'value':""       , 'label':'Email'        , 'placeholder':'' },
                           {'side':'broker',  'name': 'TransactionID'  ,  'type':'text'  , 'value':""       , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker',  'name': 'Link'           ,  'type':'text'  , 'value':""       , 'label':'Link',          'placeholder':'' },
                       ]
                     }
                   ]
                 }),
                 crypto_currencies=json.dumps([
                   {
                     "CurrencyCode": "BTC",
                     "CurrencyDescription":"Bitcoin",
                     "Confirmations":[ [0, 1e8, 2], [ 1e8, 200e8, 3 ], [200e8, 21000000e8, 6 ] ],
                     "Wallets": [
                         { "type":"cold", "address":"16tdTifYyEMYGMqaFjgqS6oLQ7ZZLt4E8r", "multisig":False,"signatures":[], "managed_by":"BitEx" },
                         { "type":"hot", "address":"1LFHd1VnA923Ljvz6SrmuoC2fTe5rF2w4Q", "multisig":False,"signatures":[], "managed_by":"BitEx" },
                     ]
                   }
                 ]),
                 accept_customers_from=json.dumps([
                   [ "*", 'US_NY'],  # everywhere, including US_NY
                   [ "US",  # except US and all other states
                     "US_AL","US_AK","US_AZ","US_AR","US_CA","US_CO","US_CT","US_DE","US_DC","US_FL",
                     "US_GA","US_HI","US_ID","US_IL","US_IN","US_IA","US_KS","US_KY","US_LA","US_ME",
                     "US_MD","US_MA","US_MI","US_MN","US_MS","US_MO","US_MT","US_NE","US_NV","US_NH",
                     "US_NJ","US_NM","US_NC","US_ND","US_OH","US_OK","US_OR","US_PA","US_RI","US_SC",
                     "US_SD","US_TN","US_TX","US_UT","US_VE","US_VA","US_WA","US_WV","US_WI","US_WY"]
                 ]) ,
                 is_broker_hub=False,
                 support_url='https://www.facebook.com/groups/bitex.support/',
                 withdraw_confirmation_email = 'withdraw_confirmation_{method}_ptBR.txt',
                 withdraw_confirmation_email_subject='[BitEx] Confirm {currency} withdraw operation.',
                 tos_url='https://dl.dropboxusercontent.com/u/29731093/cryptsy_tos.html',
                 fee_structure=json.dumps([
                   { "Operation" : "USPS Money Order deposit",       "Fee":"$5"               , "Terms":"30 minutes." },
                   { "Operation" : "Check deposit",                  "Fee":"1%"               , "Terms":"3 business days" },
                   { "Operation" : "Wire transfer deposit",          "Fee":"0.3%"             , "Terms":"Next business day" },
                   { "Operation" : "Wire transfer withdraw",         "Fee":"0.3%"             , "Terms":"Next business day" },
                   { "Operation" : "PayPal withdrawal",              "Fee":"0%"               , "Terms":"Instant" },
                 ]),
                 transaction_fee_buy=20, # 0.2%
                 transaction_fee_sell=20, # 0.2%
                 status='1',
                 ranking=5)
      session.add(e)
      session.commit()

    if not Broker.get_broker(session, 9000002):
      e = Broker(id=9000002,
                 short_name=u'bitcointoyou',
                 business_name=u'Bitcoin to you - VIVAR TECNOLOGIA DA INFORMAÇÃO LTDA',
                 address=u'Rua João Pinheiro, 22 – Sala 104',
                 signup_label='Bitcoin to you',
                 city='Betim',
                 state='MG',
                 zip_code='32600-072',
                 country_code='BR',
                 country='Brazil',
                 phone_number_1='+55 (31) 2571-5791', phone_number_2=None, skype='andreluizhorta', email='atendimento@vivarti.com.br',
                 verification_jotform= user_verification_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}',
                 upload_jotform= upload_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
                 currencies='BRL',
                 withdraw_structure=json.dumps( {
                   'BTC': [
                       {
                       'method':'bitcoin',
                       'description':'Saque em Bitcoins',
                       'disclaimer': 'Automático e imediato ao utilizar autenticação em 2 passos para usuários verificados, e Manual em até 24 horas para usuários não verificados.',
                       'percent_fee':0,
                       'fixed_fee':0,
                       'fields': [
                           {'side':'client', 'name': 'Wallet'        ,  'type':'text'  , 'value':""       , 'label':'Wallet',        'placeholder':'' },
                           {'side':'broker', 'name': 'TransactionID' ,  'type':'text'  , 'value':""       , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'          ,  'type':'text'  , 'value':""       , 'label':'Link',          'placeholder':'' },
                       ]
                     }
                   ],
                   'BRL': [
                       {
                       'method':'ted_doc',
                       'description':'Saque para conta bancária no Brasil',
                       'disclaimer':'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                       'percent_fee': 165, # 1.65 percent
                       'fixed_fee': 0,
                       'fields': [
                           {'side':'client', 'name': 'BankNumber'   ,  'type':'text'  , 'value':""  , 'label':'Número do banco', 'placeholder':'ex. 341' },
                           {'side':'client', 'name': 'BankName'     ,  'type':'text'  , 'value':""  , 'label':'Nome do banco', 'placeholder': 'ex. Banco Itaú' },
                           {'side':'client', 'name': 'AccountBranch',  'type':'text'  , 'value':""  , 'label':'Agência', 'placeholder':'ex. 8888' },
                           {'side':'client', 'name': 'AccountNumber',  'type':'text'  , 'value':""  , 'label':'Número da conta', 'placeholder':'ex. 88888-8' },
                           {'side':'client', 'name': 'CPF_CNPJ'     ,  'type':'text'  , 'value':""  , 'label':'CPF ou CNPJ', 'placeholder':'ex. 888.888.888-88'},
                           {'side':'broker', 'name': 'TransactionID',  'type':'text'  , 'value':""  , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'         ,  'type':'text'  , 'value':""  , 'label':'Link', 'placeholder':'' }
                       ]
                     }
                   ]
                 }),
                 crypto_currencies=json.dumps([
                     {
                     "CurrencyCode": "BTC",
                     "CurrencyDescription":"Bitcoin",
                     "Confirmations":[ [0, 1e8, 2], [ 1e8, 200e8, 3 ], [200e8, 21000000e8, 6 ] ],
                     "Wallets": [
                         { "type":"cold", "address":"16tdTifYyEMYGMqaFjgqS6oLQ7ZZLt4E8r", "multisig":True,"signatures":[], "managed_by":"Bitcointoyou, BitEx" },
                         { "type":"hot", "address":"1LFHd1VnA923Ljvz6SrmuoC2fTe5rF2w4Q", "multisig":False,"signatures":[], "managed_by":"Bitcointoyou" },
                     ]
                   }
                 ]),
                 accept_customers_from=json.dumps([
                   ["BR"],  # Only in Brazil
                   [ "*" ]
                 ]) ,
                 is_broker_hub=False,
                 support_url='https://bitcointoyou.zendesk.com/hc/pt-br',
                 withdraw_confirmation_email = 'withdraw_confirmation_{method}_ptBR.txt',
                 withdraw_confirmation_email_subject='[BitEx] Confirm {currency} withdraw operation.',
                 tos_url='https://dl.dropboxusercontent.com/u/29731093/bitex/b2u.html',
                 fee_structure=json.dumps([
                     { "Operation" : u"Depósito em Reais",           "Fee":"1,65%"            , "Terms":u"Até 24 horas, geralmente em 15 minutos para contas verificadas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                     { "Operation" : u"Depósito em Bitcoin",         "Fee":"0%"               , "Terms":u"10 minutos após a confirmação de número 6 da rede Bitcoin" },
                     { "Operation" : u"Saque em Bitcoin",            "Fee":"0%"               , "Terms":u"Automático e imediato ao utilizar autenticação em 2 passos para contas verificadas e feito manual com prazo de até 24 horas para contas não verificadas." },
                     { "Operation" : u"Saque em Reais",              "Fee":"1,65%"            , "Terms":u"Até 24 horas, geralmente em 15 minutos para contas verificadas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                 ]),
                 transaction_fee_buy=60, # 0.6%
                 transaction_fee_sell=60, # 0.6%
                 status='1',
                 ranking=4)
      session.add(e)
      session.commit()


    if not Broker.get_broker(session, 9000003):
      e = Broker(id=9000003,
                 short_name=u'tiagostruck',
                 business_name=u'Tiago Struck.',
                 address=u'Rua Barão do Rio Branco, XX Centro',
                 signup_label=u'Tiago Struck - CPF 099.255.999-99',
                 city=u'Jaraguá do Sul',
                 state='SC',
                 zip_code='89251-400',
                 country_code='BR',
                 country='Brazil',
                 phone_number_1='+55 (47) 9914-0725', phone_number_2='+55 (47) 3055-9232', skype='tiagostruck', email='tiagostruck@dors.com.br',
                 verification_jotform= user_verification_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}',
                 upload_jotform= upload_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
                 currencies='BRL',
                 withdraw_structure=json.dumps( {
                   'BTC': [
                       {
                       'method':'bitcoin',
                       'description':'Saque em Bitcoins',
                       'disclaimer': 'Automático e imediato ao utilizar autenticação em 2 passos para usuários verificados, e Manual em até 24 horas para usuários não verificados.',
                       'percent_fee':0,
                       'fixed_fee':0,
                       'fields': [
                           {'side':'client', 'name': 'Wallet'        ,  'type':'text'  , 'value':""       , 'label':'Wallet',        'placeholder':'' },
                           {'side':'broker', 'name': 'TransactionID' ,  'type':'text'  , 'value':""       , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'          ,  'type':'text'  , 'value':""       , 'label':'Link',          'placeholder':'' },
                       ]
                     }
                   ],
                   'BRL': [
                       {
                       'method':'ted_doc',
                       'description':'Saque para conta bancária no Brasil',
                       'disclaimer':'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                       'percent_fee': 135, # 1.35 percent
                       'fixed_fee': 0,
                       'fields': [
                           {'side':'client', 'name': 'BankNumber'   ,  'type':'text'  , 'value':""  , 'label':'Número do banco', 'placeholder':'ex. 341' },
                           {'side':'client', 'name': 'BankName'     ,  'type':'text'  , 'value':""  , 'label':'Nome do banco', 'placeholder': 'ex. Banco Itaú' },
                           {'side':'client', 'name': 'AccountBranch',  'type':'text'  , 'value':""  , 'label':'Agência', 'placeholder':'ex. 8888' },
                           {'side':'client', 'name': 'AccountNumber',  'type':'text'  , 'value':""  , 'label':'Número da conta', 'placeholder':'ex. 88888-8' },
                           {'side':'client', 'name': 'CPF_CNPJ'     ,  'type':'text'  , 'value':""  , 'label':'CPF ou CNPJ', 'placeholder':'ex. 888.888.888-88'},
                           {'side':'broker', 'name': 'TransactionID',  'type':'text'  , 'value':""  , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'         ,  'type':'text'  , 'value':""  , 'label':'Link', 'placeholder':'' }
                       ]
                     },{
                       'method':'swift',
                       'description':'Saque para conta bancária no Exterior',
                       'disclaimer':'84 horas, Taxa de 1,35% + R$ 80,00  Apenas para usuários verificados',
                       'percent_fee': 135, # 1.35 percent
                       'fixed_fee': int(80 * 1e8), # R$ 80,00
                       'fields': [
                           {'side':'client', 'name': 'BankName'     ,  'type':'text'  , 'value':""  , 'label':'Banco name', 'placeholder': 'ex. JPMORGAN CHASE BANK, N.A' },
                           {'side':'client', 'name': 'BankSwift'    ,  'type':'text'  , 'value':""  , 'label':'Swift code', 'placeholder': 'ex. CHASUS33' },
                           {'side':'client', 'name': 'RoutingNumber',  'type':'text'  , 'value':""  , 'label':'Routing Number', 'placeholder':'ex. 021000021' },
                           {'side':'client', 'name': 'AccountNumber',  'type':'text'  , 'value':""  , 'label':'Account Number', 'placeholder':'ex. 88888-8' },
                           {'side':'broker', 'name': 'TransactionID',  'type':'text'  , 'value':""  , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'         ,  'type':'text'  , 'value':""  , 'label':'Link', 'placeholder':'' }
                       ]
                     },
                   ]
                 }),
                 crypto_currencies=json.dumps([
                     {
                     "CurrencyCode": "BTC",
                     "CurrencyDescription":"Bitcoin",
                     "Confirmations":[ [0, 1e8, 2], [ 1e8, 200e8, 3 ], [200e8, 21000000e8, 6 ] ],
                     "Wallets": [
                         { "type":"cold", "address":"16tdTifYyEMYGMqaFjgqS6oLQ7ZZLt4E8r", "multisig":True,"signatures":[], "managed_by":"Thiago Struck, BitEX" },
                         { "type":"hot", "address":"1LFHd1VnA923Ljvz6SrmuoC2fTe5rF2w4Q", "multisig":False,"signatures":[], "managed_by":"Thiago Struck" },
                     ]
                   }
                 ]),
                 accept_customers_from=json.dumps([
                   ["*"],  # The whole world
                   [ ""]
                 ]) ,
                 is_broker_hub=False,
                 support_url='https://bitcointoyou.zendesk.com/hc/pt-br',
                 withdraw_confirmation_email = 'withdraw_confirmation_{method}_ptBR.txt',
                 withdraw_confirmation_email_subject='[BitEx] Confirm {currency} withdraw operation.',
                 tos_url='https://dl.dropboxusercontent.com/u/29731093/bitex/b2u.html',
                 fee_structure=json.dumps([
                     { "Operation" : u"Depósito em Reais no Brasil", "Fee":"1,35%"            , "Terms":u"Até 24 horas, geralmente em 15 minutos para contas verificadas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                     { "Operation" : u"Depósito em Reais via Swift", "Fee":"1,35%"            , "Terms":u"Até 84 horas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                     { "Operation" : u"Depósito em Bitcoin",         "Fee":"0%"               , "Terms":u"10 minutos após a confirmação de número 6 da rede Bitcoin" },
                     { "Operation" : u"Saque em Bitcoin",            "Fee":"0%"               , "Terms":u"Automático e imediato ao utilizar autenticação em 2 passos para contas verificadas e feito manual com prazo de até 24 horas para contas não verificadas." },
                     { "Operation" : u"Saque em Reais no Brasil",    "Fee":"1,35%"            , "Terms":u"Até 24 horas, geralmente em 15 minutos para contas verificadas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                     { "Operation" : u"Saque em Reais via Swift",    "Fee":"1,35% + R$ 80,00" , "Terms":u"Até 84 horas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                 ]),
                 transaction_fee_buy=20, # 0.2%
                 transaction_fee_sell=20, # 0.2%
                 status='1',
                 ranking=3)
      session.add(e)
      session.commit()



    if not Broker.get_broker(session, 9000004):
      e = Broker(id=9000004,
                 short_name=u'rafaelffdias',
                 business_name=u'Rafael Ferreira Felício Dias.',
                 address=u'Rua dos Tamoios, Centro',
                 signup_label='Rafael Dias - CPF 063.245.443-99',
                 city='Belo Horizonte',
                 state='MG',
                 zip_code='30120-050',
                 country_code='BR',
                 country='Brazil',
                 phone_number_1='+55 (31) 8742-1062', phone_number_2='+55 (31) 9243-2071', skype='rrafilsk', email='rafaelffdias@gmail.com',
                 verification_jotform= user_verification_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}',
                 upload_jotform= upload_jotform + '?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
                 currencies='BRL',
                 withdraw_structure=json.dumps( {
                   'BTC': [
                       {
                       'method':'bitcoin',
                       'description':'Saque em Bitcoins',
                       'disclaimer': 'Automático e imediato ao utilizar autenticação em 2 passos para usuários verificados, e Manual em até 24 horas para usuários não verificados.',
                       'percent_fee':0,
                       'fixed_fee':0,
                       'fields': [
                           {'side':'client', 'name': 'Wallet'        ,  'type':'text'  , 'value':""       , 'label':'Wallet',        'placeholder':'' },
                           {'side':'broker', 'name': 'TransactionID' ,  'type':'text'  , 'value':""       , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'          ,  'type':'text'  , 'value':""       , 'label':'Link',          'placeholder':'' },
                       ]
                     }
                   ],
                   'BRL': [
                       {
                       'method':'ted_doc',
                       'description':'Saque para conta bancária no Brasil',
                       'disclaimer':'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                       'percent_fee': 50, # 0.5% percent
                       'fixed_fee': 0,
                       'fields': [
                           {'side':'client', 'name': 'BankNumber'   ,  'type':'text'  , 'value':""  , 'label':'Número do banco', 'placeholder':'ex. 341' },
                           {'side':'client', 'name': 'BankName'     ,  'type':'text'  , 'value':""  , 'label':'Nome do banco', 'placeholder': 'ex. Banco Itaú' },
                           {'side':'client', 'name': 'AccountBranch',  'type':'text'  , 'value':""  , 'label':'Agência', 'placeholder':'ex. 8888' },
                           {'side':'client', 'name': 'AccountNumber',  'type':'text'  , 'value':""  , 'label':'Número da conta', 'placeholder':'ex. 88888-8' },
                           {'side':'client', 'name': 'CPF_CNPJ'     ,  'type':'text'  , 'value':""  , 'label':'CPF ou CNPJ', 'placeholder':'ex. 888.888.888-88'},
                           {'side':'broker', 'name': 'TransactionID',  'type':'text'  , 'value':""  , 'label':'TransactionID', 'placeholder':'' },
                           {'side':'broker', 'name': 'Link'         ,  'type':'text'  , 'value':""  , 'label':'Link', 'placeholder':'' }
                       ]
                     }
                   ]
                 }),
                 crypto_currencies=json.dumps([
                     {
                     "CurrencyCode": "BTC",
                     "CurrencyDescription":"Bitcoin",
                     "Confirmations":[ [0, 1e8, 2], [ 1e8, 200e8, 3 ], [200e8, 21000000e8, 6 ] ],
                     "Wallets": [
                         { "type":"cold", "address":"16tdTifYyEMYGMqaFjgqS6oLQ7ZZLt4E8r", "multisig":True,"signatures":[], "managed_by":"Thiago Struck, BitEX" },
                         { "type":"hot", "address":"1LFHd1VnA923Ljvz6SrmuoC2fTe5rF2w4Q", "multisig":False,"signatures":[], "managed_by":"Thiago Struck" },
                     ]
                   }
                 ]),
                 accept_customers_from=json.dumps([
                   ["BR"],  # Only Brazil
                   [ "*"]
                 ]),
                 is_broker_hub=False,
                 support_url='https://bitcointoyou.zendesk.com/hc/pt-br',
                 withdraw_confirmation_email = 'withdraw_confirmation_{method}_ptBR.txt',
                 withdraw_confirmation_email_subject='[BitEx] Confirm {currency} withdraw operation.',
                 tos_url='https://dl.dropboxusercontent.com/u/29731093/bitex/b2u.html',
                 fee_structure=json.dumps([
                     { "Operation" : u"Depósito em Reais no Brasil", "Fee":"0,5%"            , "Terms":u"Até 24 horas, geralmente em 15 minutos para contas verificadas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." },
                     { "Operation" : u"Depósito em Bitcoin",         "Fee":"0%"              , "Terms":u"10 minutos após a confirmação de número 6 da rede Bitcoin" },
                     { "Operation" : u"Saque em Bitcoin",            "Fee":"0%"              , "Terms":u"Automático e imediato ao utilizar autenticação em 2 passos para contas verificadas e feito manual com prazo de até 24 horas para contas não verificadas." },
                     { "Operation" : u"Saque em Reais no Brasil",    "Fee":"0,5%"            , "Terms":u"Até 24 horas, geralmente em 15 minutos para contas verificadas.  NÃO DISPONÍVEL PARA CONTAS NÃO VERIFICADAS." }
                 ]),
                 transaction_fee_buy=20, # 0.2%
                 transaction_fee_sell=20, # 0.2%
                 status='1',
                 ranking=2)
      session.add(e)
      session.commit()


  currencies = [
    #[ 'USD' , '$'       , 'Dollar'   ,  False, 100 , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'USD' , '$'       , 'Dollar'   ,  False, 100000000  , '{:,.8f}', u'\u00a4 #,##0.00000000;(\u00a4 #,##0.00000000)' , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'BRL' , 'R$'      , 'Real'     ,  False, 100000000  , '{:,.8f}', u'\u00a4 #,##0.00000000;(\u00a4 #,##0.00000000)' , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'   ],
    [ 'EUR' , u'\u20ac' , 'Euro'     ,  False, 100000000  , '{:,.8f}', u'\u00a4 #,##0.00000000;(\u00a4 #,##0.00000000)' , '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'   ],
    [ 'GBP' , u'\u00a3' , 'Pound'    ,  False, 100000000  , '{:,.8f}', u'\u00a4 #,##0.00000000;(\u00a4 #,##0.00000000)', '{:,.2f}', u'\u00a4 #,##0.00;(\u00a4 #,##0.00)'  ],
    [ 'RUB' , u'\u20bd' , 'Ruble'    ,  False, 100000000  , '{:,.8f}', u'\u20bd #,##0.00000000;(\u20bd #,##0.00000000)' , '{:,.2f}', u'\u20bd #,##0.00;(\u20bd #,##0.00)'  ],
    [ 'JPY' , u'\u00a5' , 'Yen'      ,  False, 1000000    , '{:,.6f}', u'\u00a4 #,##0.000000;(\u00a4 #,##0.000000)'  , '{:,.0f}', u'\u00a4 #,##0;(\u00a4 #,##0)'],
    [ 'CNY' , u'\u00a5' , 'Yuan'     ,  False, 100000000  , '{:,.8f}', u'\u00a5 #,##0.00000000;(\u00a5 #,##0.00000000)', '{:,.2f}', u'\u00a5 #,##0.00;(\u00a5 #,##0.00)' ],
    [ 'ARS' , '$'       , 'Peso'     ,  False, 100000000  , '{:,.8f}', u'$ #,##0.00000000;($ #,##0.00000000)' , '{:,.2f}', u'$ #,##0.00;($ #,##0.00)'   ],
    [ 'AOA' , 'Kz'      , 'kwanza'   ,  False, 100000000  , '{:,.8f}', u'Kz #,##0.00000000;(Kz #,##0.00000000)' , '{:,.2f}', u'Kz #,##0.00;(Kz #,##0.00)' ],
    [ 'AUD' , '$'       , 'Australian Dollar',  False, 100000000  , '{:,.8f}', u'$ #,##0.00000000;($ #,##0.00000000)' , '{:,.2f}', u'$ #,##0.00;($ #,##0.00)'   ],
    [ 'BSD' , '$'       , 'Bahamian dollar',  False, 100000000  , '{:,.8f}', u'$ #,##0.00000000;($ #,##0.00000000)' , '{:,.2f}', u'$ #,##0.00;($ #,##0.00)'   ],
    [ 'INR' , u'\u20a8' , 'Rupee'    ,  False, 100000000  , '{:,.8f}', u'\u20a8 #,##0.00000000;(\u20a8 #,##0.00000000)' , '{:,.2f}', u'\u20a8 #,##0.00;(\u20a8 #,##0.00)'  ],
    [ 'IDR' , 'Rp'      , 'Rupiah'   ,  False, 100000000  , '{:,.8f}', u'Rp #,##0.00000000;(Rp #,##0.00000000)' , '{:,.2f}', u'Rp #,##0.00;(Rp #,##0.00)' ],
    [ 'ILS' , u'\u20aa' , 'New shekel',  False, 100000000  , '{:,.8f}', u'\u20aa #,##0.00000000;(\u20aa #,##0.00000000)' , '{:,.2f}', u'\u20aa #,##0.00;(\u20aa #,##0.00)'  ],
    [ 'MXN' , '$'       , 'Mexican Peso',  False, 100000000  , '{:,.8f}', u'$ #,##0.00000000;($ #,##0.00000000)' , '{:,.2f}', u'$ #,##0.00;($ #,##0.00)'   ],
    [ 'BTC' , u'\u0e3f' , 'Bitcoin'  ,  True,  100000000  , '{:,.8f}', u'\u0e3f #,##0.00000000;(\u0e3f #,##0.00000000)', '{:,.5f}', u'\u0e3f #,##0.00000;(\u0e3f #,##0.00000)' ],
    #[ 'LTC' , u'\u0141' , 'Litecoin' ,  True,  100000000  , '{:,.8f}', u'\u0141 #,##0.00000000;(\u0141 #,##0.00000000)', '{:,.5f}', u'\u0141 #,##0.00000;(\u0141 #,##0.00000)']
    # Ny Bitcoin Center settings
    #[ 'BTC' , u'\u0e3f' , 'Bitcoin'  ,  True,  100000  , '{:,.5f}', u'\u0e3f #,##0.000;(\u0e3f #,##0.000)', '{:,.3f}', u'\u0e3f #,##0.000;(\u0e3f #,##0.000)'],
    #[ 'LTC' , u'\u0141' , 'Litecoin' ,  True,  100000  , '{:,.5f}', u'\u0141 #,##0.000;(\u0141 #,##0.000)', '{:,.3f}', u'\u0141 #,##0.000;(\u0141 #,##0.000)']
  ]
  for c in currencies:
    if Currency.get_currency(session,c[0]) :
      continue
    e = Currency(code= c[0],
                 sign=c[1],
                 description=c[2],
                 is_crypto=c[3],
                 pip=c[4],
                 format_python=c[5],
                 format_js=c[6],
                 human_format_python=c[7],
                 human_format_js=c[8] )
    session.add(e)
    session.commit()

  instruments = [
    ['BTCUSD', 'USD', "BTC / USD" ],
    ['BTCEUR', 'EUR', "BTC / ERU" ],
    ['BTCCNY', 'CNY', "BTC / CNY" ],
    ['BTCARS', 'ARS', "BTC / ARS" ],
    ['BTCGBP', 'GBP', "BTC / GBP" ],
    ['BTCBRL', 'BRL', "BTC / BRL" ],
    ['BTCJPY', 'JPY', "BTC / JPY" ],
    ['BTCRUB', 'RUB', "BTC / RUB" ],
    ['BTCRUB', 'INR', "BTC / INR" ],
    ['BTCAOA', 'AOA', "BTC / AOA" ],
    ['BTCAUD', 'AUD', "BTC / AUD" ],
    ['BTCBSD', 'BSD', "BTC / BSD" ],
    ['BTCIDR', 'IDR', "BTC / IDR" ],
    ['BTCILS', 'ILS', "BTC / ILS" ],
    ['BTCMXN', 'MXN', "BTC / MXN" ],
  ]
  for inst in instruments:
    if Instrument.get_instrument(session, inst[0]):
      continue
    e = Instrument(symbol=inst[0], currency=inst[1], description=inst[2])
    session.add(e)
    session.commit()


  # create 1000 test users for the NYC Bitcoin Center - Satoshi square
  #for x in xrange(2, 2000):
  #  if not User.get_user(session, str(x)):
  #    e = User(id=x, username=str(x), email= str(x) + '@nybitcoincenter.com',  broker_id=9000001, broker_username='nybitcoincenter', password='password' + str(x),
  #             country_code='US', state='NY',
  #             verified=1, is_staff=False, is_system=False, is_broker=False)
  #    session.add(e)
  #
  #    # credit each user with 100 BTC, 100k USD and 200k BRL
  #    Ledger.deposit(session, x, str(x), x, str(x), 9000001, 'nybitcoincenter', 9000001, 'nybitcoincenter', 'BTC', 100e8   , 'BONUS' )
  #    Ledger.deposit(session, x, str(x), x, str(x), 9000001, 'nybitcoincenter', 9000001, 'nybitcoincenter', 'USD', 100000e8, 'BONUS' )
  #    session.commit()

  if options.test_mode:
    if not DepositMethods.get_deposit_method(session, 90000010 ):
      bo = DepositMethods(id=90000010,
                         broker_id=9000001,
                         name="wire_transfer_usa",
                         description=u'Wire transfer',
                         disclaimer=u'1 business day.',
                         type='BTI',
                         percent_fee=30,  # 0.3
                         fixed_fee=0,
                         broker_deposit_ctrl_num=90001,
                         currency='USD',
                         parameters= json.dumps( {
                           'download_filename': 'usa_wire_transfer_{{id}}.html',
                           'html_template':'usa_wire_transfer.html',
                           'currency':'$',
                           'value': '{{value}}',
                           'current_date': '{{current_date}}',
                           'control_number': '{{broker_deposit_ctrl_num}}',
                           'routing_number' : '2100000021',
                           'account_number' : '655323442',
                           'account_name': 'New York Bitcoin Center LLC',
                           'address_line_1': '40 Broad St',
                           'address_line_2': 'New York - NY - 10001',
                           'disclaimer': u"Please complete your deposit according to your preferred method. Be sure to send a copy of the Order ID with the receipt of completed payment to us.",
                         } ) )
      session.add(bo)
      session.commit()

    if not DepositMethods.get_deposit_method(session, 90000011 ):
      bo = DepositMethods(id=90000011,
                          broker_id=9000001,
                          name="usps_money_order",
                          description=u'USPS Money Order',
                          disclaimer=u'1 business day.',
                          type='BTI',
                          percent_fee=0,
                          fixed_fee=int(5 * 1e8),
                          broker_deposit_ctrl_num=90001,
                          currency='USD',
                          parameters= json.dumps( {
                            'download_filename': 'usa_usps_money_order_{{id}}.html',
                            'html_template':'usa_usps_money_order.html',
                            'currency':'$',
                            'value': '{{value}}',
                            'current_date': '{{current_date}}',
                            'control_number': '{{broker_deposit_ctrl_num}}',
                            'account_name': 'New York Bitcoin Center LLC',
                            'address_line_1': '40 Broad St',
                            'address_line_2': 'New York - NY - 10001',
                            'disclaimer': u"Please complete your deposit according to your preferred method. Be sure to send a copy of the Order ID with the receipt of completed payment to us.",
                            } ) )
      session.add(bo)
      session.commit()


    if not DepositMethods.get_deposit_method(session, 90000012 ):
      bo = DepositMethods(id=90000012,
                          broker_id=9000001,
                          name="usa_check",
                          description=u'Check',
                          disclaimer=u'3 business days.',
                          type='BTI',
                          percent_fee=100, #1%
                          fixed_fee=0,
                          broker_deposit_ctrl_num=90001,
                          currency='USD',
                          parameters= json.dumps( {
                            'download_filename': 'usa_check{{id}}.html',
                            'html_template':'usa_check.html',
                            'currency':'$',
                            'value': '{{value}}',
                            'current_date': '{{current_date}}',
                            'control_number': '{{broker_deposit_ctrl_num}}',
                            'account_name': 'New York Bitcoin Center LLC',
                            'address_line_1': '40 Broad St',
                            'address_line_2': 'New York - NY - 10001',
                            'disclaimer': u"Please complete your deposit according to your preferred method. Be sure to send a copy of the Order ID with the receipt of completed payment to us.",
                            } ) )
      session.add(bo)
      session.commit()


    if not DepositMethods.get_deposit_method(session, 90000020 ):
      bo = DepositMethods(id=90000020,
                          name="boleto_itau",
                          broker_id=9000002,
                          description=u'Boleto Bancário - Banco Itau',
                          disclaimer=u'Pagável em qualquer banco, lotérica ou agência dos correiros. Confirmação em 1 dia útil caso você pague em uma agência Itaú, caso contrário 4 dias úteis. ',
                          type='BBS',
                          broker_deposit_ctrl_num=50034,
                          percent_fee=165,  # 1.65
                          fixed_fee=int(2.9 * 1e8),  # 2.90
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'deposit_itau_{{id}}.pdf',
                            'codigo_banco': '341',
                            'carteira':'127',
                            'aceite': 'N',
                            'valor_documento': '{{value}}',
                            'valor': '{{value}}',
                            'data_vencimento': '{{current_date}}',
                            'data_documento': '{{current_date}}',
                            'data_processamento': '{{current_date}}',
                            'numero_documento': '{{broker_deposit_ctrl_num}}',
                            'nosso_numero': '{{broker_deposit_ctrl_num}}',

                            'agencia_cedente' : '4000',
                            'conta_cedente' : '4444',
                            'cedente': 'Bitcointoyou',
                            'cedente_documento': '1000',
                            'cedente_cidade': u'São Paulo',
                            'cedente_uf': 'SP',
                            'cedente_endereco': u'endereço',
                            'cedente_bairro': 'bairro',
                            'cedente_cep': '00000-000',

                            'sacado_nome': '{{user.username}}',
                            'sacado_documento': '{{user.id}}',
                            'sacado_cidade': '',
                            'sacado_uf':'',
                            'sacado_endereco':'',
                            'sacado_bairro':'',
                            'sacado_cep':'',
                            'sacado': ['username: {{user.username}}', 'user_id: {{user.id}}' ],

                            'quantidade':'',
                            'especie_documento':'',
                            'especie': 'R$',
                            'moeda': '9',
                            'demonstrativo':'',

                            'local_pagamento': u"Pagável em qualquer banco, lotérica ou agência dos correios até a data de vencimento",
                            'instrucoes': u'Não receber após 30 dias.'
                          } ) )
      session.add(bo)
      session.commit()



      if not DepositMethods.get_deposit_method(session, 90000021 ):
        bo = DepositMethods(id=90000021,
                          broker_id=9000002,
                          name="deposito_itau",
                          description=u'Depósito Bancário - Banco Itaú',
                          disclaimer=u'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                          type='BTI',
                          percent_fee=165,  # 1.65
                          fixed_fee=0,
                          broker_deposit_ctrl_num=90001,
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'instrucao_deposito_itau_{{id}}.html',
                            'html_template':'brazilian_bank_transfer.html',
                            'bank_number': '341',
                            'bank_name': u'Banco Itaú',
                            'currency':'R$',
                            'value': '{{value}}',
                            'current_date': '{{current_date}}',
                            'control_number': '{{broker_deposit_ctrl_num}}',
                            'account_branch' : '1582',
                            'account_number' : '26736-3',
                            'account_name': 'VIVAR TECNOLOGIA DA INFORMAÇÃO LTDA',
                            'account_id': '12.454.181/0001-05',
                            'disclaimer': u"DOC-1 dia para confirmar, TED-3 horas, Depósito em dinheiro direto no caixa - 3 horas ",
                          } ) )
      session.add(bo)
      session.commit()

    if not DepositMethods.get_deposit_method(session, 90000022 ):
      bo = DepositMethods(id=90000022,
                          broker_id=9000002,
                          name="deposito_bradesco",
                          description=u'Depósito Bancário - Banco Bradesco',
                          disclaimer=u'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                          type='BTI',
                          percent_fee=165,  # 1.65
                          fixed_fee=0,
                          broker_deposit_ctrl_num=90001,
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'instrucao_deposito_itau_{{id}}.html',
                            'html_template':'brazilian_bank_transfer.html',
                            'bank_number': '237',
                            'bank_name': u'Banco Bradesco',
                            'currency':'R$',
                            'value': '{{value}}',
                            'current_date': '{{current_date}}',
                            'control_number': '{{broker_deposit_ctrl_num}}',
                            'account_branch' : '1463',
                            'account_number' : '402101-0',
                            'account_name': 'VIVAR TECNOLOGIA DA INFORMAÇÃO LTDA',
                            'account_id': '12.454.181/0001-05',
                            'disclaimer': u"DOC-1 dia para confirmar, TED-3 horas, Depósito em dinheiro direto no caixa - 3 horas ",
                          } ) )
      session.add(bo)
      session.commit()



    if not DepositMethods.get_deposit_method(session, 90000030 ):
      bo = DepositMethods(id=90000030,
                          name="boleto_itau",
                          broker_id=9000003,
                          description=u'Boleto Bancário - Banco Itau',
                          disclaimer=u'Pagável em qualquer banco, lotérica ou agência dos correiros. Confirmação em 1 dia útil caso você pague em uma agência Itaú, caso contrário 4 dias úteis. ',
                          type='BBS',
                          broker_deposit_ctrl_num=50034,
                          percent_fee=135,  # 1.35
                          fixed_fee=int(2.9 * 1e8),  # 2.90
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'deposit_itau_{{id}}.pdf',
                            'codigo_banco': '341',
                            'carteira':'127',
                            'aceite': 'N',
                            'valor_documento': '{{value}}',
                            'valor': '{{value}}',
                            'data_vencimento': '{{current_date}}',
                            'data_documento': '{{current_date}}',
                            'data_processamento': '{{current_date}}',
                            'numero_documento': '{{broker_deposit_ctrl_num}}',
                            'nosso_numero': '{{broker_deposit_ctrl_num}}',

                            'agencia_cedente' : '4000',
                            'conta_cedente' : '4444',
                            'cedente': 'Bitcointoyou',
                            'cedente_documento': '1000',
                            'cedente_cidade': u'São Paulo',
                            'cedente_uf': 'SP',
                            'cedente_endereco': u'endereço',
                            'cedente_bairro': 'bairro',
                            'cedente_cep': '00000-000',

                            'sacado_nome': '{{user.username}}',
                            'sacado_documento': '{{user.id}}',
                            'sacado_cidade': '',
                            'sacado_uf':'',
                            'sacado_endereco':'',
                            'sacado_bairro':'',
                            'sacado_cep':'',
                            'sacado': ['username: {{user.username}}', 'user_id: {{user.id}}' ],

                            'quantidade':'',
                            'especie_documento':'',
                            'especie': 'R$',
                            'moeda': '9',
                            'demonstrativo':'',

                            'local_pagamento': u"Pagável em qualquer banco, lotérica ou agência dos correios até a data de vencimento",
                            'instrucoes': u'Não receber após 30 dias.'
                          } ) )
      session.add(bo)
      session.commit()

    if not DepositMethods.get_deposit_method(session, 90000031 ):
      bo = DepositMethods(id=90000031,
                          broker_id=9000003,
                          name="deposito_bradesco",
                          description=u'Depósito Bancário - Banco Bradesco',
                          disclaimer=u'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                          type='BTI',
                          percent_fee=135,  # 1.35
                          fixed_fee=0,
                          broker_deposit_ctrl_num=90001,
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'instrucao_deposito_itau_{{id}}.html',
                            'html_template':'brazilian_bank_transfer.html',
                            'bank_number': '237',
                            'bank_name': u'Banco Bradesco',
                            'currency':'R$',
                            'value': '{{value}}',
                            'current_date': '{{current_date}}',
                            'control_number': '{{broker_deposit_ctrl_num}}',
                            'account_branch' : '1463',
                            'account_number' : '402101-0',
                            'account_name': 'VIVAR TECNOLOGIA DA INFORMAÇÃO LTDA',
                            'account_id': '12.454.181/0001-05',
                            'disclaimer': u"DOC-1 dia para confirmar, TED-3 horas, Depósito em dinheiro direto no caixa - 3 horas ",
                            } ) )
      session.add(bo)
      session.commit()





    if not DepositMethods.get_deposit_method(session, 90000040 ):
      bo = DepositMethods(id=90000040,
                          name="boleto_itau",
                          broker_id=9000004,
                          description=u'Boleto Bancário - Banco Itau',
                          disclaimer=u'Pagável em qualquer banco, lotérica ou agência dos correiros. Confirmação em 1 dia útil caso você pague em uma agência Itaú, caso contrário 4 dias úteis. ',
                          type='BBS',
                          broker_deposit_ctrl_num=50034,
                          percent_fee=135,  # 1.35
                          fixed_fee=int(2.9 * 1e8),  # 2.90
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'deposit_itau_{{id}}.pdf',
                            'codigo_banco': '341',
                            'carteira':'127',
                            'aceite': 'N',
                            'valor_documento': '{{value}}',
                            'valor': '{{value}}',
                            'data_vencimento': '{{current_date}}',
                            'data_documento': '{{current_date}}',
                            'data_processamento': '{{current_date}}',
                            'numero_documento': '{{broker_deposit_ctrl_num}}',
                            'nosso_numero': '{{broker_deposit_ctrl_num}}',

                            'agencia_cedente' : '4000',
                            'conta_cedente' : '4444',
                            'cedente': 'Bitcointoyou',
                            'cedente_documento': '1000',
                            'cedente_cidade': u'São Paulo',
                            'cedente_uf': 'SP',
                            'cedente_endereco': u'endereço',
                            'cedente_bairro': 'bairro',
                            'cedente_cep': '00000-000',

                            'sacado_nome': '{{user.username}}',
                            'sacado_documento': '{{user.id}}',
                            'sacado_cidade': '',
                            'sacado_uf':'',
                            'sacado_endereco':'',
                            'sacado_bairro':'',
                            'sacado_cep':'',
                            'sacado': ['username: {{user.username}}', 'user_id: {{user.id}}' ],

                            'quantidade':'',
                            'especie_documento':'',
                            'especie': 'R$',
                            'moeda': '9',
                            'demonstrativo':'',

                            'local_pagamento': u"Pagável em qualquer banco, lotérica ou agência dos correios até a data de vencimento",
                            'instrucoes': u'Não receber após 30 dias.'
                          } ) )
      session.add(bo)
      session.commit()

    if not DepositMethods.get_deposit_method(session, 90000041 ):
      bo = DepositMethods(id=90000041,
                          broker_id=9000004,
                          name="deposito_bradesco",
                          description=u'Depósito Bancário - Banco Bradesco',
                          disclaimer=u'Até 24 horas, geralmente em 15 minutos. Taxa de 1,65%.  Apenas para usuários verificados',
                          type='BTI',
                          percent_fee=135,  # 1.35
                          fixed_fee=0,
                          broker_deposit_ctrl_num=90001,
                          currency='BRL',
                          parameters= json.dumps( {
                            'download_filename': 'instrucao_deposito_itau_{{id}}.html',
                            'html_template':'brazilian_bank_transfer.html',
                            'bank_number': '237',
                            'bank_name': u'Banco Bradesco',
                            'currency':'R$',
                            'value': '{{value}}',
                            'current_date': '{{current_date}}',
                            'control_number': '{{broker_deposit_ctrl_num}}',
                            'account_branch' : '1463',
                            'account_number' : '402101-0',
                            'account_name': 'VIVAR TECNOLOGIA DA INFORMAÇÃO LTDA',
                            'account_id': '12.454.181/0001-05',
                            'disclaimer': u"DOC-1 dia para confirmar, TED-3 horas, Depósito em dinheiro direto no caixa - 3 horas ",
                            } ) )
      session.add(bo)
      session.commit()

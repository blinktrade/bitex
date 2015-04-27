# -*- coding: utf-8 -*-

import os

import logging
import hmac, base64, struct, hashlib, time, uuid

import datetime
from pyblinktrade.utils import smart_str
import random

from sqlalchemy import ForeignKey
from sqlalchemy import desc, func
from sqlalchemy.sql.expression import and_, or_, exists
from sqlalchemy import Column, Integer, Unicode, String, DateTime, Boolean, Numeric, Text, Date, UniqueConstraint, UnicodeText, Index
from sqlalchemy.orm import  relationship, backref
from sqlalchemy.ext.declarative import declarative_base
import json

from copy import deepcopy
from pyblinktrade.json_encoder import JsonEncoder

Base = declarative_base()

from trade_application import TradeApplication

from sqlalchemy.ext.declarative import DeclarativeMeta

import onetimepass


def get_datetime_now(timezone=None):
  #this is just a workaround, so we can test datetime.datetime.now()
  from trade import get_now
  return get_now(timezone)

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
  __tablename__       = 'currencies'
  code                = Column(String(4), primary_key=True)
  sign                = Column(String(2))
  description         = Column(String(15), nullable=False)
  is_crypto           = Column(Boolean, nullable=False)
  pip                 = Column(Integer, default=10000000)
  format_python       = Column(String(25))
  format_js           = Column(String(25))
  human_format_python = Column(String(25))
  human_format_js     = Column(String(25))
  number_of_decimals  = Column(Integer, default=2)

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
    return u"<Currency(code=%r, sign=%r, description=%r, is_crypto=%r, pip=%r, format_python=%r, format_js=%r, human_format_python=%r, human_format_js=%r, number_of_decimals=%r)>" % (
      self.code, self.sign, self.description, self.is_crypto, self.pip, self.format_python, self.format_js, self.human_format_python, self.human_format_js, self.number_of_decimals
      )

class Instrument(Base):
  __tablename__   = 'instruments'
  symbol          = Column(String(12), primary_key=True)
  currency        = Column(String(4) , ForeignKey('currencies.code'))
  description     = Column(String(12), nullable=False )
  brokers         = Column(Text)

  @staticmethod
  def get_instruments(session, request_type=None) :
    return  [ x for x in session.query(Instrument)]

  @staticmethod
  def get_instrument(session, symbol):
    return  session.query(Instrument).filter_by(symbol=symbol).first()

  def __repr__(self):
    return u"<Instrument(symbol=%r, currency=%r, description=%r, brokers=%r)>" % (
        self.symbol, self.currency, self.description, self.brokers)


class User(Base):
  __tablename__   = 'users'
  id              = Column(Integer, primary_key=True)
  username        = Column(String(15), nullable=False, index=True )
  email           = Column(String(75), nullable=False, index=True )

  broker_id       = Column(Integer, ForeignKey('users.id'), index=True )
  broker          = relationship("User", remote_side=[id])
  broker_username = Column(String(15), index=True)

  state           = Column(String(30), index=True )
  country_code    = Column(String(2),  nullable=False, index=True)

  password_algo   = Column(String(8), nullable=False)
  password_salt   = Column(String(128), nullable=False)
  password        = Column(String(128), nullable=False)

  verified        = Column(Integer, nullable=False, default=0, index=True)
  verification_data = Column(Text, index=True)
  is_staff        = Column(Boolean, nullable=False, default=False)
  is_system       = Column(Boolean, nullable=False, default=False)
  is_broker       = Column(Boolean, nullable=False, default=False)
  is_market_maker = Column(Boolean, nullable=False, default=False)

  created         = Column(DateTime, default=get_datetime_now, nullable=False)
  last_login      = Column(DateTime, default=get_datetime_now, nullable=False)

  two_factor_enabled  = Column(Boolean, nullable=False, default=False)
  two_factor_secret   = Column(String(50), nullable=True, index=False)

  deposit_percent_fee   = Column(Numeric, nullable=True, default=None)
  deposit_fixed_fee     = Column(Integer, nullable=True, default=None)
  withdraw_percent_fee  = Column(Numeric, nullable=True, default=None)
  withdraw_fixed_fee    = Column(Integer, nullable=True, default=None)
  transaction_fee_buy   = Column(Integer, nullable=True, default=None)
  transaction_fee_sell  = Column(Integer, nullable=True, default=None)

  withdraw_email_validation  = Column(Boolean, nullable=False, default=True)

  email_lang       = Column(String, nullable=False)

  has_instant_withdrawal  = Column(Boolean, nullable=False, default=True)

  __table_args__ = (UniqueConstraint('broker_id', 'username', name='_username_uc'),
                    UniqueConstraint('broker_id', 'email', name='_email_uc'),  )

  def __repr__(self):
    return u"<User(id=%r, username=%r, email=%r,  broker_id=%r, broker_username=%r, "\
           u" password_algo=%r, password_salt=%r, password=%r,"\
           u" state=%r, country_code=%r, transaction_fee_buy=%r, transaction_fee_sell=%r,"\
           u" verified=%r, verification_data=%r, is_staff=%r, is_system=%r, is_broker=%r,  created=%r, "\
           u" last_login=%r,  email_lang=%r, deposit_percent_fee=%r, deposit_fixed_fee=%r,"\
           u" two_factor_enabled=%r, two_factor_secret=%r,withdraw_email_validation=%r,"\
           u" withdraw_percent_fee=%r, withdraw_fixed_fee=%r, is_market_maker=%r, has_instant_withdrawal=%r )>"\
    % (self.id, self.username, self.email, self.broker_id, self.broker_username,
       self.password_algo, self.password_salt, self.password,
       self.state, self.country_code, self.transaction_fee_buy, self.transaction_fee_sell,
       self.verified, self.verification_data, self.is_staff, self.is_system, self.is_broker, self.created,
       self.last_login, self.email_lang, self.deposit_percent_fee, self.deposit_fixed_fee,
       self.two_factor_enabled, self.two_factor_secret,self.withdraw_email_validation,
       self.withdraw_percent_fee, self.withdraw_fixed_fee, self.is_market_maker, self.has_instant_withdrawal)

  def __init__(self, *args, **kwargs):
    if 'password' in kwargs:
      kwargs['password'] = self.set_password(kwargs.get('password'))
    super(User, self).__init__(*args, **kwargs)

  @property
  def account_id(self):
    return self.id


  def set_password(self, raw_password):
    self.password_algo = 'sha1'
    self.password_salt = get_hexdigest(self.password_algo, str(random.random()), str(random.random()))[:5]
    self.password = get_hexdigest(self.password_algo, self.password_salt, raw_password)
    return  self.password

  def check_password(self, raw_password):
    return self.password == get_hexdigest(self.password_algo, self.password_salt, raw_password)

  @staticmethod
  def get_user( session, broker_id, username=None, email=None, user_id=None ):
    if username:
      username = username.lower().strip()
    if email:
      email = email.lower().strip()


    if user_id:
      filter_obj = or_(User.id == user_id)
    elif username and email:
      filter_obj = or_( func.lower(User.username)==username, func.lower(User.email)==email )
    elif username:
      filter_obj = or_( func.lower(User.username)==username )
    elif email:
      filter_obj = or_( func.lower(User.email)==email )
    else:
      return  None
    user = session.query(User).filter(User.broker_id == broker_id).filter(filter_obj).first()
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
      query = query.filter( or_( User.username.like(client_id), User.email.like('%' + client_id + '%'), User.verification_data.like( '%'  + client_id + '%') ) )


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
    if User.get_user( session, broker_id=broker_id, username=username , email=email):
      raise UserAlreadyExistsException()

    broker = Broker.get_broker( session, broker_id)
    if not broker:
      raise BrokerDoesNotExistsException()

    # signup the user
    # create the user on Database
    u = User( username            = username.strip(),
              email               = email.strip(),
              password            = password,
              state               = state,
              country_code        = country_code,
              broker_id           = broker_id,
              broker_username     = broker.user.username,
              email_lang          = broker.lang)

    session.add(u)
    session.commit()

    UserEmail.create( session = session,
                      user_id = u.id,
                      broker_id = u.broker_id,
                      subject = 'W',
                      template= "welcome",
                      language= u.email_lang,
                      params=  json.dumps({
                        'username': u.username,
                        'email': u.email,
                        'state': u.state,
                        'country_code': u.country_code,
                        'id': u.id,
                        'broker_id': u.broker_id,
                        'broker_username': u.broker_username}))
    return u, broker

  @staticmethod
  def authenticate(session, broker_id, user, password, second_factor=None, finger_print=None, remote_ip=None, stunt_ip=None):
    user = User.get_user( session, broker_id, user, user)

    if user and  user.two_factor_enabled and second_factor is None:
      raise NeedSecondFactorException

    if user:
      if user.check_password(password):

        if user.two_factor_enabled:
          if second_factor is None or second_factor == '':
            raise NeedSecondFactorException

          if not onetimepass.valid_totp(token=int(second_factor), secret=user.two_factor_secret):
            raise NeedSecondFactorException

        # update the last login
        user.last_login = get_datetime_now()

        if finger_print or remote_ip:
          AccessLog.login(session, user ,finger_print, remote_ip, stunt_ip)

        return user


    return None

  def update(self, fields):
    for field, field_value in fields.iteritems():
      if hasattr(self, field):
        setattr(self, field, field_value)

  def check_second_factor(self, second_factor):
    if not onetimepass.valid_totp(token=int(second_factor), secret=self.two_factor_secret):
      return False
    return True

  def enable_two_factor(self, enable, secret, second_factor):
    if enable:
      if secret and second_factor is not None and second_factor.isdigit() and\
         onetimepass.valid_totp(token=int(second_factor), secret=secret):
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

  def request_reset_password(self, session, email_lang):
    UserPasswordReset.create( session, self.id, self.broker_id , email_lang )

  def set_verified(self, session, verified, verification_data, bonus_account):

    def _mklist(l):
      return l if isinstance(l, list) else list(l)

    just_became_verified = False
    if self.verified != verified:
      if self.verified < 3 and verified >= 3:
        just_became_verified = True
      self.verified = verified

      verification_data_json = []
      if verification_data:
        if self.verification_data:

          try:
            current_verification_data = json.loads(self.verification_data)
            current_verification_data = _mklist(current_verification_data) + _mklist(verification_data)
          except ValueError:
            current_verification_data = [ { "data": self.verification_data } ] + _mklist(verification_data)

          verification_data_json = current_verification_data
        else:
          verification_data_json = _mklist(verification_data)

        verification_data = json.dumps(verification_data_json)

        self.verification_data = verification_data


      session.add(self)
      session.flush()

      verify_customer_refresh_msg = dict()
      verify_customer_refresh_msg['MsgType'] = 'B11'
      verify_customer_refresh_msg['ClientID'] = self.id
      verify_customer_refresh_msg['BrokerID'] = self.broker_id
      verify_customer_refresh_msg['Username'] = self.username
      verify_customer_refresh_msg['Verified'] = self.verified
      verify_customer_refresh_msg['VerificationData'] = verification_data

      TradeApplication.instance().publish( self.id,  verify_customer_refresh_msg  )
      TradeApplication.instance().publish( self.broker_id,  verify_customer_refresh_msg  )


      if self.verified == 1:
        email_params = {
          'username': self.username,
          'email': self.email,
          'state': self.state,
          'country_code': self.country_code,
          'id': self.id,
          'broker_id': self.broker_id,
          'verified': self.verified,
          'verification_data': verification_data,
          'broker_username': self.broker_username
        }
        broker = Broker.get_broker( session, self.broker_id)
        UserEmail.create( session = session,
                          user_id = self.broker_id,
                          broker_id = broker.user.broker_id,
                          subject = "VS",
                          template= "customer-verification-submit",
                          language= self.email_lang,
                          params=  json.dumps(email_params))

      elif self.verified > 2:
        if just_became_verified and bonus_account:

          current_bonus_balance = Balance.get_balance(session,
                                                      bonus_account[0],
                                                      self.broker_id,
                                                      bonus_account[2][0] )
          if current_bonus_balance > 0:
            bonus_amount = min(current_bonus_balance, bonus_account[2][1])
            Ledger.transfer(session,
                            bonus_account[0],         # from_account_id
                            bonus_account[1],         # from_account_name
                            self.broker_id,           # from_broker_id
                            self.broker_username,     # from_broker_name
                            self.id,                  # to_account_id
                            self.username,            # to_account_name
                            self.broker_id,           # to_broker_id
                            self.broker_username,     # to_broker_name
                            bonus_account[2][0],      # currency
                            bonus_amount,             # amount
                            str(self.id),             # reference
                            'B'                       # descriptions
            )


        UserEmail.create( session = session,
                          user_id = self.id,
                          broker_id = self.broker_id,
                          subject = u"AV",
                          template= "your-account-has-been-verified",
                          language= self.email_lang,
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

  def disable_instant_withdrawals(self, session, reason):
    if self.has_instant_withdrawal:
      self.has_instant_withdrawal = False
      session.add(self)


      broker = Broker.get_broker( session, self.broker_id)

      email_params = {
        'username':  broker.mailer_from_name,
        'account_id': self.id,
        'account_username': self.username,
        'account_email': self.email,
        'account_created': self.created,
        'account_last_login': self.last_login,
        'account_verified': self.verified,
        'account_verification_data': self.verification_data,
        'reason': reason
      }

      UserEmail.create( session = session,
                        user_id = self.broker_id,
                        broker_id = broker.user.broker_id,
                        subject = "DI",
                        template= "disable-instant-withdrawals",
                        language= self.email_lang,
                        params=  json.dumps(email_params, cls=JsonEncoder))

class ApiAccess(Base):
  __tablename__         = 'api_access'
  api_key               = Column(String(128),primary_key=True)
  user_id               = Column(Integer,    ForeignKey('users.id')        ,nullable=False)
  username              = Column(String(15), nullable=False)
  broker_id             = Column(Integer,    ForeignKey('users.id'))
  broker_username       = Column(String,     nullable=False)
  label                 = Column(String(15), nullable=False, index=True)
  api_secret            = Column(String(128),nullable=False)
  api_password          = Column(String(128),nullable=False)
  api_password_salt     = Column(String(5),  nullable=False)
  ip_white_list         = Column(Text,       default="[]", nullable=False)
  permission_list       = Column(Text,       nullable=False)
  revocable             = Column(Boolean,    nullable=False, default=True, index=True)
  status                = Column(Integer,    nullable=False, default=1, index=True)
  created               = Column(DateTime,   default=get_datetime_now, nullable=False)
  last_used             = Column(DateTime,   default=get_datetime_now, onupdate=get_datetime_now, nullable=False)

  def __repr__(self):
    return u"<ApiAccess(api_key=%r,user_id=%r,username=%r,broker_id=%r,broker_username=%r,label=%r,"\
           u"api_secret=%r,api_password=%r,api_password_salt=%r,ip_white_list=%r,permission_list=%r,"\
          u"revocable=%r,status=%r,created=%r,last_used=%r)>" % (
      self.api_key,self.user_id,self.username,self.broker_id,self.broker_username,self.label,
      self.api_secret,self.api_password,self.api_password_salt,self.ip_white_list,self.permission_list,
      self.revocable,self.status,self.created,self.last_used)

  def revoke(self, session):
    if self.revocable and self.status == 1:
      self.status = 0
      session.add(self)


  @staticmethod
  def get_api_access_by_api_key(session, api_key):
    api_access = session.query(ApiAccess).filter_by(api_key=api_key).first()
    return api_access

  @staticmethod
  def create(session, user, label, permission_list, ip_white_list, revocable):
    api_key = base64.b64encode(hashlib.sha256( str(random.getrandbits(256)) ).digest(),
                               random.choice(['rA','aZ','gQ','hH','hG','aR','DD'])).rstrip('==')

    api_secret = base64.b64encode(hashlib.sha256( str(random.getrandbits(256)) ).digest(),
                                  random.choice(['rA','aZ','gQ','hH','hG','aR','DD'])).rstrip('==')

    password_salt = get_hexdigest('sha1', str(random.random()), str(random.random()))[:5]
    raw_password = base64.b64encode(hashlib.sha256( str(random.getrandbits(256)) ).digest(),
                               random.choice(['rA','aZ','gQ','hH','hG','aR','DD'])).rstrip('==')[:15]
    password = get_hexdigest('sha1', password_salt, raw_password )

    api_access = ApiAccess( api_key           = api_key,
                            user_id           = user.id,
                            username          = user.username,
                            broker_id         = user.broker_id,
                            broker_username   = user.broker_username,
                            label             = label,
                            api_secret        = api_secret,
                            api_password_salt = password_salt,
                            api_password      = password,
                            revocable         = revocable,
                            ip_white_list     = json.dumps(ip_white_list),
                            permission_list   = json.dumps(permission_list))
    session.add(api_access)
    session.flush()
    return api_access, raw_password

  @staticmethod
  def authenticate(session, api_key, api_password, finger_print, remote_ip, stunt_ip=None):
    api_access = ApiAccess.get_api_access_by_api_key(session, api_key)
    if api_access is None:
      return None, None

    if api_access.api_password != get_hexdigest('sha1', api_access.api_password_salt, api_password):
      # TODO: The user shall receive an email saying that someone is trying to access his account with the wrong api pwd
      return None, None

    if api_access.status != 1:
      # TODO: The user shall receive an email when someone is trying to access his account using a revoked api key
      return None, None

    ip_white_list = json.loads(api_access.ip_white_list)
    if ip_white_list and remote_ip not in ip_white_list:
      # TODO: The user shall receive an email when someone is try to access his account from a non white listed ip
      return None, None

    user = User.get_user(session, broker_id=api_access.broker_id, user_id=api_access.user_id)
    user.last_login = get_datetime_now()
    api_access.last_used = user.last_login
    session.add(api_access)

    if finger_print or remote_ip:
      AccessLog.login(session, user ,finger_print, remote_ip, stunt_ip)

    return user, json.loads(api_access.permission_list)

  @staticmethod
  def get_list(session, broker_id, user_id, page_size, offset):
    query = session.query(ApiAccess).filter_by(broker_id=broker_id).filter_by(user_id=user_id).filter_by(status=1)
    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)

    return query

class AccessLog(Base):
  __tablename__         = 'access_log'
  id                    = Column(Integer,       primary_key=True)
  user_id               = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  username              = Column(String(15),    nullable=False)
  broker_id             = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  finger_print          = Column(Integer,       nullable=False, index=True)
  remote_ip             = Column(String,        nullable=False, index=True)
  stunt_ip              = Column(Text)
  number_of_logins      = Column(Integer,       nullable=False, default=1)
  created               = Column(DateTime,      default=get_datetime_now, nullable=False)
  last_login            = Column(DateTime,      default=get_datetime_now, onupdate=get_datetime_now, nullable=False)

  __table_args__ = (Index('idx_access_log_broker_id_remote_ip_finger_print', 'broker_id', 'remote_ip', 'finger_print' ), )

  @staticmethod
  def login(session, user, finger_print, remote_ip, stunt_ip=None ):
    if stunt_ip:
      stunt_ip = json.dumps(stunt_ip)


    set_of_users_that_will_have_instant_withdrawal_disabled = set()
    q = session.query(AccessLog).filter_by(broker_id=user.broker_id).\
                                 filter_by(finger_print = finger_print).\
                                 filter_by(remote_ip = remote_ip )

    found_previous_record = False
    for log_record in q:
      if log_record.user_id == user.id:
        found_previous_record = True
        log_record.number_of_logins += 1
        session.add(log_record)
      else:
        u = User.get_user(session, broker_id=log_record.broker_id, user_id=log_record.user_id)
        set_of_users_that_will_have_instant_withdrawal_disabled.add(u)
    

    if not found_previous_record:
      log_record = AccessLog(user_id       = user.id,
                             username      = user.username,
                             broker_id     = user.broker_id,
                             finger_print  = finger_print,
                             remote_ip     = remote_ip,
                             stunt_ip      = stunt_ip)
      session.add(log_record)


    if set_of_users_that_will_have_instant_withdrawal_disabled:
      set_of_users_that_will_have_instant_withdrawal_disabled.add(user)

    username_list = []
    for u in set_of_users_that_will_have_instant_withdrawal_disabled:
      username_list.append(u.username)

    for u in set_of_users_that_will_have_instant_withdrawal_disabled:
      reason = {
        "code": "MULTIPLE_ACCOUNTS_FOR_SAME_IP",
        "other_accounts": username_list,
        "ip":  remote_ip,
        "finger_print": finger_print,
        "stunt_ip": stunt_ip,
        "username": user.username
      }
      u.disable_instant_withdrawals(session, json.dumps(reason))
      session.add(u)


class Position(Base):
  __tablename__         = 'position'
  id                    = Column(Integer,       primary_key=True)
  account_id            = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  account_name          = Column(String(15),    nullable=False)
  broker_id             = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  broker_name           = Column(String(30),    nullable=False)
  currency              = Column(String(4),     ForeignKey('currencies.code') ,nullable=False )
  position              = Column(Integer,       nullable=False, default=0)
  last_update           = Column(DateTime, default=get_datetime_now, nullable=False)

  __table_args__ = (UniqueConstraint('account_id', 'broker_id', 'currency', name='_position_uc'), )

  def __repr__(self):
    return u"<Position(id=%r, account_id=%r, account_name=%r, broker_id=%r, broker_name=%r, currency=%r, position=%r, last_update=%r)>" % (
      self.id, self.account_id, self.account_name,  self.broker_id, self.broker_name, self.currency, self.position, self.last_update )

  @staticmethod
  def get_positions_by_account(session, account_id):
    return session.query(Position).filter_by(account_id = account_id)

  @staticmethod
  def get_positions_by_account_broker(session, account_id, broker_id):
    return session.query(Position).filter_by(account_id = account_id).filter_by(broker_id = broker_id )

  @staticmethod
  def get_position(session, account_id, broker_id, currency ):
    currency  = currency.strip().upper()
    obj = session.query(Position).filter_by(account_id = account_id ).filter_by(broker_id = broker_id ).filter_by(currency = currency).first()
    if not obj:
      return 0
    return obj.position

  @staticmethod
  def update_position(session,operation, account_id, account_name, broker_id, broker_name, currency, value ):
    currency  = currency.strip().upper()
    obj = session.query(Position).filter_by(account_id = account_id ).filter_by(broker_id = broker_id ).filter_by(currency = currency).first()
    if not obj:
      obj = Position(account_id   = account_id,
                     account_name = account_name,
                     currency     = currency,
                     broker_id    = broker_id,
                     broker_name  = broker_name,
                     position     = 0)

    if operation == 'CREDIT':
      obj.position = obj.position + value
    elif operation == 'DEBIT':
      obj.position = obj.position - value

    session.add(obj)

    position_update_msg = dict()
    position_update_msg['MsgType'] = 'U43'
    position_update_msg['ClientID'] = account_id
    position_update_msg[broker_id] = { currency: obj.position }
    TradeApplication.instance().publish( account_id,  position_update_msg  )

    return obj.position


class PositionLedger(Base):
  __tablename__         = 'position_ledger'
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
  position              = Column(Integer,       nullable=False)
  reference             = Column(String(25),    nullable=False)
  created               = Column(DateTime,      default=get_datetime_now, nullable=False)
  description           = Column(String(255))

  def __repr__(self):
    return u"<PositionLedger(id=%r, currency=%r, account_id=%r, broker_id=%r, payee_id=%r, payee_broker_id=%r,"\
           u"operation=%r,amount=%r,position=%r,reference=%r, created=%r,description=%r,"\
           u"account_name=%r,broker_name=%r,payee_name=%r,payee_broker_name=%r)>" % (
      self.id, self.currency, self.account_id, self.broker_id, self.payee_id, self.payee_broker_id,
      self.operation, self.amount, self.position, self.reference, self.created, self.description,
      self.account_name, self.broker_name, self.payee_name, self.payee_broker_name)


  @staticmethod
  def get_list(session, broker_id, account_id, operation_list, page_size, offset, currency=None, filter_array=[]):
    query = session.query(PositionLedger).filter( PositionLedger.operation.in_( operation_list ) ).filter(PositionLedger.broker_id==broker_id)

    if currency:
      query = query.filter( PositionLedger.currency == currency)

    if account_id:
      query = query.filter( PositionLedger.account_id == account_id  )

    for filter in filter_array:
      if filter:
        if filter.isdigit():
          query = query.filter( or_( PositionLedger.description.like('%' + filter + '%' ),
                                     PositionLedger.reference == filter,
                                     PositionLedger.amount == int(filter),
                                     PositionLedger.position == int(filter)
          ))
        else:
          query = query.filter( or_( PositionLedger.description.like('%' + filter + '%' ),
                                     PositionLedger.reference == filter
          ))

    query = query.order_by(desc(PositionLedger.created))

    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)

    return query

  @staticmethod
  def transfer(session, from_account_id, from_account_name, from_broker_id, from_broker_name, to_account_id, to_account_name, to_broker_id, to_broker_name, currency, amount, reference=None, description=None):
    position = Position.update_position(session, 'DEBIT', from_account_id, from_account_name, from_broker_id, from_broker_name, currency, amount)
    ledger = PositionLedger( currency         = currency,
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
                             position         = position,
                             reference        = reference,
                             description      = description )
    session.add(ledger)

    position = Position.update_position(session, 'CREDIT', to_account_id, to_account_name, to_broker_id, to_broker_name, currency, amount)
    ledger = PositionLedger( currency         = currency,
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
                             position         = position,
                             reference        = reference,
                             description      = description )
    session.add(ledger)

class Balance(Base):
  __tablename__         = 'balances'
  id                    = Column(Integer,       primary_key=True)
  account_id            = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  account_name          = Column(String(15),    nullable=False)
  broker_id             = Column(Integer,       ForeignKey('users.id')        ,nullable=False)
  broker_name           = Column(String(30),    nullable=False)
  currency              = Column(String(4),     ForeignKey('currencies.code') ,nullable=False )
  balance               = Column(Integer,       nullable=False, default=0)
  last_update           = Column(DateTime, default=get_datetime_now, nullable=False)

  __table_args__ = (UniqueConstraint('account_id', 'broker_id', 'currency', name='_balance_uc'), )

  def __repr__(self):
    return u"<Balance(id=%r, account_id=%r, account_name=%r, broker_id=%r, broker_name=%r, currency=%r, balance=%r, last_update=%r)>" % (
      self.id, self.account_id, self.account_name,  self.broker_id, self.broker_name, self.currency, self.balance, self.last_update )

  @staticmethod
  def get_balances_by_rank(session, currency = 'BTC'):
    entries = session.query(Balance).filter_by(currency = currency).order_by(Balance.balance.desc())

    result_rank = []
    for i, balance in enumerate(entries):
      if balance.balance > 0:
        result_rank.append([i+1, balance.account_name, balance.broker_name, balance.balance])

    return result_rank

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
  def update_balance(session,operation, account_id, account_name, broker_id, broker_name, currency, value ):
    currency  = currency.strip().upper()
    balance_obj = session.query(Balance).filter_by(account_id = account_id ).filter_by(broker_id = broker_id ).filter_by(currency = currency).first()
    if not balance_obj:
      balance_obj = Balance(account_id  = account_id,
                            account_name = account_name,
                            currency    = currency,
                            broker_id   = broker_id,
                            broker_name = broker_name,
                            balance     = 0)

    if operation == 'CREDIT':
      balance_obj.balance = int(balance_obj.balance + value)
    elif operation == 'DEBIT':
      balance_obj.balance = int(balance_obj.balance - value)

    session.add(balance_obj)

    balance_update_msg = dict()
    balance_update_msg['MsgType'] = 'U3'
    balance_update_msg['ClientID'] = account_id
    balance_update_msg[broker_id] = { currency: balance_obj.balance }
    TradeApplication.instance().publish( account_id,  balance_update_msg  )

    try:
      broker_accounts = json.loads(Broker.get_broker(session, broker_id).accounts)
      for name, account_data in broker_accounts.iteritems():
        if account_id == account_data[0]:
          TradeApplication.instance().publish( broker_id,  balance_update_msg  )
          break
    except :
      pass
    return balance_obj.balance

class Ledger(Base):
  __tablename__         = 'ledger'
  id                    = Column(Integer,       primary_key=True)
  currency              = Column(String(4),     ForeignKey('currencies.code'),nullable=False)
  account_id            = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  account_name          = Column(String,        nullable=False,  index=True)
  broker_id             = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  broker_name           = Column(String,        nullable=False,  index=True)
  payee_id              = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  payee_name            = Column(String,        nullable=False,  index=True)
  payee_broker_id       = Column(Integer,       ForeignKey('users.id'),       nullable=False)
  payee_broker_name     = Column(String,        nullable=False,  index=True)
  operation             = Column(String(1),     nullable=False)
  amount                = Column(Integer,       nullable=False,  index=True)
  balance               = Column(Integer,       nullable=False,  index=True)
  reference             = Column(String(25),    nullable=False,  index=True)
  created               = Column(DateTime,      default=get_datetime_now, nullable=False)
  description           = Column(String(255),   index=True)

  def __repr__(self):
    return u"<Ledger(id=%r, currency=%r, account_id=%r, broker_id=%r, payee_id=%r, payee_broker_id=%r,"\
           u"operation=%r,amount=%r,balance=%r,reference=%r, created=%r,description=%r,"\
           u"account_name=%r,broker_name=%r,payee_name=%r,payee_broker_name=%r)>" % (
      self.id, self.currency, self.account_id, self.broker_id, self.payee_id, self.payee_broker_id,
      self.operation, self.amount, self.balance, self.reference, self.created, self.description,
      self.account_name, self.broker_name, self.payee_name, self.payee_broker_name)


  @staticmethod
  def get_list(session, broker_id, account_id,  page_size, offset, currency=None, filter_array=[]):
    query = session.query(Ledger).filter(Ledger.broker_id==broker_id)

    if currency:
      query = query.filter( Ledger.currency == currency)

    if account_id:
      query = query.filter( Ledger.account_id == account_id  )

    for filter in filter_array:
      if filter:
        if filter.isdigit():
          query = query.filter( or_( Ledger.payee_name == filter,
                                     Ledger.account_name == filter,
                                     Ledger.broker_name == filter,
                                     Ledger.reference == filter,
                                     Ledger.amount == int(filter),
                                     Ledger.balance == int(filter)
          ))
        else:
          query = query.filter( or_( Ledger.payee_name == filter,
                                     Ledger.account_name == filter,
                                     Ledger.broker_name == filter,
                                     Ledger.reference == filter
          ))

    query = query.order_by(desc(Ledger.created))

    if page_size:
      query = query.limit(page_size)
    if offset:
      query = query.offset(offset)

    return query

  @staticmethod
  def transfer(session, from_account_id, from_account_name, from_broker_id, from_broker_name, to_account_id, to_account_name, to_broker_id, to_broker_name, currency, amount, reference=None, description=None, timestamp=None ):
    if timestamp is None:
      timestamp = get_datetime_now()
    balance = Balance.update_balance(session, 'DEBIT', from_account_id, from_account_name, from_broker_id, from_broker_name, currency, amount)
    ledger = Ledger(currency          = currency,
                    account_id        = from_account_id,
                    account_name      = from_account_name,
                    payee_id          = to_account_id,
                    payee_name        = to_account_name,
                    broker_id         = from_broker_id,
                    broker_name       = from_broker_name,
                    payee_broker_id   = to_broker_id,
                    payee_broker_name = to_broker_name,
                    operation         = 'D',
                    amount            = amount,
                    balance           = balance,
                    reference         = reference,
                    description       = description,
                    created           = timestamp)
    session.add(ledger)

    balance = Balance.update_balance(session, 'CREDIT', to_account_id, to_account_name, to_broker_id, to_broker_name, currency, amount)
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
                     description      = description,
                     created           = timestamp)
    session.add(ledger)


  @staticmethod
  def deposit(session, account_id, account_name, payee_id, payee_name, broker_id, broker_name, payee_broker_id, payee_broker_name, currency, amount, reference=None, description=None):
    balance = Balance.update_balance(session, 'CREDIT', account_id, account_name, broker_id, broker_name, currency, amount)
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
    balance = Balance.update_balance(session, 'DEBIT', account_id, account_name, broker_id, broker_name, currency, amount)
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
  def execute_order(session, order, counter_order, symbol, qty, price, trade_id, timestamp=None ):
    if timestamp is None:
      timestamp = get_datetime_now()

    total_value = int(float(price) * float(qty)/1e8)

    # adjust balances
    to_symbol = symbol[:3].upper()   #BTC
    from_symbol = symbol[3:].upper() #FIAT

    balance = Balance.update_balance(session, 'DEBIT' if order.is_buy else 'CREDIT', order.account_id, order.account_username, order.broker_id, order.broker_username, from_symbol, total_value )
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
                                 description      = 'T',
                                 created          = timestamp)
    session.add(order_record_debit)


    balance = Balance.update_balance(session, 'CREDIT' if order.is_buy else 'DEBIT', counter_order.account_id, counter_order.account_username, counter_order.broker_id, counter_order.broker_username, from_symbol, total_value )
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
                                         description  = 'T',
                                         created      = timestamp)
    session.add(counter_order_record_credit)


    balance = Balance.update_balance(session, 'CREDIT' if order.is_buy else 'DEBIT', order.account_id, order.account_username, order.broker_id, order.broker_username, to_symbol, qty )
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
                                 description  = 'T',
                                 created      = timestamp)
    session.add(order_record_credit)

    balance = Balance.update_balance(session, 'DEBIT' if order.is_buy else 'CREDIT', counter_order.account_id, counter_order.account_username, counter_order.broker_id, counter_order.broker_username, to_symbol, qty )
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
                                        description  = 'T',
                                        created      = timestamp)
    session.add(counter_order_record_debit)

    def process_execution_fee(session,trade_id, order, currency, amount, timestamp ):
      Ledger.transfer(session,
                      order.account_id,           # from_account_id
                      order.account_username,     # from_account_name
                      order.broker_id,            # from_broker_id
                      order.broker_username,      # from_broker_name
                      order.fee_account_id,       # to_account_id
                      order.fee_account_username, # to_account_name
                      order.broker_id,            # to_broker_id
                      order.broker_username,      # to_broker_name
                      currency,                   # currency
                      amount,                     # amount
                      trade_id,                   # reference
                      'TF',                       # descriptions
                      timestamp
      )
      if order.fwd_fees:
        fwd_fee_account_list = json.loads(order.fwd_fees)

        for fwd_fee_account in fwd_fee_account_list:
          fwd_fee = amount * fwd_fee_account[2]
          Ledger.transfer(session,
                          order.fee_account_id,       # from_account_id
                          order.fee_account_username, # from_account_name
                          order.broker_id,            # from_broker_id
                          order.broker_username,      # from_broker_name
                          fwd_fee_account[0],         # to_account_id
                          fwd_fee_account[1],         # to_account_name
                          order.broker_id,            # to_broker_id
                          order.broker_username,      # to_broker_name
                          currency,                   # currency
                          fwd_fee,                    # amount
                          trade_id,                   # reference
                          'TF'                        # descriptions
          )




    def award_market_maker_points(session, trade_id, broker_id, broker_username, market_maker_id, market_maker_username, symbol, amount, timestamp):
      Ledger.transfer(session,
                      broker_id,
                      broker_username,
                      broker_id,
                      broker_username,
                      market_maker_id,
                      market_maker_username,
                      broker_id,
                      broker_username,
                      'MMP.' + symbol,
                      amount,
                      trade_id,
                      'P',
                      timestamp)

    order_fee_currency = to_symbol if order.is_buy else from_symbol
    order_fee_base_amount = qty if order.is_buy else total_value
    order_fee_amount =  int(order_fee_base_amount * (order.fee / 10000.))
    if order_fee_amount:
      process_execution_fee(session, trade_id, order,order_fee_currency, order_fee_amount, timestamp )


    counter_order_fee_currency = to_symbol if counter_order.is_buy else from_symbol
    counter_order_fee_base_amount = qty if counter_order.is_buy else total_value
    counter_order_fee_amount =  int(counter_order_fee_base_amount * (counter_order.fee / 10000.))
    if counter_order_fee_amount:
      process_execution_fee(session, trade_id, counter_order,counter_order_fee_currency, counter_order_fee_amount, timestamp )


    if order.broker_id == counter_order.broker_id:  # in case of both brokers are the same

      # if the taker order is from a market maker and the maker is not a market maker and he is also paying fees
      if order.is_from_market_maker and not counter_order.is_from_market_maker and counter_order_fee_amount:
        market_maker_points = int(total_value *  counter_order.fee / 10000.)
        award_market_maker_points(session,
                                  trade_id,
                                  order.broker_id,
                                  order.broker_username,
                                  order.account_id,
                                  order.account_username,
                                  symbol,
                                  market_maker_points,
                                  timestamp)

      # if the taker is a regular user, the maker is a market maker and the taker is paying a fee
      elif not order.is_from_market_maker and counter_order.is_from_market_maker and order_fee_amount:
        market_maker_points = int(total_value *  order.fee / 10000.)
        award_market_maker_points(session,
                                  trade_id,
                                  counter_order.broker_id,
                                  counter_order.broker_username,
                                  counter_order.account_id,
                                  counter_order.account_username,
                                  symbol,
                                  market_maker_points,
                                  timestamp)



class Broker(Base):
  __tablename__         = 'brokers'
  id                    = Column(Integer,       ForeignKey('users.id'),  unique=True)
  user                  = relationship("User",  backref=backref('brokers', order_by=id))
  short_name            = Column(String(30),    primary_key=True)
  business_name         = Column(String(30),    nullable=False)
  signup_label          = Column(String(30),    nullable=False)

  mandrill_api_key      = Column(String(30))
  mailer_from_name      = Column(String(30))
  mailer_from_email     = Column(String(30))
  mailer_signature      = Column(String(30))
  mailchimp_list_id     = Column(String(30))

  address               = Column(String(255),   nullable=False)
  city                  = Column(String(30),    nullable=False)
  state                 = Column(String(30),    nullable=False)
  zip_code              = Column(String(12),    nullable=False)
  country_code          = Column(String(2),     nullable=False)
  country               = Column(String(20),    nullable=False)
  phone_number_1        = Column(String(15))
  phone_number_2        = Column(String(15))
  skype                 = Column(String(30))
  email                 = Column(String(15))

  verification_jotform  = Column(String(255),    nullable=False)
  upload_jotform        = Column(String(255),    nullable=False)

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

  lang                  = Column(String(5),   nullable=False)

  accounts              = Column(Text)

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

  def update(self, fields):
    for field, field_value in fields.iteritems():
      if hasattr(self, field):
        setattr(self, field, field_value)

  def __repr__(self):
    return u"<Broker(id=%r, short_name=%r, business_name=%r,signup_label=%r,  "\
           u"address=%r, city=%r, state=%r, zip_code=%r, country_code=%r,country=%r, phone_number_1=%r, phone_number_2=%r, skype=%r, email=%r,"\
           u"verification_jotform=%r,upload_jotform=%r, currencies=%r, crypto_currencies=%r, tos_url=%r, "\
           u"fee_structure=%r, withdraw_structure=%r, "\
           u"mandrill_api_key=%r, mailer_from_name=%r, mailer_from_email=%r, mailer_signature=%r, mailchimp_list_id=%r, "\
           u"transaction_fee_buy=%r,transaction_fee_sell=%r, "\
           u"status=%r, ranking=%r, support_url=%r, is_broker_hub=%r ,accept_customers_from=%r, lang=%r, accounts=%r )>"% (
      self.id, self.short_name, self.business_name, self.signup_label,
      self.address, self.city, self.state, self.zip_code, self.country_code, self.country, self.phone_number_1, self.phone_number_2, self.skype,self.email,
      self.verification_jotform, self.upload_jotform, self.currencies, self.crypto_currencies,  self.tos_url,
      self.fee_structure , self.withdraw_structure,
      self.mandrill_api_key, self.mailer_from_name, self.mailer_from_email, self.mailer_signature, self.mailchimp_list_id,
      self.transaction_fee_buy, self.transaction_fee_sell,
      self.status, self.ranking, self.support_url, self.is_broker_hub, self.accept_customers_from, self.lang, self.accounts )

class GreenAddresses(Base):
  __tablename__         = 'green_address'
  id                    = Column(Integer,       primary_key=True)
  currency              = Column(String,        default='BTC', nullable=False, index=True)
  address               = Column(String,        nullable=False, index=True )
  label                 = Column(String(25) )
  created               = Column(DateTime,      default=get_datetime_now, nullable=False)
  status                = Column(Integer,       nullable=False, default=0)

  __table_args__ = (UniqueConstraint('currency', 'address', name='_trusted_address_uc'), )

  def __repr__(self):
    return "<GreenAddresses(id=%r, currency=%r, address=%r, label=%r, created=%r, status=%r)>" % (
      self.id, self.currency,  self.address, self.label, self.created, self.status)


  @staticmethod
  def is_green_address(session, address, currency):
    rec = session.query(GreenAddresses).filter_by(currency = currency).filter_by(address = address ).first()
    if not rec:
      return  False
    return rec.status > 0


class UserPasswordReset(Base):
  __tablename__   = 'user_password_reset'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  broker_id       = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('user_password_reset', order_by=id), foreign_keys=[user_id])
  token           = Column(String,        nullable=False, index=True)
  used            = Column(Boolean,       default=False)
  created         = Column(DateTime,      default=get_datetime_now, nullable=False)

  def __repr__(self):
    return "<UserPasswordReset(id=%r, user_id=%r,broker_id=%r, token=%r, used=%r, created=%r)>" % (
      self.id, self.user_id, self.broker_id, self.token, self.used, self.created)

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
  def create( session, user_id, broker_id, email_lang):
    import uuid
    token = uuid.uuid4().hex

    req = UserPasswordReset( user_id = user_id,
                             broker_id = broker_id,
                             token = token )
    session.add(req)
    session.flush()

    UserEmail.create( session = session,
                      user_id = user_id,
                      broker_id = broker_id,
                      subject = "RP",
                      template= "password-reset",
                      language= email_lang,
                      params=  json.dumps({'token':token, 'username':req.user.username } ))

class UserEmail(Base):
  __tablename__   = 'user_email'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  broker_id       = Column(Integer,       ForeignKey('users.id'))
  user            = relationship("User",  backref=backref('user_email', order_by=id), foreign_keys=[user_id])
  subject         = Column(String,        nullable=False)
  body            = Column(String,        nullable=True)
  template        = Column(String,        nullable=True)
  language        = Column(String,        nullable=True)
  params          = Column(String,        nullable=True)
  created         = Column(DateTime,      default=get_datetime_now, nullable=False)


  def __repr__(self):
    return "<UserEmail(id=%r, user_id=%r, broker_id=%r, subject=%r, body=%r, template=%r, language=%r,params=%r, created=%r)>" % (
      self.id, self.user_id, self.broker_id, self.subject, self.body, self.template, self.language, self.params, self.created)

  @staticmethod
  def create( session, user_id, broker_id, subject, template=None, language=None, params=None, body = None ):
    user_email = UserEmail( user_id   = user_id,
                            broker_id = broker_id,
                            subject   = subject)
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

    user_msg = {
      'MsgType'       : 'C',
      'UserID'        : user_id,
      'BrokerID'      : broker_id,
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
    TradeApplication.instance().publish( user_id, user_msg )

    msg = deepcopy( user_msg )

    if body:
      msg['RawData'] = body
      msg['RawDataLength'] = len(body)

    if template:
      msg['Template'] = template

    if language:
      msg['Language'] = language

    if params:
      msg['Params'] = params

    TradeApplication.instance().publish( 'EMAIL' , msg )
    return  user_email


# noinspection PyPackageRequirements
class Withdraw(Base):
  __tablename__   = 'withdraws'
  id              = Column(Integer,       primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'))
  account_id      = Column(Integer,       ForeignKey('users.id'))
  broker_id       = Column(Integer,       ForeignKey('users.id'))
  broker_username = Column(String,        nullable=False, index=True)
  username        = Column(String,        nullable=False, index=True)
  currency        = Column(String,        nullable=False, index=True)
  amount          = Column(Integer,       nullable=False, index=True)

  method          = Column(String,        nullable=False, index=True)
  data            = Column(Text,          nullable=False, index=True)

  confirmation_token = Column(String,     index=True, unique=True)
  status          = Column(String(1),     nullable=False, default='0', index=True)
  created         = Column(DateTime,      nullable=False, default=get_datetime_now, index=True)
  reason_id       = Column(Integer)
  reason          = Column(String)
  email_lang      = Column(String)

  client_order_id = Column(String(30), index=True)

  percent_fee     = Column(Numeric,    nullable=False, default=0)
  fixed_fee       = Column(Integer,    nullable=False, default=0)
  paid_amount     = Column(Integer,    nullable=False, default=0, index=True)

  def as_dict(self):
    import json
    obj = { c.name: getattr(self, c.name) for c in self.__table__.columns }
    obj.update(json.loads(self.data))
    return obj

  def confirm_using_second_factor(self, session):
    if self.status != '0':
      return False

    self.status = '1'
    session.add(self)
    session.flush()

    return True

  @staticmethod
  def user_confirm(session, confirmation_token=None):
    withdraw_data = session.query(Withdraw).filter_by(confirmation_token=confirmation_token).filter_by( status = 0 ).first()
    if not withdraw_data:
      return  None

    withdraw_data.status = '1'
    session.add(withdraw_data)
    session.flush()

    return  withdraw_data

  def set_in_progress(self, session, percent_fee, fixed_fee, data, broker_fees_account):
    if self.status != '1':
      return False

    new_data = {}
    new_data.update(json.loads(self.data))
    if data:
      new_data.update( data )
      if self.data != json.dumps(new_data):
        self.data = json.dumps(new_data)

    self.percent_fee = percent_fee
    self.fixed_fee = fixed_fee

    self.paid_amount = self.amount
    if percent_fee > 0 or fixed_fee > 0:
      self.paid_amount = (self.amount / ( 100.0 - float(self.percent_fee) ) * 100.0) + self.fixed_fee

    current_balance = Balance.get_balance(session, self.account_id, self.broker_id, self.currency)
    if self.paid_amount > current_balance:
      self.cancel(session, -1, None, broker_fees_account) # Insufficient funds
      return True

    # User won't be able to withdraw his funds if he has any unconfirmed bitcoin deposits
    # This will only be a issue in case of a double spend attack.
    current_positions = Position.get_positions_by_account_broker(session, self.account_id, self.broker_id)
    for position in current_positions:
      if position.position != 0:
        self.cancel(session, -8, None, broker_fees_account) # User has deposits that are not yet confirmed
        return True


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

    total_fees = self.paid_amount - self.amount

    if total_fees:
      Ledger.transfer(session,
                      self.account_id,        # from_account_id
                      self.username,          # from_account_name
                      self.broker_id,         # from_broker_id
                      self.broker_username,   # from_broker_name
                      broker_fees_account[0], # to_account_id
                      broker_fees_account[1], # to_account_name
                      self.broker_id,         # to_broker_id
                      self.broker_username,   # to_broker_name
                      self.currency,          # currency
                      total_fees,             # amount
                      str(self.id),           # reference
                      'WF'                    # descriptions
      )

      for x in xrange(2, len(broker_fees_account)):
        fwd_fee_account = broker_fees_account[x]
        fwd_fee = total_fees * fwd_fee_account[2]
        Ledger.transfer(session,
                        broker_fees_account[0], # from_account_id
                        broker_fees_account[1], # from_account_name
                        self.broker_id,         # from_broker_id
                        self.broker_username,   # from_broker_name
                        fwd_fee_account[0],     # to_account_id
                        fwd_fee_account[1],     # to_account_name
                        self.broker_id,         # to_broker_id
                        self.broker_username,   # to_broker_name
                        self.currency,          # currency
                        fwd_fee,                # amount
                        str(self.id),           # reference
                        'WF'                    # descriptions
        )





    session.add(self)
    session.flush()

    formatted_amount = Currency.format_number( session, self.currency, self.amount / 1.e8 )
    template_name       = "withdraw-progress"
    template_parameters = self.as_dict()
    template_parameters['amount'] = formatted_amount

    UserEmail.create( session = session,
                      user_id = self.user_id ,
                      broker_id = self.broker_id,
                      subject = "WP",
                      template=template_name,
                      language= self.email_lang,
                      params  = json.dumps(template_parameters, cls=JsonEncoder))


    return True

  def set_as_complete(self, session, data, broker_fees_account):
    if self.status != '2':
      return False

    new_data = {}
    new_data.update(json.loads(self.data))
    if data:
      new_data.update( data )
      if self.data != json.dumps(new_data):
        self.data = json.dumps(new_data)

    self.status = '4' # COMPLETE

    session.add(self)
    session.flush()

    formatted_amount = Currency.format_number( session, self.currency, self.amount / 1.e8 )
    template_name       = "withdraw-complete"
    template_parameters = self.as_dict()
    template_parameters['amount'] = formatted_amount

    UserEmail.create( session = session,
                      user_id = self.user_id ,
                      broker_id = self.broker_id,
                      subject = "WF",
                      template=template_name,
                      language= self.email_lang,
                      params  = json.dumps(template_parameters, cls=JsonEncoder))



    return True

  def cancel(self, session, reason_id, reason, broker_fees_account):
    if self.status == '4':
      return  False

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
                      self.amount,            # amount
                      str(self.id),           # reference
                      'W'                     # descriptions
      )

      total_fees = self.paid_amount - self.amount
      if total_fees:
        Ledger.transfer(session,
                        broker_fees_account[0], # from_account_id
                        broker_fees_account[1], # from_account_name
                        self.broker_id,         # from_broker_id
                        self.broker_username,   # from_broker_name
                        self.account_id,        # to_account_id
                        self.username,          # to_account_name
                        self.broker_id,         # to_broker_id
                        self.broker_username,   # to_broker_name
                        self.currency,          # currency
                        total_fees,             # amount
                        str(self.id),           # reference
                        'WF'                    # descriptions
        )

        for x in xrange(2, len(broker_fees_account)):
          fwd_fee_account = broker_fees_account[x]
          fwd_fee = total_fees * fwd_fee_account[2]
          Ledger.transfer(session,
                          fwd_fee_account[0],     # from_account_id
                          fwd_fee_account[1],     # from_account_name
                          self.broker_id,         # from_broker_id
                          self.broker_username,   # from_broker_name
                          broker_fees_account[0], # to_account_id
                          broker_fees_account[1], # to_account_name
                          self.broker_id,         # to_broker_id
                          self.broker_username,   # to_broker_name
                          self.currency,          # currency
                          fwd_fee,                # amount
                          str(self.id),           # reference
                          'WF'                    # descriptions
          )



    self.status = '8' # CANCELLED
    self.reason_id = reason_id
    self.reason = reason

    session.add(self)
    session.flush()

    formatted_amount = Currency.format_number( session, self.currency, self.amount / 1.e8 )

    balance =  Balance.get_balance(session, self.account_id, self.broker_id, self.currency)
    formatted_balance = Currency.format_number( session, self.currency, balance  / 1.e8 )

    template_name       = "withdraw-cancelled"
    template_parameters = self.as_dict()
    template_parameters['amount'] = formatted_amount
    template_parameters['reason_id'] = reason_id
    if reason_id == -1:
      template_parameters['reason'] = 'INSUFFICIENT_FUNDS'
    elif reason_id == -2:
      template_parameters['reason'] = 'ACCOUNT_NOT_VERIFIED'
    elif reason_id == -3:
      template_parameters['reason'] = 'SUSPICION_OF_FRAUD'
    elif reason_id == -4:
      template_parameters['reason'] = 'DIFFERENT_ACCOUNT'
    elif reason_id == -5:
      template_parameters['reason'] = 'INVALID_WALLET'
    elif reason_id == -6:
      template_parameters['reason'] = 'INVALID_BANK_ACCOUNT'
    elif reason_id == -7:
      template_parameters['reason'] = 'OVER_LIMIT'
    elif reason_id == -8:
      template_parameters['reason'] = 'HAS_UNCONFIRMED_DEPOSITS'
    else:
      template_parameters['reason'] = reason if reason is not None else ''

    template_parameters['balance'] = formatted_balance


    UserEmail.create( session = session,
                      user_id = self.user_id ,
                      broker_id = self.broker_id,
                      subject = "WC",
                      template=template_name,
                      language= self.email_lang,
                      params  = json.dumps(template_parameters, cls=JsonEncoder))
    return True


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
  def create(session, user, broker,  currency, amount, method, data, client_order_id, email_lang,
             percent_fee, fixed_fee):
    import uuid
    confirmation_token = uuid.uuid4().hex

    if not user.has_instant_withdrawal:
      new_data = json.loads(data)
      new_data["Instant"] = 'NO'
      data = json.dumps(new_data)

    withdraw_record = Withdraw(user_id            = user.id,
                               account_id         = user.id,
                               username           = user.username,
                               broker_id          = user.broker_id,
                               broker_username    = user.broker_username,
                               method             = method,
                               currency           = currency,
                               amount             = amount,
                               email_lang         = email_lang,
                               confirmation_token = confirmation_token,
                               percent_fee        = percent_fee,
                               fixed_fee          = fixed_fee,
                               client_order_id    = client_order_id,
                               data               = data )

    if user.withdraw_email_validation:
      if not user.two_factor_enabled:
        formatted_amount = Currency.format_number( session, withdraw_record.currency, withdraw_record.amount / 1.e8 )

        template_name       = 'withdraw-confirmation'
        template_parameters = withdraw_record.as_dict()
        template_parameters['amount'] = formatted_amount
        template_parameters['created'] = get_datetime_now()

        UserEmail.create( session  = session,
                          user_id  = user.id,
                          broker_id = user.broker_id,
                          subject  = "CW",
                          template = template_name,
                          language = email_lang,
                          params   = json.dumps(template_parameters, cls=JsonEncoder))

    else:
      withdraw_record.status = '1'

    session.add(withdraw_record)
    session.flush()

    return withdraw_record

  def __repr__(self):
    return u"<Withdraw(id=%r, user_id=%r, account_id=%r, broker_id=%r, username=%r, currency=%r, method=%r, amount=%r, "\
           u"broker_username=%r, data=%r, percent_fee=%r, fixed_fee=%r, "\
           u"confirmation_token=%r, status=%r, created=%r, reason_id=%r, reason=%r, paid_amount=%r, email_lang=%r)>" % (
      self.id, self.user_id, self.account_id, self.broker_id, self.username, self.currency, self.method,self.amount,
      self.broker_username, self.data, self.percent_fee, self.fixed_fee,
      self.confirmation_token, self.status, self.created, self.reason_id, self.reason, self.paid_amount, self.email_lang)


class Order(Base):
  __tablename__   = 'orders'

  id                    = Column(Integer,       primary_key=True)
  user_id               = Column(Integer,       ForeignKey('users.id'))
  user                  = relationship("User",  foreign_keys=[user_id])
  username              = Column(String(15),    nullable=False )
  account_id            = Column(Integer,       ForeignKey('users.id'))
  account_user          = relationship("User",  foreign_keys=[account_id] )
  account_username      = Column(String(15),    nullable=False, index=True )
  broker_id             = Column(Integer,       ForeignKey('users.id'), nullable=False)
  broker_username       = Column(String(15),    nullable=False )
  client_order_id       = Column(String(30),    nullable=False, index=True)
  status                = Column(String(1),     nullable=False, default='0', index=True)
  symbol                = Column(String(12),    nullable=False)
  side                  = Column(String(1),     nullable=False)
  type                  = Column(String(1),     nullable=False, default='2')
  time_in_force         = Column(String(1),     nullable=False, default='1')
  price                 = Column(Integer,       nullable=False, default=0)
  order_qty             = Column(Integer,       nullable=False)
  cum_qty               = Column(Integer,       nullable=False, default=0)
  leaves_qty            = Column(Integer,       nullable=False, default=0)
  created               = Column(DateTime,      nullable=False, default=get_datetime_now, index=True)
  last_price            = Column(Integer,       nullable=False, default=0)
  last_qty              = Column(Integer,       nullable=False, default=0)
  average_price         = Column(Integer,       nullable=False, default=0)
  cxl_qty               = Column(Integer,       nullable=False, default=0)
  fee                   = Column(Integer,       nullable=False, default=0)
  fee_account_id        = Column(Integer,       ForeignKey('users.id'), nullable=False)
  fee_account_username  = Column(String(15),    nullable=False)
  fwd_fees              = Column(Text)
  email_lang            = Column(String,        nullable=False)
  has_leaves_qty        = Column(Boolean,       default=1, index=True)
  has_cum_qty           = Column(Boolean,       default=0, index=True)
  has_cxl_qty           = Column(Boolean,       default=0, index=True)
  is_from_market_maker  = Column(Boolean,       default=False)
  gui_id                = Column(Integer)

  __table_args__ = (Index('idx_orders_account_id_created', 'account_id' , 'created' ),
                    Index('idx_orders_user_id_client_order_id', "user_id", "client_order_id"),
                    Index('idx_orders_account_id_client_order_id', "account_id", "client_order_id"),
                    Index('idx_orders_user_id_leaves_qty', "user_id", "has_leaves_qty", "created" ),
                    Index('idx_orders_user_id_cum_qty', "user_id", "has_cum_qty", "created" ),
                    Index('idx_orders_user_id_cxl_qty', "user_id", "has_cxl_qty", "created" ),
                    Index('idx_orders_account_id_leaves_qty', "account_id", "has_leaves_qty", "created" ),
                    Index('idx_orders_account_id_cum_qty', "account_id", "has_cum_qty", "created" ),
                    Index('idx_orders_account_id_cxl_qty', "account_id", "has_cxl_qty", "created" ),)

  def __init__(self, *args, **kwargs):
    if 'order_qty' in kwargs and 'leaves_qty' not in kwargs:
      kwargs['leaves_qty'] = kwargs.get('order_qty')

    if 'user' in kwargs and 'username' not in kwargs:
      kwargs['username'] = kwargs.get('user').username

    super(Order, self).__init__(*args, **kwargs)

  def __repr__(self):
    return "<Order(id=%r, user_id=%r, username=%r,account_id=%r,account_username=%r, client_order_id=%r, "\
           "broker_id=%r, broker_username=%r, time_in_force=%r, "\
           "symbol=%r, side=%r, type=%r, price=%r, order_qty=%r, cum_qty=%r, leaves_qty=%r, "\
           "created=%r, last_price=%r,  cxl_qty=%r, last_qty=%r, status=%r, average_price=%r, fee=%r, "\
           "fee_account_id=%r, fee_account_username=%r, email_lang=%r, has_leaves_qty=%r, " \
           "has_cum_qty=%r,has_cxl_qty=%r, is_from_market_maker=%r, gui_id=%r, fwd_fees=%r)>"\
    % (self.id, self.user_id, self.username, self.account_id, self.account_username, self.client_order_id,
       self.broker_id, self.broker_username, self.time_in_force,
       self.symbol, self.side, self.type, self.price,  self.order_qty, self.cum_qty, self.leaves_qty,
       self.created, self.last_price, self.cxl_qty , self.last_qty, self.status, self.average_price, self.fee,
       self.fee_account_id, self.fee_account_username, self.email_lang, self.has_leaves_qty, 
       self.has_cum_qty, self.has_cxl_qty, self.is_from_market_maker, self.gui_id, self.fwd_fees)

  def __cmp__(self, other):
    if self.is_buy and other.is_buy:
      if self.type == '1' and other.type == '2':
        return -1
      elif self.type == '1' and other.type == '1':
        if self.created > other.created:
          return -1
        else:
          return 1
      elif self.price > other.price:
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
    if (self.is_buy and other.is_sell) or (self.is_sell and other.is_buy):
      if ( self.type == '1' and other.type == '2') or (self.type == '2' and other.type == '1'):
        return True  # if one of the orders is a market order

    if self.is_buy and other.is_sell and self.price >= other.price:
      return True
    elif self.is_sell and other.is_buy and self.price <= other.price:
      return True
    return  False

  @staticmethod
  def create(session,user_id,account_id,user,username,account_user,account_username, broker_id,
             broker_username,client_order_id,symbol,side,type,price,order_qty, time_in_force,
             fee, fee_account_id, fee_account_username, fwd_fees, email_lang, is_from_market_maker,gui_id):
    order = Order( user_id              = user_id,
                   account_id           = account_id,
                   user                 = user,
                   username             = username,
                   account_user         = account_user,
                   account_username     = account_username,
                   broker_id            = broker_id,
                   broker_username      = broker_username ,
                   client_order_id      = client_order_id,
                   symbol               = symbol,
                   side                 = side,
                   type                 = type,
                   price                = price,
                   order_qty            = order_qty,
                   time_in_force        = time_in_force,
                   fee                  = fee,
                   fee_account_id       = fee_account_id,
                   fee_account_username = fee_account_username,
                   fwd_fees             = fwd_fees,
                   email_lang           = email_lang,
                   is_from_market_maker = is_from_market_maker,
                   gui_id               = gui_id)
    session.add(order)
    return order

  @staticmethod
  def get_order_by_client_order_id(session, user_id, client_order_id):
    return session.query(Order).filter_by( user_id = user_id ).filter_by( client_order_id =  client_order_id  ).first()

  @staticmethod
  def get_order_by_order_id(session, order_id):
    return session.query(Order).filter_by( id = order_id  ).first()

  @staticmethod
  def prepare_filter_query(session, filter_list):
    q = session.query(Order)
    if filter_list:
      for f in filter_list:
        filter_data = f.split(" ")
        if len(filter_data) == 3:
          if filter_data[0] == "user_id" and filter_data[1] == "eq":
            q =  q.filter(and_(Order.user_id == int(filter_data[2])))
          elif filter_data[0] == "account_id" and filter_data[1] == "eq":
            q =  q.filter(and_(Order.account_id == int(filter_data[2])))
          elif filter_data[0] == "has_cum_qty" and filter_data[1] == "eq":
            q =  q.filter(and_(Order.has_cum_qty == int(filter_data[2])))
          elif filter_data[0] == "has_leaves_qty" and filter_data[1] == "eq":
            q =  q.filter(and_(Order.has_leaves_qty == int(filter_data[2])))
          elif filter_data[0] == "has_cxl_qty" and filter_data[1] == "eq":
            q =  q.filter(and_(Order.has_cxl_qty == int(filter_data[2])))
    return q

  @staticmethod
  def get_list(session, filter_list, page_size=None, offset=None ):
    if not filter_list:
      filter_list = []
    q = Order.prepare_filter_query(session, filter_list)
    q = q.order_by(Order.created.desc())
    if page_size:
      q = q.limit( page_size ).offset( offset )
    return q


  def match(self, other, execute_qty):
    if (self.is_buy and other.is_sell) or (self.is_sell and other.is_buy):
      if ( self.type == '1' and other.type == '2') or (self.type == '2' and other.type == '1'):
        return min( execute_qty, other.leaves_qty)

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

    self.has_cxl_qty = (self.cxl_qty > 0)
    self.has_cum_qty = (self.cum_qty > 0)
    self.has_leaves_qty = (self.leaves_qty > 0)
      

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
  def is_buy(self):
    return self.side == '1'

  @property
  def is_sell(self):
    return  self.side == '2'

class Trade(Base):
  __tablename__     = 'trade'
  id                = Column(Integer,        primary_key=True)
  order_id          = Column(Integer,       ForeignKey('orders.id'))
  counter_order_id  = Column(Integer,       ForeignKey('orders.id'))
  buyer_id          = Column(Integer,       nullable=False)
  seller_id         = Column(Integer,       nullable=False)
  buyer_username    = Column(String(15),    nullable=False)
  seller_username   = Column(String(15),    nullable=False)
  side              = Column(String(1),     nullable=False)
  symbol            = Column(String(12),    nullable=False, index=True)
  size              = Column(Integer,       nullable=False)
  price             = Column(Integer,       nullable=False)
  created           = Column(DateTime,      nullable=False, index=True)
  trade_type        = Column(Integer,       nullable=False, default=0)  # regular trade

  def __repr__(self):
    return "<Trade(id=%r, order_id=%r, counter_order_id=%r,buyer_id=%r,seller_id=%r, buyer_username=%r,seller_username=%r,  "\
           "side=%r, symbol=%r, size=%r, price=%r, created=%r, trade_type=%r )>"\
    % (self.id, self.order_id, self.counter_order_id, self.buyer_id, self.seller_id, self.buyer_username, self.seller_username,
       self.side, self.symbol, self.size, self.price, self.created, self.trade_type)

  @staticmethod
  def create(session, order,counter_order, symbol, size, price, trade_date_time=None):
    if trade_date_time is None:
      trade_date_time = get_datetime_now()

    buyer_id = order.account_id
    buyer_username = order.account_user.username
    seller_id = counter_order.account_id
    seller_username = counter_order.account_user.username
    if order.is_sell:
      tmp_username = buyer_username
      buyer_username = seller_username
      seller_username = tmp_username
      tmp_id = buyer_id
      buyer_id = seller_id
      seller_id = tmp_id


    trade =  Trade( order_id          = order.id,
                    counter_order_id  = counter_order.id,
                    buyer_id          = buyer_id,
                    seller_id         = seller_id,
                    buyer_username    = buyer_username,
                    seller_username   = seller_username,
                    side              = order.side,
                    symbol            = symbol,
                    size              = size,
                    price             = price,
                    created           = trade_date_time)
    session.add(trade)

    Ledger.execute_order(session,
                         order,
                         counter_order,
                         symbol,
                         size,
                         price,
                         str(order.id) + '.' + str(counter_order.id),
                         trade_date_time)

    return trade


  @staticmethod
  def get_last_trades(session, page_size = None, offset = None, sort_column = None, sort_order='ASC'):

    trades = session.query(Trade).order_by(
      Trade.created.desc())

    if page_size:
      trades = trades.limit(page_size)
    if offset:
      trades = trades.offset(offset)
    if sort_column:
      if sort_order == 'ASC':
        trades = trades.order(sort_column)
      else:
        trades = trades.order(sort_column).desc()

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
  created                 = Column(DateTime,   nullable=False, default=get_datetime_now, index=True)
  instructions            = Column(Text)

  client_order_id         = Column(String(30), index=True)

  percent_fee             = Column(Numeric,    nullable=False, default=0)
  fixed_fee               = Column(Integer,    nullable=False, default=0)

  reason_id               = Column(Integer)
  reason                  = Column(String)
  email_lang              = Column(String,     nullable=False)

  def __repr__(self):
    return u"<Deposit(id=%r, user_id=%r, account_id=%r, broker_id=%r, deposit_option_id=%r, "\
           u"deposit_option_name=%r, username=%r, broker_username=%r,  broker_deposit_ctrl_num=%r,"\
           u"secret=%r, type=%r, currency=%r, value=%r, paid_value=%r, status=%r, "\
           u"data=%r, created=%r, reason_id=%r, reason=%r, email_lang=%r,"\
           u"fixed_fee=%r, percent_fee=%r, client_order_id=%r, instructions=%r)>" % (
      self.id,  self.user_id, self.account_id, self.broker_id, self.deposit_option_id,
      self.deposit_option_name,  self.username, self.broker_username, self.broker_deposit_ctrl_num,
      self.secret, self.type,  self.currency, self.value, self.paid_value, self.status,
      self.data, self.created, self.reason_id, self.reason, self.email_lang,
      self.fixed_fee, self.percent_fee, self.client_order_id, self.instructions )

  def as_dict(self):
    import json
    obj = { c.name: getattr(self, c.name) for c in self.__table__.columns }
    obj.update(json.loads(self.data))
    return obj

  @staticmethod
  def create_crypto_currency_deposit(session, user, currency, input_address, destination, secret, client_order_id, instructions=None, value=None ):
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
      email_lang              = user.email_lang,
      type                    = 'CRY',
      currency                = currency,
      secret                  = secret,
      percent_fee             = 0.,
      fixed_fee               = 0,
      data                    = json.dumps( { 'InputAddress':input_address, 'Destination':destination } ),
      )

    if instructions:
      deposit.instructions = json.dumps(instructions)

    if client_order_id:
      deposit.client_order_id =  client_order_id

    if value:
      deposit.value = value

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
  def get_deposit_list_by_secret(session, secret):
    q = session.query(Deposit).filter_by(secret=secret)
    return q

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

    if self.type != 'CRY':  # Send deposit-progress email only for Non crypto currencies deposits.
      template_name       = "deposit-progress"
      template_parameters = self.as_dict()

      if self.value:
        formatted_value = Currency.format_number( session, self.currency, self.value / 1.e8 )
        template_parameters['value'] = formatted_value

      if self.paid_value:
        formatted_paid_value = Currency.format_number( session, self.currency, self.paid_value / 1.e8 )
        template_parameters['paid_value'] = formatted_paid_value

      UserEmail.create( session = session,
                        user_id = self.user_id ,
                        broker_id = self.broker_id,
                        subject = "DP",
                        template=template_name,
                        language= self.email_lang,
                        params  = json.dumps(template_parameters, cls=JsonEncoder))


  def match_deposit_data(self, session, amount, data):
    # let's compute the new data
    new_data = {}
    current_data = json.loads(self.data)
    new_data.update(current_data)
    if data:
      new_data.update( data )

    if self.status != '0' and self.type == 'CRY':
      if self.paid_value != amount:
        return False

      if 'InputTransactionHash' in current_data and  \
         'InputTransactionHash' in new_data and  \
          current_data['InputTransactionHash'] != new_data['InputTransactionHash']:
        return False

    return True



  def process_confirmation(self, session, amount, percent_fee=0., fixed_fee=0, data=None ):
    should_update = False
    should_confirm = False
    should_start_a_loan_from_broker_to_the_user = False
    broker = None
    user = None
    broker_crypto_currencies = None
    crypto_currency_param = None


    # let's compute the new data
    new_data = {}
    current_data = json.loads(self.data)
    new_data.update(current_data)
    if data:
      new_data.update( data )
      if self.data != json.dumps(new_data):
        # let's update the deposit record in case the data section has changed.
        should_update = True


    # let's check if the crypto currency confirmation data is valid and if we should confirm
    if self.type == 'CRY':
      if not broker:
        broker = Broker.get_broker( session, self.broker_id  )
      if broker_crypto_currencies is None:
        broker_crypto_currencies = json.loads(broker.crypto_currencies)

      # check if the broker has a wallet for this crypto currency
      for crypto_currency_param in broker_crypto_currencies:
        if crypto_currency_param["CurrencyCode"] == self.currency:
          break

      if crypto_currency_param is None:
        return  # The broker doesn't have a wallet for this crypto currency. This is probably an attack.


      for amount_start, amount_end, confirmations  in  crypto_currency_param["Confirmations"]:
        if amount_start < amount <= amount_end and data['Confirmations'] >= confirmations:
          should_confirm = True

    else:
      should_confirm = True


    # let's check if the user is reusing the same bitcoin in the same address
    if self.status == '4' and self.type == 'CRY':
      # the deposit has been already confirmed .... nothing to do here. This is probably an attack
      return


    self.paid_value = amount
    loan_amount = self.paid_value
    if self.type == 'CRY' and data:
      if not broker:
        broker = Broker.get_broker( session, self.broker_id  )

      # Check if we should give a loan to the user on the 0 confirmation.
      if not data['Confirmations'] and self.status == '0':
        if not user:
          user = User.get_user(session, broker_id=self.broker_id, user_id=self.user_id)

        max_loan_amount = 0
        for amount_start, amount_end, confirmations in crypto_currency_param["Confirmations"]:
          if confirmations >= 1:
            max_loan_amount = amount_end
            break
        if loan_amount > max_loan_amount:
          loan_amount = max_loan_amount

        if not should_confirm:
          # Give a loan to verified users who included a miners fee
          if user.verified >= 3 and 'InputFee' in data and data['InputFee'] >=  10000: # Higher than the minimum fee
            should_start_a_loan_from_broker_to_the_user = True

          # or confirm the deposit in case is comming from a green address
          if 'PayeeAddresses' in data:
            try:
              payee_addresses = json.loads(data['PayeeAddresses'])

              if len(payee_addresses) == 1:
                payee_address = payee_addresses[0]

                if payee_address:
                  if GreenAddresses.is_green_address(session, payee_address,self.currency):
                    if 'InputFee' in data and data['InputFee'] > 1000:
                      should_confirm = True
                      should_start_a_loan_from_broker_to_the_user = False
            except Exception:
              pass

      if self.status == '0' or self.status == '1':
        self.status = '2'
        should_update = True


    should_execute_instructions = False
    should_adjust_ledger = False
    if (should_confirm and self.status != '4') or should_start_a_loan_from_broker_to_the_user:
      self.paid_value = amount
      self.percent_fee = percent_fee
      self.fixed_fee = fixed_fee

      if not should_start_a_loan_from_broker_to_the_user:
        self.status = '4'

      if self.instructions:
        should_execute_instructions = True
      should_adjust_ledger = True
      should_update = True

    if should_start_a_loan_from_broker_to_the_user:
      PositionLedger.transfer(session,
                              self.account_id,        # from_account_id
                              self.username,          # from_account_name
                              self.broker_id,         # from_broker_id
                              self.broker_username,   # from_broker_name
                              self.broker_id,         # to_account_id
                              self.broker_username,   # to_account_name
                              self.broker_id,         # to_broker_id
                              self.broker_username,   # to_broker_name
                              self.currency,          # currency
                              loan_amount,            # amount
                              str(self.id),           # reference
                              'D'                     # descriptions
      )


    if should_adjust_ledger:
      should_payback_the_loan_from_broker_to_the_user = False
      position = 0
      if not should_start_a_loan_from_broker_to_the_user:
        position = Position.get_position(session, self.account_id, self.broker_id, self.currency)
        if position < 0:
          should_payback_the_loan_from_broker_to_the_user = True
          position *= -1

      if should_payback_the_loan_from_broker_to_the_user:
        val = self.paid_value - position
        if val <= 0:
          PositionLedger.transfer(session,
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
        else:
          PositionLedger.transfer(session,
                                  self.broker_id,         # from_account_id
                                  self.broker_username,   # from_account_name
                                  self.broker_id,         # from_broker_id
                                  self.broker_username,   # from_broker_name
                                  self.account_id,        # to_account_id
                                  self.username,          # to_account_name
                                  self.broker_id,         # to_broker_id
                                  self.broker_username,   # to_broker_name
                                  self.currency,          # currency
                                  position,               # amount
                                  str(self.id),           # reference
                                  'D'                     # descriptions
          )

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
                          val,                    # amount
                          str(self.id),           # reference
                          'D'                     # descriptions
          )
      else:
        val = loan_amount if should_start_a_loan_from_broker_to_the_user else self.paid_value
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
                        val,                    # amount
                        str(self.id),           # reference
                        'D'                     # descriptions
        )

      total_percent_fee_value = ((val - self.fixed_fee) * (float(self.percent_fee)/100.0))
      total_fees = total_percent_fee_value + self.fixed_fee
      if total_fees:
        if not broker:
          broker = Broker.get_broker( session, self.broker_id  )
        fee_account =  json.loads(broker.accounts)['fees']

        Ledger.transfer(session,
                        self.account_id,        # from_account_id
                        self.username,          # from_account_name
                        self.broker_id,         # from_broker_id
                        self.broker_username,   # from_broker_name
                        fee_account[0],         # to_account_id
                        fee_account[1],         # to_account_name
                        self.broker_id,         # to_broker_id
                        self.broker_username,   # to_broker_name
                        self.currency,          # currency
                        total_fees,             # amount
                        str(self.id),           # reference
                        'DF'                    # descriptions
        )
        for x in xrange(2, len(fee_account)):
          fwd_fee_account = fee_account[x]
          fwd_fee = total_fees * fwd_fee_account[2]
          Ledger.transfer(session,
                          fee_account[0],         # from_account_id
                          fee_account[1],         # from_account_name
                          self.broker_id,         # from_broker_id
                          self.broker_username,   # from_broker_name
                          fwd_fee_account[0],     # to_account_id
                          fwd_fee_account[1],     # to_account_name
                          self.broker_id,         # to_broker_id
                          self.broker_username,   # to_broker_name
                          self.currency,          # currency
                          fwd_fee,                # amount
                          str(self.id),           # reference
                          'DF'                    # descriptions
          )




    instruction_to_execute = None
    if should_execute_instructions:
      instruction_to_execute = self.get_instructions()

    if should_update:
      self.data = json.dumps(new_data)
      session.add(self)
      session.flush()

    if self.status == '4':
      template_name       = "deposit-complete"
      template_parameters = self.as_dict()

      if self.value:
        formatted_value = Currency.format_number( session, self.currency, self.value / 1.e8 )
        template_parameters['value'] = formatted_value

      if self.paid_value:
        formatted_paid_value = Currency.format_number( session, self.currency, self.paid_value / 1.e8 )
        template_parameters['paid_value'] = formatted_paid_value


      UserEmail.create( session = session,
                        user_id = self.user_id ,
                        broker_id = self.broker_id,
                        subject = "DF",
                        template=template_name,
                        language= self.email_lang,
                        params  = json.dumps(template_parameters, cls=JsonEncoder))


    return instruction_to_execute

  def get_instructions(self):
    if self.instructions is None:
      return None

    try:
      now = get_datetime_now()
      instruction_age_in_seconds = (now - self.created).seconds

      instructions_list = json.loads(self.instructions)
      for instruction in instructions_list:
        #
        # Check if the instruction has timed out
        #
        has_timed_out = False
        if 'Timeout' in instruction:
          has_timed_out = instruction_age_in_seconds > instruction['Timeout']

        if has_timed_out:
          on_timeout_action = 'continue'
          if 'onTimeout' in instruction:
            on_timeout_action = instruction['onTimeout']

          if on_timeout_action == 'continue':
            continue
          if on_timeout_action == 'break':
            break

        if 'Filter' in instruction:
          filter = instruction['Filter']
          if 'Value' in filter and filter['Value'] != self.value:
            continue
          if 'PaidValue' in filter and  filter['PaidValue'] != self.paid_value:
            continue

            # check if the instruction is a valid instruction
        msg = instruction['Msg']

        if msg['MsgType'] != 'D':
          continue  # invalid instruction

        # replace template variables
        for field, value in msg.iteritems():
          if value == '{$PaidValue}':
            msg[field] = self.paid_value
          if value == '{$Value}':
            msg[field] = self.value
          if value == '{$ClOrdID}':
            msg[field] = self.client_order_id

        return msg
    except Exception,e:
      pass
    return  None

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
  percent_fee               = Column(Numeric,    nullable=False, default=0)
  fixed_fee                 = Column(Integer,    nullable=False, default=0)
  html_template             = Column(UnicodeText)
  deposit_limits            = Column(Text)
  parameters                = Column(Text,nullable=False)


  def __repr__(self):
    return u"<DepositMethods(id=%r, broker_id=%r, name=%r, description=%r, disclaimer=%r ,"\
           u"type=%r, broker_deposit_ctrl_num=%r, currency=%r, percent_fee=%r, fixed_fee=%r, "\
           u"deposit_limits=%r, html_template=%r, parameters=%r)>"\
    % (self.id, self.broker_id, self.name, self.description, self.disclaimer, self.type,
       self.broker_deposit_ctrl_num, self.currency, self.percent_fee, self.fixed_fee,
       self.deposit_limits, self.html_template, self.parameters)

  @staticmethod
  def get_deposit_method(session, deposit_option_id):
    return session.query(DepositMethods).filter_by(id=deposit_option_id).first()

  @staticmethod
  def get_list(session, broker_id):
    return  session.query(DepositMethods).filter_by(broker_id=broker_id)

  def generate_deposit(self,session, user, value, client_order_id, instructions=None):
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
      value                   = value,
      email_lang              = user.email_lang
    )
    if client_order_id:
      deposit.client_order_id =  client_order_id

    if instructions:
      deposit.instructions = json.dumps(instructions)

    deposit.data = self.parameters

    session.add(self)
    session.add(deposit)
    session.flush()

    return deposit


def db_bootstrap(session):
    """Database boostrapping now done by config/bootstrap/"""
    pass

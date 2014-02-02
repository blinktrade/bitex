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
from sqlalchemy.sql.expression import or_, exists
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Numeric, Text, Date
from sqlalchemy.orm import  relationship, backref
from sqlalchemy.ext.declarative import declarative_base

from tornado.options import  options

engine = create_engine( options.db_engine, echo=options.db_echo)
Base = declarative_base()

from trade_application import application

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

  broker_id       = Column(Integer, ForeignKey('users.id'))

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
  is_broker       = Column(Boolean, nullable=False, default=False)

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
    return u"<User(id=%r, username=%r, email=%r,  broker_id=%r, " \
           u" password_algo=%r, password_salt=%r, password=%r,"\
           u" balance_btc=%r, balance_ltc=%r, balance_brl=%r, balance_usd=%r, bitcoin_address=%r," \
           u" verified=%r, is_staff=%r, is_system=%r, is_broker=%r,  created=%r, last_login=%r," \
           u" daily_withdraw_btc_limit=%r, daily_withdraw_ltc_limit=%r, daily_withdraw_brl_limit=%r, daily_withdraw_usd_limit=%r,"\
           u" daily_withdraw_btc=%r, daily_withdraw_ltc=%r, daily_withdraw_brl=%r, daily_withdraw_usd=%r," \
           u" last_withdraw_btc=%r, last_withdraw_ltc=%r, last_withdraw_brl=%r, last_withdraw_usd=%r )>" \
          % (self.id, self.username, self.email, self.broker_id,
             self.password_algo, self.password_salt, self.password,
             self.balance_btc, self.balance_ltc, self.balance_brl, self.balance_usd, self.bitcoin_address,
             self.verified, self.is_staff, self.is_system, self.is_broker, self.created, self.last_login,
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

  def get_currency_balance(self, currency_symbol):
    attribute = 'balance_' + currency_symbol.lower().strip()
    if not hasattr( self, attribute ):
      return 0
    return getattr( self,attribute, 0)


  def get_balance(self, reqId = None):
    balance_update_msg = {
      'MsgType': 'U3',
      'balance_brl': self.balance_brl,
      'balance_usd': self.balance_usd,
      'balance_btc': self.balance_btc,
      'balance_ltc': self.balance_ltc,
      }
    if reqId:
      balance_update_msg['BalanceReqID'] = reqId
    return balance_update_msg

  def publish_balance_update(self, reqId = None):
    balance_update_msg = self.get_balance(reqId)
    application.publish( self.id, balance_update_msg )

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

    if user and  user.two_factor_enabled and second_factor is None:
      raise NeedSecondFactorException

    if user and user.check_password(password):

      if user.two_factor_enabled:
        if second_factor is None or int(second_factor) != get_totp_token(user.two_factor_secret):
          raise NeedSecondFactorException

      # update the last login
      user.last_login = datetime.datetime.now()

      if not user.bitcoin_address:
        avaliable_btc_address = session.query(BitcoinAddress).filter_by(user_id=None).first()
        if not avaliable_btc_address:
          logging.error('There is no available bitcoin address in the BitcoinAddress table. Please run bitcoiner with --new_address option')
        else:
          avaliable_btc_address.user_id = user.id
          session.add(avaliable_btc_address)

          user.bitcoin_address = avaliable_btc_address.bitcoin_address

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

    self.publish_balance_update()
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

    self.publish_balance_update()
    """

class Broker(Base):
  __tablename__         = 'brokers'
  id                    = Column(Integer,       ForeignKey('users.id'),  unique=True)
  user                  = relationship("User",  backref=backref('brokers', order_by=id))
  short_name            = Column(String(30),    primary_key=True)
  business_name         = Column(String(30),    nullable=False)
  address               = Column(String(255),   nullable=False)
  state                 = Column(String(30),    nullable=False)
  zip_code              = Column(String(12),    nullable=False)
  country               = Column(String(2),     nullable=False)
  phone_number_1        = Column(String(15),    nullable=False)
  phone_number_2        = Column(String(15))
  skype                 = Column(String(30),    nullable=False)

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

  def __repr__(self):
    return u"<Broker(id=%r, short_name=%r, business_name=%r,  " \
           u"address=%r, state=%r, zip_code=%r, country=%r, phone_number_1=%r, phone_number_2=%r, skype=%r," \
           u"currencies=%r, tos_url=%r, " \
           u"boleto_fee=%r ,withdraw_brl_bank_fee=%r,withdraw_wallet_fee=%r,withdraw_swift_fee=%r,withdraw_ach_fee=%r," \
           u"transaction_fee_buy=%r,transaction_fee_sell=%r, " \
           u"status=%r, ranking=%r >"% (
      self.id, self.short_name, self.business_name,
      self.address, self.state, self.zip_code, self.country, self.phone_number_1, self.phone_number_2, self.skype,
      self.currencies, self.tos_url,
      self.boleto_fee, self.withdraw_brl_bank_fee, self.withdraw_wallet_fee, self.withdraw_swift_fee, self.withdraw_ach_fee,
      self.transaction_fee_buy, self.transaction_fee_sell,
      self.status, self.ranking )


class BitcoinAddress(Base):
  __tablename__   = 'bitcoin_address'
  bitcoin_address = Column(String(50), nullable=True, primary_key=True)
  user_id         = Column(Integer,       ForeignKey('users.id'), nullable=True, index=True )

  def __repr__(self):
    return u"<BitcoinAddress(bitcoin_address=%r, user_id=%r)>"%(self.bitcoin_address, self.user_id)


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

    formatted_amount = u'{:,.2f}'.format(amount / 1.e5)
    formatted_amount = formatted_amount.replace(',', '#')
    formatted_amount = formatted_amount.replace('.', ',')
    formatted_amount = formatted_amount.replace('#', '.')


    UserEmail.create( session = session,
                      user_id = user.id,
                      subject = u"[BitEx] Confirme a operação de saque.",
                      template= "withdraw_confirmation_brl_bank_transfer_ptBR.txt",
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


    formatted_amount = u'{:,.8f}'.format(amount / 1.e8)
    formatted_amount = formatted_amount.replace(',', '#')
    formatted_amount = formatted_amount.replace('.', ',')
    formatted_amount = formatted_amount.replace('#', '.')

    UserEmail.create( session = session,
                      user_id = user.id,
                      subject = u"[BitEx] Confirme a operação de saque.",
                      template= "withdraw_confirmation_crypto_coin_ptBR.txt",
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
    return "<Order(id=%r, user_id=%r, username=%r,account_id=%r,account_username=%r client_order_id=%r, " \
           "symbol=%r, side=%r, type=%r, price=%r, order_qty=%r, cum_qty=%r, leaves_qty=%r, " \
           "created=%r, last_price=%r,  cxl_qty=%r, last_qty=%r, status=%r, average_price=%r, fee=%r)>" \
            % (self.id, self.user_id, self.username, self.account_id, self.account_username, self.client_order_id,
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
    balance_price = self.account_user.get_currency_balance(self.symbol[:3].lower())
    balance_qty   = self.account_user.get_currency_balance(self.symbol[3:].lower())

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

    total_value = int(float(price) * float(qty)/1e8)

    # adjust balances
    from_symbol = self.symbol[:3].lower()
    to_symbol = self.symbol[3:].lower()
    if self.side == '1' :  # BUY
      self.account_user.update_balance( 'DEBIT',  from_symbol, total_value )
      self.account_user.update_balance( 'CREDIT', to_symbol  , qty )
    elif self.side == '2': # Sell
      self.account_user.update_balance( 'CREDIT', from_symbol, total_value )
      self.account_user.update_balance( 'DEBIT',  to_symbol  , qty )


    self.average_price = ((price * qty) + (self.cum_qty * self.average_price )) / ( self.cum_qty + qty )
    self.cum_qty += qty
    self.leaves_qty -= qty
    self.last_price = price
    self.last_qty = qty
    self._adjust_status()

    self.account_user.publish_balance_update()

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
  def get_last_100_trades(session, symbol):
    trades = session.query(Trade).filter_by(symbol=symbol).order_by(Trade.created.desc() ).limit(100)
    return trades

class Boleto(Base):
  __tablename__       = 'boleto'

  id                  = Column(Integer,   primary_key=True)
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

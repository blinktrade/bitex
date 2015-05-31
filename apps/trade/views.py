# -*- coding: utf-8 -*-

import datetime
from pyblinktrade.message import JsonMessage
from pyblinktrade.json_encoder import  JsonEncoder
from copy import deepcopy
import math
import json

from models import  User, Order, UserPasswordReset, Deposit, DepositMethods, \
  NeedSecondFactorException, UserAlreadyExistsException, BrokerDoesNotExistsException, \
  Withdraw, Broker, Instrument, Currency, Balance, Ledger, Position, ApiAccess

from execution import OrderMatcher

from decorators import *

from trade_application import TradeApplication

def processTestRequest(session, msg):
  return json.dumps({
    "MsgType":"0",
    "TestReqID": msg.get("TestReqID")
  }, cls=JsonEncoder)

@login_required
@verify_permission
def processChangePassword(session, msg):
  # Authenticate the user
  need_second_factor = False
  user = None
  try:
    user = User.authenticate(TradeApplication.instance().db_session,
                             msg.get('BrokerID'),
                             msg.get('Username'),
                             msg.get('Password'),
                             msg.get('SecondFactor'),
                             msg.get('FingerPrint'),
                             msg.get('RemoteIP'),
                             msg.get('STUNTIP'))
  except NeedSecondFactorException:
    need_second_factor = True


  if user is None:
    login_response = {
      'MsgType':          'BF',
      'UserReqID':        msg.get('UserReqID'),
      'Username':         '',
      'UserStatus':       3,
      'UserReqTyp':       3,
      'NeedSecondFactor': need_second_factor,
      'UserStatusText':   'MSG_LOGIN_ERROR_INVALID_PASSWORD' if not need_second_factor else 'MSG_LOGIN_ERROR_INVALID_SECOND_STEP'
    }
    return json.dumps(login_response, cls=JsonEncoder)

  user.set_password(msg.get('NewPassword'))

  login_response = {
      'MsgType':          'BF',
      'UserReqID':        msg.get('UserReqID'),
      'UserStatus':       3,
      'UserReqTyp':       3,
      'UserStatusText':  'MSG_SUCCESS_PASSWORD_CHANGE'
  }
  return json.dumps(login_response, cls=JsonEncoder)

def getProfileMessage(user, profile=None, show_account_info=True):
  if not profile:
    if user.is_broker:
      profile = Broker.get_broker( TradeApplication.instance().db_session,user.id)
    else:
      profile = user

  if user.is_broker:
    profile_message = {
      'Type'               : 'BROKER',
      'Username'           : user.username if show_account_info else 'hidden',
      'Verified'           : user.verified                ,
      'VerificationData'   : user.verification_data if show_account_info else None,
      'TwoFactorEnabled'   : user.two_factor_enabled      ,
      'NeedWithdrawEmail'  : user.withdraw_email_validation,
      'BrokerID'           : profile.id                   ,
      'ShortName'          : profile.short_name           ,
      'BusinessName'       : profile.business_name        ,
      'Address'            : profile.address              ,
      'ZipCode'            : profile.zip_code             ,
      'City'               : profile.city                 ,
      'State'              : profile.state                ,
      'Country'            : profile.country              ,
      'PhoneNumber1'       : profile.phone_number_1       ,
      'PhoneNumber2'       : profile.phone_number_2       ,
      'Skype'              : profile.skype                ,
      'Email'              : profile.email                ,
      'Currencies'         : profile.currencies           ,
      'VerificationForm'   : profile.verification_jotform ,
      'UploadForm'         : profile.upload_jotform       ,
      'TosUrl'             : profile.tos_url              ,
      'FeeStructure'       : json.loads(profile.fee_structure),
      'WithdrawStructure'  : json.loads(profile.withdraw_structure),
      'TransactionFeeBuy'  : profile.transaction_fee_buy  ,
      'TransactionFeeSell' : profile.transaction_fee_sell ,
      'Status'             : profile.status               ,
      'Ranking'            : profile.ranking              ,
      'SupportURL'         : profile.support_url          ,
      'CryptoCurrencies'   : json.loads(profile.crypto_currencies),
      'Accounts'           : json.loads(profile.accounts)
    }
  else:
    profile_message = {
      'Type'               : 'USER',
      'UserID'             : user.id,
      'ID'                 : user.id,
      'Username'           : user.username if show_account_info else 'hidden',
      'Email'              : profile.email if show_account_info else 'hidden',
      'State'              : profile.state,
      'Country'            : profile.country_code,
      'CountryCode'        : profile.country_code,
      'Verified'           : profile.verified,
      'VerificationData'   : profile.verification_data if show_account_info else None,
      'TwoFactorEnabled'   : profile.two_factor_enabled,
      'NeedWithdrawEmail'  : profile.withdraw_email_validation,
      'TransactionFeeBuy'  : profile.transaction_fee_buy,
      'TransactionFeeSell' : profile.transaction_fee_sell,
      'DepositPercentFee'  : profile.deposit_percent_fee,
      'DepositFixedFee'    : profile.deposit_fixed_fee,
      'WithdrawPercentFee' : profile.withdraw_percent_fee,
      'WithdrawFixedFee'   : profile.withdraw_fixed_fee,
      'IsMarketMaker'      : profile.is_market_maker if show_account_info else False
      }
  return profile_message

def processLogin(session, msg):
  # Authenticate the user
  need_second_factor = False
  try:
    user = User.authenticate(TradeApplication.instance().db_session,
                             msg.get('BrokerID'),
                             msg.get('Username'),
                             msg.get('Password'),
                             msg.get('SecondFactor'),
                             msg.get('FingerPrint'),
                             msg.get('RemoteIP'),
                             msg.get('STUNTIP'),
                             msg.get('UserAgent'),
                             msg.get('UserAgentLanguage'),
                             msg.get('UserAgentTimezoneOffset'),
                             msg.get('UserAgentPlatform'))
    session.set_user(user, {'*':[]} )
  except NeedSecondFactorException:
    need_second_factor = True


  if not session.user:   # Let's test for an API login
    user, permission_list = ApiAccess.authenticate(TradeApplication.instance().db_session,
                                                   msg.get('BrokerID'),
                                                   msg.get('Username'),
                                                   msg.get('Password'),
                                                   msg.get('FingerPrint'),
                                                   msg.get('RemoteIP'),
                                                   msg.get('STUNTIP'),
                                                   msg.get('UserAgent'),
                                                   msg.get('UserAgentLanguage'),
                                                   msg.get('UserAgentTimezoneOffset'),
                                                   msg.get('UserAgentPlatform'))
    session.set_user(user, permission_list )


  if not session.user:
    login_response = {
      'MsgType':          'BF',
      'UserReqID':        msg.get('UserReqID'),
      'Username':         '',
      'UserStatus':       3,
      'NeedSecondFactor': need_second_factor,
      'UserStatusText':   'MSG_LOGIN_ERROR_INVALID_USERNAME_OR_PASSWORD' if not need_second_factor else 'MSG_LOGIN_ERROR_INVALID_SECOND_STEP'
    }
    TradeApplication.instance().db_session.rollback()
    session.should_end = True
    return json.dumps(login_response, cls=JsonEncoder)

  TradeApplication.instance().db_session.add(session.user)
  TradeApplication.instance().db_session.commit()

  # Send the login response
  login_response = {
    'MsgType'            : 'BF',
    'UserReqID'          : msg.get('UserReqID'),
    'UserID'             : session.user.id,
    'Username'           : session.user.username if session.has_access_to_account_info() else 'hidden',
    'TwoFactorEnabled'   : session.user.two_factor_enabled,
    'UserStatus'         : 1,
    'IsBroker'           : session.user.is_broker,
    'BrokerID'           : session.broker.id,
    'TransactionFeeBuy'  : session.user.transaction_fee_buy,
    'TransactionFeeSell' : session.user.transaction_fee_sell,
    'DepositPercentFee'  : session.user.deposit_percent_fee ,
    'DepositFixedFee'    : session.user.deposit_fixed_fee,
    'WithdrawPercentFee' : session.user.withdraw_percent_fee,
    'WithdrawFixedFee'   : session.user.withdraw_fixed_fee,
    'IsMarketMaker'      : session.user.is_market_maker,
    'Broker': {
        'BrokerID'           : session.broker.id                   ,
        'ShortName'          : session.broker.short_name           ,
        'BusinessName'       : session.broker.business_name        ,
        'Address'            : session.broker.address              ,
        'ZipCode'            : session.broker.zip_code             ,
        'City'               : session.broker.city                 ,
        'State'              : session.broker.state                ,
        'Country'            : session.broker.country              ,
        'PhoneNumber1'       : session.broker.phone_number_1       ,
        'PhoneNumber2'       : session.broker.phone_number_2       ,
        'Skype'              : session.broker.skype                ,
        'Email'              : session.broker.email                ,
        'Currencies'         : session.broker.currencies           ,
        'VerificationForm'   : session.broker.verification_jotform ,
        'UploadForm'         : session.broker.upload_jotform       ,
        'TosUrl'             : session.broker.tos_url              ,
        'FeeStructure'       : json.loads(session.broker.fee_structure),
        'WithdrawStructure'  : json.loads(session.broker.withdraw_structure),
        'TransactionFeeBuy'  : session.broker.transaction_fee_buy  ,
        'TransactionFeeSell' : session.broker.transaction_fee_sell ,
        'Status'             : session.broker.status               ,
        'ranking'            : session.broker.ranking              ,
        'SupportURL'         : session.broker.support_url          ,
        'CryptoCurrencies'   : json.loads(session.broker.crypto_currencies)
    },
    'Profile': getProfileMessage(session.user, session.profile, session.has_access_to_account_info())
  }
  return json.dumps(login_response, cls=JsonEncoder)

@login_required
@verify_permission
def processNewOrderSingle(session, msg):
  from errors import NotAuthorizedError, InvalidClientIDError

  if msg.has('ClientID') and not session.user.is_broker:
    if isinstance(msg.get('ClientID'), int ):
      if msg.get('ClientID') != session.user.id and str(msg.get('ClientID')) != session.user.username:
        raise NotAuthorizedError()
    else:
      if (msg.get('ClientID').isdigit() and int(msg.get('ClientID')) != session.user.id)  and \
         msg.get('ClientID') != session.user.username and \
         msg.get('ClientID') != session.user.email:
        raise NotAuthorizedError()

  if session.user.is_broker:
    if not msg.has('ClientID'):  # it is broker sending an order on behalf of it's client
      raise NotAuthorizedError()

    client = None
    if msg.get('ClientID').isdigit():
      client = User.get_user( TradeApplication.instance().db_session, session.user.id, user_id= int(msg.get('ClientID')))

    if not client:
      client = User.get_user(TradeApplication.instance().db_session, session.user.id, username= msg.get('ClientID'))

    if not client:
      client = User.get_user(TradeApplication.instance().db_session, session.user.id, email= msg.get('ClientID'))

    if not client:
      raise InvalidClientIDError()

    account_user  = client
    account_id    = client.account_id
    broker_user   = session.profile
    fee_account   = session.user_accounts['fees']
  else:
    account_id    = session.user.account_id
    account_user  = session.user
    broker_user   = session.broker
    fee_account   = session.broker_accounts['fees']

  if not broker_user:
    raise NotAuthorizedError()

  broker_fee = 0
  fee = 0
  if msg.get('Side') in ('1', '3'): # Buy or Buy Minus ( To be implemented )
    broker_fee = broker_user.transaction_fee_buy
    if account_user.transaction_fee_buy is None:
      fee = broker_user.transaction_fee_buy
    else:
      fee = account_user.transaction_fee_buy
  else:
    broker_fee = broker_user.transaction_fee_sell
    if account_user.transaction_fee_sell is None:
      fee = broker_user.transaction_fee_sell
    else:
      fee = account_user.transaction_fee_sell

  # Adjust the price according to the PIP
  price_currency = msg.get('Symbol')[3:]
  pip = Currency.get_currency(TradeApplication.instance().db_session,price_currency).pip
  price = msg.get('Price', 0)
  price = int(math.floor( float(price)/ float(pip) ) * pip)

  instrument = Instrument.get_instrument( TradeApplication.instance().db_session, msg.get('Symbol') )
  instrument_brokers = json.loads( instrument.brokers ) 
  if account_user.broker_id not in instrument_brokers:
    raise NotAuthorizedError()

  # process the new order.
  order = Order.create(TradeApplication.instance().db_session,
                       user_id              = session.user.id,
                       account_id           = msg.get('ClientID', account_id ),
                       user                 = session.user,
                       username             = session.user.username,
                       account_user         = account_user,
                       account_username     = account_user.username,
                       broker_id            = account_user.broker_id,
                       broker_username      = account_user.broker_username,
                       client_order_id      = msg.get('ClOrdID'),
                       symbol               = msg.get('Symbol'),
                       side                 = msg.get('Side'),
                       type                 = msg.get('OrdType'),
                       price                = price,
                       order_qty            = msg.get('OrderQty'),
                       time_in_force        = msg.get('TimeInForce', '1'),
                       fee                  = fee,
                       fee_account_id       = fee_account[0],
                       fee_account_username = fee_account[1],
                       fwd_fees             = json.dumps(fee_account[2:]),
                       email_lang           = session.email_lang,
                       is_from_market_maker = account_user.is_market_maker,
                       gui_id               = None )
  TradeApplication.instance().db_session.flush() # just to assign an ID for the order.

  OrderMatcher.get(msg.get('Symbol')).match(TradeApplication.instance().db_session,
                                            order,
                                            TradeApplication.instance().order_matcher_disabled,
                                            broker_fee)
  TradeApplication.instance().db_session.commit()

  return ""

@login_required
@verify_permission
def processCancelOrderRequest(session, msg):
  order_list = []
  if  msg.has('OrigClOrdID') or msg.has('ClOrdID'):
    order = Order.get_order_by_client_order_id(TradeApplication.instance().db_session, session.user.id,  msg.get('OrigClOrdID', msg.get('ClOrdID')))
    if order:
      order_list.append(order)
  elif msg.has('OrderID'):
    order = Order.get_order_by_order_id(TradeApplication.instance().db_session,   msg.get('OrderID') )

    if order:
      if order.user_id == session.user.id:  # user/broker cancelling his own order
        order_list.append(order)
      elif order.account_id == session.user.id:  # user cancelling an order sent by his broker
        order_list.append(order)
      elif order.account_user.broker_id == session.user.id:  # broker cancelling an order sent by an user
        order_list.append(order)
  else:
    # user cancelling all the orders he sent.
    orders = Order.get_list(TradeApplication.instance().db_session,
                            [ "user_id eq " + str(session.user.id), "has_leaves_qty eq 1"])
    for order in orders:
      order_list.append(order)

  for order in order_list:
    OrderMatcher.get( order.symbol ).cancel(TradeApplication.instance().db_session, order)
  TradeApplication.instance().db_session.commit()

  return ""


def convertCamelCase2Underscore(name):
  import re
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

@login_required
@verify_permission
def processUpdateUserProfile(session, msg):
  fields  = msg.get('Fields',[])
  user_id = msg.get('UserID' )

  if user_id:
    broker_id = session.user.id
  else:
    user_id = session.user.id
    broker_id = session.broker.id

  user = User.get_user(TradeApplication.instance().db_session, broker_id,user_id=user_id)

  is_updating_his_own_profile = True
  is_updating_his_customer_profile = False

  if not user:
    raise NotAuthorizedError()

  if user_id != session.user.id:
    if not session.user.is_broker:
      raise NotAuthorizedError()
    if user.broker_id != session.user.id:
      raise NotAuthorizedError()
    is_updating_his_own_profile = False
    is_updating_his_customer_profile = True


  user_model_fields_writable = []
  broker_model_fields_writable = []

  if is_updating_his_customer_profile:
    user_model_fields_writable = ['TransactionFeeBuy',
                                  'TransactionFeeSell',
                                  'DepositPercentFee',
                                  'DepositFixedFee',
                                  'WithdrawPercentFee',
                                  'WithdrawFixedFee',
                                  'IsMarketMaker',
                                  'WithdrawEmailValidation',
                                  'TwoFactorEnabled',
                                  'IsMSB',
                                  'TrustLevel']

  broker_profile = None
  if user.is_broker:
    broker_profile = Broker.get_broker(TradeApplication.instance().db_session, user_id)
    if is_updating_his_own_profile:
      broker_model_fields_writable = [ 'PhoneNumber1','PhoneNumber2','Skype','Email',
                                       'VerificationJotform','UploadJotform','TosUrl','SupportUrl',
                                       'WithdrawConfirmationEmail',
                                       'WithdrawStructure','FeeStructure',
                                       'TransactionFeeBuy','TransactionFeeSell',
                                       'AcceptCustomersFrom']
    elif is_updating_his_customer_profile:
      broker_model_fields_writable = [ 'BusinessName','SignupLabel','Status',
                                       'Address', 'City','State','ZipCode','CountryCode','Country',
                                       'PhoneNumber1','PhoneNumber2','Skype','Email',
                                       'VerificationJotform','UploadJotform','TosUrl','SupportUrl',
                                       'WithdrawConfirmationEmail',
                                       'AcceptCustomersFrom']

  user_model_update_fields = {}
  broker_model_update_fields = {}
  for field, field_value in fields.iteritems():
    if broker_profile:
      if field not in broker_model_fields_writable  and field not in user_model_fields_writable:
        raise  NotAuthorizedError
    else:
      if field not in user_model_fields_writable:
        raise  NotAuthorizedError

    model_field =  convertCamelCase2Underscore(field)

    # JSON fields
    if field in ('WithdrawStructure', 'CryptoCurrencies', 'Currencies', 'AcceptCustomersFrom'):
      field_value = json.dumps(field_value)

    if field in user_model_fields_writable:
      user_model_update_fields[model_field] = field_value
    elif field in broker_model_fields_writable:
      if broker_profile:
        broker_model_update_fields[model_field] = field_value
      else:
        raise  NotAuthorizedError
    else:
      raise  NotAuthorizedError


  if user_model_update_fields:
    user.update(user_model_update_fields)

  if broker_model_update_fields:
    broker_profile.update(broker_model_update_fields)

  TradeApplication.instance().db_session.commit()

  response_msg = {
    "MsgType":"U39",
    "UpdateReqID": msg.get("UpdateReqID"),
    'UserID'             : user.id,
    'Username'           : user.username if session.has_access_to_account_info() else 'hidden',
    'TwoFactorEnabled'   : user.two_factor_enabled,
    'IsBroker'           : user.is_broker,
    'BrokerID'           : user.broker.id,
    'TransactionFeeBuy'  : user.transaction_fee_buy,
    'TransactionFeeSell' : user.transaction_fee_sell,
    'DepositPercentFee'  : user.deposit_percent_fee,
    'DepositFixedFee'    : user.deposit_fixed_fee,
    'WithdrawPercentFee' : user.withdraw_percent_fee,
    'WithdrawFixedFee'   : user.withdraw_fixed_fee,
    'IsMarketMaker'      : user.is_market_maker,
    "Profile": getProfileMessage(user, broker_profile, session.has_access_to_account_info())
  }

  profile_refresh_msg = deepcopy(response_msg )
  profile_refresh_msg['MsgType'] = 'U40'
  del profile_refresh_msg['UpdateReqID']
  TradeApplication.instance().publish(user_id, profile_refresh_msg )


  return json.dumps(response_msg, cls=JsonEncoder)

def processTradersRankRequest(session, msg):
  page            = msg.get('Page', 0)
  page_size       = msg.get('PageSize', 100)
  filter          = msg.get('Filter',[])
  offset          = page * page_size

  columns = [ 'Rank', 'Trader',  'Broker', 'Amount' ]

  traders_list = Balance.get_balances_by_rank( TradeApplication.instance().db_session )

  response_msg = {
    'MsgType'           : 'U37',
    'DepositListReqID'  : msg.get('TradersRankReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'TradersRankGrp'    : traders_list
  }

  return json.dumps(response_msg, cls=JsonEncoder)

def processSecurityListRequest(session, msg):
  request_type = msg.get('SecurityListRequestType')
  instruments =  Instrument.get_instruments(TradeApplication.instance().db_session, request_type)
  currencies = Currency.get_currencies(TradeApplication.instance().db_session)

  response = {
    'MsgType': 'y', # SecurityList
    'SecurityReqID': msg.get('SecurityReqID'),
    'SecurityResponseID': '1',
    'SecurityRequestResult': 0 if len(instruments) > 1 else 2 , # "0-Valid Request" if found or "2-No instruments found" if not
    'TotalNumSecurities': len(instruments),
    'NoRelatedSym': len(instruments),
    'Instruments': [],
    'TotalNumCurrencies' : len(currencies),
    'NoRelatedCurr': len(currencies),
    'Currencies': []
  }
  for instrument in instruments:
    response['Instruments'].append({
      'Symbol': instrument.symbol,
      'Currency': instrument.currency,
      'Description': instrument.description
    })
  for currency in currencies:
    response['Currencies'].append({
      'Code': currency.code,
      'Sign': currency.sign,
      'Description': currency.description,
      'IsCrypto': currency.is_crypto,
      'Pip': currency.pip,
      'NumberOfDecimals': currency.number_of_decimals,
      'FormatPython': currency.format_python,
      'FormatJS': currency.format_js,
      'HumanFormatPython': currency.human_format_python,
      'HumanFormatJS': currency.human_format_js
    })

  return json.dumps(response, cls=JsonEncoder)

def processSignup(session, msg):
  try:
    u, broker = User.signup(TradeApplication.instance().db_session,
                            msg.get('Username'),
                            msg.get('Email'),
                            msg.get('Password'),
                            msg.get('State'),
                            msg.get('CountryCode'),
                            msg.get('BrokerID'))
  except BrokerDoesNotExistsException:
    login_response = {
      'MsgType': 'BF',
      'UserReqID': msg.get('UserReqID'),
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': 'MSG_LOGIN_ERROR_INVALID_BROKER'
    }
    TradeApplication.instance().db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)
  except UserAlreadyExistsException:
    login_response = {
      'MsgType': 'BF',
      'UserReqID': msg.get('UserReqID'),
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': 'MSG_LOGIN_ERROR_USERNAME_ALREADY_TAKEN'
    }
    TradeApplication.instance().db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)
  except Exception, e:
    login_response = {
      'MsgType': 'BF',
      'UserReqID': msg.get('UserReqID'),
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': str(e)
    }
    TradeApplication.instance().db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)

  if TradeApplication.instance().options.test_mode:
    Ledger.transfer(TradeApplication.instance().db_session,
                    u.broker_id,            # from_account_id
                    u.broker_username,      # from_account_name
                    u.broker_id,            # from_broker_id
                    u.broker_username,      # from_broker_name
                    u.id,                   # to_account_id
                    u.username,             # to_account_name
                    u.broker_id,            # to_broker_id
                    u.broker_username,      # to_broker_name
                    'BTC',                  # currency
                    1e8,                    # amount
                    str(u.id),              # reference
                    'B'                     # descriptions
    )
  return processLogin(session, msg)


@login_required
@verify_permission
def processRequestForPositions(session, msg):
  user = session.user
  if msg.has('ClientID'):
    user = User.get_user(TradeApplication.instance().db_session,
                         session.user.id,
                         user_id= int(msg.get('ClientID')) )

    if not user:
      raise NotAuthorizedError()

    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()

  positions = Position.get_positions_by_account( TradeApplication.instance().db_session, user.account_id )
  response = {
    'MsgType': 'U43',
    'ClientID': user.id,
    'PositionReqID': msg.get('PositionReqID')
  }
  for position in positions:
    if position.broker_id in response:
      response[position.broker_id][position.currency ] = position.position
    else:
      response[position.broker_id] = { position.currency: position.position }
  return json.dumps(response, cls=JsonEncoder)


@login_required
@verify_permission
def processRequestForBalances(session, msg):
  user = session.user
  if msg.has('ClientID'):
    user = User.get_user(TradeApplication.instance().db_session,
                         session.user.id,
                         user_id= int(msg.get('ClientID')) )

    if not user:
      raise NotAuthorizedError()

    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()


  balances = Balance.get_balances_by_account( TradeApplication.instance().db_session, user.account_id )
  response = {
    'MsgType': 'U3',
    'ClientID': user.id,
    'BalanceReqID': msg.get('BalanceReqID')
  }
  for balance in balances:
    if balance.broker_id in response:
      response[balance.broker_id][balance.currency ] = balance.balance
    else:
      response[balance.broker_id] = { balance.currency: balance.balance }
  return json.dumps(response, cls=JsonEncoder)

@login_required
@verify_permission
def processRequestForOpenOrders(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  filter_list = msg.get('Filter', [])
  offset      = page * page_size

  if session.user.is_broker:
    filter_list.append("user_id eq " + str(session.user.id))
  else:
    filter_list.append("account_id eq " + str(session.user.id))

  orders = Order.get_list(TradeApplication.instance().db_session, filter_list, page_size, offset)

  order_list = []
  columns = [ 'ClOrdID','OrderID','CumQty','OrdStatus','LeavesQty','CxlQty','AvgPx',
              'Symbol', 'Side', 'OrdType', 'OrderQty', 'Price', 'OrderDate', 'Volume', 'TimeInForce' ]

  for order in orders:
    order_total_value = order.average_price * order.cum_qty
    if order_total_value:
      order_total_value /=  1.e8

    order_list.append( [
      order.client_order_id,
      order.id,
      order.cum_qty,
      order.status,
      order.leaves_qty,
      order.cxl_qty,
      order.average_price,
      order.symbol,
      order.side,
      order.type,
      order.order_qty,
      order.price,
      order.created,
      order_total_value,
      order.time_in_force
    ])

  open_orders_response_msg = {
    'MsgType':     'U5',
    'OrdersReqID': msg.get('OrdersReqID'),
    'Page':        page,
    'PageSize':    page_size,
    'Columns':     columns,
    'OrdListGrp' : order_list
  }
  return json.dumps(open_orders_response_msg, cls=JsonEncoder)

def processRequestPasswordRequest(session, msg):
  user  = User.get_user( TradeApplication.instance().db_session, msg.get('BrokerID') ,email = msg.get('Email') )
  success = 0
  if user:
    user.request_reset_password( TradeApplication.instance().db_session, user.email_lang )
    TradeApplication.instance().db_session.commit()
    success = 1

  response = {
    'MsgType': 'U11',
    'ForgotPasswordReqID': msg.get('ForgotPasswordReqID'),
    'Success': success
  }
  return json.dumps(response, cls=JsonEncoder)

def processPasswordRequest(session, msg):
  if UserPasswordReset.change_user_password( TradeApplication.instance().db_session, msg.get('Token'), msg.get('NewPassword') ):
    response = {
      'MsgType': 'U13',
      'UserStatus': 1,
      'ResetPasswordReqID': msg.get('ResetPasswordReqID'),
      'UserStatusText': 'MSG_SUCCESS_PASSWORD_CHANGE'
    }

    TradeApplication.instance().db_session.commit()
    return json.dumps(response, cls=JsonEncoder)
  else:
    response = {
      'MsgType': 'U13',
      'UserStatus': 3,
      'ResetPasswordReqID': msg.get('ResetPasswordReqID'),
      'UserStatusText': 'MSG_CHANGE_PASSWORD_INVALID_SECURITY_CODE'
    }
    return json.dumps(response, cls=JsonEncoder)

@login_required
@verify_permission
def processEnableDisableTwoFactorAuth(session, msg):
  enable = msg.get('Enable')
  secret = msg.get('Secret')
  code   = msg.get('Code')

  user = session.user

  if msg.has('ClientID'):
    if enable:
      raise NotAuthorizedError()

    user = User.get_user(TradeApplication.instance().db_session, session.user.id, user_id= int(msg.get('ClientID')) )

    if not user:
      raise NotAuthorizedError()

    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()


  two_factor_secret = user.enable_two_factor(enable, secret, code)
  TradeApplication.instance().db_session.add(user)
  TradeApplication.instance().db_session.commit()

  response = {'MsgType'         : 'U17',
              'EnableTwoFactorReqID': msg.get('EnableTwoFactorReqID'),
              'TwoFactorEnabled': user.two_factor_enabled,
              'TwoFactorSecret' : two_factor_secret }
  return json.dumps(response, cls=JsonEncoder)


def processRequestDepositMethod(session, msg):
  deposit_method_id = msg.get('DepositMethodID')

  deposit_method = DepositMethods.get_deposit_method(TradeApplication.instance().db_session, deposit_method_id)
  if not deposit_method:
    response = {'MsgType':'U49', 'DepositMethodReqID': msg.get('DepositMethodReqID'), 'DepositMethodID':-1}

  else:
    response = {
      'MsgType':'U49',
      'DepositMethodReqID': msg.get('DepositMethodReqID'),
      'DepositMethodID':    deposit_method.id,
      'Description':        deposit_method.description,
      'Disclaimer':         deposit_method.disclaimer,
      'Type':               deposit_method.type,
      'DepositLimits':      '{}',
      'HtmlTemplate':       '',
      'Currency':           deposit_method.currency,
      'PercentFee':         float(deposit_method.percent_fee),
      'FixedFee':           deposit_method.fixed_fee,
      'Parameters':         json.loads(deposit_method.parameters)
    }
    if deposit_method.deposit_limits:
      response['DepositLimits'] = json.loads(deposit_method.deposit_limits)
    if deposit_method.html_template:
      response['HtmlTemplate'] = deposit_method.html_template

  return json.dumps(response, cls=JsonEncoder)


def processRequestDepositMethods(session, msg):
  broker_id = msg.get('BrokerID')
  if session.user is None and broker_id is None:
    raise InvalidParameter()
  elif broker_id is None:
    broker_id = session.user.broker_id

  deposit_options = DepositMethods.get_list(TradeApplication.instance().db_session, broker_id )

  deposit_options_group = []

  for deposit_option in deposit_options:
    deposit_options_group.append( {
      'DepositMethodID': deposit_option.id,
      'Description': deposit_option.description,
      'Disclaimer': deposit_option.disclaimer,
      'Type': deposit_option.type,
      'DepositLimits':  json.loads(deposit_option.deposit_limits) ,
      'Currency': deposit_option.currency,
      'PercentFee': float(deposit_option.percent_fee),
      'FixedFee': deposit_option.fixed_fee,
      'UserReceiptURL': deposit_option.user_receipt_url
    } )

  response = {
    'MsgType':'U21',
    'DepositMethodReqID': msg.get('DepositMethodReqID'),
    'DepositMethodGrp': deposit_options_group
  }

  return json.dumps(response, cls=JsonEncoder)

def processRequestDeposit(session, msg):
  deposit_option_id = msg.get('DepositMethodID')
  deposit_id        = msg.get('DepositID')
  currency          = msg.get('Currency')
  input_address     = msg.get('InputAddress')
  destination       = msg.get('Destination')
  secret            = msg.get('Secret')
  client_order_id   = msg.get('ClOrdID')
  instructions      = msg.get('Instructions')
  value             = msg.get('Value')

  should_broadcast = False
  if deposit_option_id:
    if session.user is None :
      raise NotAuthorizedError()

    deposit_option = DepositMethods.get_deposit_method(TradeApplication.instance().db_session, deposit_option_id)
    if not deposit_option:
      response = {'MsgType':'U19', 'DepositID': -1 }
      return json.dumps(response, cls=JsonEncoder)

    verification_level = session.user.verified

    deposit_method_deposit_limits = None
    if deposit_option.deposit_limits:
      deposit_method_deposit_limits = json.loads(deposit_option.deposit_limits)

    if not deposit_method_deposit_limits:
      raise NotAuthorizedError()

    while verification_level > 0:
      if str(verification_level) in deposit_method_deposit_limits:
        break
      verification_level -= 1

    if not deposit_method_deposit_limits[str(verification_level)]["enabled"]:
      raise  NotAuthorizedError()

    min_deposit_value = deposit_method_deposit_limits[str(verification_level)]['min'] if 'min' in deposit_method_deposit_limits[str(verification_level)] else None
    max_deposit_value = deposit_method_deposit_limits[str(verification_level)]['max'] if 'max' in deposit_method_deposit_limits[str(verification_level)] else None

    if min_deposit_value and value < min_deposit_value :
      raise NotAuthorizedError()

    if max_deposit_value and value > max_deposit_value:
      raise NotAuthorizedError()

    deposit = deposit_option.generate_deposit(  TradeApplication.instance().db_session,
                                                session.user,
                                                value,
                                                client_order_id,
                                                instructions )
    TradeApplication.instance().db_session.commit()
    should_broadcast = True
  elif currency:
    deposit = Deposit.create_crypto_currency_deposit(TradeApplication.instance().db_session,
                                                     session.user,
                                                     currency,
                                                     input_address,
                                                     destination,
                                                     secret,
                                                     client_order_id,
                                                     instructions,
                                                     value)
    TradeApplication.instance().db_session.commit()
    should_broadcast = True
  else:
    deposit = Deposit.get_deposit(TradeApplication.instance().db_session, deposit_id)

  if not deposit:
    response = {'MsgType':'U19', 'DepositID': -1 }
    return json.dumps(response, cls=JsonEncoder)

  if should_broadcast:
    deposit_refresh = depositRecordToDepositMessage(deposit)
    deposit_refresh['MsgType'] = 'U23'
    deposit_refresh['DepositReqID'] = msg.get('DepositReqID')
    TradeApplication.instance().publish( deposit.account_id, deposit_refresh  )
    TradeApplication.instance().publish( deposit.broker_id,  deposit_refresh  )


  response_msg = depositRecordToDepositMessage(deposit)
  response_msg['MsgType'] = 'U19'
  response_msg['DepositReqID'] = msg.get('DepositReqID')
  return json.dumps(response_msg, cls=JsonEncoder)

def depositRecordToDepositMessage( deposit, show_account_info = True ):
  deposit_message = dict()
  deposit_message['DepositID']           = deposit.id
  deposit_message['UserID']              = deposit.user_id
  deposit_message['AccountID']           = deposit.account_id
  deposit_message['BrokerID']            = deposit.broker_id
  deposit_message['Username']            = deposit.username if show_account_info else 'hidden'
  deposit_message['DepositMethodID']     = deposit.deposit_option_id
  deposit_message['DepositMethodName']   = deposit.deposit_option_name
  deposit_message['ControlNumber']       = deposit.broker_deposit_ctrl_num
  deposit_message['Type']                = deposit.type
  deposit_message['Currency']            = deposit.currency
  deposit_message['Value']               = deposit.value
  deposit_message['PaidValue']           = deposit.paid_value
  deposit_message['Data']                = json.loads(deposit.data)
  deposit_message['Created']             = deposit.created
  deposit_message['Status']              = deposit.status
  deposit_message['ReasonID']            = deposit.reason_id
  deposit_message['Reason']              = deposit.reason
  deposit_message['PercentFee']          = float(deposit.percent_fee)
  deposit_message['FixedFee']            = deposit.fixed_fee
  deposit_message['ClOrdID']             = deposit.client_order_id
  return deposit_message


@login_required
@verify_permission
def processWithdrawRequest(session, msg):
  reqId           = msg.get('WithdrawReqID')
  client_order_id = msg.get('ClOrdID')

  verification_level = session.user.verified

  percent_fee = 0.
  fixed_fee = 0

  withdraw_structure = json.loads(session.broker.withdraw_structure)
  limits = None
  for withdraw_method in withdraw_structure[msg.get('Currency')]:
    if msg.get('Method') == withdraw_method['method']:
      limits = withdraw_method['limits']
      withdraw_method_percent_fee = withdraw_method['percent_fee']
      if withdraw_method_percent_fee is not None:
        percent_fee = withdraw_method_percent_fee

      withdraw_method_fixed_fee = withdraw_method['fixed_fee']
      if withdraw_method_fixed_fee is not None:
        fixed_fee = withdraw_method_fixed_fee
      break

  if session.user.withdraw_percent_fee is not None:
    if percent_fee:
      percent_fee = min(session.user.withdraw_percent_fee, percent_fee)
    else:
      percent_fee = session.user.withdraw_percent_fee

  if session.user.withdraw_fixed_fee is not None:
    if fixed_fee:
      fixed_fee = min(session.user.withdraw_fixed_fee, fixed_fee)
    else:
      fixed_fee = session.user.withdraw_fixed_fee

  if not limits:
    raise NotAuthorizedError()

  while verification_level > 0:
    if str(verification_level) in limits:
      break
    verification_level -= 1

  if not limits[str(verification_level)]["enabled"]:
    raise  NotAuthorizedError()

  min_amount = limits[str(verification_level)]['min'] if 'min' in limits[str(verification_level)] else None
  max_amount = limits[str(verification_level)]['max'] if 'max' in limits[str(verification_level)] else None

  if min_amount and msg.get('Amount') < min_amount :
    raise NotAuthorizedError()

  if max_amount and msg.get('Amount') > max_amount:
    raise NotAuthorizedError()

  withdraw_record = Withdraw.create(TradeApplication.instance().db_session,
                                    session.user,
                                    session.broker,
                                    msg.get('Currency'),
                                    msg.get('Amount'),
                                    msg.get('Method'),
                                    msg.get('Data', {} ),
                                    client_order_id,
                                    session.email_lang,
                                    percent_fee,
                                    fixed_fee)

  TradeApplication.instance().db_session.commit()

  withdraw_refresh = withdrawRecordToWithdrawMessage(withdraw_record)
  withdraw_refresh['MsgType'] = 'U9'
  TradeApplication.instance().publish( withdraw_record.account_id, withdraw_refresh  )
  TradeApplication.instance().publish( withdraw_record.broker_id,  withdraw_refresh  )


  response = {
    'MsgType':            'U7',
    'WithdrawReqID':      reqId,
    'Status':             withdraw_record.status,
    'WithdrawID':         withdraw_record.id,
  }
  return json.dumps(response, cls=JsonEncoder)

def withdrawRecordToWithdrawMessage( withdraw ):
  withdraw_message = dict()
  withdraw_message['WithdrawID']          = withdraw.id
  withdraw_message['UserID']              = withdraw.user_id
  withdraw_message['BrokerID']            = withdraw.broker_id
  withdraw_message['Username']            = withdraw.username
  withdraw_message['Method']              = withdraw.method
  withdraw_message['Currency']            = withdraw.currency
  withdraw_message['Amount']              = withdraw.amount
  withdraw_message['Data']                = json.loads(withdraw.data)
  withdraw_message['Created']             = withdraw.created
  withdraw_message['Status']              = withdraw.status
  withdraw_message['ReasonID']            = withdraw.reason_id
  withdraw_message['Reason']              = withdraw.reason
  withdraw_message['PercentFee']          = float(withdraw.percent_fee)
  withdraw_message['FixedFee']            = withdraw.fixed_fee
  withdraw_message['PaidAmount']          = withdraw.paid_amount
  withdraw_message['ClOrdID']             = withdraw.client_order_id
  return withdraw_message

@login_required
@verify_permission
def processWithdrawConfirmationRequest(session, msg):
  reqId = msg.get('WithdrawReqID')
  token = msg.get('ConfirmationToken')


  withdraw_id = msg.get('WithdrawID')
  second_factor = msg.get('SecondFactor')

  if second_factor:
    withdraw_data = Withdraw.get_withdraw(TradeApplication.instance().db_session, withdraw_id)
    if not withdraw_data:
      raise InvalidParameter()

    if not session.user.check_second_factor(second_factor) or \
       not withdraw_data.confirm_using_second_factor(TradeApplication.instance().db_session):
      response = {'MsgType':'U25', 'WithdrawReqID': reqId, 'WithdrawID':withdraw_data.id, 'Status':withdraw_data.status}
      return json.dumps(response, cls=JsonEncoder)
  else:
    withdraw_data = Withdraw.user_confirm(TradeApplication.instance().db_session, token)
    if not withdraw_data:
      response = {'MsgType':'U25', 'WithdrawReqID': reqId, 'Status':'0'}
      return json.dumps(response, cls=JsonEncoder)

  TradeApplication.instance().db_session.commit()

  withdraw_refresh = withdrawRecordToWithdrawMessage(withdraw_data)
  withdraw_refresh['MsgType'] = 'U9'
  TradeApplication.instance().publish( withdraw_data.account_id, withdraw_refresh  )
  TradeApplication.instance().publish( withdraw_data.broker_id,  withdraw_refresh  )


  response_u25 = withdrawRecordToWithdrawMessage(withdraw_data)
  response_u25['MsgType'] = 'U25'
  response_u25['WithdrawReqID'] = reqId
  response_u25['WithdrawID'] = withdraw_data.id
  response_u25['Status'] = withdraw_data.status

  return json.dumps(response_u25, cls=JsonEncoder)


@login_required
@verify_permission
def processApiKeyListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  offset      = page * page_size

  user = session.user
  result_set = ApiAccess.get_list(TradeApplication.instance().db_session, user.broker_id, user.id, page_size, offset)
  result_list = []
  columns = ['APIKey', 'Label',  'IPWhiteList', 'PermissionList', 'Created', 'LastUsed' ]

  for rec in result_set:
    result_list.append( [
      rec.api_key,
      rec.label,
      json.loads(rec.ip_white_list),
      json.loads(rec.permission_list),
      rec.created,
      rec.last_used
    ])

  response_msg = {
    'MsgType'           : 'U51', # APIKeyListResponse
    'APIKeyListReqID'   : msg.get('APIKeyListReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'ApiKeyListGrp'     : result_list
  }
  return json.dumps(response_msg, cls=JsonEncoder)


@login_required
@verify_permission
def processApiKeyCreateRequest(session, msg):
  label           = msg.get('Label')
  permission_list = msg.get('PermissionList', {})
  ip_white_list   = msg.get('IPWhiteList', [])
  revocable       = msg.get('Revocable', True)

  # remove all permissions that are now allowed for API
  if '*' in permission_list:
    raise NotAuthorizedError()
  if 'B' in permission_list:# News
    raise NotAuthorizedError()
  if 'BE' in permission_list: # User Request
    raise NotAuthorizedError()
  if 'C' in permission_list: # Email
    raise NotAuthorizedError()
  if 'U0'  in permission_list: # Signup
    raise NotAuthorizedError()
  if 'U10' in permission_list: # ResetPasswordRequest
    raise NotAuthorizedError()
  if 'U12' in permission_list: # ResetPasswordRequest
    raise NotAuthorizedError()
  if 'U16' in permission_list: # EnableDisableTwoFactorAuthenticationRequest
    raise NotAuthorizedError()
  if 'U38' in permission_list: # UpdateProfile
    raise NotAuthorizedError()
  if 'U44' in permission_list: # ConfirmTrustedAddressRequest
    raise NotAuthorizedError()
  if 'U46' in permission_list: # SuggestTrustedAddressPublish
    raise NotAuthorizedError()
  if 'U50' in permission_list: # ApiKeyListRequest
    raise NotAuthorizedError()
  if 'U52' in permission_list: # ApiKeyCreateRequest
    raise NotAuthorizedError()
  if 'U54' in permission_list: # ApiKeyRevokeRequest
    raise NotAuthorizedError()

  api_access, api_raw_password = ApiAccess.create(TradeApplication.instance().db_session,
                                                  session.user,
                                                  label,
                                                  permission_list,
                                                  ip_white_list,
                                                  revocable)

  response_msg = {
    'MsgType'           : 'U53', # APIKeyCreateResponse
    'APIKeyCreateReqID' : msg.get('APIKeyCreateReqID'),
    'Label'             : api_access.label,
    'APIKey'            : api_access.api_key,
    'APISecret'         : api_access.api_secret,
    'APIPassword'       : api_raw_password,
    'PermissionList'    : json.dumps(api_access.permission_list),
    'IPWhiteList'       : json.dumps(api_access.ip_white_list),
    'Status'            : api_access.status,
    'Revocable'         : api_access.revocable,
    'Created'           : api_access.created,
    'LastUsed'          : api_access.last_used
    }
  return json.dumps(response_msg, cls=JsonEncoder)


@login_required
@verify_permission
def processApiKeyRevokeRequest(session, msg):
  api_key           = msg.get('APIKey')

  api_access = ApiAccess.get_api_access_by_api_key(TradeApplication.instance().db_session, api_key)
  if not api_access:
    raise InvalidApiKeyError()

  if api_access.user_id != session.user.id or api_access.broker_id != session.user.broker_id:
    raise NotAuthorizedError()

  if not api_access.revocable:
    raise ApiKeyIsNotRevocableError()

  api_access.revoke(TradeApplication.instance().db_session)

  response_msg = {
    'MsgType'           : 'U55', # APIKeyRevoke Response
    'APIKeyRevokeReqID' : msg.get('APIKeyRevokeReqID'),
    'APIKey'            : api_access.api_key,
    'Status'            : api_access.status
  }
  return json.dumps(response_msg, cls=JsonEncoder)

@login_required
@verify_permission
def processWithdrawListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['1', '2'] )
  filter      = msg.get('Filter',[])
  offset      = page * page_size

  user = session.user
  if msg.has('ClientID') and int(msg.get('ClientID')) != session.user.id :
    user = User.get_user(TradeApplication.instance().db_session, session.user.id, user_id= int(msg.get('ClientID')) )
    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()
    if not user:
      raise NotAuthorizedError()

  if user.is_broker:
    if msg.has('ClientID'):
      withdraws = Withdraw.get_list(TradeApplication.instance().db_session, user.id, int(msg.get('ClientID')), status_list, page_size, offset, filter  )
    else:
      withdraws = Withdraw.get_list(TradeApplication.instance().db_session, user.id, None, status_list, page_size, offset, filter  )
  else:
    withdraws = Withdraw.get_list(TradeApplication.instance().db_session, user.broker_id, user.id, status_list, page_size, offset, filter  )

  withdraw_list = []
  columns = [ 'WithdrawID'   , 'Method'   , 'Currency'     , 'Amount' , 'Data',
              'Created'      , 'Status'   , 'ReasonID'     , 'Reason' , 'PercentFee',
              'FixedFee'     , 'PaidAmount', 'UserID'      , 'Username', 'BrokerID' ,
              'ClOrdID']

  for withdraw in withdraws:
    withdraw_list.append( [
      withdraw.id,
      withdraw.method,
      withdraw.currency,
      withdraw.amount,
      json.loads(withdraw.data),
      withdraw.created,
      withdraw.status,
      withdraw.reason_id,
      withdraw.reason,
      float(withdraw.percent_fee),
      withdraw.fixed_fee,
      withdraw.paid_amount,
      withdraw.user_id,
      withdraw.username if session.has_access_to_account_info() else 'hidden',
      withdraw.broker_id,
      withdraw.client_order_id
    ])

  response_msg = {
    'MsgType'           : 'U27', # WithdrawListResponse
    'WithdrawListReqID' : msg.get('WithdrawListReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'WithdrawListGrp'   : withdraw_list
  }
  return json.dumps(response_msg, cls=JsonEncoder)

def processBrokerListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['1'] )
  country     = msg.get('Country', None)
  offset      = page * page_size

  brokers = Broker.get_list(TradeApplication.instance().db_session, status_list, country, page_size, offset)

  broker_list = []
  columns = [ 'BrokerID'        , 'ShortName'      , 'BusinessName'      , 'Address'            , 'City', 'State'     ,
              'ZipCode'         , 'Country'        , 'PhoneNumber1'      , 'PhoneNumber2'       , 'Skype'             ,
              'Currencies'      , 'TosUrl'         , 'FeeStructure'      , 'TransactionFeeBuy'  , 'TransactionFeeSell',
              'Status'          , 'ranking'        , 'Email'             , 'CountryCode'        , 'CryptoCurrencies'  ,
              'WithdrawStructure','SupportURL'     , 'SignupLabel'       , 'AcceptCustomersFrom', 'IsBrokerHub']

  if session.user and session.user.is_system:
    columns.extend(['MandrillApiKey', 'MailerFromName', 'MailerFromEmail', 'MailerSignature', 'MailchimpListID'])

  for broker in brokers:
    broker_data = [
      broker.id                   ,
      broker.short_name           ,
      broker.business_name        ,
      broker.address              ,
      broker.city                 ,
      broker.state                ,
      broker.zip_code             ,
      broker.country              ,
      broker.phone_number_1       ,
      broker.phone_number_2       ,
      broker.skype                ,
      broker.currencies           ,
      broker.tos_url              ,
      json.loads(broker.fee_structure),
      broker.transaction_fee_buy  ,
      broker.transaction_fee_sell ,
      broker.status               ,
      broker.ranking              ,
      broker.email                ,
      broker.country_code         ,
      json.loads(broker.crypto_currencies),
      json.loads(broker.withdraw_structure),
      broker.support_url          ,
      broker.signup_label         ,
      json.loads(broker.accept_customers_from),
      broker.is_broker_hub
    ]
    if session.user and session.user.is_system:
      broker_data.extend([ broker.mandrill_api_key, broker.mailer_from_name, broker.mailer_from_email,
                           broker.mailer_signature, broker.mailchimp_list_id ])

    broker_list.append(broker_data)

  response_msg = {
    'MsgType'           : 'U29',
    'BrokerListReqID'   : msg.get('BrokerListReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'BrokerListGrp'     : broker_list
  }
  return json.dumps(response_msg, cls=JsonEncoder)

@login_required
@staff_user_required
def processRequestDatabaseQuery(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  columns     = msg.get('Columns', [])
  table       = msg.get('Table', '')
  sort_column = msg.get('Sort', '')
  sort_order  = msg.get('SortOrder', 'ASC')
  offset      = page * page_size

  # TODO: Check all parameters to avoid an sql injection :(

  # This is definitively not secure, but this code will only run with inside a system account.
  raw_sql = 'SELECT '
  raw_sql += ','.join(columns)
  raw_sql += ' FROM ' + table

  if sort_column:
    raw_sql += ' ORDER BY ' + sort_column + ' ' + sort_order

  raw_sql += ' LIMIT ' + str(page_size)
  raw_sql += ' OFFSET ' + str(offset)


  result_set = TradeApplication.instance().db_session.execute(raw_sql)
  result = {
    'MsgType' : 'A1',
    'Page': page,
    'PageSize': page_size,
    'Table': table,
    'Columns': columns,
    'ResultSet': [ [ l for l in res ] for res in  result_set ]
  }
  return json.dumps(result, cls=JsonEncoder)

@login_required
@broker_user_required
@verify_permission
def processCustomerListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', [0, 1, 2, 3, 4, 5] )
  country     = msg.get('Country', None)
  state       = msg.get('State', None)
  client_id   = msg.get('ClientID', None)
  sort_column = msg.get('Sort', None)
  sort_order  = msg.get('SortOrder', 'ASC')
  offset      = page * page_size

  if client_id:
    if len(client_id) == 1:
      client_id = client_id[0]

  user_list = User.get_list(TradeApplication.instance().db_session, session.user.id ,status_list, country, state, client_id, page_size, offset, sort_column, sort_order)

  result_set = []
  columns = [ 'ID'              , 'Username'       , 'Email'             , 'State'              , 'CountryCode'     ,
              'Created'         , 'LastLogin'      , 'Verified'          , 'VerificationData'   , 'TwoFactorEnabled',
              'TransactionFeeBuy', 'TransactionFeeSell', 'NeedWithdrawEmail', 'DepositPercentFee', 'DepositFixedFee',
              'WithdrawPercentFee', 'WithdrawFixedFee', 'IsMarketMaker'  , 'IsMSB'              , 'TrustLevel']

  for entity in user_list:
    result_set.append([
      entity.id                   ,
      entity.username             ,
      entity.email                ,
      entity.state                ,
      entity.country_code         ,
      entity.created              ,
      entity.last_login           ,
      entity.verified             ,
      entity.verification_data    ,
      entity.two_factor_enabled   ,
      entity.transaction_fee_buy  ,
      entity.transaction_fee_sell ,
      entity.withdraw_email_validation,
      entity.deposit_percent_fee  ,
      entity.deposit_fixed_fee    ,
      entity.withdraw_percent_fee ,
      entity.withdraw_fixed_fee   ,
      entity.is_market_maker      ,
      entity.is_msb               ,
      entity.trust_level
    ])


  response_msg = {
    'MsgType'           : 'B3',
    'CustomerListReqID' : msg.get('CustomerListReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'CustomerListGrp'   : result_set
  }
  return json.dumps(response_msg, cls=JsonEncoder)

@login_required
@broker_user_required
@verify_permission
def processCustomerDetailRequest(session, msg):
  client = None
  if msg.get('ClientID').isdigit():
    client = User.get_user( TradeApplication.instance().db_session, session.user.id ,user_id= int(msg.get('ClientID') ))

  if not client:
    client = User.get_user(TradeApplication.instance().db_session, session.user.id, username= msg.get('ClientID'))

  if not client:
    client = User.get_user(TradeApplication.instance().db_session, session.user.id ,email= msg.get('ClientID'))

  if not client:
    return

  if client.broker_id != session.user.id:
    raise NotAuthorizedError()

  response_msg = {
    'MsgType'           : 'B5',
    'CustomerReqID'     : msg.get('CustomerReqID'),
    'Username'          : client.username
  }
  return json.dumps(response_msg, cls=JsonEncoder)

def processVerifyCustomer(session, msg):
  broker_id = msg.get('BrokerID')
  verify = msg.get('Verify')
  if verify == 0 or verify >= 2:
    if session.user is None :
      raise NotAuthorizedError()

    if session.user is None or session.user.is_broker == False:
      raise NotAuthorizedError()

    broker_id = session.user.id

  client = User.get_user( TradeApplication.instance().db_session, broker_id, user_id= msg.get('ClientID') )
  if not client:
    raise NotAuthorizedError()

  if client.broker_id != broker_id:
    raise NotAuthorizedError()

  broker = Broker.get_broker(TradeApplication.instance().db_session, broker_id)
  broker_accounts  = json.loads(broker.accounts)
  bonus_account = None
  if 'bonus' in broker_accounts :
    bonus_account = broker_accounts['bonus']

  verification_data =  msg.get('VerificationData')
  if verification_data:
    try:
      verification_data = json.loads(verification_data)
    except :
      verification_data = { "data": verification_data}

  client.set_verified(TradeApplication.instance().db_session, msg.get('Verify'), verification_data , bonus_account)

  TradeApplication.instance().db_session.commit()

  response_msg = {
    'MsgType'             : 'B9',
    'VerifyCustomerReqID' : msg.get('VerifyCustomerReqID'),
    'ClientID'            : msg.get('ClientID'),
    'BrokerID'            : msg.get('BrokerID'),
    'Username'            : client.username,
    'Verified'            : client.verified,
    'VerificationData'    : client.verification_data
  }
  return json.dumps(response_msg, cls=JsonEncoder)

@login_required
@broker_user_required
@verify_permission
def processProcessWithdraw(session, msg):
  withdraw = Withdraw.get_withdraw(TradeApplication.instance().db_session, msg.get('WithdrawID'))

  if withdraw.broker_id != session.user.id:
    raise  NotAuthorizedError()

  result = False
  if msg.get('Action') == 'CANCEL':
    if withdraw.status == '4' or withdraw == '8':
      raise NotAuthorizedError()  # trying to cancel a completed operation or a cancelled operation

    broker_fees_account = session.user_accounts['fees']
    result = withdraw.cancel( TradeApplication.instance().db_session, msg.get('ReasonID'), msg.get('Reason'),broker_fees_account )
  elif msg.get('Action') == 'PROGRESS':
    data        = msg.get('Data')
    percent_fee = msg.get('PercentFee',0.)
    fixed_fee   = msg.get('FixedFee',0.)

    if percent_fee > float(withdraw.percent_fee):
      raise NotAuthorizedError() # Broker tried to raise their fees manually

    if fixed_fee > float(withdraw.fixed_fee):
      raise NotAuthorizedError() # Broker tried to raise their fees manually

    broker_fees_account = session.user_accounts['fees']

    result = withdraw.set_in_progress( TradeApplication.instance().db_session, percent_fee, fixed_fee, data, broker_fees_account)
  elif msg.get('Action') == 'COMPLETE':
    data        = msg.get('Data')

    broker_fees_account = session.user_accounts['fees']

    result = withdraw.set_as_complete( TradeApplication.instance().db_session, data, broker_fees_account)

  TradeApplication.instance().db_session.commit()

  if result:
    withdraw_refresh = withdrawRecordToWithdrawMessage(withdraw)
    withdraw_refresh['MsgType'] = 'U9'
    TradeApplication.instance().publish( withdraw.account_id, withdraw_refresh  )
    TradeApplication.instance().publish( withdraw.broker_id,  withdraw_refresh  )

  response_msg = {
    'MsgType'             : 'B7',
    'ProcessWithdrawReqID': msg.get('ProcessWithdrawReqID'),
    'WithdrawID'          : msg.get('WithdrawID'),
    'Result'              : result,
    'Status'              : withdraw.status,
    'ReasonID'            : withdraw.reason_id,
    'Reason'              : withdraw.reason
  }
  return json.dumps(response_msg, cls=JsonEncoder)

def processProcessDeposit(session, msg):
  secret       = msg.get('Secret')
  data         = msg.get('Data')

  instruction_msg_after_deposit = None
  deposit = None

  if not secret:
    deposit_id   = msg.get('DepositID')
    deposit = Deposit.get_deposit(TradeApplication.instance().db_session, deposit_id=deposit_id)

    if session.user is None or session.user.is_broker == False:
      if msg.get('Action') != 'CONFIRM':
        raise NotAuthorizedError()

    else:
      if deposit.broker_id != session.user.id:
        raise NotAuthorizedError()
  else:
    amount          = int(msg.get('Amount'))
    deposit_list = Deposit.get_deposit_list_by_secret(TradeApplication.instance().db_session, secret)
    found_deposit_by_secret = False
    for deposit in deposit_list:

      if deposit.status == '0':
        found_deposit_by_secret = True
        break  # get the first deposit that hasn't been confirmed yet

      if deposit.match_deposit_data(TradeApplication.instance().db_session, amount, data):
        found_deposit_by_secret = True
        break

    if not found_deposit_by_secret and deposit is not None:
      # we found deposits using the same secret, but with different data.
      # this means that the user reused the deposit address. Let's create another
      # deposit record based on the last deposit we found and process it.

      # ONLY VERIFIED USERS CAN REUSE THE SAME ADDRESS.
      user = User.get_user(TradeApplication.instance().db_session,
                           broker_id=deposit.broker_id,
                           user_id=deposit.user_id)
      deposit_data = json.loads(deposit.data)

      instructions = None
      if deposit.instructions:
        instructions = json.loads(deposit.instructions)

      if user.verified >= 3:
        deposit = Deposit.create_crypto_currency_deposit(
          session = TradeApplication.instance().db_session,
          user = user,
          currency = deposit.currency,
          input_address = deposit_data['InputAddress'],
          destination = deposit_data['Destination'],
          secret = deposit.secret,
          client_order_id = deposit.client_order_id,
          instructions=instructions,
          value=amount
        )
        deposit_refresh = depositRecordToDepositMessage(deposit)
        deposit_refresh['MsgType'] = 'U23'
        deposit_refresh['DepositReqID'] = msg.get('ProcessDepositReqID')
        TradeApplication.instance().publish( deposit.account_id, deposit_refresh  )
        TradeApplication.instance().publish( deposit.broker_id,  deposit_refresh  )
      else:
        deposit = None



  if not deposit:
    return  json.dumps( { 'MsgType' : 'B1',
                          'ProcessDepositReqID':msg.get('ProcessDepositReqID') ,
                          'ReasonID':'-1'} , cls=JsonEncoder)

  if msg.get('Action') == 'CONFIRM':
    deposit.user_confirm(TradeApplication.instance().db_session, data )
  elif msg.get('Action') == 'CANCEL':
    deposit.cancel( TradeApplication.instance().db_session, msg.get('ReasonID'), msg.get('Reason') )
  elif msg.get('Action') == 'PROGRESS':
    deposit.set_in_progress(TradeApplication.instance().db_session, data)
  elif msg.get('Action') == 'COMPLETE':
    amount          = int(msg.get('Amount'))
    percent_fee     = msg.get('PercentFee', 0.)
    fixed_fee       = msg.get('FixedFee', 0)

    if percent_fee > deposit.percent_fee:
      raise NotAuthorizedError() # Broker tried to raise their  fees manually

    if fixed_fee > deposit.fixed_fee:
      raise NotAuthorizedError() # Broker tried to raise their  fees manually

    instruction_msg_after_deposit = deposit.process_confirmation(TradeApplication.instance().db_session,
                                                                 amount,
                                                                 percent_fee,
                                                                 fixed_fee,
                                                                 data)

  TradeApplication.instance().db_session.commit()

  if instruction_msg_after_deposit:
    msg = JsonMessage( json.dumps(instruction_msg_after_deposit) )

    if session.user:
      session.process_message(msg)
    else:
      user = User.get_user( TradeApplication.instance().db_session, deposit.broker_id, user_id=deposit.user_id)
      session.set_user(user, {'*':[]})
      session.process_message(msg)
      session.set_user(None, None)


  deposit_refresh = depositRecordToDepositMessage(deposit)
  deposit_refresh['MsgType'] = 'U23'
  deposit_refresh['DepositReqID'] = msg.get('DepositReqID')
  TradeApplication.instance().publish( deposit.account_id, deposit_refresh  )
  TradeApplication.instance().publish( deposit.broker_id,  deposit_refresh  )


  result = depositRecordToDepositMessage(deposit)
  result['MsgType'] =  'B1'
  result['ProcessDepositReqID'] = msg.get('ProcessDepositReqID')
  return json.dumps(result, cls=JsonEncoder)

@login_required
@verify_permission
def processLedgerListRequest(session, msg):
  page            = msg.get('Page', 0)
  page_size       = msg.get('PageSize', 100)
  currency        = msg.get('Currency')
  filter          = msg.get('Filter',[])
  offset          = page * page_size

  user = session.user

  broker_id       = user.broker_id
  account_id      = user.id

  if user.is_broker:
    if msg.has('ClientID'):
      account_id = int(msg.get('ClientID'))
    else:
      account_id = None

    if msg.has('BrokerID'):
      if int(msg.get('BrokerID')) != user.id and int(msg.get('BrokerID')) != user.broker_id:
        raise  NotAuthorizedError()
      broker_id = int(msg.get('BrokerID'))


  records = Ledger.get_list(TradeApplication.instance().db_session,
                            broker_id,
                            account_id,
                            page_size,
                            offset,
                            currency,
                            filter  )

  record_list = []
  columns = [ 'LedgerID',       'Currency',     'Operation',
              'AccountID',      'BrokerID',     'PayeeID',
              'PayeeBrokerID',  'Amount',       'Balance',
              'Reference',      'Created',      'Description',
              'AccountName']

  if user.is_broker:
    columns.append('PayeeName')

  for rec in records:
    data = [
      rec.id,
      rec.currency,
      rec.operation,
      rec.account_id,
      rec.broker_id,
      rec.payee_id,
      rec.payee_broker_id,
      rec.amount,
      rec.balance,
      rec.reference,
      rec.created,
      rec.description,
      rec.account_name if session.has_access_to_account_info() else 'hidden'
    ]
    if user.is_broker:
      data.append(rec.payee_name)

    record_list.append(data)

  response_msg = {
    'MsgType'           : 'U35', # LedgerListResponse
    'LedgerListReqID'   : msg.get('LedgerListReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'LedgerListGrp'     : record_list
  }
  return json.dumps(response_msg, cls=JsonEncoder)

@login_required
@verify_permission
def processDepositListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['0', '1', '2', '4', '8'] )
  filter      = msg.get('Filter',[])


  offset      = page * page_size

  user = session.user

  if user.is_broker:
    if msg.has('ClientID'):
      deposits = Deposit.get_list(TradeApplication.instance().db_session, user.id, int(msg.get('ClientID')), status_list, page_size, offset, filter  )
    else:
      deposits = Deposit.get_list(TradeApplication.instance().db_session, user.id, None, status_list, page_size, offset, filter  )
  else:
    deposits = Deposit.get_list(TradeApplication.instance().db_session, user.broker_id, user.id, status_list, page_size, offset, filter  )


  deposit_list = []
  columns = [ 'DepositID'    , 'DepositMethodID', 'DepositMethodName' ,
              'Type'         , 'Currency'       , 'Value'             ,
              'PaidValue'    , 'Data'           , 'Created'           ,
              'ControlNumber', 'PercentFee'     , 'FixedFee'          ,
              'Status'       , 'ReasonID'       , 'Reason'            ,
              'Username'     , 'UserID'         , 'BrokerID'          ,
              'ClOrdID']

  for deposit in deposits:
    deposit_list.append( [
      deposit.id,
      deposit.deposit_option_id,
      deposit.deposit_option_name,
      deposit.type,
      deposit.currency,
      deposit.value,
      deposit.paid_value,
      json.loads(deposit.data),
      deposit.created,
      deposit.broker_deposit_ctrl_num,
      float(deposit.percent_fee),
      deposit.fixed_fee,
      deposit.status,
      deposit.reason_id,
      deposit.reason,
      deposit.username if session.has_access_to_account_info() else 'hidden',
      deposit.user_id,
      deposit.broker_id,
      deposit.client_order_id
    ])

  response_msg = {
    'MsgType'           : 'U31', # DepositListResponse
    'DepositListReqID'  : msg.get('DepositListReqID'),
    'Page'              : page,
    'PageSize'          : page_size,
    'Columns'           : columns,
    'DepositListGrp'    : deposit_list
  }
  return json.dumps(response_msg, cls=JsonEncoder)

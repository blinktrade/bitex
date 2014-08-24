# -*- coding: utf-8 -*-

import datetime
from bitex.message import JsonMessage
from bitex.json_encoder import  JsonEncoder
from copy import deepcopy

import json

from models import  User, Order, UserPasswordReset, Deposit, DepositMethods, \
  NeedSecondFactorException, UserAlreadyExistsException, BrokerDoesNotExistsException, \
  Withdraw, Broker, Instrument, Currency, Balance, Ledger

from execution import OrderMatcher

from decorators import *

from trade_application import application

def processTestRequest(session, msg):
  return json.dumps({
    "MsgType":"0",
    "TestReqID": msg.get("TestReqID")
  }, cls=JsonEncoder)


@login_required
def processChangePassword(session, msg):
  # Authenticate the user
  need_second_factor = False
  user = None
  try:
    user = User.authenticate(application.db_session,
                             msg.get('Username'),
                             msg.get('Password'),
                             msg.get('SecondFactor'))
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

def getProfileMessage(user, profile=None):
  if not profile:
    if user.is_broker:
      profile = Broker.get_broker( application.db_session,user.id)
    else:
      profile = user

  if user.is_broker:
    profile_message = {
      'Type'               : 'BROKER',
      'Username'           : user.username                ,
      'Verified'           : user.verified                ,
      'VerificationData'   : user.verification_data       ,
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
      'CryptoCurrencies'   : json.loads(profile.crypto_currencies)
    }
  else:
    profile_message = {
      'Type'               : 'USER',
      'UserID'             : user.id,
      'Username'           : user.username,
      'Email'              : profile.email,
      'State'              : profile.state,
      'Country'            : profile.country_code,
      'Verified'           : profile.verified,
      'VerificationData'   : profile.verification_data,
      'TwoFactorEnabled'   : profile.two_factor_enabled,
      'NeedWithdrawEmail'  : profile.withdraw_email_validation,
      }
  return profile_message

def processLogin(session, msg):
  # Authenticate the user
  need_second_factor = False
  try:
    user = User.authenticate(application.db_session,
                             msg.get('Username'),
                             msg.get('Password'),
                             msg.get('SecondFactor'))
    session.set_user(user)
  except NeedSecondFactorException:
    need_second_factor = True


  if not session.user:
    login_response = {
      'MsgType':          'BF',
      'UserReqID':        msg.get('UserReqID'),
      'Username':         '',
      'UserStatus':       3,
      'NeedSecondFactor': need_second_factor,
      'UserStatusText':   'MSG_LOGIN_ERROR_INVALID_USERNAME_OR_PASSWORD' if not need_second_factor else 'MSG_LOGIN_ERROR_INVALID_SECOND_STEP'
    }
    application.db_session.rollback()
    session.should_end = True
    return json.dumps(login_response, cls=JsonEncoder)

  application.db_session.add(session.user)
  application.db_session.commit()

  # Send the login response
  login_response = {
    'MsgType'            : 'BF',
    'UserReqID'          : msg.get('UserReqID'),
    'UserID'             : session.user.id,
    'Username'           : session.user.username,
    'TwoFactorEnabled'   : session.user.two_factor_enabled,
    'UserStatus'         : 1,
    'IsBroker'           : session.user.is_broker,
    'BrokerID'           : session.broker.id,
    'TransactionFeeBuy'  : session.user.transaction_fee_buy,
    'TransactionFeeSell' : session.user.transaction_fee_sell,
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
        'Validation'         : session.broker.validation           ,
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
    'Profile': getProfileMessage(session.user, session.profile)
  }
  return json.dumps(login_response, cls=JsonEncoder)

@login_required
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

  account_id = session.user.account_id
  account_user = session.user
  broker_user = account_user.broker

  if session.user.is_broker:
    if msg.has('ClientID'):  # it is broker sending an order on behalf of it's client
      client = None
      if msg.get('ClientID').isdigit():
        client = User.get_user( application.db_session, user_id= int(msg.get('ClientID')))

      if not client:
        client = User.get_user(application.db_session, username= msg.get('ClientID'))

      if not client:
        client = User.get_user(application.db_session, email= msg.get('ClientID'))

      if not client:
        if application.options.satoshi_mode:
          client, broker = User.signup(application.db_session,
                                      msg.get('ClientID'),
                                      msg.get('ClientID') + '@' + session.user.username + '.com',
                                      'abc12345',
                                      '',
                                      session.user.country_code,
                                      session.user.id)

          Ledger.transfer(application.db_session,
                          client.broker_id,            # from_account_id
                          client.broker_username,      # from_account_name
                          client.broker_id,            # from_broker_id
                          client.broker_username,      # from_broker_name
                          client.id,                   # to_account_id
                          client.username,             # to_account_name
                          client.broker_id,            # to_broker_id
                          client.broker_username,      # to_broker_name
                          'BTC',                       # currency
                          100e8,                       # amount
                          str(client.id),              # reference
                          'B'                          # descriptions
          )

          Ledger.transfer(application.db_session,
                          client.broker_id,            # from_account_id
                          client.broker_username,      # from_account_name
                          client.broker_id,            # from_broker_id
                          client.broker_username,      # from_broker_name
                          client.id,                   # to_account_id
                          client.username,             # to_account_name
                          client.broker_id,            # to_broker_id
                          client.broker_username,      # to_broker_name
                          'USD',                       # currency
                          60000e8,                     # amount
                          str(client.id),              # reference
                          'B'                          # descriptions
          )
        else:
          raise InvalidClientIDError()


      account_user = client
      account_id   = client.account_id
      broker_user  = account_user.broker

  if not broker_user:
    raise NotAuthorizedError()

  fee = 0
  if msg.get('Side') in ('1', '3'): # Buy or Buy Minus ( To be implemented )
    fee = broker_user.transaction_fee_buy
  else:
    fee = broker_user.transaction_fee_sell

  # process the new order.
  order = Order.create(application.db_session,
                       user_id          = session.user.id,
                       account_id       = msg.get('ClientID', account_id ),
                       user             = session.user,
                       username         = session.user.username,
                       account_user     = account_user,
                       account_username = account_user.username,
                       broker_user      = broker_user,
                       broker_username  = broker_user.username,
                       client_order_id  = msg.get('ClOrdID'),
                       symbol           = msg.get('Symbol'),
                       side             = msg.get('Side'),
                       type             = msg.get('OrdType'),
                       price            = msg.get('Price', 0),
                       order_qty        = msg.get('OrderQty'),
                       time_in_force    = msg.get('TimeInForce', '1'),
                       fee              = fee)
  application.db_session.flush() # just to assign an ID for the order.

  OrderMatcher.get(msg.get('Symbol')).match(application.db_session, order)
  application.db_session.commit()

  return ""

@login_required
def processCancelOrderRequest(session, msg):
  order_list = []
  if  msg.has('OrigClOrdID'):
    order = Order.get_order_by_client_order_id(application.db_session, ("0","1"), session.user.id,  msg.get('OrigClOrdID') )
    if order:
      order_list.append(order)
  elif msg.has('OrderID'):
    order = Order.get_order_by_order_id(application.db_session, ("0","1"),  msg.get('OrderID') )

    if order:
      if order.user_id == session.user.id:  # user/broker cancelling his own order
        order_list.append(order)
      elif order.account_id == session.user.id:  # user cancelling an order sent by his broker
        order_list.append(order)
      elif order.account_user.broker_id == session.user.id:  # broker cancelling an order sent by an user
        order_list.append(order)
  else:
    # user cancelling all the orders he sent.
    orders = Order.get_list_by_user_id( application.db_session, ("0","1"), session.user.id )
    for order in orders:
      order_list.append(order)

  for order in order_list:
    OrderMatcher.get( order.symbol ).cancel(application.db_session, order)
  application.db_session.commit()

  return ""


def convertCamelCase2Underscore(name):
  import re
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


@login_required
def processUpdateUserProfile(session, msg):
  fields  = msg.get('Fields',[])
  user_id = msg.get('UserID', session.user.id )
  user = User.get_user(application.db_session,  user_id=user_id)

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
    user_model_fields_writable = ['TransactionFeeBuy','TransactionFeeSell','WithdrawEmailValidation','VerificationData','VerificationData', 'TwoFactorEnabled']

  broker_profile = None
  if user.is_broker:
    broker_profile = Broker.get_broker(application.db_session, user_id)
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
                                       'WithdrawStructure','FeeStructure',
                                       'TransactionFeeBuy','TransactionFeeSell',
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

  application.db_session.commit()

  response_msg = {
    "MsgType":"U39",
    "UpdateReqID": msg.get("UpdateReqID"),
    "Profile": getProfileMessage(user, broker_profile)
  }

  profile_refresh_msg = deepcopy(response_msg )
  profile_refresh_msg['MsgType'] = 'U40'
  del profile_refresh_msg['UpdateReqID']
  application.publish(user_id, profile_refresh_msg )


  return json.dumps(response_msg, cls=JsonEncoder)

def processTradersRankRequest(session, msg):
  page            = msg.get('Page', 0)
  page_size       = msg.get('PageSize', 100)
  filter          = msg.get('Filter',[])
  offset          = page * page_size

  columns = [ 'Rank', 'Trader',  'Broker', 'Amount' ]

  traders_list = Balance.get_balances_by_rank( application.db_session )

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
  instruments =  Instrument.get_instruments(application.db_session, request_type)
  currencies = Currency.get_currencies(application.db_session)

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
      'FormatPython': currency.format_python,
      'FormatJS': currency.format_js,
      'HumanFormatPython': currency.human_format_python,
      'HumanFormatJS': currency.human_format_js
    })

  return json.dumps(response, cls=JsonEncoder)

def processSignup(session, msg):
  try:
    u, broker = User.signup(application.db_session,
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
    application.db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)
  except UserAlreadyExistsException:
    login_response = {
      'MsgType': 'BF',
      'UserReqID': msg.get('UserReqID'),
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': 'MSG_LOGIN_ERROR_USERNAME_ALREADY_TAKEN'
    }
    application.db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)
  except Exception, e:
    login_response = {
      'MsgType': 'BF',
      'UserReqID': msg.get('UserReqID'),
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': str(e)
    }
    application.db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)

  if application.options.test_mode:
    Ledger.transfer(application.db_session,
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
def processRequestForBalances(session, msg):
  user = session.user
  if msg.has('ClientID'):
    user = User.get_user(application.db_session,
                         user_id= int(msg.get('ClientID')) )

    if not user:
      raise NotAuthorizedError()

    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()


  balances = Balance.get_balances_by_account( application.db_session, user.account_id )
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
def processRequestForOpenOrders(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['0', '1'] )
  offset      = page * page_size

  if session.user.is_broker:
    orders = Order.get_list_by_user_id(application.db_session, status_list, session.user.id, page_size, offset)
  else:
    orders = Order.get_list_by_account_id(application.db_session, status_list, session.user.id, page_size, offset)

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
  user  = User.get_user( application.db_session, email = msg.get('Email') )
  success = 0
  if user:
    user.request_reset_password( application.db_session )
    application.db_session.commit()
    success = 1

  response = {
    'MsgType': 'U11',
    'ForgotPasswordReqID': msg.get('ForgotPasswordReqID'),
    'Success': success
  }
  return json.dumps(response, cls=JsonEncoder)

def processPasswordRequest(session, msg):
  if UserPasswordReset.change_user_password( application.db_session, msg.get('Token'), msg.get('NewPassword') ):
    response = {
      'MsgType': 'U13',
      'UserStatus': 1,
      'ResetPasswordReqID': msg.get('ResetPasswordReqID'),
      'UserStatusText': 'MSG_SUCCESS_PASSWORD_CHANGE'
    }

    application.db_session.commit()
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
def processEnableDisableTwoFactorAuth(session, msg):
  enable = msg.get('Enable')
  secret = msg.get('Secret')
  code   = msg.get('Code')

  user = session.user

  if msg.has('ClientID'):
    if enable:
      raise NotAuthorizedError()

    user = User.get_user(application.db_session, user_id= int(msg.get('ClientID')) )

    if not user:
      raise NotAuthorizedError()

    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()


  two_factor_secret = user.enable_two_factor(enable, secret, code)
  application.db_session.add(user)
  application.db_session.commit()

  response = {'MsgType'         : 'U17',
              'EnableTwoFactorReqID': msg.get('EnableTwoFactorReqID'),
              'TwoFactorEnabled': user.two_factor_enabled,
              'TwoFactorSecret' : two_factor_secret }
  return json.dumps(response, cls=JsonEncoder)

@login_required
def processRequestDepositMethods(session, msg):
  deposit_options = DepositMethods.get_list(application.db_session,session.user.broker_id )

  deposit_options_group = []

  for deposit_option in deposit_options:
    deposit_options_group.append( {
      'DepositMethodID': deposit_option.id,
      'Description': deposit_option.description,
      'Disclaimer': deposit_option.disclaimer,
      'Type': deposit_option.type,
      'Currency': deposit_option.currency,
      'PercentFee': deposit_option.percent_fee,
      'FixedFee': deposit_option.fixed_fee
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

  if session.user:
      verification_level = str(session.user.verified)
      deposit_validation = json.loads(session.broker.validation)

      if verification_level in deposit_validation and value != None:
          validations = deposit_validation[verification_level]

          valid = True
          if validations['enabled']:

              if value < validations['minDeposit']:
                  valid = False

              if value > validations['maxDeposit']:
                  valid = False

          else:
              valid = False

          if not valid:
              raise NotAuthorizedError()

  should_broadcast = False
  if deposit_option_id:
    if session.user is None :
      raise NotAuthorizedError()


    deposit_option = DepositMethods.get_deposit_method(application.db_session, deposit_option_id)
    if not deposit_option:
      response = {'MsgType':'U19', 'DepositID': -1 }
      return json.dumps(response, cls=JsonEncoder)

    deposit = deposit_option.generate_deposit(  application.db_session,
                                                session.user,
                                                value,
                                                client_order_id,
                                                instructions )
    application.db_session.commit()
    should_broadcast = True
  elif currency:
    deposit = Deposit.create_crypto_currency_deposit(application.db_session,
                                                     session.user,
                                                     currency,
                                                     input_address,
                                                     destination,
                                                     secret,
                                                     client_order_id,
                                                     instructions,
                                                     value)
    application.db_session.commit()
    should_broadcast = True

  else:
    deposit = Deposit.get_deposit(application.db_session, deposit_id)

  if not deposit:
    response = {'MsgType':'U19', 'DepositID': -1 }
    return json.dumps(response, cls=JsonEncoder)

  if should_broadcast:
    deposit_refresh = depositRecordToDepositMessage(deposit)
    deposit_refresh['MsgType'] = 'U23'
    deposit_refresh['DepositReqID'] = msg.get('DepositReqID')
    application.publish( deposit.account_id, deposit_refresh  )
    application.publish( deposit.broker_id,  deposit_refresh  )


  response_msg = depositRecordToDepositMessage(deposit)
  response_msg['MsgType'] = 'U19'
  response_msg['DepositReqID'] = msg.get('DepositReqID')
  return json.dumps(response_msg, cls=JsonEncoder)

def depositRecordToDepositMessage( deposit ):
  deposit_message = dict()
  deposit_message['DepositID']           = deposit.id
  deposit_message['UserID']              = deposit.user_id
  deposit_message['AccountID']           = deposit.account_id
  deposit_message['BrokerID']            = deposit.broker_id
  deposit_message['Username']            = deposit.username
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
  deposit_message['PercentFee']          = deposit.percent_fee
  deposit_message['FixedFee']            = deposit.fixed_fee
  deposit_message['ClOrdID']             = deposit.client_order_id
  return deposit_message

@login_required
def processWithdrawRequest(session, msg):
  reqId           = msg.get('WithdrawReqID')
  client_order_id = msg.get('ClOrdID')

  withdraw_record = Withdraw.create(application.db_session,
                                    session.user,
                                    session.broker,
                                    msg.get('Currency'),
                                    msg.get('Amount'),
                                    msg.get('Method'),
                                    msg.get('Data', {} ),
                                    client_order_id )

  application.db_session.commit()

  response = {
    'MsgType':            'U7',
    'WithdrawReqID':      reqId,
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
  withdraw_message['PercentFee']          = withdraw.percent_fee
  withdraw_message['FixedFee']            = withdraw.fixed_fee
  withdraw_message['PaidAmount']          = withdraw.paid_amount
  withdraw_message['ClOrdID']             = withdraw.client_order_id
  return withdraw_message

@login_required
def processWithdrawConfirmationRequest(session, msg):
  reqId = msg.get('WithdrawReqID')
  token = msg.get('ConfirmationToken')

  withdraw_data = Withdraw.user_confirm(application.db_session, token)
  if not withdraw_data:
    response = {'MsgType':'U25', 'WithdrawReqID': reqId}
    return json.dumps(response, cls=JsonEncoder)

  application.db_session.commit()

  withdraw_refresh = withdrawRecordToWithdrawMessage(withdraw_data)
  withdraw_refresh['MsgType'] = 'U9'
  application.publish( withdraw_data.account_id, withdraw_refresh  )
  application.publish( withdraw_data.broker_id,  withdraw_refresh  )


  response_u25 = withdrawRecordToWithdrawMessage(withdraw_data)
  response_u25['MsgType'] = 'U25'
  response_u25['WithdrawReqID'] = reqId
  response_u25['ConfirmationToken'] = withdraw_data.confirmation_token,

  return json.dumps(response_u25, cls=JsonEncoder)

@login_required
def processWithdrawListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['1', '2'] )
  filter      = msg.get('Filter',[])
  offset      = page * page_size

  user = session.user
  if msg.has('ClientID') and int(msg.get('ClientID')) != session.user.id :
    user = User.get_user(application.db_session, user_id= int(msg.get('ClientID')) )
    if user.broker_id  != session.user.id:
      raise NotAuthorizedError()
    if not user:
      raise NotAuthorizedError()

  if user.is_broker:
    if msg.has('ClientID'):
      withdraws = Withdraw.get_list(application.db_session, user.id, int(msg.get('ClientID')), status_list, page_size, offset, filter  )
    else:
      withdraws = Withdraw.get_list(application.db_session, user.id, None, status_list, page_size, offset, filter  )
  else:
    withdraws = Withdraw.get_list(application.db_session, user.broker_id, user.id, status_list, page_size, offset, filter  )

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
      withdraw.percent_fee,
      withdraw.fixed_fee,
      withdraw.paid_amount,
      withdraw.user_id,
      withdraw.username,
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

  brokers = Broker.get_list(application.db_session, status_list, country, page_size, offset)

  broker_list = []
  columns = [ 'BrokerID'        , 'ShortName'      , 'BusinessName'      , 'Address'            , 'City', 'State'     ,
              'ZipCode'         , 'Country'        , 'PhoneNumber1'      , 'PhoneNumber2'       , 'Skype'             ,
              'Currencies'      , 'TosUrl'         , 'FeeStructure'      , 'TransactionFeeBuy'  , 'TransactionFeeSell',
              'Status'          , 'ranking'        , 'Email'             , 'CountryCode'        , 'CryptoCurrencies'  ,
              'WithdrawStructure','SupportURL'     , 'SignupLabel'       , 'AcceptCustomersFrom', 'IsBrokerHub']

  for broker in brokers:
    broker_list.append( [
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
    ])

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


  result_set = application.db_session.execute(raw_sql)
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
def processCustomerListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', [0, 1, 2] )
  country     = msg.get('Country', None)
  state       = msg.get('State', None)
  client_id   = msg.get('ClientID', None)
  sort_column = msg.get('Sort', None)
  sort_order  = msg.get('SortOrder', 'ASC')
  offset      = page * page_size

  if client_id:
    if len(client_id) == 1:
      client_id = client_id[0]

  user_list = User.get_list(application.db_session, session.user.id ,status_list, country, state, client_id, page_size, offset, sort_column, sort_order)

  result_set = []
  columns = [ 'ID'              , 'Username'       , 'Email'             , 'State'              , 'CountryCode'     ,
              'Created'         , 'LastLogin'      , 'Verified'          , 'VerificationData'   , 'TwoFactorEnabled',
              'TransactionFeeBuy', 'TransactionFeeSell', 'NeedWithdrawEmail' ]

  for entity in user_list:
    result_set.append( [
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
      entity.withdraw_email_validation
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
def processCustomerDetailRequest(session, msg):
  client = None
  if msg.get('ClientID').isdigit():
    client = User.get_user( application.db_session, user_id= int(msg.get('ClientID') ))

  if not client:
    client = User.get_user(application.db_session, username= msg.get('ClientID'))

  if not client:
    client = User.get_user(application.db_session, email= msg.get('ClientID'))

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
  if verify == 0 or verify == 2:
    if session.user is None :
      raise NotAuthorizedError()
    if session.user is None or session.user.is_broker == False:
      raise NotAuthorizedError()
    broker_id = session.user.id

  client = User.get_user( application.db_session, user_id= msg.get('ClientID') )
  if not client:
    raise NotAuthorizedError()

  if client.broker_id != broker_id:
    raise NotAuthorizedError()

  client.set_verified(application.db_session, msg.get('Verify'), msg.get('VerificationData'))

  application.db_session.commit()

  response_msg = {
    'MsgType'             : 'B9',
    'VerifyCustomerReqID' : msg.get('VerifyCustomerReqID'),
    'ClientID'            : msg.get('ClientID'),
    'BrokerID'            : msg.get('BrokerID'),
    'Username'            : client.username,
    'Verified'            : client.verified,
    'VerificationData'    : msg.get('VerificationData')
  }
  return json.dumps(response_msg, cls=JsonEncoder)

@login_required
@broker_user_required
def processProcessWithdraw(session, msg):
  withdraw = Withdraw.get_withdraw(application.db_session, msg.get('WithdrawID'))

  if withdraw.broker_id != session.user.id:
    raise  NotAuthorizedError()

  if msg.get('Action') == 'CANCEL':
    if withdraw.status == '4' or withdraw == '8':
      raise NotAuthorizedError()  # trying to cancel a completed operation or a cancelled operation

    withdraw.cancel( application.db_session, msg.get('ReasonID'), msg.get('Reason') )
  elif msg.get('Action') == 'PROGRESS':
    percent_fee = msg.get('PercentFee',0.)
    fixed_fee   = msg.get('FixedFee',0.)

    if percent_fee > float(withdraw.percent_fee):
      raise NotAuthorizedError() # Broker tried to raise their fees manually

    if fixed_fee > float(withdraw.fixed_fee):
      raise NotAuthorizedError() # Broker tried to raise their fees manually

    withdraw.set_in_progress( application.db_session, percent_fee, fixed_fee)
  elif msg.get('Action') == 'COMPLETE':
    data        = msg.get('Data')

    withdraw.set_as_complete( application.db_session, data)

  application.db_session.commit()

  withdraw_refresh = withdrawRecordToWithdrawMessage(withdraw)
  withdraw_refresh['MsgType'] = 'U9'

  application.publish( withdraw.account_id, withdraw_refresh  )
  application.publish( withdraw.broker_id,  withdraw_refresh  )

  response_msg = {
    'MsgType'             : 'B7',
    'ProcessWithdrawReqID': msg.get('ProcessWithdrawReqID'),
    'WithdrawID'          : msg.get('WithdrawID'),
    'Status'              : withdraw.status,
    'ReasonID'            : withdraw.reason_id,
    'Reason'              : withdraw.reason
  }
  return json.dumps(response_msg, cls=JsonEncoder)

def processProcessDeposit(session, msg):
  secret       = msg.get('Secret')
  instruction_msg_after_deposit = None

  if not secret:
    deposit_id   = msg.get('DepositID')
    deposit = Deposit.get_deposit(application.db_session, deposit_id=deposit_id)

    if session.user is None or session.user.is_broker == False:
      if msg.get('Action') != 'CONFIRM':
        raise NotAuthorizedError()

    else:
      if deposit.broker_id != session.user.id:
        raise NotAuthorizedError()
  else:
    deposit = Deposit.get_deposit( application.db_session, secret=secret)

  if not deposit:
    return  json.dumps( { 'MsgType' : 'B1',
                          'ProcessDepositReqID':msg.get('ProcessDepositReqID') ,
                          'ReasonID':'-1'} , cls=JsonEncoder)

  if msg.get('Action') == 'CONFIRM':
    data        = msg.get('Data')
    deposit.user_confirm(application.db_session, data )
  if msg.get('Action') == 'CANCEL':
    deposit.cancel( application.db_session, msg.get('ReasonID'), msg.get('Reason') )
  elif msg.get('Action') == 'PROGRESS':
    data        = msg.get('Data')
    deposit.set_in_progress(application.db_session, data)
  elif msg.get('Action') == 'COMPLETE':
    amount          = int(msg.get('Amount'))
    data            = msg.get('Data')
    percent_fee     = msg.get('PercentFee', 0.)
    fixed_fee       = msg.get('FixedFee', 0)

    if percent_fee > deposit.percent_fee:
      raise NotAuthorizedError() # Broker tried to raise their  fees manually

    if fixed_fee > deposit.fixed_fee:
      raise NotAuthorizedError() # Broker tried to raise their  fees manually

    instruction_msg_after_deposit = deposit.process_confirmation(application.db_session,
                                                                 amount,
                                                                 percent_fee,
                                                                 fixed_fee,
                                                                 data)

  application.db_session.commit()

  if instruction_msg_after_deposit:
    msg = JsonMessage( json.dumps(instruction_msg_after_deposit) )

    if session.user:
      session.process_message(msg)
    else:
      session.set_user(User.get_user( application.db_session, user_id=deposit.user_id))
      session.process_message(msg)
      session.set_user(None)


  deposit_refresh = depositRecordToDepositMessage(deposit)
  deposit_refresh['MsgType'] = 'U23'
  deposit_refresh['DepositReqID'] = msg.get('DepositReqID')
  application.publish( deposit.account_id, deposit_refresh  )
  application.publish( deposit.broker_id,  deposit_refresh  )


  result = depositRecordToDepositMessage(deposit)
  result['MsgType'] =  'B1'
  result['ProcessDepositReqID'] = msg.get('ProcessDepositReqID')
  return json.dumps(result, cls=JsonEncoder)

@login_required
def processLedgerListRequest(session, msg):
  page            = msg.get('Page', 0)
  page_size       = msg.get('PageSize', 100)
  operation_list  = msg.get('OperationList', ['C', 'D'] )
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


  records = Ledger.get_list(application.db_session, broker_id, account_id, operation_list, page_size, offset, currency, filter  )

  record_list = []
  columns = [ 'LedgerID',       'Currency',     'Operation',
              'AccountID',      'BrokerID',     'PayeeID',
              'PayeeBrokerID',  'Amount',       'Balance',
              'Reference',      'Created',      'Description',
              'PayeeName',      'AccountName']

  for rec in records:
    record_list.append([
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
      rec.payee_name,
      rec.account_name
    ])

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
def processDepositListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['0', '1', '2', '4', '8'] )
  filter      = msg.get('Filter',[])


  offset      = page * page_size

  user = session.user

  if user.is_broker:
    if msg.has('ClientID'):
      deposits = Deposit.get_list(application.db_session, user.id, int(msg.get('ClientID')), status_list, page_size, offset, filter  )
    else:
      deposits = Deposit.get_list(application.db_session, user.id, None, status_list, page_size, offset, filter  )
  else:
    deposits = Deposit.get_list(application.db_session, user.broker_id, user.id, status_list, page_size, offset, filter  )


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
      deposit.percent_fee,
      deposit.fixed_fee,
      deposit.status,
      deposit.reason_id,
      deposit.reason,
      deposit.username,
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

# -*- coding: utf-8 -*-

import datetime
from bitex.message import JsonMessage
from bitex.json_encoder import  JsonEncoder


import json

from models import  User, BitcoinAddress, Order, UserPasswordReset, Boleto, BoletoOptions, NeedSecondFactorException

from execution import OrderMatcher

from decorators import login_required

from trade_application import application

def processTestRequest(session, msg):
  return json.dumps( {
    "MsgType":"0",
    "TestReqID": msg.get("TestReqID")
  }, cls=JsonEncoder)

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
      'Username':         '',
      'UserStatus':       3,
      'NeedSecondFactor': need_second_factor,
      'UserStatusText':   u'Nome de usuário ou senha inválidos' if not need_second_factor else u'Segundo fator de autenticação inválido'
    }
    application.db_session.rollback()
    session.should_end = True
    return json.dumps(login_response, cls=JsonEncoder)


  application.db_session.add(session.user)
  application.db_session.commit()

  session.user.publish_balance_update()

  # Send the login response
  login_response = {
    'MsgType':          'BF',
    'UserID':           session.user.id,
    'Username':         session.user.username,
    'TwoFactorEnabled': session.user.two_factor_enabled,
    'BtcAddress':       session.user.bitcoin_address,
    'UserStatus':       1
  }
  return json.dumps(login_response, cls=JsonEncoder)



@login_required
def processNewOrderSingle(session, msg):
  # process the new order.
  order = Order( user_id          = session.user.id,
                 account_id       = session.user.account_id,
                 user             = session.user,
                 username         = session.user.username,
                 client_order_id  = msg.get('ClOrdID'),
                 symbol           = msg.get('Symbol'),
                 side             = msg.get('Side'),
                 type             = msg.get('OrdType'),
                 price            = msg.get('Price'),
                 order_qty        = msg.get('OrderQty'))


  application.db_session.add( order)
  application.db_session.flush() # just to assign an ID for the order.

  OrderMatcher.get(msg.get('Symbol')).match(application.db_session, order)
  application.db_session.commit()

  return ""


@login_required
def processCancelOrderRequest(session, msg):
  order_list = []
  if  msg.has('OrigClOrdID'):
    order = application.db_session.query(Order).\
                                    filter(Order.status.in_(("0", "1"))).\
                                    filter_by( user_id = session.user.id ).\
                                    filter_by( client_order_id =  msg.get('OrigClOrdID')  ).first()
    if order:
      order_list.append(order)
  elif msg.has('OrderID'):
    order = application.db_session.query(Order).\
                                    filter(Order.status.in_(("0", "1"))).\
                                    filter_by( user_id = session.user.id ).\
                                    filter_by( id =  msg.get('OrderID')  ).first()
    if order:
      order_list.append(order)
  else:
    orders = application.db_session.query(Order).\
                                    filter(Order.status.in_(("0", "1"))).\
                                    filter_by( user_id = session.user.id )
    for order in orders:
      order_list.append(order)

  for order in order_list:
    OrderMatcher.get( order.symbol ).cancel(application.db_session, order)
  application.db_session.commit()

  return ""

def processSignup(session, msg):
  if User.get_user( application.db_session, msg.get('Username'), msg.get('Email')):
    login_response = {
      'MsgType': 'BF',
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': u'Nome de usuário ou Email já estão registrados!'
    }
    application.db_session.rollback()
    return login_response

  # signup the user
  # create the user on Database
  u = User( username            = msg.get('Username'),
            email               = msg.get('Email'),
            password            = msg.get('Password'),
            balance_btc         = 0,
            balance_ltc         = 0,
            balance_usd         = 0,
            balance_brl         = 0)

  application.db_session.add(u)
  application.db_session.commit()

  return processLogin(session, msg)

@login_required
def processRequestForBalances(session, msg):
  response = session.user.get_balance(msg.get('BalanceReqID'))
  return json.dumps(response, cls=JsonEncoder)

@login_required
def processRequestForOpenOrders(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['0', '1'] )
  offset      = page * page_size

  orders = application.db_session.query(Order).\
                                  filter(Order.status.in_( status_list )).\
                                  filter_by( user_id = session.user.id ).\
                                  order_by(Order.created.desc()).\
                                  limit( page_size ).offset( offset )

  order_list = []
  columns = [ 'ClOrdID','OrderID','CumQty','OrdStatus','LeavesQty','CxlQty','AvgPx',
              'Symbol', 'Side', 'OrdType', 'OrderQty', 'Price', 'OrderDate', 'Volume' ]

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
      order_total_value
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


@login_required
def processBTCWithdrawRequest(session, msg):
  pass

@login_required
def processBRLWithdrawRequest(session, msg):
  pass

def processRequestPasswordRequest(session, msg):
  user  = User.get_user( application.db_session, email = msg.get('Email') )
  if user:
    user.request_reset_password( application.db_session )
    application.db_session.commit()

def processPasswordRequest(session, msg):
  if UserPasswordReset.change_user_password( application.db_session, msg.get('Token'), msg.get('NewPassword') ):
    response = {
      'MsgType': 'U13',
      'UserStatus': 1,
      'UserStatusText': u'Senha alterada com sucesso!'
    }

    application.db_session.commit()
    return json.dumps(response, cls=JsonEncoder)
  else:
    response = {
      'MsgType': 'U13',
      'UserStatus': 3,
      'UserStatusText': u'Código de segurança inválido!'
    }
    return json.dumps(response, cls=JsonEncoder)

@login_required
def processEnableDisableTwoFactorAuth(session, msg):
  enable = msg.get('Enable')
  secret = msg.get('Secret')
  code   = msg.get('Code')
  two_factor_secret = session.user.enable_two_factor(enable, secret, code)

  application.db_session.add(session.user)
  application.db_session.commit()

  response = {'MsgType'         : 'U17',
              'TwoFactorEnabled': session.user.two_factor_enabled,
              'TwoFactorSecret' : two_factor_secret }
  return json.dumps(response, cls=JsonEncoder)

@login_required
def processGenerateBoleto(session, msg):
  boleto_option_id = msg.get('BoletoId')
  value            = msg.get('Value')

  boleto_option = application.db_session.query(BoletoOptions).filter_by(id=boleto_option_id).first()
  if not boleto_option:
    response = {'MsgType':'U19', 'BoletoId': 0 }
    return json.dumps(response, cls=JsonEncoder)

  boleto = boleto_option.generate_boleto(  application.db_session, session.user, value )
  application.db_session.commit()

  response = {'MsgType':'U19', 'BoletoId': boleto.id }
  return json.dumps(response, cls=JsonEncoder)

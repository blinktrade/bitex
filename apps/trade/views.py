# -*- coding: utf-8 -*-

import datetime
from bitex.message import JsonMessage
from bitex.json_encoder import  JsonEncoder


import json

from models import  User, BitcoinAddress, Order, UserPasswordReset, Boleto, BoletoOptions, \
  NeedSecondFactorException, Withdraw, Broker, Instrument, Currency, Balance, Ledger

from execution import OrderMatcher

from decorators import *

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

  # Send the login response
  login_response = {
    'MsgType':          'BF',
    'UserID':           session.user.id,
    'Username':         session.user.username,
    'TwoFactorEnabled': session.user.two_factor_enabled,
    'BtcAddress':       session.user.bitcoin_address,
    'UserStatus':       1,
    'IsBroker':         session.user.is_broker
  }
  return json.dumps(login_response, cls=JsonEncoder)

@login_required
def processNewOrderSingle(session, msg):
  from errors import NotAuthorizedError, InvalidClientIDError

  if msg.has('ClientID') and int(msg.get('ClientID')) != session.user.id and not session.user.is_broker:
    raise NotAuthorizedError()

  account_id = session.user.account_id
  account_user = session.user
  if session.user.is_broker:
    if msg.has('ClientID'):  # it is broker sending an order on behalf of it's client
      client = application.db_session.query(User).filter( User.id == int(msg.get('ClientID'))  ).first()
      if not client:
        raise InvalidClientIDError()
      account_user = client
      account_id   = client.account_id

  # process the new order.
  order = Order( user_id          = session.user.id,
                 account_id       = msg.get('ClientID', account_id ),
                 user             = session.user,
                 username         = session.user.username,
                 account_user     = account_user,
                 account_username = account_user.username,
                 broker_user      = session.broker,
                 broker_username  = session.broker.username,
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
                                    filter_by( id =  msg.get('OrderID')  ).first()
    if order:
      if order.user_id == session.user.id:  # user/broker cancelling his own order
        order_list.append(order)
      elif order.account_id == session.user.id:  # user cancelling an order sent by his broker
        order_list.append(order)
      elif order.account_user.broker_id == session.user.id:  # broker cancelling an order sent by an user
        order_list.append(order)
  else:
    # user cancelling all the orders he sent.
    orders = application.db_session.query(Order).\
                                    filter(Order.status.in_(("0", "1"))).\
                                    filter_by( user_id = session.user.id )
    for order in orders:
      order_list.append(order)

  for order in order_list:
    OrderMatcher.get( order.symbol ).cancel(application.db_session, order)
  application.db_session.commit()

  return ""

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
      'FormatJS': currency.format_js
    })

  return json.dumps(response, cls=JsonEncoder)

def processSignup(session, msg):
  if User.get_user( application.db_session, msg.get('Username'), msg.get('Email')):
    login_response = {
      'MsgType': 'BF',
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': u'Nome de usuário ou Email já estão registrados!'
    }
    application.db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)

  broker = application.db_session.query(Broker).filter( Broker.id == msg.get('BrokerID')  ).first()
  if not broker:
    login_response = {
      'MsgType': 'BF',
      'Username': '',
      'UserStatus': 3,
      'UserStatusText': u'Invalid broker!'
    }
    application.db_session.rollback()
    return json.dumps(login_response, cls=JsonEncoder)

  # signup the user
  # create the user on Database
  u = User( username            = msg.get('Username'),
            email               = msg.get('Email'),
            password            = msg.get('Password'),
            broker_id           = msg.get('BrokerID'))

  application.db_session.add(u)
  application.db_session.commit()

  return processLogin(session, msg)

@login_required
def processRequestForBalances(session, msg):
  balances = Balance.get_balances_by_account( application.db_session, session.user.account_id )
  response = { 'MsgType': 'U3', 'BalanceReqID': msg.get('BalanceReqID')  }
  for balance in balances:
    response[balance.currency ] = balance.balance
  return json.dumps(response, cls=JsonEncoder)

@login_required
def processRequestForOpenOrders(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['0', '1'] )
  offset      = page * page_size

  if session.user.is_broker:
    orders = application.db_session.query(Order).\
                                          filter(Order.status.in_( status_list )).\
                                          filter_by( user_id = session.user.id ).\
                                          order_by(Order.created.desc()).\
                                          limit( page_size ).offset( offset )

  else:
    orders = application.db_session.query(Order).\
                                          filter(Order.status.in_( status_list )).\
                                          filter_by( account_id = session.user.id ).\
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
def processRequestBoletoOptions(session, msg):
  boleto_options = application.db_session.query(BoletoOptions).filter_by(broker_id=session.user.broker_id)

  boleto_options_group = []

  for boleto_option in boleto_options:
    boleto_options_group.append( {
      'BoletoId': boleto_option.id,
      'Description': boleto_option.description
    } )

  response = {
    'MsgType':'U21',
    'BoletoOptionReqId': msg.get('BoletoOptionReqId'),
    'BoletoOptionGrp': boleto_options_group
  }

  return json.dumps(response, cls=JsonEncoder)

def processRequestBoleto(session, msg):
  boleto_id = msg.get('BoletoId')

  boleto = application.db_session.query(Boleto).filter_by(id=boleto_id).first()
  if not boleto:
    return

  response = {
    'MsgType'           :'U23',
    'codigo_banco'      : boleto.codigo_banco        ,
    'carteira'          : boleto.carteira            ,
    'aceite'            : boleto.aceite              ,
    'valor_documento'   : boleto.valor_documento     ,
    'valor'             : boleto.valor               ,
    'data_vencimento'   : boleto.data_vencimento     ,
    'data_documento'    : boleto.data_documento      ,
    'data_processamento': boleto.data_processamento  ,
    'numero_documento'  : boleto.numero_documento    ,
    'agencia_cedente'   : boleto.agencia_cedente     ,
    'conta_cedente'     : boleto.conta_cedente       ,
    'cedente'           : boleto.cedente             ,
    'cedente_documento' : boleto.cedente_documento   ,
    'cedente_cidade '   : boleto.cedente_cidade      ,
    'cedente_uf'        : boleto.cedente_uf          ,
    'cedente_endereco'  : boleto.cedente_endereco    ,
    'cedente_bairro'    : boleto.cedente_bairro      ,
    'cedente_cep'       : boleto.cedente_cep         ,
    'sacado_nome'       : boleto.sacado_nome         ,
    'sacado_documento'  : boleto.sacado_documento    ,
    'sacado_cidade'     : boleto.sacado_cidade       ,
    'sacado_uf'         : boleto.sacado_uf           ,
    'sacado_endereco'   : boleto.sacado_endereco     ,
    'sacado_bairro'     : boleto.sacado_bairro       ,
    'sacado_cep'        : boleto.sacado_cep          ,
    'quantidade'        : boleto.quantidade          ,
    'especie_documento' : boleto.especie_documento   ,
    'especie'           : boleto.especie             ,
    'moeda'             : boleto.moeda               ,
    'demonstrativo'     : boleto.demonstrativo       ,
    'local_pagamento'   : boleto.local_pagamento     ,
    'instrucoes'        : boleto.instrucoes
  }
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

@login_required
def processCryptoCoinWithdrawRequest(session, msg):
  reqId        = msg.get('WithdrawReqID')
  amount       = msg.get('Amount')
  wallet       = msg.get('Wallet')
  currency     = msg.get('Currency')

  withdraw_record = Withdraw.create_crypto_coin_withdraw(application.db_session, session.user, currency, amount, wallet)
  application.db_session.commit()

  response = {
    'MsgType':            'U7',
    'WithdrawReqID':      reqId,
    'WithdrawID':         withdraw_record.id,
  }

  return json.dumps(response, cls=JsonEncoder)

@login_required
def processBRLBankTransferWithdrawRequest(session, msg):
  reqId          = msg.get('WithdrawReqID')
  amount         = msg.get('Amount')
  bank_number    = msg.get('BankNumber')
  bank_name      = msg.get('BankName')
  account_name   = msg.get('AccountName')
  account_number = msg.get('AccountNumber')
  account_branch = msg.get('AccountBranch')
  cpf_cnpj       = msg.get('CPFCNPJ')


  withdraw_record = Withdraw.create_brl_bank_transfer_withdraw(application.db_session, session.user, amount,
                                                               bank_number, bank_name, account_name, account_number,
                                                               account_branch, cpf_cnpj)
  application.db_session.commit()

  response = {
    'MsgType':            'U9',
    'WithdrawReqID':      reqId,
    'WithdrawID':         withdraw_record.id,
  }
  return json.dumps(response, cls=JsonEncoder)

@login_required
def processWithdrawConfirmationRequest(session, msg):
  reqId = msg.get('WithdrawReqID')
  token = msg.get('ConfirmationToken')

  withdraw_data = Withdraw.user_confirm(application.db_session, token)
  if not withdraw_data:
    response = {'MsgType':'U25', 'WithdrawReqID': reqId}
    return json.dumps(response, cls=JsonEncoder)

  application.db_session.commit()

  response = {
    'MsgType':            'U25',
    'WithdrawReqID':      reqId,
    'ConfirmationToken':  withdraw_data.confirmation_token,
    'WithdrawID':         withdraw_data.id,
    'Currency':           withdraw_data.currency,
    'Amount':             withdraw_data.amount,
    'Wallet':             withdraw_data.wallet,
    'BankNumber':         withdraw_data.bank_number,
    'BankName':           withdraw_data.bank_name,
    'AccountName':        withdraw_data.account_name,
    'AccountNumber':      withdraw_data.account_number,
    'AccountBranch':      withdraw_data.account_branch,
    'CPFCNPJ':            withdraw_data.cpf_cnpj,
    'Address':            withdraw_data.address,
    'City':               withdraw_data.city,
    'PostalCode':         withdraw_data.postal_code,
    'RegionState':        withdraw_data.region_state,
    'Country':            withdraw_data.country,
    'BankSwift':          withdraw_data.bank_swift,
    'IntermediateSwift':  withdraw_data.intermediate_swift,
    'RoutingNumber':      withdraw_data.routing_number,
    'Created':            withdraw_data.created
  }
  return json.dumps(response, cls=JsonEncoder)


@login_required
def processWithdrawListRequest(session, msg):
  page        = msg.get('Page', 0)
  page_size   = msg.get('PageSize', 100)
  status_list = msg.get('StatusList', ['1', '2'] )
  offset      = page * page_size

  withdraws = application.db_session.query(Withdraw).\
                                          filter_by( user_id = session.user.id ).\
                                          filter(Withdraw.status.in_( status_list )).\
                                          order_by(Withdraw.created.desc()).\
                                          limit( page_size ).offset( offset )

  withdraw_list = []
  columns = [ 'WithdrawID'   , 'Type'             , 'Currency'      , 'Amount' , 'Wallet', 'BankNumber' ,'AccountName',
              'AccountNumber', 'AccountBranch'    , 'CPFCNPJ'       , 'Address', 'City'  , 'PostalCode', 'Country'   ,
              'BankSwift'    , 'IntermediateSwift', 'RoutingNumber' , 'Created', 'Status', 'RegionState','BankName' ]

  for withdraw in withdraws:
    withdraw_list.append( [
      withdraw.id,
      withdraw.type,
      withdraw.currency,
      withdraw.amount,
      withdraw.wallet,
      withdraw.bank_number,
      withdraw.account_name,
      withdraw.account_number,
      withdraw.account_branch,
      withdraw.cpf_cnpj,
      withdraw.address,
      withdraw.city,
      withdraw.postal_code,
      withdraw.country,
      withdraw.bank_swift,
      withdraw.intermediate_swift,
      withdraw.routing_number,
      withdraw.created,
      withdraw.status,
      withdraw.region_state,
      withdraw.bank_name
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
  offset      = page * page_size

  brokers = application.db_session.query(Broker).\
                                   filter_by( id = session.user.broker_id ).\
                                   filter(Broker.status.in_( status_list )).\
                                   order_by(Broker.ranking ).\
                                   limit( page_size ).offset( offset )

  broker_list = []
  columns = [ 'BrokerID'        , 'ShortName'      , 'BusinessName'      , 'Address'            ,
              'State'           , 'Country'        , 'PhoneNumber1'      , 'PhoneNumber2'       , 'Skype'            ,
              'Currencies'      , 'TtosUrl'        , 'BoletoFee'         , 'WithdrawBRLBankFee' , 'WithdrawWalletFee',
              'WithdrawSwiftFee', 'WithdrawAchFee' ,'TransactionFeeBuy'  , 'TransactionFeeSell' , 'Status'           ,
              'ranking' ]

  for broker in brokers:
    broker_list.append( [
      broker.id                   ,
      broker.user                 ,
      broker.short_name           ,
      broker.business_name        ,
      broker.address              ,
      broker.state                ,
      broker.zip_code             ,
      broker.country              ,
      broker.phone_number_1       ,
      broker.phone_number_2       ,
      broker.skype                ,
      broker.currencies           ,
      broker.tos_url              ,
      broker.boleto_fee           ,
      broker.withdraw_brl_bank_fee,
      broker.withdraw_wallet_fee  ,
      broker.withdraw_swift_fee   ,
      broker.withdraw_ach_fee     ,
      broker.transaction_fee_buy  ,
      broker.transaction_fee_sell ,
      broker.status               ,
      broker.ranking              ,
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
def processBoletoPaymentConfirmation(session, msg):
  boleto_id   = msg.get('BoletoID')
  currency    = msg.get('Currency')
  amount      = msg.get('Amount')

  # TODO: Process the boleto payment
  boleto = application.db_session.query(Boleto).filter_by(id= boleto_id ).filter_by(broker_id=session.user.id).first()

  result = {
    'MsgType' : 'B1',
    'BoletoID': boleto_id
  }
  return json.dumps(result, cls=JsonEncoder)


@login_required
@system_user_required
def processBitcoinNewAddress(session, msg):
  bitcoin_address = application.db_session.query(BitcoinAddress).filter_by(bitcoin_address=msg.get('BtcAddress')).first()
  if bitcoin_address:
    return ""

  bitcoin_address = BitcoinAddress( bitcoin_address=msg.get('BtcAddress') )
  self.application.session.add(bitcoin_address)
  self.application.session.commit()

  result = {
    'MsgType'   : 'S1',
    'BtcAddress' : msg.get('BtcAddress')
  }

  return json.dumps(result, cls=JsonEncoder)

@login_required
@system_user_required
def processGetNumberOfFreeBitcoinNewAddress(session, msg):
  number_of_free_bitcoins = application.db_session.query(BitcoinAddress).filter_by(user_id=None).count()

  result = {
    'MsgType'   : 'S3',
    'NOfBtcAddress' : number_of_free_bitcoins
  }

  return json.dumps(result, cls=JsonEncoder)

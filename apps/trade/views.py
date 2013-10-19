# -*- coding: utf-8 -*-

import datetime
from bitex.message import JsonMessage
from bitex.json_encoder import  JsonEncoder

import json

from models import  User, BitcoinAddress, Order, UserPasswordReset, balance_signal, user_message_signal, Boleto, BoletoOptions, NeedSecondFactorException

#from order_matcher.execution import OrderMatcher, execution_report_signal

from trade.decorators import login_required


def processTestRequest(session, msg):
  return '{"MsgType":"0", "TestReqID":"%s"}'%msg.get("TestReqID")


def processLogin(session, msg):
  # Authenticate the user
  need_second_factor = False
  try:
    session.user = User.authenticate(session.db_session,
                                     msg.get('Username'),
                                     msg.get('Password'),
                                     msg.get('SecondFactor'))
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
    session.db_session.rollback()
    session.should_end = True
    return json.dumps(login_response)


  session.db_session.add(session.user)
  session.db_session.commit()

  # subscribe to all execution reports for this user account.
  #execution_report_signal.connect(  self.on_execution_report, self.user.id )

  # subscribe to balance updates for this user account
  #balance_signal.connect( self.on_send_json_msg_to_user, self.user.id  )

  #session.user.publish_balance_update()

  # Send the login response
  login_response = {
    'MsgType':          'BF',
    'UserID':           session.user.id,
    'Username':         session.user.username,
    'TwoFactorEnabled': session.user.two_factor_enabled,
    'BtcAddress':       session.user.bitcoin_address,
    'UserStatus':       1
  }
  return json.dumps(login_response)



@login_required
def processNewOrderSingle(session, msg):
  pass

@login_required
def processCancelOrderRequest(session, msg):
  pass

@login_required
def processSignup(session, msg):
  pass

@login_required
def processRequestForBalances(session, msg):
  pass

@login_required
def processRequestForOpenOrders(session, msg):
  pass

@login_required
def processBTCWithdrawRequest(session, msg):
  pass

@login_required
def processBRLWithdrawRequest(session, msg):
  pass

def processRequestPasswordRequest(session, msg):
  pass

def processPasswordRequest(session, msg):
  pass

@login_required
def processEnableDisableTwoFactorAuth(session, msg):
  pass

@login_required
def processGenerateBoleto(session, msg):
  pass

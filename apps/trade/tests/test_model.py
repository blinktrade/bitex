# -*- coding: utf-8 -*-

import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert( 0, ROOT_PATH)

import unittest
import json

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

import  datetime

import mock

from trade_application import  TradeApplication
from models import Instrument, Currency, Broker, User, DepositMethods

TradeApplication.instance().publish = mock.MagicMock()

class BaseTest(unittest.TestCase):
  def setUp(self):
    from models import Base, db_bootstrap

    self.engine = create_engine('sqlite://', echo=False)
    Base.metadata.create_all(self.engine)

    self.db_session = scoped_session(sessionmaker(bind=self.engine))
    TradeApplication.instance().db_session = self.db_session

    db_bootstrap(self.db_session)
    
    currencies = [
      [ "BTC" , u"฿"       , "Bitcoin"  ,  True,  10000, "{:,.8f}", u"฿ #,##0.00000000;(฿ #,##0.00000000)"  , "{:,.8f}", u"฿ #,##0.00000000;(฿ #,##0.0000000)" ],
      [ "USD" , u"$"       , "Dollar"   ,  False, 100  , "{:,.2f}", u"¤ #,##0.00;(¤ #,##0.00)"              , "{:,.2f}", u"¤ #,##0.00;(¤ #,##0.00)"            ]
    ]


    for c in currencies:
      e = Currency(code                 = c[0],
                   sign                 = c[1],
                   description          = c[2],
                   is_crypto            = c[3],
                   pip                  = c[4],
                   format_python        = c[5],
                   format_js            = c[6],
                   human_format_python  = c[7],
                   human_format_js      = c[8] )
      self.db_session.add(e)
      self.db_session.commit()


    instruments = [
      ["BTCUSD", "USD", "BTC / USD"]
    ]
    for currency_description in instruments:
      e = Instrument(symbol=currency_description[0],
                     currency=currency_description[1],
                     description=currency_description[2])
      self.db_session.add(e)
      self.db_session.commit()

    # user root
    e = User(id                   = -1,
             username             = 'root',
             email                = 'root@blinktrade.com',
             password             = 'abc12345',
             country_code         = 'US',
             state                = 'NY',
             transaction_fee_buy  = 0,
             transaction_fee_sell = 0,
             verified             = 3,
             is_staff             = True,
             is_system            = True,
             is_broker            = True,
             email_lang           = 'en')
    self.db_session.add(e)

    # user blinktrade
    e = User(id                   = 8999999,
             username             = 'blinktrade',
             email                = 'admin@blinktrade.com',
             password             = 'abc12345',
             country_code         = 'US',
             state                = 'NY',
             transaction_fee_buy  = 0,
             transaction_fee_sell = 0,
             verified             = 3,
             is_staff             = True,
             is_broker            = True,
             email_lang           = 'en')
    self.db_session.add(e)


    # user exchange
    e = User(id                   = 5,
             username             = 'exchange',
             email                = 'exchange@blinktrade.com',
             broker_id            = 8999999,
             broker_username      = 'blinktrade',
             password             = 'abc12345',
             country_code         = 'US',
             state                = 'NY',
             transaction_fee_buy  = 0,
             transaction_fee_sell = 0,
             verified             = 5,
             is_broker            = True,
             email_lang           = 'en')
    self.db_session.add(e)
    self.db_session.commit()

    # user exchange bonus
    e = User(id                   = 90000000,
             username             = 'exchange_bonus',
             email                = 'bonus@blinktrade.com',
             broker_id            = 5,
             broker_username      = 'exchange',
             password             = 'abc12345',
             country_code         = 'US',
             state                = 'NY',
             transaction_fee_buy  = 0,
             transaction_fee_sell = 0,
             verified             = 5,
             is_broker            = True,
             email_lang           = 'en')
    self.db_session.add(e)
    self.db_session.commit()
    self.user_exchange_bonus = e

    # user exchange fees
    e = User(id                   = 90000001,
             username             = 'exchange_fees',
             email                = 'fee@blinktrade.com',
             broker_id            = 5,
             broker_username      = 'exchange',
             password             = 'abc12345',
             country_code         = 'US',
             state                = 'NY',
             transaction_fee_buy  = 0,
             transaction_fee_sell = 0,
             verified             = 5,
             is_broker            = True,
             email_lang           = 'en')
    self.db_session.add(e)
    self.db_session.commit()
    self.user_exchange_fees = e

    # broker exchange
    e = Broker(id                       = 5,
               short_name               = 'exchange',
               business_name            = 'BlinkTrade Demo Exchange',
               address                  = '21 Bitcoin Ave',
               signup_label             = 'BlinkTrade Demo Exchange',
               city                     = 'New York',
               state                    = 'NY',
               zip_code                 = '10000',
               country_code             = 'US',
               lang                     = 'en',
               country                  = 'United States',
               mandrill_api_key         = None,
               mailer_from_name         = 'BlinkTrade',
               mailer_from_email        = 'support@blinktrade.com',
               mailer_signature         = 'BlinkTrade Demo Exchange',
               mailchimp_list_id        = '5c7b7818d8',
               phone_number_1           = None,
               phone_number_2           = None,
               skype                    = 'blinktrade',
               email                    = 'demo@blinktrade.com',
               verification_jotform     = 'https://secure.jotform.co/form/42336230941852?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&email={{Email}}&phoneNumber[country]=1&address[state]={{State}}&address[country]=United+States',
               upload_jotform           = 'https://secure.jotform.co/form/42344880060854?user_id={{UserID}}&username={{Username}}&broker_id={{BrokerID}}&broker_username={{BrokerUsername}}&deposit_method={{DepositMethod}}&control_number={{ControlNumber}}&deposit_id={{DepositID}}',
               currencies               = 'USD',
               withdraw_structure       = json.dumps(
                   {
                   "BTC": [
                       {
                       "method":"bitcoin",
                       "description":"Bitcoin withdrawal",
                       "disclaimer": "",
                       "percent_fee":0,
                       "fixed_fee":0,
                       "limits": {
                         "0": {"enabled": True, "min": 500000, "max": 100000000},
                         "1": {"enabled": True, "min": 500000, "max": 100000000},
                         "2": {"enabled": True, "min": 500000, "max": 100000000},
                         "3": {"enabled": True, "min": 500000},
                         "4": {"enabled": True, "min": 500000},
                         "5": {"enabled": True, "min": 500000}
                       },
                       "fields": [
                           {"side":"client", "name": "Wallet"        , "validator":"validateAddress",  "type":"text"  , "value":""       , "label":"Wallet",        "placeholder":"" },
                           {"side":"broker", "name": "TransactionID" , "validator":"validateAlphaNum", "type":"text"  , "value":""       , "label":"TransactionID", "placeholder":"" }
                       ]
                     }
                   ],
                   "USD": [
                       {
                       "method":"swift",
                       "description":"Swift International Transfer",
                       "disclaimer":"84 hours, 1%  fee + $25",
                       "percent_fee": 1,
                       "fixed_fee": 2500000000,
                       "limits": {
                         "0": {"enabled": False},
                         "1": {"enabled": False},
                         "2": {"enabled": False},
                         "3": {"enabled": True, "min": 3500000000,  "max":  280000000000},
                         "4": {"enabled": True, "min": 3500000000,  "max": 5000000000000},
                         "5": {"enabled": True, "min": 3500000000}
                       },
                       "fields": [
                           {"side":"client", "name": "BankName"     , "validator":"validateAlphaNum", "type":"text"  , "value":""  , "label":"Banco name", "placeholder": "ex. JPMORGAN CHASE BANK, N.A" },
                           {"side":"client", "name": "BankSwift"    , "validator":"validateAlphaNum", "type":"text"  , "value":""  , "label":"Swift code", "placeholder": "ex. CHASUS33" },
                           {"side":"client", "name": "RoutingNumber", "validator":"validateAlphaNum", "type":"text"  , "value":""  , "label":"Routing Number", "placeholder":"ex. 021000021" },
                           {"side":"client", "name": "AccountNumber", "validator":"validateAlphaNum", "type":"text"  , "value":""  , "label":"Account Number", "placeholder":"ex. 88888-8" },
                           {"side":"broker", "name": "TransactionID", "validator":"validateAlphaNum", "type":"text"  , "value":""  , "label":"TransactionID", "placeholder":"" }
                       ]
                     }
                   ]
                 }
               ).decode('utf-8'),
               crypto_currencies        = json.dumps([
                   {
                   "Wallets": [
                       {
                       "managed_by": "BlinkTrade, Exchange Operator, Mediator ",
                       "signatures": [],
                       "type": "cold",
                       "multisig": False,
                       "address": "n3yyGwzyfTxbKB8hkkv2AsQ9nBQgEozsV4"
                     },
                       {
                       "managed_by": "Exchange Operator ",
                       "signatures": [],
                       "type": "hot",
                       "multisig": False,
                       "address": "msQRdMPcwLr3rWsLzG56ABhHtfavHH2yVW"
                     }
                   ],
                   "CurrencyCode": "BTC",
                   "Confirmations": [
                     [          0,        200000000, 1],
                     [  200000000,      20000000000, 3],
                     [20000000000, 2100000000000000, 6]
                   ],
                   "CurrencyDescription": "Bitcoin"
                 }
               ]).decode('utf-8'),
               accept_customers_from    = json.dumps([["*"],[ "CU", "SO", "SD",  "NG", "IR", "KP" ]]).decode('utf-8'),
               is_broker_hub            = False,
               support_url              = 'mailto:rodrigo@blinktrade.com',
               tos_url                  = 'https://docs.google.com/a/blinktrade.com/document/d/1HyFRs_2Seh4LGZYjPk8bmbxueUjF7RMz-koAM3rG2Pc/pub?embedded=true',
               fee_structure            = json.dumps([
                   { "Operation" : "Wire transfer",      "Fee":"1%"            , "Terms":"Exchange operator decides its fees" }
               ] ).decode('utf-8'),
               transaction_fee_buy      = 60,
               transaction_fee_sell     = 60,
               accounts                 = json.dumps({
                 "bonus":[ 90000000, "exchange_bonus", [ "USD", 100000000 ] ] ,
                 "fees":[  90000001, "exchange_fees" ]
               }).decode('utf-8'),
               status                   = '1',
               ranking                  = 5 )
    self.db_session.add(e)
    self.db_session.commit()

    
    e = DepositMethods(id                         = 501,
                        broker_id                 = 5,
                        name                      = 'usps',
                        description               = 'USPS Money order',
                        disclaimer                = '1 business day',
                        type                      = 'DTP',
                        percent_fee               = 0,
                        fixed_fee                 = 500000000,
                        broker_deposit_ctrl_num   = 501000001,
                        currency                  = 'USD',
                        deposit_limits            = json.dumps({
                          "0": {"enabled": False},
                          "1": {"enabled": False},
                          "2": {"enabled": False},
                          "3": {"enabled": True, "min" : 1000000000, "max":  280000000000 },
                          "4": {"enabled": True, "min" : 1000000000, "max": 5000000000000 },
                          "5": {"enabled": True, "min" : 1000000000 }
                        }).decode('utf-8'),
                        html_template             = """
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/2.3.0/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body style="background-color: #ffffff">
    <div class="container">
      <div class="content-fluid">
        <table class="table table-condensed">
          <tr>
            <td>Order ID:</td>
            <td>*|control_number|*</td>
          </tr>
          <tr>
            <td>Created:</td>
            <td>*|created|*</td>
          </tr>
          <tr>
            <td>Deposit Method:</td>
            <td>Money Order</td>
          </tr>
          <tr>
            <td>Instructions:</td>
            <td>
              1. Head to your local United States Postal Service and purchase a money order slip for the correct amount. Learn more about USPS money orders <a href="https://www.usps.com/shop/money-orders.htm">here</a><br/>
              2. Fill out the money order form. <b>Important: Make sure to write your confirmation code directly on it!</b><br/>
              3. Take a picture of the filled out money order<br/>
              4. Upload the photo of the money order in the system<br/>
              5. Send the money order to :
              <strong>Satoshi Nakamoto<strong><br/>
              <strong>21 Bitcoin Street<strong><br/>
              <strong>New York - NY - 10001<strong><br/>
            </td>
          </tr>
          <tr>
            <td>Total Deposit:</td>
            <td>$ *|value|*</td>
          </tr>
          <tr>
            <td>Notes:</td>
            <td> <small>
              Please complete your deposit according to your preferred method. Be sure to send a copy of the Order ID with the receipt of completed payment to us.
            </small> </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>
                        """,
                        parameters                = '{}')
    self.db_session.add(e)
    self.db_session.commit()
    self.deposit_method_501 = e

    self.deposit_method_501.generate_deposit(self.db_session, 
                                             self.user_exchange_bonus,
                                             100000000000,
                                             None)
                                             

class UserTest(BaseTest):
  @mock.patch('trade.get_now')
  def testSignUpWelcomeEmail(self, get_now):
    get_now.return_value  = datetime.datetime(2014, 1, 1, 10, 10, 10)
    from models import User, UserEmail, BrokerDoesNotExistsException

    self.failUnlessRaises(BrokerDoesNotExistsException,
      User.signup, self.db_session, 'rodrigo', 'r@blinktrade.com', 'abc12345', 'NY', 'US', 1115 )

    User.signup(self.db_session, 'rodrigo', 'r@blinktrade.com', 'abc12345', 'NY', 'US', 5)

    TradeApplication.instance().publish.assert_called_with('EMAIL', {
      'Language': u'en',
      'EmailType': '0',
      'UserID': 90000002,
      'OrigTime': datetime.datetime(2014, 1, 1, 10, 10, 10),
      'To': u'r@blinktrade.com',
      'Params': '{"username": "rodrigo", "id": 90000002, "state": "NY", "broker_id": 5, "broker_username": "exchange", "country_code": "US", "email": "r@blinktrade.com"}',
      'RawData': '',
      'Template': 'welcome',
      'BrokerID': 5,
      'MsgType': 'C',
      'EmailThreadID': 1,
      'RawDataLength': 0,
      'Subject': 'W'}
    )

  def testAuthenticate(self):
    from models import User
    User.signup(self.db_session, 'rodrigo', 'r@blinktrade.com', 'abc12345', 'NY', 'US', 5)
    self.assertTrue( User.authenticate(self.db_session, 5, 'rodrigo', 'abc12345', None) is not None)


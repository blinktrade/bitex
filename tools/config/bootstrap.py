import sys
import os

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from sqlalchemy.orm import scoped_session, sessionmaker
import json
import base64
import ConfigParser

from tornado.options import options


def main():
  candidates = ['bootstrap.ini']
  if len(sys.argv) > 1:
    candidates.append(sys.argv[1])

  config = ConfigParser.SafeConfigParser()
  config.read( candidates )

  options.define('db_engine', config.get('database','db_engine'))
  options.define('db_echo', True)


  from trade.models import engine, Currency, Instrument, User, Broker, DepositMethods
  session = scoped_session(sessionmaker(bind=engine))

  for section_name in config.sections():
    if section_name == 'currencies':
      for id, currency_json in config.items(section_name):
        c = json.loads(currency_json)

        if Currency.get_currency(session,c[0]) :
          continue
        e = Currency(code                 = c[0],
                     sign                 = c[1],
                     description          = c[2],
                     is_crypto            = c[3],
                     pip                  = c[4],
                     format_python        = c[5],
                     format_js            = c[6],
                     human_format_python  = c[7],
                     human_format_js      = c[8] )
        session.add(e)
        session.commit()


    if section_name == 'instruments':
      for id, instrument_json in config.items(section_name):
        currency_description = json.loads(instrument_json)

        if Instrument.get_instrument(session, currency_description[0]):
          continue

        e = Instrument(symbol=currency_description[0],
                       currency=currency_description[1],
                       description=currency_description[2])
        session.add(e)
        session.commit()

    if section_name[:4] == 'user':
      if not User.get_user(session, config.get(section_name, 'username')):
        broker_id = None
        broker_username = None
        password = base64.b32encode(os.urandom(10))
        transaction_fee_buy = None
        transaction_fee_sell = None
        verified = 0
        is_system = False
        is_staff = False
        is_broker = False
        state = None


        try:
          broker_id = config.getint(section_name, 'broker_id')
        except Exception,e:
          pass

        try:
          broker_username = config.get(section_name, 'broker_username')
        except Exception,e:
          pass

        try:
          password = config.get(section_name, 'password')
        except Exception,e:
          pass

        try:
          transaction_fee_buy = config.getint(section_name, 'transaction_fee_buy')
        except Exception,e:
          pass

        try:
          transaction_fee_sell = config.getint(section_name, 'transaction_fee_sell')
        except Exception,e:
          pass


        try:
          verified = config.getint(section_name, 'verified')
        except Exception,e:
          pass

        try:
          is_system = config.getboolean(section_name, 'is_system')
        except Exception,e:
          pass

        try:
          is_staff = config.getboolean(section_name, 'is_staff')
        except Exception,e:
          pass

        try:
          is_broker = config.getboolean(section_name, 'is_broker')
        except Exception,e:
          pass

        try:
          state = config.get(section_name, 'state')
        except Exception,e:
          pass

        e = User(id                   = config.getint(section_name, 'id'),
                 username             = config.get(section_name, 'username'),
                 email                = config.get(section_name, 'email'),
                 broker_id            = broker_id,
                 broker_username      = broker_username,
                 password             = password,
                 country_code         = config.get(section_name, 'country_code'),
                 state                = state,
                 transaction_fee_buy  = transaction_fee_buy,
                 transaction_fee_sell = transaction_fee_sell,
                 verified             = verified,
                 is_staff             = is_staff,
                 is_system            = is_system,
                 is_broker            = is_broker)
        session.add(e)
        session.commit()

    if section_name[:6] == 'broker':
      if not Broker.get_broker(session, config.getint(section_name, 'id')):
        withdraw_structure_json = {}
        try:
          with open(config.get(section_name, 'withdraw_structure')  ) as data_file:
            withdraw_structure_json = json.load(data_file)
        except Exception,e:
          pass

        crypto_currencies_json = []
        try:
          with open(config.get(section_name, 'crypto_currencies')  ) as data_file:
            crypto_currencies_json = json.load(data_file)
        except Exception,e:
          pass

        accept_customers_from_json = [['*'],[ "CU", "SO", "SD",  "NG", "IR", "KP" ]]
        try:
          with open(config.get(section_name, 'accept_customers_from')  ) as data_file:
            accept_customers_from_json = json.load(data_file)
        except Exception,e:
          pass

        fee_structure_json = []
        try:
          with open(config.get(section_name, 'fee_structure')  ) as data_file:
            fee_structure_json = json.load(data_file)
        except Exception,e:
          pass

        deposit_limits_json = {}
        try:
          with open(config.get(section_name, 'deposit_limits')  ) as data_file:
            deposit_limits_json = json.load(data_file)
        except Exception,e:
          pass

        phone_number_1 = None
        try:
          phone_number_1 = config.get(section_name, 'phone_number_1')
        except Exception,e:
          pass

        phone_number_2 = None
        try:
          phone_number_2 = config.get(section_name, 'phone_number_2')
        except Exception,e:
          pass

        skype = None
        try:
          skype = config.get(section_name, 'skype')
        except Exception,e:
          pass

        transaction_fee_buy = 0
        try:
          transaction_fee_buy = config.getint(section_name, 'transaction_fee_buy')
        except Exception,e:
          pass

        transaction_fee_sell = 0
        try:
          transaction_fee_sell = config.getint(section_name, 'transaction_fee_sell')
        except Exception,e:
          pass

        e = Broker(id                       = config.getint(section_name, 'id'),
                   short_name               = config.get(section_name, 'short_name'),
                   business_name            = config.get(section_name, 'business_name'),
                   address                  = config.get(section_name, 'address'),
                   signup_label             = config.get(section_name, 'signup_label'),
                   city                     = config.get(section_name, 'city'),
                   state                    = config.get(section_name, 'state'),
                   zip_code                 = config.get(section_name, 'zip_code'),
                   country_code             = config.get(section_name, 'country_code'),
                   lang                     = config.get(section_name, 'lang'),
                   country                  = config.get(section_name, 'country'),
                   phone_number_1           = phone_number_1,
                   phone_number_2           = phone_number_2,
                   skype                    = skype,
                   email                    = config.get(section_name, 'email'),
                   verification_jotform     = config.get(section_name, 'verification_jotform'),
                   upload_jotform           = config.get(section_name, 'upload_jotform'),
                   currencies               = config.get(section_name, 'currencies'),
                   withdraw_structure       = json.dumps(withdraw_structure_json),
                   crypto_currencies        = json.dumps(crypto_currencies_json),
                   accept_customers_from    = json.dumps(accept_customers_from_json),
                   is_broker_hub            = config.getboolean(section_name, 'is_broker_hub'),
                   support_url              = config.get(section_name, 'support_url'),
                   tos_url                  = config.get(section_name, 'tos_url'),
                   fee_structure            = json.dumps(fee_structure_json),
                   transaction_fee_buy      = transaction_fee_buy,
                   transaction_fee_sell     = transaction_fee_sell,
                   deposit_limits           = json.dumps(deposit_limits_json),
                   status                   = config.get(section_name, 'status'),
                   ranking                  = config.getint(section_name, 'ranking'))
        session.add(e)
        session.commit()


    if section_name[:14] == 'deposit_method':
      with open(config.get(section_name, 'parameters')  ) as data_file:
        parameters_json = json.load(data_file)

      html_template = None
      try:
        with open(config.get(section_name, 'html_template')  ) as data_file:
          html_template = data_file.read()
      except Exception,e:
        pass

      deposit_limits_json = {0: {"enabled": False},1: {"enabled": False}, 2: {"enabled": False }}
      try:
        with open(config.get(section_name, 'deposit_limits')  ) as data_file:
          deposit_limits_json = json.load(data_file)
      except Exception,e:
        pass


      if not DepositMethods.get_deposit_method(session, config.getint(section_name, 'id')):
        e = DepositMethods(id                         = config.getint(section_name, 'id'),
                            broker_id                 = config.getint(section_name, 'broker_id'),
                            name                      = config.get(section_name, 'name'),
                            description               = config.get(section_name, 'description'),
                            disclaimer                = config.get(section_name, 'disclaimer'),
                            type                      = config.get(section_name, 'type'),
                            percent_fee               = config.getfloat(section_name, 'percent_fee'),
                            fixed_fee                 = config.getint(section_name, 'fixed_fee'),
                            broker_deposit_ctrl_num   = config.getint(section_name, 'broker_deposit_ctrl_num'),
                            currency                  = config.get(section_name, 'currency'),
                            deposit_limits            = json.dumps(deposit_limits_json),
                            html_template             = html_template.decode('utf-8'),
                            parameters                = json.dumps(parameters_json))
        session.add(e)
        session.commit()

main()

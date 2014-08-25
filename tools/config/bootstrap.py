import sys
import os

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from sqlalchemy.orm import scoped_session, sessionmaker
import json
from bitex.json_encoder import JsonEncoder
import base64
import ConfigParser

from tornado.options import options


def main():
  candidates = ['bootstrap.ini']
  if len(sys.argv) > 1:
    candidates.append(sys.argv[1])

  config = ConfigParser.SafeConfigParser({
    'password': base64.b32encode(os.urandom(10)),
    'transaction_fee_buy': 0,
    'transaction_fee_sell': 0,
    'country_code': 'US',
    'state': 'NY',
    'broker_id':8999999,
    'broker_username':'blinktrade',
    'verified': '2',
    'is_staff': False,
    'is_system': False,
    'is_broker': True
  })
  config.read( candidates )

  options.define('db_engine', config.get('database','db_engine'))
  options.define('db_echo', True)


  from trade.models import engine, User, Broker, DepositMethods
  session = scoped_session(sessionmaker(bind=engine))

  for section_name in config.sections():
    if section_name == 'user':
      if not User.get_user(session, config.get(section_name, 'username')):
        e = User(id                   = config.getint(section_name, 'id'),
                 username             = config.get(section_name, 'username'),
                 email                = config.get(section_name, 'email'),
                 broker_id            = config.getint(section_name, 'broker_id'),
                 broker_username      = config.get(section_name, 'broker_username'),
                 password             = config.get(section_name, 'password'),
                 country_code         = config.get(section_name, 'country_code'),
                 state                = config.get(section_name, 'state'),
                 transaction_fee_buy  = config.getint(section_name, 'transaction_fee_buy'),
                 transaction_fee_sell = config.getint(section_name, 'transaction_fee_sell'),
                 verified             = config.getint(section_name, 'verified'),
                 is_staff             = config.getboolean(section_name, 'is_staff'),
                 is_system            = config.getboolean(section_name, 'is_system'),
                 is_broker            = config.getboolean(section_name, 'is_broker'))
        session.add(e)
        session.commit()

    if section_name == 'broker':
      if not Broker.get_broker(session, config.getint(section_name, 'id')):
        with open(config.get(section_name, 'withdraw_structure')  ) as data_file:
          withdraw_structure_json = json.load(data_file)

        with open(config.get(section_name, 'crypto_currencies')  ) as data_file:
          crypto_currencies_json = json.load(data_file)

        with open(config.get(section_name, 'accept_customers_from')  ) as data_file:
          accept_customers_from_json = json.load(data_file)

        with open(config.get(section_name, 'fee_structure')  ) as data_file:
          fee_structure_json = json.load(data_file)

        with open(config.get(section_name, 'validation')  ) as data_file:
          validation_json = json.load(data_file)

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
                   phone_number_1           = config.get(section_name, 'phone_number_1'),
                   phone_number_2           = config.get(section_name, 'phone_number_2'),
                   skype                    = config.get(section_name, 'skype'),
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
                   transaction_fee_buy      = config.getint(section_name, 'transaction_fee_buy'),
                   transaction_fee_sell     = config.getint(section_name, 'transaction_fee_sell'),
                   validation               = json.dumps(validation_json),
                   status                   = config.get(section_name, 'status'),
                   ranking                  = config.getint(section_name, 'ranking'))
        session.add(e)
        session.commit()


    if section_name == 'deposit_method':
      with open(config.get(section_name, 'parameters')  ) as data_file:
        parameters_json = json.load(data_file)


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
                            parameters                = json.dumps( parameters_json))
        session.add(e)
        session.commit()

main()
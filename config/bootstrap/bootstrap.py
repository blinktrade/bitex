import sys
import os

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import json
import base64
import ConfigParser


def main():
  candidates = ['bootstrap.ini']
  if len(sys.argv) > 1:
    candidates.append(os.path.expanduser(sys.argv[1]))

  config = ConfigParser.SafeConfigParser()
  config.read( candidates )

  from trade.models import Base, Currency, Instrument, User, Broker, DepositMethods
  db_engine = config.get('database','sqlalchemy_engine') + '://' + os.path.expanduser(config.get('database','sqlalchemy_connection_string'))
  engine = create_engine( db_engine, echo=True)
  #engine.raw_connection().connection.text_factory = str

  Base.metadata.create_all(engine)


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
      broker_id = None
      try:
        broker_id = config.getint(section_name, 'broker_id')
      except Exception,e:
        pass

      broker_username = None
      try:
        broker_username = config.get(section_name, 'broker_username')
      except Exception,e:
        pass


      if not User.get_user(session,broker_id, config.get(section_name, 'username')):
        password = base64.b32encode(os.urandom(10))
        try:
          password = config.get(section_name, 'password')
        except Exception,e:
          pass

        transaction_fee_buy = None
        try:
          transaction_fee_buy = config.getint(section_name, 'transaction_fee_buy')
        except Exception,e:
          pass

        transaction_fee_sell = None
        try:
          transaction_fee_sell = config.getint(section_name, 'transaction_fee_sell')
        except Exception,e:
          pass

        verified = 0
        try:
          verified = config.getint(section_name, 'verified')
        except Exception,e:
          pass

        is_system = False
        try:
          is_system = config.getboolean(section_name, 'is_system')
        except Exception,e:
          pass

        is_staff = False
        try:
          is_staff = config.getboolean(section_name, 'is_staff')
        except Exception,e:
          pass

        is_broker = False
        try:
          is_broker = config.getboolean(section_name, 'is_broker')
        except Exception,e:
          pass

        state = None
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
                 is_broker            = is_broker,
                 email_lang           = config.get(section_name, 'email_lang'))
        session.add(e)
        session.commit()

    if section_name[:6] == 'broker':
      if not Broker.get_broker(session, config.getint(section_name, 'id')):
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
                   mandrill_api_key         = config.get(section_name, 'mandrill_api_key'),
                   mailer_from_name         = config.get(section_name, 'mailer_from_name'),
                   mailer_from_email        = config.get(section_name, 'mailer_from_email'),
                   mailer_signature         = config.get(section_name, 'mailer_signature'),
                   mailchimp_list_id        = config.get(section_name, 'mailchimp_list_id'),
                   phone_number_1           = phone_number_1,
                   phone_number_2           = phone_number_2,
                   skype                    = skype,
                   email                    = config.get(section_name, 'email'),
                   verification_jotform     = config.get(section_name, 'verification_jotform'),
                   upload_jotform           = config.get(section_name, 'upload_jotform'),
                   currencies               = config.get(section_name, 'currencies'),
                   withdraw_structure       = json.dumps(json.loads(config.get(section_name, 'withdraw_structure', raw=True))).decode('utf-8'),
                   crypto_currencies        = json.dumps(json.loads(config.get(section_name, 'crypto_currencies', raw=True))).decode('utf-8'),
                   accept_customers_from    = json.dumps(json.loads(config.get(section_name, 'accept_customers_from', raw=True))).decode('utf-8'),
                   is_broker_hub            = config.getboolean(section_name, 'is_broker_hub'),
                   support_url              = config.get(section_name, 'support_url'),
                   tos_url                  = config.get(section_name, 'tos_url'),
                   fee_structure            = json.dumps(json.loads(config.get(section_name, 'fee_structure', raw=True))).decode('utf-8'),
                   transaction_fee_buy      = transaction_fee_buy,
                   transaction_fee_sell     = transaction_fee_sell,
                   accounts                 = json.dumps(json.loads(config.get(section_name, 'accounts', raw=True))).decode('utf-8'),
                   status                   = config.get(section_name, 'status'),
                   ranking                  = config.getint(section_name, 'ranking'))
        session.add(e)
        session.commit()


    if section_name[:14] == 'deposit_method':
      if not DepositMethods.get_deposit_method(session, config.getint(section_name, 'id')):
        e = DepositMethods(id                         = config.getint(section_name, 'id'),
                            broker_id                 = config.getint(section_name, 'broker_id'),
                            name                      = config.get(section_name, 'name').decode('utf-8'),
                            description               = config.get(section_name, 'description').decode('utf-8'),
                            disclaimer                = config.get(section_name, 'disclaimer').decode('utf-8'),
                            type                      = config.get(section_name, 'type'),
                            percent_fee               = config.getfloat(section_name, 'percent_fee'),
                            fixed_fee                 = config.getint(section_name, 'fixed_fee'),
                            broker_deposit_ctrl_num   = config.getint(section_name, 'broker_deposit_ctrl_num'),
                            currency                  = config.get(section_name, 'currency'),
                            deposit_limits            = json.dumps(json.loads(config.get(section_name, 'deposit_limits', raw=True))).decode('utf-8'),
                            html_template             = config.get(section_name, 'html_template', raw=True).decode('utf-8'),
                            parameters                = json.dumps(json.loads(config.get(section_name, 'parameters', raw=True))).decode('utf-8') )
        session.add(e)
        session.commit()

main()

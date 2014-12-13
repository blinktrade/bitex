#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import traceback
import argparse
import ConfigParser
from appdirs import site_config_dir

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert(0, os.path.join( os.path.dirname(__file__), '../' ) )

import time
from util import send_email

from pyblinktrade.message_builder import MessageBuilder
from pyblinktrade.message import JsonMessage
from pyblinktrade.project_options import ProjectOptions

import logging, logging.handlers

import json
import zmq

import mailchimp
import mandrill

from trade.zmq_client  import TradeClient, TradeClientException

def convertCamelCase2Underscore(name):
  import re
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def run_application(options, instance_name):
  input_log_file_handler = logging.handlers.TimedRotatingFileHandler(
    os.path.expanduser(options.mailer_log), when='MIDNIGHT')
  input_log_file_handler.setFormatter(logging.Formatter(u"%(asctime)s - %(message)s"))

  mail_logger = logging.getLogger(instance_name)
  mail_logger.setLevel(logging.INFO)
  mail_logger.addHandler(input_log_file_handler)

  ch = logging.StreamHandler(sys.stdout)
  ch.setLevel(logging.DEBUG)
  ch.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
  mail_logger.addHandler(ch)

  mail_logger.info('START')
  def log(command, key, value=None):
    log_msg = u'%s, %s, %s' %(command, key, value if value else None)
    mail_logger.info(unicode(log_msg))


  log('PARAM', 'BEGIN')
  log('PARAM', 'trade_in',                      options.trade_in)
  log('PARAM', 'trade_pub',                     options.trade_pub)
  log('PARAM', 'mailer_log',                    options.mailer_log)
  log('PARAM', 'mailchimp_apikey',              options.mailchimp_apikey)
  log('PARAM', 'mandrill_apikey',               options.mandrill_apikey)
  log('PARAM', 'mailer_username',               options.mailer_username)
  log('PARAM', 'mailchimp_newsletter_list_id',  options.mailchimp_newsletter_list_id)
  log('PARAM', 'END')

  context = zmq.Context()
  socket = context.socket(zmq.SUB)
  socket.connect(options.trade_pub)
  socket.setsockopt(zmq.SUBSCRIBE, "^EMAIL$")

  trade_in_socket = context.socket(zmq.REQ)
  trade_in_socket.connect(options.trade_in)

  application_trade_client = TradeClient( context, trade_in_socket)
  application_trade_client.connect()

  login_response = application_trade_client.sendJSON( MessageBuilder.login( 8999999,
                                                                            options.mailer_username,
                                                                            options.mailer_password))
  if login_response.get('UserStatus') != 1:
    raise RuntimeError("Invalid user id")

  brokers = {}
  broker_list, broker_list_columns = application_trade_client.getBrokerList(['1'])
  for b in  broker_list:
    brokers[b[0]] = { "params": b }

  broker_mandrill_column_index = None
  try:
    broker_mandrill_column_index = broker_list_columns.index('MandrillApiKey')
  except ValueError:
    pass


  for broker_id, broker_data  in brokers.iteritems():
    if broker_mandrill_column_index and broker_data['params'][ broker_mandrill_column_index ]:
      broker_data['MandrillApiKey'] =  broker_data['params'][ broker_mandrill_column_index ]
    else:
      broker_data['MandrillApiKey'] = options.mandrill_apikey

  for broker_id, broker_data  in brokers.iteritems():
    print broker_id, broker_data['MandrillApiKey']

  # [u'BrokerID', u'ShortName', u'BusinessName', u'Address', u'City', u'State',
  #  u'ZipCode', u'Country', u'PhoneNumber1', u'PhoneNumber2', u'Skype', u'Currencies',
  #  u'TosUrl', u'FeeStructure', u'TransactionFeeBuy', u'TransactionFeeSell', u'Status',
  #  u'ranking', u'Email', u'CountryCode', u'CryptoCurrencies', u'WithdrawStructure',
  #  u'SupportURL', u'SignupLabel', u'AcceptCustomersFrom', u'IsBrokerHub']

  mailchimp_api =  mailchimp.Mailchimp(options.mailchimp_apikey)
  try:
    mailchimp_api.helper.ping()
  except mailchimp.Error:
    raise RuntimeError("Invalid MailChimp API key")

  mandrill_api = mandrill.Mandrill(options.mandrill_apikey)
  try:
    mandrill_api.users.ping()
  except mandrill.Error:
    raise RuntimeError("Invalid Mandrill API key")

  while True:
    try:
      raw_email_message = socket.recv()
      log('IN', 'TRADE_IN_PUB', raw_email_message)

      msg = JsonMessage(raw_email_message)

      if not msg.isEmail():
        log('ERROR',
            'EXCEPTION',
            'Received message is not an email message')
        continue

      try:
        broker_id = msg.get('BrokerID')
        sender =  brokers[broker_id]['params'][broker_list_columns.index('MailerFromName')]  + \
                  '<' + brokers[broker_id]['params'][broker_list_columns.index('MailerFromEmail')] + '>'
        body = ""
        msg_to    = msg.get('To')
        subject   = msg.get('Subject')
        language  = msg.get('Language')
        content_type = 'plain'

        if msg.has('Template') and msg.get('Template'):
          params = {}
          if msg.has('Params') and msg.get('Params'):
            params = json.loads(msg.get('Params'))

          template_name = msg.get('Template')


          if template_name  == 'welcome':
            # user signup .... let's register him on mailchimp newsletter
            try:
              mailchimp_api.lists.subscribe(
                id =  brokers[broker_id]['params'][broker_list_columns.index('MailchimpListID')],
                email = {'email': params['email'] },
                merge_vars = {'EMAIL' : params['email'], 'FNAME': params['username'] } )

            except mailchimp.ListAlreadySubscribedError:
              log('ERROR', 'EXCEPTION', params['email'] + ' mailchimp.ListAlreadySubscribedError' )
            except mailchimp.Error, e:
              log('ERROR', 'EXCEPTION', str(e))


          template_content = []
          for k,v in params.iteritems():
            template_content.append( { 'name': k, 'content': v  } )

          for broker_column_key in broker_list_columns:
            broker_column_value  = brokers[broker_id]['params'][broker_list_columns.index(broker_column_key)]
            template_content.append( { 'name': 'broker_' + convertCamelCase2Underscore(broker_column_key),
                                       'content': broker_column_value  } )


          message = {
            'from_email': brokers[broker_id]['params'][broker_list_columns.index('MailerFromEmail')],
            'from_name': brokers[broker_id]['params'][broker_list_columns.index('MailerFromName')],
            'to': [{'email': msg_to, 'name': params['username'],'type': 'to' }],
            'metadata': {'website': 'www.blinktrade.com'},
            'global_merge_vars': template_content
          }

          result = mandrill_api.messages.send_template(
            template_name= (template_name + '-' + language.replace('_','-') ).lower(),
            template_content=template_content,
            message=message)

          log('INFO', 'SUCCESS', str(result))
          continue

        elif msg.has('RawData') and msg.get('RawData'):
          body = msg.get('RawData')

          log('DEBUG', 'EMAIL',
              u'{"Sender":"%s","To":"%s","Subject":"%s", "Body":"%s" }' % (sender,
                                                                           msg_to,
                                                                           subject,
                                                                           body))
          send_email(sender, msg_to, subject, body, content_type)
          log('IN', 'SENT', "")

          log('INFO', 'SUCCESS', msg.get('EmailThreadID'))
      except Exception as ex:
        traceback.print_exc()
        log('ERROR', 'EXCEPTION', str(ex))
        time.sleep(1)

    except KeyboardInterrupt:
      mail_logger.info('END')
      break

    except Exception as ex:
      time.sleep(1)


def main():
  parser = argparse.ArgumentParser(description="Blinktrade Mailer application")
  parser.add_argument('-i', "--instance", action="store", dest="instance", help='Instance name', type=str)
  parser.add_argument('-c', "--config",
                      action="store",
                      dest="config",
                      default=os.path.expanduser('~/.blinktrade/bitex.ini'),
                      help='Configuration file', type=str)
  arguments = parser.parse_args()

  if not arguments.instance:
    parser.print_help()
    return

  candidates = [ os.path.join(site_config_dir('blinktrade'), 'bitex.ini'),
                 os.path.expanduser('~/.blinktrade/bitex.ini'),
                 arguments.config]
  config = ConfigParser.SafeConfigParser()
  config.read( candidates )

  options = ProjectOptions(config, arguments.instance)

  if not options.mailchimp_apikey or\
     not options.mandrill_apikey or\
     not options.mailchimp_newsletter_list_id or\
     not options.trade_in or\
     not options.mailer_username or\
     not options.mailer_password or\
     not options.trade_pub or \
     not options.mailer_log :
    raise RuntimeError("Invalid configuration file")

  run_application(options, arguments.instance)


if __name__ == '__main__':
  main()

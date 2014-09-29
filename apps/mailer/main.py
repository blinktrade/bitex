#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import traceback
import argparse
import ConfigParser
from appdirs import site_config_dir

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

import time
from util import send_email

from pyblinktrade.message import JsonMessage
from pyblinktrade.project_options import ProjectOptions

import logging, logging.handlers

import json
import zmq

import mailchimp
import mandrill


def run_application(options):
  input_log_file_handler = logging.handlers.TimedRotatingFileHandler(
    options.mailer_log, when='MIDNIGHT')
  formatter = logging.Formatter(u"%(asctime)s - %(message)s")
  input_log_file_handler.setFormatter(formatter)

  mail_logger = logging.getLogger('mailer')
  mail_logger.setLevel(logging.INFO)
  mail_logger.addHandler(input_log_file_handler)
  mail_logger.info('START')

  ch = logging.StreamHandler(sys.stdout)
  ch.setLevel(logging.DEBUG)
  ch.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
  mail_logger.addHandler(ch)


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

  def log(command, key, value=None):
    log_msg = u'%s, %s, %s' %(command, key, value if value else None)
    mail_logger.info(unicode(log_msg))
    pass

  log('PARAM', 'BEGIN')
  log('PARAM', 'trade_pub', options.trade_pub)
  log('PARAM', 'mailer_log', options.mailer_log)
  log('PARAM', 'END')

  context = zmq.Context()
  socket = context.socket(zmq.SUB)
  socket.connect(options.trade_pub)
  socket.setsockopt(zmq.SUBSCRIBE, "EMAIL")

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
        sender = u'BitEx Support <suporte@bitex.com.br>'
        body = ""
        msg_to = msg.get('To')
        subject = msg.get('Subject')
        language = msg.get('Language')
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
                id = options.mailchimp_newsletter_list_id ,
                email = {'email': params['email'] },
                merge_vars = {'EMAIL' : params['email'], 'FNAME': params['username'] } )

            except mailchimp.ListAlreadySubscribedError:
              log('ERROR', 'EXCEPTION', params['email'] + ' mailchimp.ListAlreadySubscribedError' )
            except mailchimp.Error, e:
              log('ERROR', 'EXCEPTION', str(e))


          template_content = []
          for k,v in params.iteritems():
            template_content.append( { 'name': k, 'content': v  } )

          message = {
            'to': [ {'email': msg_to, 'name': params['username'],'type': 'to' }  ],
            'metadata': {'website': 'www.bitex.com.br'},
            'global_merge_vars': template_content
          }

          result = mandrill_api.messages.send_template(
            template_name= (template_name + '-' + language).lower(),
            template_content=template_content,
            message=message)

          log('INFO', 'SUCCESS', str(result))
          continue

        elif msg.has('RawData') and msg.get('RawData'):
          body = msg.get('RawData')

        log('IN', 'LOGINDEBUG START', "")
        log('DEBUG',
            'EMAIL',
            u'{"Sender":"%s","To":"%s","Subject":"%s", "Body":"%s" }' % (sender,
                                                                         msg_to,
                                                                         subject,
                                                                         body))
        log('IN', 'LOGINDEBUG END', "")
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
  parser.add_argument('-c', "--config", action="store", dest="config", default=os.path.expanduser('~/.bitex/bitex.ini'), help='Configuration file', type=str)
  arguments = parser.parse_args()

  if not arguments.instance:
    parser.print_help()
    return

  candidates = [ os.path.join(ROOT_PATH, 'config/bitex.ini'),
                 os.path.join(site_config_dir('bitex'), 'bitex.ini'),
                 arguments.config]
  config = ConfigParser.SafeConfigParser()
  config.read( candidates )

  options = ProjectOptions(config, arguments.instance)

  if not options.mailchimp_apikey or\
     not options.mandrill_apikey or\
     not options.mailchimp_newsletter_list_id or\
     not options.trade_pub or\
     not options.mailer_log :
    raise RuntimeError("Invalid configuration file")

  run_application(options)


if __name__ == '__main__':
  main()

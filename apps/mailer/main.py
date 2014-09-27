#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import logging
import traceback

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert(0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert(0, os.path.join(ROOT_PATH, 'apps'))

DEFAULT_TEMPLATE_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "templates/"))

import time
from util import send_email

from tornado.options import define, options
import tornado

from bitex.message import JsonMessage

define("trade_pub", help="zmq publisher queue")
define("mailchimp_apikey", help="mailchimp api key")
define("mailchimp_newsletter_list_id", help="mailchimp newsletter list id")
define("mandrill_apikey", help="mandrill api key")
define("mailer_log",default=os.path.join(ROOT_PATH,"logs/","mailer.log"),help="logging")
define("config", default=os.path.join(ROOT_PATH, "config/", "mailer.conf"), help="config file", callback=lambda path: tornado.options.parse_config_file(path, final=False))

import json
import zmq
import mailchimp
import mandrill

def main():
    tornado.options.parse_command_line()
    if not options.trade_pub or\
       not options.mailchimp_apikey or\
       not options.mailchimp_newsletter_list_id or\
       not options.mandrill_apikey or\
       not options.mailer_log :
      tornado.options.print_help()
      return

    mailchimp_api =  mailchimp.Mailchimp(options.mailchimp_apikey)
    try:
        mailchimp_api.helper.ping()
    except mailchimp.Error:
        print "Invalid MailChimp API key"
        return

    mandrill_api = mandrill.Mandrill(options.mandrill_apikey)
    try:
        mandrill_api.users.ping()
    except mandrill.Error:
        print "Invalid Mandrill API key"
        return

    print mandrill_api.users.senders()


    input_log_file_handler = logging.handlers.TimedRotatingFileHandler(
        options.mailer_log,
        when='MIDNIGHT')
    formatter = logging.Formatter(u"%(asctime)s - %(message)s")
    input_log_file_handler.setFormatter(formatter)

    mail_logger = logging.getLogger("REPLAY")
    mail_logger.setLevel(logging.INFO)
    mail_logger.addHandler(input_log_file_handler)
    mail_logger.info('START')

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

if __name__ == '__main__':
    main()

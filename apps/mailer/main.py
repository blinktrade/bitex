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

from tornado import template
from tornado.options import define, options
import tornado

from bitex.message import JsonMessage

define("trade_pub", default="tcp://127.0.0.1:5756", help="zmq publisher queue")
define(
    "template_dir",
    default=DEFAULT_TEMPLATE_PATH,
    help="email template path")
define(
    "mailer_log",
    default=os.path.join(
        ROOT_PATH,
        "logs/",
        "mailer.log"),
    help="logging")


tornado.options.parse_config_file(
    os.path.join(
        ROOT_PATH,
        "config/",
        "mailer.conf"))
tornado.options.parse_command_line()

import json
import zmq


def main():
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
        #log_msg = u'%s, %s, %s' %(command, key, value if value else None)
        #mail_logger.info(unicode(log_msg))
        pass

    log('PARAM', 'BEGIN')
    log('PARAM', 'trade_pub', options.trade_pub)
    log('PARAM', 'template_dir', options.template_dir)
    log('PARAM', 'mailer_log', options.mailer_log)
    log('PARAM', 'END')

    template_loader = template.Loader(options.template_dir)

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
                sender = u'BitEx Suporte <suporte@bitex.com.br>'
                body = ""
                msg_to = msg.get('To')
                subject = msg.get('Subject')
                content_type = 'plain'

                if msg.has('Template') and msg.get('Template'):
                    template_name = msg.get('Template')

                    if template_name[-4:] == 'html':
                        content_type = 'html'

                    t_loader = template_loader.load(template_name)

                    params = {}
                    if msg.has('Params') and msg.get('Params'):
                        params = json.loads(msg.get('Params'))

                    body = t_loader.generate(**params).decode('utf-8')

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

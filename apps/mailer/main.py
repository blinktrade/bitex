# -*- coding: utf-8 -*-

import os
import sys
import  logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from datetime import timedelta

import  time
from bitex.client import BitExThreadedClient

from smtplib import SMTP
from email.MIMEText import MIMEText
from email.Header import Header
from email.Utils import parseaddr, formataddr


def send_email(sender, recipient, subject, body):
    """Send an email.

    All arguments should be Unicode strings (plain ASCII works as well).

    Only the real name part of sender and recipient addresses may contain
    non-ASCII characters.

    The email will be properly MIME encoded and delivered though SMTP to
    localhost port 25.  This is easy to change if you want something different.

    The charset of the email will be the first one out of US-ASCII, ISO-8859-1
    and UTF-8 that can represent all the characters occurring in the email.
    """
    print  'send_email', recipient, subject 

    # Header class is smart enough to try US-ASCII, then the charset we
    # provide, then fall back to UTF-8.
    header_charset = 'ISO-8859-1'

    # We must choose the body charset manually
    for body_charset in 'US-ASCII', 'ISO-8859-1', 'UTF-8':
        try:
            body.encode(body_charset)
        except UnicodeError:
            pass
        else:
            break

    # Split real name (which is optional) and email address parts
    sender_name, sender_addr = parseaddr(sender)
    recipient_name, recipient_addr = parseaddr(recipient)

    # We must always pass Unicode strings to Header, otherwise it will
    # use RFC 2047 encoding even on plain ASCII strings.
    sender_name = str(Header(unicode(sender_name), header_charset))
    recipient_name = str(Header(unicode(recipient_name), header_charset))

    # Make sure email addresses do not contain non-ASCII characters
    sender_addr = sender_addr.encode('ascii')
    recipient_addr = recipient_addr.encode('ascii')

    # Create the message ('plain' stands for Content-Type: text/plain)
    msg = MIMEText(body.encode(body_charset), 'plain', body_charset)
    msg['From'] = formataddr((sender_name, sender_addr))
    msg['To'] = formataddr((recipient_name, recipient_addr))
    msg['Subject'] = Header(unicode(subject), header_charset)

    # Send the message via SMTP to localhost:25
    smtp = SMTP("127.0.0.1")
    smtp.ehlo()
    smtp.sendmail('suporte@bitex.com.br', recipient, msg.as_string())
    smtp.quit()


def main():
  while  True:
    try:
      ws = BitExThreadedClient('wss://test.bitex.com.br:8449/trade')
      def on_login(sender, msg):
        ws.sendMsg( {'MsgType':'S0', 'EmailReqID':'0' } )


      def on_message(sender, msg):
        if msg['MsgType'] == 'C':
          try:
            sender = u'BitEx Suporte <suporte@bitex.com.br>'
            send_email (sender, msg['To'], msg['Subject'], msg['Body'] )
          except Exception as ex:
            print "Error: unable to send email to " + str(msg['To']) + ' - ' + str(ex) 
            
        else:
          print 'received ' , msg
          print ''


      ws.signal_logged.connect(on_login)
      ws.signal_recv.connect(on_message)

      ws.connect()

      # TODO: get the user and password from a configuration file
      ws.login('mailer','abc123$%')

      ws.run_forever()

    except KeyboardInterrupt:
      print 'Exiting'
      ws.close()
      break

    except Exception, e:
      print 'Error ', e
      print 'reconnecting in 1 sec'
      time.sleep(1)


if __name__ == '__main__':
  main()
  #sender = u'BitEx Suporte <suporte@bitex.com.br>'
  #send_email (sender, 'clebsonbr@yahoo.com', 'Checking server i6', '\r\nyour offer was execued\r\ncheers,\r\nBitex Admin' )
  #send_email (sender, 'clebaum@hotmail.com', 'Checking server 5x', 'yo, your offer was execued\r\ncheers,\r\nBitex Admin' )


#!/usr/bin/env python

import os
import sys
import  logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from datetime import timedelta

import  time
from bitex.client import BitExThreadedClient

import smtplib

def main():
  while  True:
    try:
      ws = BitExThreadedClient('wss://localhost:8443/trade')
      def on_login(sender, msg):
        ws.sendMsg( {'MsgType':'S0', 'EmailReqID':'0' } )


      def on_message(sender, msg):
        if msg['MsgType'] == 'C':
          try:
            body = msg['To']
            if not len(body):
              body = '.'

            smtpObj = smtplib.SMTP('127.0.0.1')
            smtpObj.ehlo()
            smtpObj.sendmail('bzero@bitex.com.br', [ msg['To'] ], body)
          except Exception as ex:
            print "Error: unable to send email to " + str(msg['To'])
            
        else:
          print 'received ' , msg
          print ''


      ws.signal_logged.connect(on_login)
      ws.signal_recv.connect(on_message)

      ws.connect()

      # TODO: get the user and password from a configuration file
      ws.login('mailer','abc123')

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

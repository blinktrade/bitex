#!/usr/bin/env python
import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from time import sleep
import blockscore
import ConfigParser
from bitex.client import BitExThreadedClient
from ws4py.exc import HandshakeError


def main():
  candidates = [ 'verification.ini' ,'blockscore.ini']
  if len(sys.argv) > 1:
    candidates.append(sys.argv[1])

  config = ConfigParser.SafeConfigParser({
    'websocket_url': 'wss://127.0.0.1/trade/',
    'username': '',
    'password': '',
    'api_key': '',
  })
  config.read( candidates )

  websocket_url = config.get('blockscore', 'websocket_url')
  username      = config.get('blockscore', 'username')
  password      = config.get('blockscore', 'password')
  api_key       = config.get('blockscore', 'api_key')


  blockscore_client = blockscore.Client({'api_key':api_key})

  def on_verify_customer(sender, msg):
    print msg
    verification = blockscore_client.verification.create(
      date_of_birth = msg.get('VerificationData')['date_of_birth'],
      identification = {
        'ssn': msg.get('VerificationData')['ssn']
      },
      name = {
        'first': msg.get('VerificationData')['name']['first'],
        'middle': msg.get('VerificationData')['name']['middle'],
        'last': msg.get('VerificationData')['name']['last'],
      },
      address = {
        'street1': msg.get('VerificationData')['address']['street1'],
        'street2': msg.get('VerificationData')['address']['street2'],
        'city': msg.get('VerificationData')['address']['city'],
        'state': msg.get('VerificationData')['address']['state'],
        'postal_code': msg.get('VerificationData')['address']['postal_code'],
        'country_code': msg.get('VerificationData')['address']['country_code'],
      }
    )

    verification = verification.body

    print verification


  ws = BitExThreadedClient( websocket_url )
  ws.signal_verify_customer_update.connect(on_verify_customer)
  ws.connect()
  ws.login(username, password)

  while True:
    try:
      sleep(30)
      if ws.is_connected:
        ws.testRequest()
      else:
        try:
          ws.close()
        except HandshakeError,e:
          del ws
          ws = BitExThreadedClient( websocket_url )
          ws.signal_verify_customer_update.connect(on_verify_customer)
          ws.connect()
          ws.login(username, password)

    except KeyboardInterrupt:
      ws.close()
      break


main()
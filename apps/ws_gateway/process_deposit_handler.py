import sys
import os
sys.path.insert(0, os.path.join( os.path.dirname(__file__), '../' ) )

import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

from trade.zmq_client import  TradeClientException

class ProcessDepositHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(ProcessDepositHandler, self).__init__(application, request, **kwargs)
    self.remote_ip = request.headers.get('X-Forwarded-For', request.headers.get('X-Real-Ip', request.remote_ip))

  def get(self, *args, **kwargs):
    secret = self.get_argument("s", default=None, strip=False)
    if not secret:
      raise tornado.httpclient.HTTPError( 404 )

    fwd_fee                 = int(self.get_argument("fwd_fee",            default=0, strip=False))
    input_fee               = int(self.get_argument("input_fee",          default=0, strip=False))
    value                   = int(self.get_argument("value",              default=0, strip=False))
    input_address           = self.get_argument("input_address",          default=None, strip=False)
    input_transaction_hash  = self.get_argument("input_transaction_hash", default=None, strip=False)
    transaction_hash        = self.get_argument("transaction_hash",       default=None, strip=False)
    confirmations           = self.get_argument("confirmations",          default=0, strip=False)
    payee_addresses         = self.get_argument("payee_addresses",        default=None, strip=False)

    import random
    req_id = random.randrange(600000,900000)

    payee_addresses_json = None
    if payee_addresses:
      try:
        payee_addresses_json = json.loads(payee_addresses)
      except Exception,e:
        pass



    process_deposit_message = {
      'MsgType': 'B0',
      'ProcessDepositReqID':req_id,
      'Action': 'COMPLETE',
      'Secret': secret,
      'Amount': value,
      'Data': {
        'Confirmations': int(confirmations),
        'InputAddress': input_address,
        'InputTransactionHash': input_transaction_hash,
        'TransactionHash': transaction_hash,
      }
    }

    if fwd_fee:
      process_deposit_message['Data']['ForwardFee'] = fwd_fee

    if input_fee:
      process_deposit_message['Data']['InputFee'] = input_fee

    if payee_addresses_json:
      process_deposit_message['Data']['PayeeAddresses'] = json.dumps(payee_addresses_json)

    try:
      response_msg = self.application.application_trade_client.sendJSON(process_deposit_message)
    except TradeClientException, e:
      self.write_error(400)
      return

    if response_msg.get('Status') == '4':
      self.write("*ok*")
    self.write("")

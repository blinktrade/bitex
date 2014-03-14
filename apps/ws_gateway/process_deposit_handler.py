import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

class ProcessDepositHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(ProcessDepositHandler, self).__init__(application, request, **kwargs)
    self.remote_ip = request.headers.get('X-Forwarded-For', request.headers.get('X-Real-Ip', request.remote_ip))

  def get(self, *args, **kwargs):
    secret = self.get_argument("s", default=None, strip=False)
    if not secret:
      raise tornado.httpclient.HTTPError( 404 )

    value                   = self.get_argument("value",                  default=0, strip=False)
    input_address           = self.get_argument("input_address",          default=None, strip=False)
    input_transaction_hash  = self.get_argument("input_transaction_hash", default=None, strip=False)
    transaction_hash        = self.get_argument("transaction_hash",       default=None, strip=False)
    confirmations           = self.get_argument("confirmations",          default=0, strip=False)

    process_deposit_message = {
      'MsgType': 'B0',
      'ProcessDepositReqID':0,
      'Action': 'PROCESS',
      'Secret': secret,
      'Amount': int(value),
      'Data': json.dumps({
        'Confirmations': int(confirmations),
        'InputAddress': input_address,
        'InputTransactionHash': input_transaction_hash,
        'TransactionHash': transaction_hash
      })
    }

    response_msg = self.application.application_trade_client.sendJSON(process_deposit_message)

    if response_msg.get('Status') == '4':
      self.write("*ok*")
    self.write("")

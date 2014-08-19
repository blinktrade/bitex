import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

class DepositReceiptWebHookHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(DepositReceiptWebHookHandler, self).__init__(application, request, **kwargs)

  def post(self, *args, **kwargs):
    submissionID  = self.get_argument('submissionID')

    raw_request = json.loads(self.get_argument('rawRequest'))
    deposit_id      = None
    deposit_receipt = None
    for key, value in raw_request.iteritems():
      if 'deposit_id' in key:
        deposit_id = value
      elif 'depositReceipt' in key:
        deposit_receipt = value

    import random
    req_id = random.randrange(600000,900000)

    message = {
      'MsgType': 'B0',
      'ProcessDepositReqID':req_id,
      'Action': 'CONFIRM',
      'DepositID': deposit_id,
      'Data': {
        'DepositReceipt': deposit_receipt,
        'SubmissionID': submissionID
      }
    }

    self.application.application_trade_client.sendJSON(message)
    self.write('*ok*')

import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

class VerificationWebHookHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(VerificationWebHookHandler, self).__init__(application, request, **kwargs)

  def post(self, *args, **kwargs):
    formID        = self.get_argument('formID')
    submissionID  = self.get_argument('submissionID')

    raw_request = json.loads(self.get_argument('rawRequest'))
    broker_id     = None
    user_id       = None
    for key, value in raw_request.iteritems():
      if 'broker_id' in key:
        broker_id = int(value)
      if 'user_id' in key:
        user_id = int(value)


    import random
    req_id = random.randrange(600000,900000)

    verify_request_message = {
      'MsgType': 'B8',
      'VerifyCustomerReqID':req_id,
      'ClientID': user_id,
      'BrokerID': broker_id,
      'VerificationData':  {
        'formID': formID,
        'submissionID': submissionID
      },
      'Verify': 1
    }

    self.application.application_trade_client.sendJSON(verify_request_message)
    self.write('*ok*')

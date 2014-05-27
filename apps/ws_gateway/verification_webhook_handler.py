import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

class VerificationWebHookHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(VerificationWebhookHandler, self).__init__(application, request, **kwargs)
    self.remote_ip = request.headers.get('X-Forwarded-For', request.headers.get('X-Real-Ip', request.remote_ip))

  def post(self, *args, **kwargs):
    # TODO: get username, user_id, formID, submissionID and send it to trade.
    self.write("*ok*")

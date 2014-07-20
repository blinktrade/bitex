import tornado.web
import tornado.httpclient


from tornado.escape import json_encode


class ReceiveHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):
    method = self.get_argument("method")
    address = self.get_argument("address")
    callback = self.get_argument("callback")

    if method != 'create':
      raise tornado.web.MissingArgumentError('method')

    input_address = self.application.bitcoind.getnewaddress('')

    result = {
      'input_address': input_address,
      'fee_percent' : 0,
      'destination' : address,
      'callback'    : callback
    }

    self.write(json_encode(result))

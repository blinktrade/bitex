__author__ = 'rodrigo'

from bitex.message import JsonMessage

from bitex.json_encoder import  JsonEncoder

from tornado import  websocket


class MdGatewayHandler(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(MdGatewayHandler, self).__init__(application, request, **kwargs)
    self.md_subscriptions = {}


  def on_message(self, raw_message):
    msg = JsonMessage(raw_message)
    if not msg.is_valid():
      self.close()
      return

    if  msg.type == '1': # TestRequest
      # send the heart beat back
      self.write_message( '{"MsgType":"0", "TestReqID":"%s"}'%msg.get("TestReqID"))
      return

    elif  msg.type == 'V':  # Market Data Request
      req_id = msg.get('MDReqID')
      if int(msg.get('SubscriptionRequestType')) == 0: # Snapshot
        pass

      elif int(msg.get('SubscriptionRequestType')) == 1:  # Snapshot + Updates
        if req_id not in self.md_subscriptions:
          self.md_subscriptions[req_id] = []

      elif int(msg.get('SubscriptionRequestType')) == 2: # Disable previous Snapshot + Update Request
        if req_id in self.md_subscriptions:
          del self.md_subscriptions[req_id]
      return




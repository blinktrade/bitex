__author__ = 'rodrigo'
import json


class BaseMessage(object):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, message):
    pass

  def get(self, attr):
    raise  NotImplementedError()

  def is_valid(self):
    raise  NotImplementedError()


class JsonMessage(BaseMessage):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, message):
    super(JsonMessage, self).__init__(message)
    self.valid = False

    # parse the message
    self.message = json.loads(str(message))

    # make sure a malicious users didn't send us more than 4096 bytes
    if len(message) > self.MAX_MESSAGE_LENGTH:
      return

    if 'MsgType' not in self.message:
      return

    self.type = self.message['MsgType']
    del self.message['MsgType']


    self.valid = True


    #validate Type
    if self.type not in ('0', '1', 'V', 'Y', 'BE', 'D', 'F', 'U0'):
      self.valid = False
      return

    # validate all fields
    if self.type == '0':  #Heartbeat
      self.valid = self.valid and  'TestReqID' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of Heartbeat Message

    elif self.type == '1':  # TestRequest
      self.valid = self.valid and  'TestReqID' in self.message
      if not self.valid:
        return
      #TODO: Validate all fields of TestRequest Message


    elif self.type == 'V':  #MarketData Request
      self.valid = self.valid and  'MDReqID' in self.message
      self.valid = self.valid and  'SubscriptionRequestType' in self.message
      self.valid = self.valid and  'MarketDepth' in self.message
      self.valid = self.valid and  ( self.message['SubscriptionRequestType'] == '1' and 'MDUpdateType' in self.message )
      if not self.valid:
        return

      #TODO: Validate all fields of MarketData Request Message

    elif self.type == 'Y':
      self.valid = self.valid and  'MDReqID' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of MarketData Request Cancel Message

    elif self.type == 'BE':  #logon
      self.valid = self.valid and  'UserReqID' in self.message
      self.valid = self.valid and  'Username' in self.message
      self.valid = self.valid and  'UserReqTyp' in self.message

      reqId = self.message.get('UserReqID')
      if reqId in ('1', '3'):
        self.valid = self.valid and  'Password' in self.message

      if reqId == '3':
        self.valid = self.valid and  'NewPassword' in self.message

      if not self.valid:
        return

      #TODO: Validate all fields of Logon Message


    elif self.type == 'U0':  #Signup
      self.valid = self.valid and  'Username' in self.message
      self.valid = self.valid and  'Password' in self.message
      self.valid = self.valid and  'FirstName' in self.message
      self.valid = self.valid and  'LastName' in self.message
      self.valid = self.valid and  'Email' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of Signup Message

    elif self.type == 'D':  #New Order Single
      self.valid = self.valid and  'ClOrdID' in self.message
      self.valid = self.valid and  'Symbol' in self.message
      self.valid = self.valid and  'Side' in self.message
      self.valid = self.valid and  'OrdType' in self.message
      self.valid = self.valid and  'Price' in self.message
      self.valid = self.valid and  'OrderQty' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of New Order Single Message

    elif self.type == 'F':  #Order Cancel Request
      self.valid = self.valid and  ('OrderID'  in self.message or 'OrigClOrdID'  in self.message)
      self.valid = self.valid and  'ClOrdID' in self.message
      self.valid = self.valid and  'Symbol' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of Order Cancel Message


  def get(self, attr):
    return self.message[attr]

  def is_valid(self):
    return self.valid

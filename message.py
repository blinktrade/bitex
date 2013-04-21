__author__ = 'rodrigo'


class BaseMessage(object):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, message):
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


  def get(self, attr):
    return self.message[attr]

  def is_valid(self):
    return self.valid

class PublicClientMessage(BaseMessage):

  def __init__(self, message):
    super(PublicClientMessage, self).__init__(message)
    if not self.is_valid():
      return


    #validate Type
    if self.type not in ( 'V', 'Y'):
      self.valid = False
      return

    # validate all fields
    if self.type == 'V':  #Heartbeat
      self.valid = self.valid and  'MDReqID' in self.message
      self.valid = self.valid and  'SubscriptionRequestType' in self.message
      self.valid = self.valid and  'MarketDepth' in self.message
      self.valid = self.valid and  ( self.message['SubscriptionRequestType'] == '1' and 'MDUpdateType' in self.message )
      if not self.valid:
        return

    if self.type == 'Y':  #Heartbeat
      self.valid = self.valid and  'MDReqID' in self.message
      if not self.valid:
        return



class LoggedClientMessage(PublicClientMessage):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, message):
    super(LoggedClientMessage, self).__init__(message)
    if not self.is_valid():
      return

    #validate Type
    if self.type not in ( '0', 'A', 'D', 'F'):
      self.valid = False
      return

    # validate all fields
    if self.type == '0':  #Heartbeat
      self.valid = self.valid and  'TestReqID' in self.message
      if not self.valid:
        return

    elif self.type == 'A':  #logon
      self.valid = self.valid and  'Username' in self.message
      self.valid = self.valid and  'Password' in self.message
      self.valid = self.valid and  'HeartBtInt' in self.message
      if not self.valid:
        return

    elif self.type == 'D':  #New Order Single
      self.valid = self.valid and  'ClOrdID' in self.message
      self.valid = self.valid and  'Symbol' in self.message
      self.valid = self.valid and  'Side' in self.message
      self.valid = self.valid and  'OrdType' in self.message
      self.valid = self.valid and  'Price' in self.message
      self.valid = self.valid and  'OrderQty' in self.message
      if not self.valid:
        return

    elif self.type == 'F':  #Order Cancel Request
      self.valid = self.valid and  ('OrderID'  in self.message or 'OrigClOrdID'  in self.message)
      self.valid = self.valid and  'ClOrdID' in self.message
      self.valid = self.valid and  'Symbol' in self.message
      if not self.valid:
        return


__author__ = 'rodrigo'
import json


class BaseMessage(object):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, raw_message):
    pass

  def has(self, attr):
    raise  NotImplementedError()

  def get(self, attr, default):
    raise  NotImplementedError()

  def is_valid(self):
    raise  NotImplementedError()


class JsonMessage(BaseMessage):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, raw_message):
    super(JsonMessage, self).__init__(raw_message)
    self.valid = False

    # make sure a malicious users didn't send us more than 4096 bytes
    if len(raw_message) > self.MAX_MESSAGE_LENGTH:
      return

    # parse the message
    self.message = json.loads(str(raw_message))

    if 'MsgType' not in self.message:
      return

    self.type = self.message['MsgType']
    del self.message['MsgType']


    self.valid = True


    #validate Type
    if self.type not in ('0', '1', 'V', 'Y', 'BE', 'D', 'F', 'U0', 'U2', 'U4', 'U6', 'U8', 'U9',
                         'U10', 'U12', 'U13', 'U14', 'U16', 'U18',
                         'S0',  'DEPOSIT', 'BTC_DEPOSIT', 'BITCOIN_NEW_ADDRESS',
                         'ADMIN_SELECT', 'BOLETO_PAYMENT'):
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
      self.valid = self.valid and  'Email' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of Signup Message

    elif self.type == 'U10':  #Request Reset Password
      self.valid = self.valid and  'Email' in self.message

    elif self.type == 'U12':  #Reset Password
      self.valid = self.valid and  'Token' in self.message
      self.valid = self.valid and  'NewPassword' in self.message

    elif self.type == 'U16':  #Enable Disable Two Factor Authentication
      self.valid = self.valid and  'Enable' in self.message

    elif self.type == 'U18': # Generate Boleto
      self.valid = self.valid and  'BoletoId' in self.message
      self.valid = self.valid and  'Value' in self.message

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

      #TODO: Validate all fields of New Order Single Message

    elif self.type == 'F':  #Order Cancel Request
      if not self.valid:
        return

      #TODO: Validate all fields of Order Cancel Message


    elif self.type == 'U2' :  # User Balance
      self.valid = self.valid and  'BalanceReqID' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of Request For Balance Message


    elif self.type == 'U4': #  Orders List
      self.valid = self.valid and  'OrdersReqID' in self.message
      if not self.valid:
        return

      #TODO: Validate all fields of Request For Open Orders Message

    elif self.type == 'U6': # Request for BTC Withdraw
      self.valid = self.valid and  'WithdrawReqID' in self.message
      self.valid = self.valid and  'Amount' in self.message
      self.valid = self.valid and  'Wallet' in self.message

      if not self.valid:
        return

      #TODO: Validate all fields of Request For BTC Withdraw  Message

    elif self.type == 'U8': # Request for BRL Withdraw
      self.valid = self.valid and  'WithdrawReqID' in self.message
      self.valid = self.valid and  'Amount' in self.message
      self.valid = self.valid and  'BankNumber' in self.message
      self.valid = self.valid and  'BankName' in self.message
      self.valid = self.valid and  'AccountName' in self.message
      self.valid = self.valid and  'AccountNumber' in self.message
      self.valid = self.valid and  'AccountBranch' in self.message
      self.valid = self.valid and  'CPFCNPJ' in self.message

      if not self.valid:
        return

        #TODO: Validate all fields of Request For BTC Withdraw  Message

    elif self.type == 'S0': # Subscribe to emails
      self.valid = self.valid and  'EmailReqID' in self.message

      if not self.valid:
        return

    elif self.type == 'BITCOIN_NEW_ADDRESS':
      self.valid = self.valid and  'BtcAddress' in self.message
      if not self.valid:
        return


  def has(self, attr):
    return attr in self.message

  def get(self, attr , default=None):
    if attr not in self.message:
      return  default
    return self.message[attr]

  def is_valid(self):
    return self.valid

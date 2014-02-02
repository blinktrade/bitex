__author__ = 'rodrigo'
import json

class InvalidMessageException(Exception):
  def __init__(self, raw_message, json_message=None, tag=None, value=None):
    super(InvalidMessageException, self).__init__()
    self.raw_message = raw_message
    self.json_message = json_message
    self.tag = tag
    self.value = value
  def __str__(self):
    return 'Invalid Message'

class InvalidMessageLengthException(InvalidMessageException):
  def __str__(self):
    return 'Invalid message length'

class InvalidMessageTypeException(InvalidMessageException):
  def __str__(self):
    return 'Invalid Message Type (%s)' % str(self.tag)

class InvalidMessageMissingTagException(InvalidMessageException):
  def __str__(self):
    return 'Missing tag %s' % str(self.tag)

class InvalidMessageFieldException(InvalidMessageException):
  def __str__(self):
    return 'Invalid value tag(%s)=%s'%(self.tag, self.value)

class BaseMessage(object):
  MAX_MESSAGE_LENGTH = 4096
  def __init__(self, raw_message):
    self.raw_message = raw_message

  def has(self, attr):
    raise  NotImplementedError()

  def get(self, attr, default):
    raise  NotImplementedError()

  def is_valid(self):
    raise  NotImplementedError()


class JsonMessage(BaseMessage):
  MAX_MESSAGE_LENGTH = 40096
  def raise_exception_if_required_tag_is_missing(self, tag):
    if tag not in self.message:
      raise InvalidMessageMissingTagException(self.raw_message, self.message, tag)

  def raise_exception_if_not_a_integer(self, tag):
    val = self.get(tag)
    if not type(val) == int:
      raise InvalidMessageFieldException(self.raw_message, self.message, tag, val)

  def raise_exception_if_not_a_number(self, tag):
    val = self.get(tag)
    if not( type(val) == float or type(val) == int):
      raise InvalidMessageFieldException(self.raw_message, self.message, tag, val)

  def raise_exception_if_empty(self, tag):
    val = self.get(tag)
    if not val :
      raise InvalidMessageFieldException(self.raw_message, self.message, tag, val)

  def raise_exception_if_not_greater_than_zero(self, tag):
    self.raise_exception_if_not_a_number(tag)
    val = self.get(tag)
    if not val > 0:
      raise InvalidMessageFieldException(self.raw_message, self.message, tag, val)

  def toJSON(self):
    return self.message

  def __init__(self, raw_message):
    super(JsonMessage, self).__init__(raw_message)
    self.valid = False

    # make sure a malicious users didn't send us more than 4096 bytes
    if len(raw_message) > self.MAX_MESSAGE_LENGTH:
      raise InvalidMessageLengthException(raw_message)

    # parse the message
    self.message = json.loads(raw_message)

    if 'MsgType' not in self.message:
      raise InvalidMessageTypeException(raw_message, self.message)

    self.type = self.message['MsgType']
    del self.message['MsgType']

    self.valid_message_types = {
      '0':   'Heartbeat',
      '1':   'TestRequest',
      'C':   'Email',
      'V':   'MarketDataRequest',
      'W':   'MarketDataFullRefresh',
      'X':   'MarketDataIncrementalRefresh',
      'Y':   'MarketDataRequestReject',
      'BE':  'UserRequest',
      'BF':  'UserResponse',
      'D':   'NewOrderSingle',
      'F':   'OrderCancelRequest',
      'U0':  'Signup',
      'U2':  'UserBalanceRequest',
      'U3':  'UserBalanceResponse',
      'U4':  'OrdersListRequest',
      'U5':  'OrdersListResponse',
      'U6':  'CryptoCoinWithdrawRequest',
      'U7':  'CryptoCoinWithdrawResponse',
      'U8':  'BRLBankTransferWithdrawRequest',
      'U9':  'BRLBankTransferWithdrawResponse',
      'U10': 'ResetPasswordRequest',
      'U11': 'ResetPasswordResponse',
      'U12': 'ResetPasswordRequest',
      'U13': 'ResetPasswordResponse',
      'U16': 'EnableDisableTwoFactorAuthenticationRequest',
      'U17': 'EnableDisableTwoFactorAuthenticationResponse',
      'U18': 'GenerateBoletoRequest',
      'U19': 'GenerateBoletoResponse',
      'U20': 'BoletoOptionsRequest',
      'U21': 'BoletoOptionsResponse',
      'U22': 'BoletoRequest',
      'U23': 'BoletoResponse',
      'U24': 'WithdrawConfirmationRequest',
      'U25': 'WithdrawConfirmationResponse',
      'U26': 'WithdrawListRequest',
      'U27': 'WithdrawListResponse',
      'U28': 'BrokerListRequest',
      'U29': 'BrokerListResponse',

      'S0':  'BitcoinNewAddressRequest',
      'S1':  'BitcoinNewAddressResponse',
      'S2':  'NumberOfFreeBitcoinNewAddressRequest',
      'S3':  'NumberOfFreeBitcoinNewAddressResponse',
      'A0':  'DbQueryRequest',
      'A1':  'DbQueryResponse',
      'ERROR': 'ErrorMessage',
    }


    def make_helper_is_message_type( tag):
      def _method(self):
        return self.type == tag
      return _method

    for k,v in self.valid_message_types.iteritems():
      _method = make_helper_is_message_type(k)
      setattr(JsonMessage, 'is' + v, _method)

    #validate Type
    if self.type not in self.valid_message_types:
      raise InvalidMessageTypeException(raw_message, self.message, self.type)

    # validate all fields
    if self.type == '0':  #Heartbeat
      self.raise_exception_if_required_tag_is_missing('TestReqID')

      #TODO: Validate all fields of Heartbeat Message

    elif self.type == '1':  # TestRequest
      self.raise_exception_if_required_tag_is_missing('TestReqID')

    elif self.type == 'V':  #MarketData Request
      self.raise_exception_if_required_tag_is_missing('MDReqID')
      self.raise_exception_if_required_tag_is_missing('SubscriptionRequestType')
      self.raise_exception_if_required_tag_is_missing('MarketDepth')

      subscriptionRequestType = self.message.get('SubscriptionRequestType')
      if subscriptionRequestType == '1':
        self.raise_exception_if_required_tag_is_missing('MDUpdateType')


      #TODO: Validate all fields of MarketData Request Message

    elif self.type == 'Y':
      self.raise_exception_if_required_tag_is_missing('MDReqID')
      #TODO: Validate all fields of MarketData Request Cancel Message

    elif self.type == 'BE':  #logon
      self.raise_exception_if_required_tag_is_missing('UserReqID')
      self.raise_exception_if_required_tag_is_missing('Username')
      self.raise_exception_if_required_tag_is_missing('UserReqTyp')

      reqId = self.message.get('UserReqID')
      if reqId in ('1', '3'):
        self.raise_exception_if_required_tag_is_missing('Password')

      if reqId == '3':
        self.raise_exception_if_required_tag_is_missing('NewPassword')


      #TODO: Validate all fields of Logon Message

    elif self.type == 'U0':  #Signup
      self.raise_exception_if_required_tag_is_missing('Username')
      self.raise_exception_if_required_tag_is_missing('Password')
      self.raise_exception_if_required_tag_is_missing('Email')
      self.raise_exception_if_required_tag_is_missing('BrokerID')


      self.raise_exception_if_empty('Username')
      self.raise_exception_if_empty('Password')
      self.raise_exception_if_empty('Email')
      self.raise_exception_if_not_a_integer('BrokerID')
      self.raise_exception_if_not_greater_than_zero('BrokerID')

      #TODO: password is greater than 8 bytes
      #TODO: email is valid

    elif self.type == 'U10':  #Request Reset Password
      self.raise_exception_if_required_tag_is_missing('Email')

    elif self.type == 'U12':  #Reset Password
      self.raise_exception_if_required_tag_is_missing('Token')
      self.raise_exception_if_required_tag_is_missing('NewPassword')

    elif self.type == 'U16':  #Enable Disable Two Factor Authentication
      self.raise_exception_if_required_tag_is_missing('Enable')

    elif self.type == 'U18': # Generate Boleto
      self.raise_exception_if_required_tag_is_missing('BoletoId')
      self.raise_exception_if_required_tag_is_missing('Value')

    elif self.type == 'U20': # Request Boleto Options
      self.raise_exception_if_required_tag_is_missing('BoletoOptionReqId')


    elif self.type == 'U22': # Request Boleto
      self.raise_exception_if_required_tag_is_missing('BoletoId')


    elif self.type == 'D':  #New Order Single
      self.raise_exception_if_required_tag_is_missing('ClOrdID')
      self.raise_exception_if_required_tag_is_missing('Symbol')
      self.raise_exception_if_required_tag_is_missing('Side')
      self.raise_exception_if_required_tag_is_missing('OrdType')
      self.raise_exception_if_required_tag_is_missing('Price')
      self.raise_exception_if_required_tag_is_missing('OrderQty')

      #TODO: Validate all fields of New Order Single Message

    elif self.type == 'C': # Email
      self.raise_exception_if_required_tag_is_missing('EmailThreadID')
      self.raise_exception_if_required_tag_is_missing('Subject')
      self.raise_exception_if_required_tag_is_missing('EmailType')



    elif self.type == 'F':  #Order Cancel Request
      pass
      #TODO: Validate all fields of Order Cancel Message

    elif self.type == 'U2' :  # User Balance
      self.raise_exception_if_required_tag_is_missing('BalanceReqID')

      self.raise_exception_if_not_a_integer('BalanceReqID')
      self.raise_exception_if_not_greater_than_zero('BalanceReqID')

      #TODO: Validate all fields of Request For Balance Message
    elif self.type == 'U4': #  Orders List
      self.raise_exception_if_required_tag_is_missing('OrdersReqID')
      self.raise_exception_if_empty('OrdersReqID')


    elif self.type == 'U6': # Request for Crypto Coin Withdraw
      self.raise_exception_if_required_tag_is_missing('WithdrawReqID')
      self.raise_exception_if_required_tag_is_missing('Amount')
      self.raise_exception_if_required_tag_is_missing('Wallet')
      self.raise_exception_if_required_tag_is_missing('Currency')

      self.raise_exception_if_not_a_integer('WithdrawReqID')
      self.raise_exception_if_not_greater_than_zero('WithdrawReqID')

      self.raise_exception_if_not_a_number('Amount')
      self.raise_exception_if_not_greater_than_zero('Amount')

      self.raise_exception_if_empty('Wallet')
      self.raise_exception_if_empty('Currency')

    elif self.type == 'U8': # Request for BRL Bank Transfer Withdraw
      self.raise_exception_if_required_tag_is_missing('WithdrawReqID')
      self.raise_exception_if_required_tag_is_missing('Amount')
      self.raise_exception_if_required_tag_is_missing('BankNumber')
      self.raise_exception_if_required_tag_is_missing('BankName')
      self.raise_exception_if_required_tag_is_missing('AccountName')
      self.raise_exception_if_required_tag_is_missing('AccountNumber')
      self.raise_exception_if_required_tag_is_missing('AccountBranch')
      self.raise_exception_if_required_tag_is_missing('CPFCNPJ')

      self.raise_exception_if_not_a_integer('WithdrawReqID')
      self.raise_exception_if_not_greater_than_zero('WithdrawReqID')

      self.raise_exception_if_not_a_number('Amount')
      self.raise_exception_if_not_greater_than_zero('Amount')

      self.raise_exception_if_empty('BankNumber')
      self.raise_exception_if_empty('BankName')
      self.raise_exception_if_empty('AccountName')
      self.raise_exception_if_empty('AccountNumber')
      self.raise_exception_if_empty('AccountBranch')
      self.raise_exception_if_empty('CPFCNPJ')


    elif self.type == 'U7' or self.type == 'U9': # Response for Withdraw ( Crypto Coin or BRL Bank Transfer )
      self.raise_exception_if_required_tag_is_missing('WithdrawReqID')
      self.raise_exception_if_not_a_integer('WithdrawReqID')
      self.raise_exception_if_not_greater_than_zero('WithdrawReqID')

      self.raise_exception_if_required_tag_is_missing('WithdrawID')
      self.raise_exception_if_not_a_integer('WithdrawID')

    elif self.type == 'U24': # WithdrawConfirmationRequest
      self.raise_exception_if_required_tag_is_missing('WithdrawReqID')
      self.raise_exception_if_not_a_integer('WithdrawReqID')
      self.raise_exception_if_not_greater_than_zero('WithdrawReqID')

      self.raise_exception_if_required_tag_is_missing('ConfirmationToken')
      self.raise_exception_if_empty('ConfirmationToken')

    elif self.type == 'U25': # WithdrawConfirmationResponse
      self.raise_exception_if_required_tag_is_missing('WithdrawReqID')

    elif self.type == 'U26': # Withdraw List Request
      self.raise_exception_if_required_tag_is_missing('WithdrawListReqID')
      self.raise_exception_if_empty('WithdrawListReqID')

    elif self.type == 'U27': # Withdraw List Response
      self.raise_exception_if_required_tag_is_missing('WithdrawListReqID')
      self.raise_exception_if_empty('WithdrawListReqID')

    elif self.type == 'U28': # Broker List Request
      self.raise_exception_if_required_tag_is_missing('BrokerListReqID')
      self.raise_exception_if_empty('BrokerListReqID')

    elif self.type == 'U29': # Broker List Response
      self.raise_exception_if_required_tag_is_missing('BrokerListReqID')
      self.raise_exception_if_empty('BrokerListReqID')


    elif self.type == 'S0': # Bitcoin New Address
      self.raise_exception_if_required_tag_is_missing('BtcAddress')


  def has(self, attr):
    return attr in self.message

  def get(self, attr , default=None):
    if attr not in self.message:
      return  default
    return self.message[attr]



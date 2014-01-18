
from errors import *
from views import *

class Session(object):
  def __init__(self, session_id):
    self.session_id   = session_id

    self.user       = None
    self.should_end = False

  def set_user(self, user):
    if self.user:
      raise UserAlreadyLogged
    self.user = user

  def process_message(self, msg):
    if  msg.type == '1': # TestRequest
      return processTestRequest(self, msg)

    elif msg.type == 'BE': # login
      return processLogin(self, msg)

    elif msg.type == 'D':  # New Order Single
      return processNewOrderSingle(self, msg)

    elif  msg.type == 'F' : # Cancel Order Request
      return processCancelOrderRequest(self, msg)

    elif msg.type == 'U0': # signup
      return processSignup(self, msg)

    elif msg.type == 'U2': # Request for Balances
      return processRequestForBalances(self, msg)

    elif msg.type == 'U4': # Request for Open Orders
      return processRequestForOpenOrders(self, msg)

    elif msg.type == 'U6': # CryptoCoin Withdraw Request
      return processCryptoCoinWithdrawRequest(self, msg)

    elif msg.type == 'U8': # BRL Withdraw Request
      return processBRLWithdrawRequest(self, msg)

    elif msg.type == 'U10': # Request password request
      return processRequestPasswordRequest(self, msg)

    elif msg.type == 'U12': # Password request
      return processPasswordRequest(self, msg)

    elif msg.type == 'U16':  #Enable Disable Two Factor Authentication
      return processEnableDisableTwoFactorAuth(self, msg)

    elif msg.type == 'U18': #Generate Boleto
      return processGenerateBoleto(self, msg)

    elif msg.type == 'U20': # Request Boleto Options
      return processRequestBoletoOptions(self, msg)

    elif msg.type == 'U22': # Request Boleto
      return processRequestBoleto(self, msg)

    elif msg.type == 'U24': # Withdraw Confirmation Request
      return processWithdrawConfirmationRequest(self, msg)

    elif msg.type == 'A0':  # Request Query in Database
      return processRequestDatabaseQuery(self, msg)

    elif msg.type == 'S0':  # Bitcoin New Address
      return processBitcoinNewAddress(self, msg)

    elif msg.type == 'S2':  # Get Number of Free Bitcoin New Address
      return processGetNumberOfFreeBitcoinNewAddress(self, msg)

    raise InvalidMessageError()

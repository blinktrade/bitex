import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
from time import mktime

import json

class VerificationWebHookHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(VerificationWebHookHandler, self).__init__(application, request, **kwargs)

  def post(self, *args, **kwargs):
    formID        = self.get_argument('formID')
    submissionID  = self.get_argument('submissionID')

    dt = datetime.datetime.now()
    createdAt = int(mktime(dt.timetuple()) + dt.microsecond/1000000.0)


    raw_request = json.loads(self.get_argument('rawRequest'))
    broker_id             = None
    user_id               = None
    first_name            = None
    middle_name           = None
    last_name             = None
    birth_date_day        = None
    birth_date_month      = None
    birth_date_year       = None
    phone_number_country  = None
    phone_number_area     = None
    phone_number_phone    = None
    address_addr_line1    = None
    address_addr_line2    = None
    address_city          = None
    address_state         = None
    address_postal        = None
    address_country       = None
    identification_ssn    = None
    identification_tax_id = None


    for key, value in raw_request.iteritems():
      if 'broker_id' in key:
        broker_id = int(value)
      if 'user_id' in key:
        user_id = int(value)
      if 'ssn' in key:
        identification_ssn = str(value)
      if 'taxId' in key:
        identification_tax_id = str(value)

      if 'name' in key and isinstance(value, dict ) and 'first' in value:
        first_name = value['first']
      if 'name' in key and isinstance(value, dict ) and 'middle' in value:
        middle_name = value['middle']
      if 'name' in key and isinstance(value, dict ) and 'last' in value:
        last_name = value['last']

      if 'birthDate' in key and isinstance(value, dict ) and 'day' in value:
        birth_date_day = value['day']
      if 'birthDate' in key and isinstance(value, dict ) and 'day' in value:
        birth_date_month = value['month']
      if 'birthDate' in key and isinstance(value, dict ) and 'day' in value:
        birth_date_year = value['year']

      if 'phoneNumber' in key and isinstance(value, dict ) and 'country' in value:
        phone_number_country = value['country']
      if 'phoneNumber' in key and isinstance(value, dict ) and 'area' in value:
        phone_number_area = value['area']
      if 'phoneNumber' in key and isinstance(value, dict ) and 'phone' in value:
        phone_number_phone = value['phone']

      if 'address' in key and isinstance(value, dict ) and 'addr_line1' in value:
        address_addr_line1 = value['addr_line1']
      if 'address' in key and isinstance(value, dict ) and 'addr_line2' in value:
        address_addr_line2 = value['addr_line2']
      if 'address' in key and isinstance(value, dict ) and 'city' in value:
        address_city = value['city']
      if 'address' in key and isinstance(value, dict ) and 'state' in value:
        address_state = value['state']
      if 'address' in key and isinstance(value, dict ) and 'postal' in value:
        address_postal = value['postal']
      if 'address' in key and isinstance(value, dict ) and 'country' in value:
        address_country = value['country']


    import random
    req_id = random.randrange(600000,900000)

    verify_request_message = {
      'MsgType': 'B8',
      'VerifyCustomerReqID':req_id,
      'ClientID': user_id,
      'BrokerID': broker_id,
      'VerificationData':  json.dumps({
        'formID': formID,
        'submissionID': submissionID,
        'created_at': createdAt,
        'name': {
          'first': first_name,
          'middle': middle_name,
          'last': last_name,
        },
        'address': {
          'street1': address_addr_line1,
          'street2': address_addr_line2,
          'city': address_city,
          'state': address_state,
          'postal_code': address_postal,
          'country_code': address_country,
        },
        'phone_number': str(phone_number_country) + str(phone_number_area) + str(phone_number_phone),
        'date_of_birth': str(birth_date_year) + '-' +  str(birth_date_month) + '-' + str(birth_date_day),
      }),
      'Verify': 1
    }

    if identification_ssn:
      if 'identification' in verify_request_message['VerificationData']:
        verify_request_message['VerificationData']['identification']['ssn'] = identification_ssn
      else:
        verify_request_message['VerificationData']['identification'] = {'ssn': identification_ssn}

    if identification_tax_id:
      if 'identification' in verify_request_message['VerificationData']:
        verify_request_message['VerificationData']['identification']['tax_id'] = identification_tax_id
      else:
        verify_request_message['VerificationData']['identification'] = {'tax_id': identification_tax_id}


    self.application.application_trade_client.sendJSON(verify_request_message)
    self.write('*ok*')

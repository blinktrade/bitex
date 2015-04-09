# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
from time import mktime

import json
from util import get_country_code

def camel_to_underscore(name):
  import re
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


class VerificationWebHookHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(VerificationWebHookHandler, self).__init__(application, request, **kwargs)

  def post(self, *args, **kwargs):
    formID        = self.get_argument('formID')
    submissionID  = self.get_argument('submissionID')

    dt = datetime.datetime.now()
    createdAt = int(mktime(dt.timetuple()) + dt.microsecond/1000000.0)

    raw_request = json.loads(self.get_argument('rawRequest'))
    print raw_request

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
    address_country_code  = None
    finger_print          = None
    stunt_ip              = None

    photo_fields          = []
    id_fields             = []

    for key, value in raw_request.iteritems():
      if 'broker_id' in key:
        broker_id = int(value)
      if 'user_id' in key:
        user_id = int(value)
      if 'photo_fields' in key:
        photo_fields = value.split(',')
      if 'id_fields' in key:
        id_fields = value.split(',')

      # jotform
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
        address_country_code = get_country_code(address_country)

      if 'finger_print' in key:
        finger_print = value

      if 'stunt_ip' in key:
        stunt_ip = value

      #form stack
      if 'name-first' in key:
        first_name = value
      if 'name-middle' in key:
        middle_name = value
      if 'name-last' in key:
        last_name = value

      if 'address-address' in key:
        address_addr_line1 = value
      if 'address-address2' in key:
        address_addr_line2 = value
      if 'address-city' in key:
        address_city = value
      if 'address-state' in key:
        address_state = value
      if 'address-zip' in key:
        address_postal = value
      if 'address-country' in key:
        address_country = value
        address_country_code = get_country_code(address_country)


    uploaded_files = []
    for field in photo_fields:
      for key, value in raw_request.iteritems():
        if field in key:
          if isinstance(value, list ):
            uploaded_files.extend(value)
          else:
            uploaded_files.append(value)


    import random
    req_id = random.randrange(600000,900000)

    if birth_date_month[:3].upper() in ['JAN', 'GEN']:
      birth_date_month = '01'
    elif birth_date_month[:3].upper() in ['FEV', 'FEB']:
      birth_date_month = '02'
    elif birth_date_month[:3].upper() in ['MAR', u'MÄR']:
      birth_date_month = '03'
    elif birth_date_month[:3].upper() in ['ABR', 'APR', 'AVR']:
      birth_date_month = '04'
    elif birth_date_month[:3].upper() in ['MAY', 'MAI', 'MAG']:
      birth_date_month = '05'
    elif birth_date_month[:3].upper() in ['JUN', 'GIU']:
      birth_date_month = '06'
    elif birth_date_month[:3] in ['jui']:
      birth_date_month = '06'
    elif birth_date_month[:3] in ['Jui']:
      birth_date_month = '07'
    elif birth_date_month[:3].upper() in ['JUL', 'LUG']:
      birth_date_month = '07'
    elif birth_date_month[:3].upper() in ['AGO', 'AUG', 'AOU']:
      birth_date_month = '08'
    elif birth_date_month[:3].upper() in ['SET', 'SEP']:
      birth_date_month = '09'
    elif birth_date_month[:3].upper() in ['OUT', 'OCT', 'OTT', 'OKT']:
      birth_date_month = '10'
    elif birth_date_month[:3].upper() in ['NOV']:
      birth_date_month = '11'
    elif birth_date_month[:3].upper() in ['DEZ', 'DEC', 'DIC']:
      birth_date_month = '12'
    else:
      birth_date_month = birth_date_month[:3].upper()

    verify_request_message = {
      'MsgType': 'B8',
      'VerifyCustomerReqID':req_id,
      'ClientID': user_id,
      'BrokerID': broker_id,
      'VerificationData':  {
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
          'country': address_country,
          'country_code': address_country_code,
        },
        'phone_number': phone_number_country + phone_number_area + phone_number_phone,
        'date_of_birth': birth_date_year + '-' +  birth_date_month + '-' + birth_date_day,
        'uploaded_files': uploaded_files
      },
      'Verify': 1
    }

    if finger_print:
      verify_request_message['VerificationData']['browser_finger_print'] = finger_print

    try:
      if stunt_ip:
        verify_request_message['VerificationData']['stunt_ip'] = json.loads(stunt_ip)
    except:
      pass

    for field in id_fields:
      for key, value in raw_request.iteritems():
        if field in key:
          field_name = camel_to_underscore(field)
          if 'identification' not in verify_request_message['VerificationData']:
            verify_request_message['VerificationData']['identification'] = {}
          verify_request_message['VerificationData']['identification'][ field_name ] = value

    verify_request_message['VerificationData'] = json.dumps(verify_request_message['VerificationData'])

    self.application.application_trade_client.sendJSON(verify_request_message)
    self.write('*ok*')

__author__ = 'rodrigo'

import json
import datetime
import decimal

class JsonEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, datetime.datetime):
      return obj.strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(obj, datetime.date):
      return obj.strftime('%Y-%m-%d')
    if isinstance(obj, datetime.time):
      return obj.strftime('%H:%M:%S')
    if isinstance(obj, decimal.Decimal):
      return str(obj)
    return json.JSONEncoder.default(self, obj)

from StringIO import StringIO

import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

def convertCamelCase2Underscore(name):
  import re
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def generate_template(template, params, key=None ):
  t = template
  for k, v in params.iteritems():
    if isinstance(v, dict):
      if key:
        t = generate_template(t, v, key + ':' + convertCamelCase2Underscore(k) )
      else:
        t = generate_template(t, v, convertCamelCase2Underscore(k) )
    else:
      if key:
        t = t.replace('*|' + key + ':' + k + '|*', str(v) )
        t = t.replace('*|' + key + ':' + k.upper() + '|*', str(v) )
        t = t.replace('*|' + key + ':' + k.lower() + '|*', str(v) )
        t = t.replace('*|' + key + ':' + convertCamelCase2Underscore(k) + '|*', str(v) )
        t = t.replace('*|' + key + ':' + convertCamelCase2Underscore(k).upper() + '|*', str(v) )
      else:
        t = t.replace('*|' + k + '|*', str(v) )
        t = t.replace('*|' + k.upper() + '|*', str(v) )
        t = t.replace('*|' + k.lower() + '|*', str(v) )
        t = t.replace('*|' + convertCamelCase2Underscore(k) + '|*', str(v) )
        t = t.replace('*|' + convertCamelCase2Underscore(k).upper() + '|*', str(v) )
  return t

class DepositHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(DepositHandler, self).__init__(application, request, **kwargs)
    self.remote_ip = request.headers.get('X-Forwarded-For', request.headers.get('X-Real-Ip', request.remote_ip))

  def write_deposit_template(self, deposit_method, deposit):
    raw_html_template =  deposit_method.get('HtmlTemplate')
    deposit_data = deposit.toJSON()
    deposit_data['Value'] = self.application.format_currency(deposit_data['Currency'],deposit_data['Value'])
    deposit_html = generate_template(raw_html_template, deposit_data)
    self.write(deposit_html)

  def write_brazilian_deposit_system(self,deposit):
    deposit_data = deposit.get('Data')
    if 'data_documento' in deposit_data and  deposit_data['data_documento']:
      deposit_data['data_documento'] = datetime.datetime.strptime( deposit_data['data_documento'] , "%Y-%m-%d").date()

    if 'data_vencimento' in deposit_data and deposit_data['data_vencimento']:
      deposit_data['data_vencimento'] = datetime.datetime.strptime( deposit_data['data_vencimento'] , "%Y-%m-%d").date()

    if 'data_processamento' in deposit_data and deposit_data['data_processamento']:
      deposit_data['data_processamento'] = datetime.datetime.strptime( deposit_data['data_processamento'] , "%Y-%m-%d").date()

    buffer = StringIO()
    from pyboleto.pdf import BoletoPDF
    boleto_pdf = BoletoPDF(buffer)

    from pyboleto import bank
    ClasseBanco = bank.get_class_for_codigo(deposit_data['codigo_banco'])
    deposit_dados = ClasseBanco()
    for field_name, field_value in deposit_data.iteritems():
      if field_value:
        setattr(deposit_dados, field_name, field_value)
    boleto_pdf.drawBoleto(deposit_dados)


    self.set_header("Content-Type", "application/pdf")


    boleto_pdf.save()
    pdf_file = buffer.getvalue()

    self.write( pdf_file )



  def get(self, *args, **kwargs):
    deposit_id = self.get_argument("deposit_id", default=None, strip=False)
    download = int(self.get_argument("download", default="0", strip=False))
    if not deposit_id:
      self.send_error(404)
      return

    deposit_response_msg = self.application.application_trade_client.sendString(
      json.dumps({ 'MsgType': 'U18', 'DepositReqID': 1, 'DepositID': deposit_id }))

    if not deposit_response_msg or not deposit_response_msg.isDepositResponse():
      self.send_error(404)
      return

    deposit_method_id = deposit_response_msg.get('DepositMethodID')
    deposit_method_response_msg = self.application.application_trade_client.sendString(
      json.dumps({ 'MsgType': 'U48', 'DepositMethodReqID': 1, 'DepositMethodID': deposit_method_id }))

    if not deposit_method_response_msg or not deposit_method_response_msg.isDepositMethodResponse():
      self.send_error(404)
      return

    if not isinstance(deposit_response_msg.get('Data'), dict):
      self.send_error()
      return

    deposit_response_msg.get('Data')['remote_ip'] = self.remote_ip

    if download == 1:
      self.set_header("Content-Disposition",
                      "attachment; filename=%s"%deposit_method_response_msg['DepositMethodName'] + '.html')

    if deposit_response_msg.get('Type') == 'BBS':
      self.write_brazilian_deposit_system(deposit_response_msg)
    elif deposit_response_msg.get('Type') == 'DTP':
      self.write_deposit_template(deposit_method_response_msg, deposit_response_msg)

    else:
      self.write('Invalid deposit type')

from StringIO import StringIO

import tornado.ioloop
import tornado.web
import tornado.httpclient
import datetime
import json

from tornado import  template

import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

DEPOSIT_TEMPLATE_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "templates/"))

class DepositHandler(tornado.web.RequestHandler):
  def __init__(self, application, request, **kwargs):
    super(DepositHandler, self).__init__(application, request, **kwargs)
    self.remote_ip = request.headers.get('X-Forwarded-For', request.headers.get('X-Real-Ip', request.remote_ip))

  def write_ws_gateway_template(self, deposit):
    template_loader = template.Loader(DEPOSIT_TEMPLATE_PATH)
    deposit_data = deposit.get('Data')
    t_loader = template_loader.load( deposit_data['html_template']  )

    deposit_html = t_loader.generate(**deposit_data).decode('utf-8')
    self.write(deposit_html)

  def write_deposit_template(self, deposit_method, deposit):
    t = template.Template( deposit_method.get('HtmlTemplate')  )
    deposit_data = deposit.get('Data')

    deposit_html = t.generate(**deposit_data).decode('utf-8')
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

    if not deposit_response_msg.get('Data'):
      self.send_error()
      return

    deposit_response_msg.get('Data')['remote_ip'] = self.remote_ip

    if download == 1:
      self.set_header("Content-Disposition", "attachment; filename=%s"% deposit['download_filename'] )

    if deposit_response_msg.get('Type') == 'BBS':
      self.write_brazilian_deposit_system(deposit_response_msg)
    elif deposit_response_msg.get('Type') == 'WTP':
      self.write_ws_gateway_template(deposit_response_msg)
    elif deposit_response_msg.get('Type') == 'DTP':
      self.write_deposit_template(deposit_method_response_msg, deposit_response_msg)

    else:
      self.write('Invalid deposit type')

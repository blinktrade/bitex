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

  def write_bank_transfer_instructions(self, deposit):
    template_loader = template.Loader(DEPOSIT_TEMPLATE_PATH)
    t_loader = template_loader.load( deposit['html_template']  )
    deposit_html = t_loader.generate(**deposit).decode('utf-8')
    self.write(deposit_html)


  def write_brazilian_deposit_system(self,deposit):
    if 'data_documento' in deposit and  deposit['data_documento']:
      deposit['data_documento'] = datetime.datetime.strptime( deposit['data_documento'] , "%Y-%m-%d").date()

    if 'data_vencimento' in deposit and deposit['data_vencimento']:
      deposit['data_vencimento'] = datetime.datetime.strptime( deposit['data_vencimento'] , "%Y-%m-%d").date()

    if 'data_processamento' in deposit and deposit['data_processamento']:
      deposit['data_processamento'] = datetime.datetime.strptime( deposit['data_processamento'] , "%Y-%m-%d").date()

    buffer = StringIO()
    from pyboleto.pdf import BoletoPDF
    boleto_pdf = BoletoPDF(buffer)

    from pyboleto import bank
    ClasseBanco = bank.get_class_for_codigo(deposit['codigo_banco'])
    deposit_dados = ClasseBanco()
    for field_name, field_value in deposit.iteritems():
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


    deposit = deposit_response_msg.get('Data')
    if not deposit:
      self.send_error()
      return

    deposit['remote_ip'] = self.remote_ip

    if download == 1:
      self.set_header("Content-Disposition", "attachment; filename=%s"% deposit['download_filename'] )

    if deposit_response_msg.get('Type') == 'BBS':
      self.write_brazilian_deposit_system(deposit)
    elif deposit_response_msg.get('Type') == 'BTI':
      self.write_bank_transfer_instructions(deposit)
    else:
      self.write('Invalid deposit type')

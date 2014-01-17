from StringIO import StringIO

import tornado.ioloop
import tornado.web
import tornado.httpclient
import  datetime

def print_pdf_boleto(boleto, pdf_file):
  from pyboleto import bank

  ClasseBanco = bank.get_class_for_codigo(boleto['codigo_banco'])

  boleto_dados = ClasseBanco()

  for field_name, field_value in boleto.iteritems():
    if field_value:
      setattr(boleto_dados, field_name, field_value)

  setattr(boleto_dados, 'nosso_numero', boleto['numero_documento'])

  pdf_file.drawBoleto(boleto_dados)

class BoletoHandler(tornado.web.RequestHandler):
  def get(self, *args, **kwargs):

    buffer = StringIO()

    boleto_id = self.get_argument("boleto_id", default="-1", strip=False)
    download = int(self.get_argument("download", default="0", strip=False))
    if boleto_id:
      boleto_id = int(boleto_id)
    else:
      raise tornado.httpclient.HTTPError( 404 )


    boleto_response_msg = self.application.application_trade_client.sendString(
      '{"MsgType":"U22", "BoletoId":' + str(boleto_id) + '}' )


    if not boleto_response_msg.isBoletoResponse():
      raise tornado.httpclient.HTTPError( 404 )

    boleto = boleto_response_msg.message

    if 'data_documento' in boleto and  boleto['data_documento']:
      boleto['data_documento'] = datetime.datetime.strptime( boleto['data_documento'] , "%Y-%m-%d").date()

    if 'data_vencimento' in boleto and boleto['data_vencimento']:
      boleto['data_vencimento'] = datetime.datetime.strptime( boleto['data_vencimento'] , "%Y-%m-%d").date()

    if 'data_processamento' in boleto and boleto['data_processamento']:
      boleto['data_processamento'] = datetime.datetime.strptime( boleto['data_processamento'] , "%Y-%m-%d").date()

    boleto['sacado'] = [ 'username:' + boleto['sacado_nome'], 'user_id:' + boleto['sacado_documento']  ]

    if boleto:
      from pyboleto.pdf import BoletoPDF
      boleto_pdf = BoletoPDF(buffer)

      print_pdf_boleto(boleto, boleto_pdf)
      self.set_header("Content-Type", "application/pdf")

      if download == 1:
        self.set_header("Content-Disposition", "attachment; filename=boleto_%d.pdf"% boleto_id )

      boleto_pdf.save()
      pdf_file = buffer.getvalue()

      self.write( pdf_file )
    else:
      self.write('Erro imprimindo Boleto')


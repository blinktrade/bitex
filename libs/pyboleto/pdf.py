# -*- coding: utf-8 -*-
"""
    pyboleto.pdf
    ~~~~~~~~~~~~

    Classe Responsável por fazer o output do boleto em pdf usando Reportlab.

    :copyright: © 2011 - 2012 by Eduardo Cereto Carvalho
    :license: BSD, see LICENSE for more details.

"""
import os

from reportlab.graphics.barcode.common import I2of5
from reportlab.lib.colors import black
from reportlab.lib.pagesizes import A4, landscape as pagesize_landscape
from reportlab.lib.units import mm, cm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


class BoletoPDF(object):
  """Geração do Boleto em PDF

  Esta classe é responsável por imprimir o boleto em PDF.
  Outras classes podem ser implementadas no futuro com a mesma interface,
  para faer output em HTML, LaTeX, ...

  Esta classe pode imprimir boletos em formato de carnê (2 boletos por
  página) ou em formato de folha cheia.

  :param file_descr: Um arquivo ou *file-like* class.
  :param landscape: Formato da folha. Usar ``True`` para boleto
      tipo carnê.

  """

  def __init__(self, file_descr, landscape=False):
    self.width = 190 * mm
    self.widthCanhoto = 70 * mm
    self.heightLine = 6.5 * mm
    self.space = 2
    self.fontSizeTitle = 6
    self.fontSizeValue = 9
    self.deltaTitle = self.heightLine - (self.fontSizeTitle + 1)
    self.deltaFont = self.fontSizeValue + 1

    if landscape:
      pagesize = pagesize_landscape(A4)
    else:
      pagesize = A4

    self.pdfCanvas = canvas.Canvas(file_descr, pagesize=pagesize)
    self.pdfCanvas.setStrokeColor(black)

  def _load_image(self, logo_image):
    pyboleto_dir = os.path.dirname(os.path.abspath(__file__))
    image_path = os.path.join(pyboleto_dir, 'media', logo_image)
    return image_path

  def _drawReciboSacadoCanhoto(self, boletoDados, x, y):
    """Imprime o Recibo do Sacado para modelo de carnê

    :param boletoDados: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :type boletoDados: :class:`pyboleto.data.BoletoData`

    """

    self.pdfCanvas.saveState()
    self.pdfCanvas.translate(x, y)

    linhaInicial = 12

    # Horizontal Lines
    self.pdfCanvas.setLineWidth(2)
    self.__horizontalLine(0, 0, self.widthCanhoto)

    self.pdfCanvas.setLineWidth(1)
    self.__horizontalLine(0,
                          (linhaInicial + 0) * self.heightLine,
                          self.widthCanhoto)
    self.__horizontalLine(0,
                          (linhaInicial + 1) * self.heightLine,
                          self.widthCanhoto)

    self.pdfCanvas.setLineWidth(2)
    self.__horizontalLine(0,
                          (linhaInicial + 2) * self.heightLine,
                          self.widthCanhoto)

    # Vertical Lines
    self.pdfCanvas.setLineWidth(1)
    self.__verticalLine(self.widthCanhoto - (35 * mm),
                        (linhaInicial + 0) * self.heightLine,
                        self.heightLine)
    self.__verticalLine(self.widthCanhoto - (35 * mm),
                        (linhaInicial + 1) * self.heightLine,
                        self.heightLine)

    self.pdfCanvas.setFont('Helvetica-Bold', 6)
    self.pdfCanvas.drawRightString(self.widthCanhoto,
                                   0 * self.heightLine + 3,
                                   'Recibo do Sacado')

    # Titles
    self.pdfCanvas.setFont('Helvetica', 6)
    self.deltaTitle = self.heightLine - (6 + 1)

    self.pdfCanvas.drawString(
      self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.deltaTitle,
      'Nosso Número'
    )
    self.pdfCanvas.drawString(
      self.widthCanhoto - (35 * mm) + self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.deltaTitle,
      'Vencimento'
    )
    self.pdfCanvas.drawString(
      self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.deltaTitle,
      'Agência/Código Cedente'
    )
    self.pdfCanvas.drawString(
      self.widthCanhoto - (35 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.deltaTitle,
      'Valor Documento'
    )

    # Values
    self.pdfCanvas.setFont('Helvetica', 9)
    heighFont = 9 + 1

    valorDocumento = self._formataValorParaExibir(
      boletoDados.valor_documento
    )

    self.pdfCanvas.drawString(
      self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.space,
      boletoDados.format_nosso_numero()
    )
    self.pdfCanvas.drawString(
      self.widthCanhoto - (35 * mm) + self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.space,
      boletoDados.data_vencimento.strftime('%d/%m/%Y')
    )
    self.pdfCanvas.drawString(
      self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.space,
      boletoDados.agencia_conta_cedente
    )
    self.pdfCanvas.drawString(
      self.widthCanhoto - (35 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.space,
      valorDocumento
    )

    demonstrativo = boletoDados.demonstrativo[0:12]
    for i in range(len(demonstrativo)):
      self.pdfCanvas.drawString(
        2 * self.space,
        (((linhaInicial - 1) * self.heightLine)) - (i * heighFont),
        demonstrativo[i][0:55]
      )

    self.pdfCanvas.restoreState()

    return (self.widthCanhoto,
            ((linhaInicial + 2) * self.heightLine))

  def _drawReciboSacado(self, boletoDados, x, y):
    """Imprime o Recibo do Sacado para modelo de página inteira

    :param boletoDados: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :type boletoDados: :class:`pyboleto.data.BoletoData`

    """

    self.pdfCanvas.saveState()
    self.pdfCanvas.translate(x, y)

    linhaInicial = 15

    # Horizontal Lines
    self.pdfCanvas.setLineWidth(1)
    self.__horizontalLine(0,
                          (linhaInicial + 0) * self.heightLine,
                          self.width)
    self.__horizontalLine(0,
                          (linhaInicial + 1) * self.heightLine,
                          self.width)
    self.__horizontalLine(0,
                          (linhaInicial + 2) * self.heightLine,
                          self.width)

    self.pdfCanvas.setLineWidth(2)
    self.__horizontalLine(0,
                          (linhaInicial + 3) * self.heightLine,
                          self.width)

    # Vertical Lines
    self.pdfCanvas.setLineWidth(1)
    self.__verticalLine(
      self.width - (30 * mm),
      (linhaInicial + 0) * self.heightLine,
      3 * self.heightLine
    )
    self.__verticalLine(
      self.width - (30 * mm) - (35 * mm),
      (linhaInicial + 1) * self.heightLine,
      2 * self.heightLine
    )
    self.__verticalLine(
      self.width - (30 * mm) - (35 * mm) - (40 * mm),
      (linhaInicial + 1) * self.heightLine,
      2 * self.heightLine
    )

    # Head
    self.pdfCanvas.setLineWidth(2)
    self.__verticalLine(40 * mm,
                        (linhaInicial + 3) * self.heightLine,
                        self.heightLine)
    self.__verticalLine(60 * mm,
                        (linhaInicial + 3) * self.heightLine,
                        self.heightLine)

    if boletoDados.logo_image:
      logo_image_path = self._load_image(boletoDados.logo_image)
      self.pdfCanvas.drawImage(
        logo_image_path,
        0, (linhaInicial + 3) * self.heightLine + 3,
        40 * mm,
        self.heightLine,
        preserveAspectRatio=True,
        anchor='sw'
      )
    self.pdfCanvas.setFont('Helvetica-Bold', 18)
    self.pdfCanvas.drawCentredString(
      50 * mm,
      (linhaInicial + 3) * self.heightLine + 3,
      boletoDados.codigo_dv_banco
    )
    self.pdfCanvas.setFont('Helvetica-Bold', 11.5)
    self.pdfCanvas.drawRightString(
      self.width,
      (linhaInicial + 3) * self.heightLine + 3,
      'Recibo do Sacado'
    )

    # Titles
    self.pdfCanvas.setFont('Helvetica', 6)
    self.deltaTitle = self.heightLine - (6 + 1)

    self.pdfCanvas.drawRightString(
      self.width,
      self.heightLine,
      'Autenticação Mecânica'
    )

    self.pdfCanvas.drawString(
      0,
      (((linhaInicial + 2) * self.heightLine)) + self.deltaTitle,
      'Cedente'
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) - (40 * mm) + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.deltaTitle,
      'Agência/Código Cedente'
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.deltaTitle,
      'CPF/CNPJ Cedente'
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.deltaTitle,
      'Vencimento'
    )

    self.pdfCanvas.drawString(
      0,
      (((linhaInicial + 1) * self.heightLine)) + self.deltaTitle,
      'Sacado')
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) - (40 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.deltaTitle,
      'Nosso Número')
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.deltaTitle,
      'N. do documento')
    self.pdfCanvas.drawString(
      self.width - (30 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.deltaTitle,
      'Data Documento'
    )

    self.pdfCanvas.drawString(
      0,
      (((linhaInicial + 0) * self.heightLine)) + self.deltaTitle,
      'Endereço Cedente'
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) + self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.deltaTitle,
      'Valor Documento'
    )

    self.pdfCanvas.drawString(
      0,
      (((linhaInicial + 0) * self.heightLine - 3 * cm)) +
      self.deltaTitle,
      'Demonstrativo'
    )

    # Values
    self.pdfCanvas.setFont('Helvetica', 9)
    heighFont = 9 + 1

    self.pdfCanvas.drawString(
      0 + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.space,
      boletoDados.cedente
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) - (40 * mm) + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.space,
      boletoDados.agencia_conta_cedente
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.space,
      boletoDados.cedente_documento
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) + self.space,
      (((linhaInicial + 2) * self.heightLine)) + self.space,
      boletoDados.data_vencimento.strftime('%d/%m/%Y')
    )

    # Take care of long field
    sacado0 = unicode(boletoDados.sacado[0])
    while(stringWidth(sacado0,
                      self.pdfCanvas._fontname,
                      self.pdfCanvas._fontsize) > 8.4 * cm):
      #sacado0 = sacado0[:-2] + u'\u2026'
      sacado0 = sacado0[:-4] + u'...'

    self.pdfCanvas.drawString(
      0 + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.space,
      sacado0
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) - (40 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.space,
      boletoDados.format_nosso_numero()
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) - (35 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.space,
      boletoDados.numero_documento
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) + self.space,
      (((linhaInicial + 1) * self.heightLine)) + self.space,
      boletoDados.data_documento.strftime('%d/%m/%Y')
    )

    valorDocumento = self._formataValorParaExibir(
      boletoDados.valor_documento
    )

    self.pdfCanvas.drawString(
      0 + self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.space,
      boletoDados.cedente_endereco
    )
    self.pdfCanvas.drawString(
      self.width - (30 * mm) + self.space,
      (((linhaInicial + 0) * self.heightLine)) + self.space,
      valorDocumento
    )

    self.pdfCanvas.setFont('Courier', 9)
    demonstrativo = boletoDados.demonstrativo[0:25]
    for i in range(len(demonstrativo)):
      self.pdfCanvas.drawString(
        2 * self.space,
        (-3 * cm + ((linhaInicial + 0) * self.heightLine)) -
        (i * heighFont),
        demonstrativo[i])

    self.pdfCanvas.setFont('Helvetica', 9)

    self.pdfCanvas.restoreState()

    return (self.width, ((linhaInicial + 3) * self.heightLine))

  def _drawHorizontalCorteLine(self, x, y, width):
    self.pdfCanvas.saveState()
    self.pdfCanvas.translate(x, y)

    self.pdfCanvas.setLineWidth(1)
    self.pdfCanvas.setDash(1, 2)
    self.__horizontalLine(0, 0, width)

    self.pdfCanvas.restoreState()

  def _drawVerticalCorteLine(self, x, y, height):
    self.pdfCanvas.saveState()
    self.pdfCanvas.translate(x, y)

    self.pdfCanvas.setLineWidth(1)
    self.pdfCanvas.setDash(1, 2)
    self.__verticalLine(0, 0, height)

    self.pdfCanvas.restoreState()

  def _drawReciboCaixa(self, boletoDados, x, y):
    """Imprime o Recibo do Caixa

    :param boletoDados: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :type boletoDados: :class:`pyboleto.data.BoletoData`

    """
    self.pdfCanvas.saveState()

    self.pdfCanvas.translate(x, y)

    # De baixo para cima posicao 0,0 esta no canto inferior esquerdo
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    y = 1.5 * self.heightLine
    self.pdfCanvas.drawRightString(
      self.width,
      (1.5 * self.heightLine) + self.deltaTitle - 1,
      'Autenticação Mecânica / Ficha de Compensação'
    )

    # Primeira linha depois do codigo de barra
    y += self.heightLine
    self.pdfCanvas.setLineWidth(2)
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.space, 'Código de baixa'
    )
    self.pdfCanvas.drawString(0, y + self.space, 'Sacador / Avalista')

    y += self.heightLine
    self.pdfCanvas.drawString(0, y + self.deltaTitle, 'Sacado')
    sacado = boletoDados.sacado

    # Linha grossa dividindo o Sacado
    y += self.heightLine
    self.pdfCanvas.setLineWidth(2)
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.setFont('Helvetica', self.fontSizeValue)
    for i in range(len(sacado)):
      self.pdfCanvas.drawString(
        15 * mm,
        (y - 10) - (i * self.deltaFont),
        sacado[i]
      )
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    # Linha vertical limitando todos os campos da direita
    self.pdfCanvas.setLineWidth(1)
    self.__verticalLine(self.width - (45 * mm), y, 9 * self.heightLine)
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      '(=) Valor cobrado'
    )

    # Campos da direita
    y += self.heightLine
    self.__horizontalLine(self.width - (45 * mm), y, 45 * mm)
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      '(+) Outros acréscimos'
    )

    y += self.heightLine
    self.__horizontalLine(self.width - (45 * mm), y, 45 * mm)
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      '(+) Mora/Multa'
    )

    y += self.heightLine
    self.__horizontalLine(self.width - (45 * mm), y, 45 * mm)
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      '(-) Outras deduções'
    )

    y += self.heightLine
    self.__horizontalLine(self.width - (45 * mm), y, 45 * mm)
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      '(-) Descontos/Abatimentos'
    )
    self.pdfCanvas.drawString(
      0,
      y + self.deltaTitle,
      'Instruções'
    )

    self.pdfCanvas.setFont('Helvetica', self.fontSizeValue)
    instrucoes = boletoDados.instrucoes
    for i in range(len(instrucoes)):
      self.pdfCanvas.drawString(
        2 * self.space,
        y - (i * self.deltaFont),
        instrucoes[i]
      )
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    # Linha horizontal com primeiro campo Uso do Banco
    y += self.heightLine
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.drawString(0, y + self.deltaTitle, 'Uso do banco')

    self.__verticalLine((30) * mm, y, 2 * self.heightLine)
    self.pdfCanvas.drawString(
      (30 * mm) + self.space,
      y + self.deltaTitle,
      'Carteira'
    )

    self.__verticalLine((30 + 20) * mm, y, self.heightLine)
    self.pdfCanvas.drawString(
      ((30 + 20) * mm) + self.space,
      y + self.deltaTitle,
      'Espécie'
    )

    self.__verticalLine(
      (30 + 20 + 20) * mm,
      y,
      2 * self.heightLine
    )
    self.pdfCanvas.drawString(
      ((30 + 40) * mm) + self.space,
      y + self.deltaTitle,
      'Quantidade'
    )

    self.__verticalLine(
      (30 + 20 + 20 + 20 + 20) * mm, y, 2 * self.heightLine)
    self.pdfCanvas.drawString(
      ((30 + 40 + 40) * mm) + self.space, y + self.deltaTitle, 'Valor')

    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      '(=) Valor documento'
    )

    self.pdfCanvas.setFont('Helvetica', self.fontSizeValue)
    self.pdfCanvas.drawString(
      (30 * mm) + self.space,
      y + self.space,
      boletoDados.carteira
    )
    self.pdfCanvas.drawString(
      ((30 + 20) * mm) + self.space,
      y + self.space,
      boletoDados.especie
    )
    self.pdfCanvas.drawString(
      ((30 + 20 + 20) * mm) + self.space,
      y + self.space,
      boletoDados.quantidade
    )
    valor = self._formataValorParaExibir(boletoDados.valor)
    self.pdfCanvas.drawString(
      ((30 + 20 + 20 + 20 + 20) * mm) + self.space,
      y + self.space,
      valor
    )
    valorDocumento = self._formataValorParaExibir(
      boletoDados.valor_documento
    )
    self.pdfCanvas.drawRightString(
      self.width - 2 * self.space,
      y + self.space,
      valorDocumento
    )
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    # Linha horizontal com primeiro campo Data documento
    y += self.heightLine
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.drawString(
      0,
      y + self.deltaTitle,
      'Data do documento'
    )
    self.pdfCanvas.drawString(
      (30 * mm) + self.space,
      y + self.deltaTitle,
      'N. do documento'
    )
    self.pdfCanvas.drawString(
      ((30 + 40) * mm) + self.space,
      y + self.deltaTitle,
      'Espécie doc'
    )
    self.__verticalLine(
      (30 + 20 + 20 + 20) * mm,
      y,
      self.heightLine
    )
    self.pdfCanvas.drawString(
      ((30 + 40 + 20) * mm) + self.space,
      y + self.deltaTitle,
      'Aceite'
    )
    self.pdfCanvas.drawString(
      ((30 + 40 + 40) * mm) + self.space,
      y + self.deltaTitle,
      'Data processamento'
    )
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      'Nosso número'
    )

    self.pdfCanvas.setFont('Helvetica', self.fontSizeValue)
    self.pdfCanvas.drawString(
      0,
      y + self.space,
      boletoDados.data_documento.strftime('%d/%m/%Y')
    )
    self.pdfCanvas.drawString(
      (30 * mm) + self.space,
      y + self.space,
      boletoDados.numero_documento
    )
    self.pdfCanvas.drawString(
      ((30 + 40) * mm) + self.space,
      y + self.space,
      boletoDados.especie_documento
    )
    self.pdfCanvas.drawString(
      ((30 + 40 + 20) * mm) + self.space,
      y + self.space,
      boletoDados.aceite
    )
    self.pdfCanvas.drawString(
      ((30 + 40 + 40) * mm) + self.space,
      y + self.space,
      boletoDados.data_processamento.strftime('%d/%m/%Y')
    )
    self.pdfCanvas.drawRightString(
      self.width - 2 * self.space,
      y + self.space,
      boletoDados.format_nosso_numero()
    )
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    # Linha horizontal com primeiro campo Cedente
    y += self.heightLine
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.drawString(0, y + self.deltaTitle, 'Cedente')
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      'Agência/Código cedente'
    )

    self.pdfCanvas.setFont('Helvetica', self.fontSizeValue)
    self.pdfCanvas.drawString(0, y + self.space, boletoDados.cedente)
    self.pdfCanvas.drawRightString(
      self.width - 2 * self.space,
      y + self.space,
      boletoDados.agencia_conta_cedente
    )
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    # Linha horizontal com primeiro campo Local de Pagamento
    y += self.heightLine
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.drawString(
      0,
      y + self.deltaTitle,
      'Local de pagamento'
    )
    self.pdfCanvas.drawString(
      self.width - (45 * mm) + self.space,
      y + self.deltaTitle,
      'Vencimento'
    )

    self.pdfCanvas.setFont('Helvetica', self.fontSizeValue)
    self.pdfCanvas.drawString(
      0,
      y + self.space,
      boletoDados.local_pagamento
    )
    self.pdfCanvas.drawRightString(
      self.width - 2 * self.space,
      y + self.space,
      boletoDados.data_vencimento.strftime('%d/%m/%Y')
    )
    self.pdfCanvas.setFont('Helvetica', self.fontSizeTitle)

    # Linha grossa com primeiro campo logo tipo do banco
    self.pdfCanvas.setLineWidth(3)
    y += self.heightLine
    self.__horizontalLine(0, y, self.width)
    self.pdfCanvas.setLineWidth(2)
    self.__verticalLine(40 * mm, y, self.heightLine)  # Logo Tipo
    self.__verticalLine(60 * mm, y, self.heightLine)  # Numero do Banco

    if boletoDados.logo_image:
      logo_image_path = self._load_image(boletoDados.logo_image)
      self.pdfCanvas.drawImage(
        logo_image_path,
        0,
        y + self.space + 1,
        40 * mm,
        self.heightLine,
        preserveAspectRatio=True,
        anchor='sw'
      )
    self.pdfCanvas.setFont('Helvetica-Bold', 18)
    self.pdfCanvas.drawCentredString(
      50 * mm,
      y + 2 * self.space,
      boletoDados.codigo_dv_banco
    )
    self.pdfCanvas.setFont('Helvetica-Bold', 11.5)
    self.pdfCanvas.drawRightString(
      self.width,
      y + 2 * self.space,
      boletoDados.linha_digitavel
    )

    # Codigo de barras
    self._codigoBarraI25(boletoDados.barcode, 2 * self.space, 0)

    self.pdfCanvas.restoreState()

    return self.width, (y + self.heightLine)

  def drawBoletoCarneDuplo(self, boletoDados1, boletoDados2=None):
    """Imprime um boleto tipo carnê com 2 boletos por página.

    :param boletoDados1: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :param boletoDados2: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :type boletoDados1: :class:`pyboleto.data.BoletoData`
    :type boletoDados2: :class:`pyboleto.data.BoletoData`

    """
    y = 5 * mm
    d = self.drawBoletoCarne(boletoDados1, y)
    y += d[1] + 6 * mm
    #self._drawHorizontalCorteLine(0, y, d[0])
    y += 7 * mm
    if boletoDados2:
      self.drawBoletoCarne(boletoDados2, y)

  def drawBoletoCarne(self, boletoDados, y):
    """Imprime apenas dos boletos do carnê.

    Esta função não deve ser chamada diretamente, ao invés disso use a
    drawBoletoCarneDuplo.

    :param boletoDados: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :type boletoDados: :class:`pyboleto.data.BoletoData`
    """
    x = 15 * mm
    d = self._drawReciboSacadoCanhoto(boletoDados, x, y)
    x += d[0] + 8 * mm
    self._drawVerticalCorteLine(x, y, d[1])
    x += 8 * mm
    d = self._drawReciboCaixa(boletoDados, x, y)
    x += d[0]
    return x, d[1]

  def drawBoleto(self, boletoDados):
    """Imprime Boleto Convencional

    Você pode chamar este método diversas vezes para criar um arquivo com
    várias páginas, uma por boleto.

    :param boletoDados: Objeto com os dados do boleto a ser preenchido.
        Deve ser subclasse de :class:`pyboleto.data.BoletoData`
    :type boletoDados: :class:`pyboleto.data.BoletoData`
    """
    x = 9 * mm  # margem esquerda
    y = 10 * mm  # margem inferior

    self._drawHorizontalCorteLine(x, y, self.width)
    y += 4 * mm  # distancia entre linha de corte e barcode

    d = self._drawReciboCaixa(boletoDados, x, y)
    y += d[1] + (12 * mm)  # distancia entre Recibo caixa e linha de corte

    self._drawHorizontalCorteLine(x, y, self.width)

    y += 20 * mm
    d = self._drawReciboSacado(boletoDados, x, y)
    y += d[1]
    return (self.width, y)

  def nextPage(self):
    """Força início de nova página"""

    self.pdfCanvas.showPage()

  def save(self):
    """Fecha boleto e constroi o arquivo"""

    self.pdfCanvas.save()

  def __horizontalLine(self, x, y, width):
    self.pdfCanvas.line(x, y, x + width, y)

  def __verticalLine(self, x, y, width):
    self.pdfCanvas.line(x, y, x, y + width)

  def __centreText(self, x, y, text):
    self.pdfCanvas.drawCentredString(self.refX + x, self.refY + y, text)

  def __rightText(self, x, y, text):
    self.pdfCanvas.drawRightString(self.refX + x, self.refY + y, text)

  def _formataValorParaExibir(self, nfloat):
    if nfloat:
      txt = nfloat
      txt = txt.replace('.', ',')
    else:
      txt = ""
    return txt

  def _codigoBarraI25(self, num, x, y):
    """Imprime Código de barras otimizado para boletos

    O código de barras é otmizado para que o comprimeto seja sempre o
    estipulado pela febraban de 103mm.

    """
    # http://en.wikipedia.org/wiki/Interleaved_2_of_5

    altura = 13 * mm
    comprimento = 103 * mm

    tracoFino = 0.254320987654 * mm  # Tamanho correto aproximado

    bc = I2of5(num,
               barWidth=tracoFino,
               ratio=3,
               barHeight=altura,
               bearers=0,
               quiet=0,
               checksum=0)

    # Recalcula o tamanho do tracoFino para que o cod de barras tenha o
    # comprimento correto
    tracoFino = (tracoFino * comprimento) / bc.width
    bc.__init__(num, barWidth=tracoFino)

    bc.drawOn(self.pdfCanvas, x, y)

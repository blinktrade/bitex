# -*- coding: utf-8
from ..data import BoletoData


class BoletoReal(BoletoData):

    def __init__(self):
        super(BoletoReal, self).__init__()

        self.codigo_banco = "356"
        self.logo_image = "logo_bancoreal.jpg"

    @property
    def agencia_conta_cedente(self):
        dv = self.digitao_cobranca
        s = "%s/%s/%s" % (self.agencia_cedente, self.conta_cedente, dv)
        return s

    @property
    def digitao_cobranca(self):
        num = "%s%s%s" % (
            self.nosso_numero,
            self.agencia_cedente,
            self.conta_cedente
        )
        dv = self.modulo10(num)
        return dv

    def calculate_dv_barcode(self, line):
        dv = self.modulo11(line, r=1)
        if dv == 0 or dv == 1:
            dv = 1
        else:
            dv = 11 - dv
        return dv

    @property
    def campo_livre(self):
        content = "%4s%7s%1s%13s" % (self.agencia_cedente,
                                     self.conta_cedente,
                                     self.digitao_cobranca,
                                     self.nosso_numero)
        return content

#-*- coding: utf-8 -*-
from ..data import BoletoData, custom_property


class BoletoCaixa(BoletoData):
    '''
        Gera Dados necessários para criação de boleto para o banco Caixa
        Economica Federal

    '''

    conta_cedente = custom_property('conta_cedente', 11)
    '''
        Este numero tem o inicio fixo
        Carteira SR: 80, 81 ou 82
        Carteira CR: 90 (Confirmar com gerente qual usar)

    '''
    nosso_numero = custom_property('nosso_numero', 10)

    def __init__(self):
        super(BoletoCaixa, self).__init__()

        self.codigo_banco = "104"
        self.local_pagamento = "Preferencialmente nas Casas Lotéricas e \
Agências da Caixa"
        self.logo_image = "logo_bancocaixa.jpg"

    @property
    def dv_nosso_numero(self):
        resto2 = self.modulo11(self.nosso_numero.split('-')[0], 9, 1)
        digito = 11 - resto2
        if digito == 10 or digito == 11:
            dv = 0
        else:
            dv = digito
        return dv

    @property
    def campo_livre(self):
        content = "%10s%4s%11s" % (self.nosso_numero,
                                   self.agencia_cedente,
                                   self.conta_cedente.split('-')[0])
        return content

    def format_nosso_numero(self):
        return self.nosso_numero + '-' + str(self.dv_nosso_numero)

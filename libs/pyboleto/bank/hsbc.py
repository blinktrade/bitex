# -*- coding: utf-8
from ..data import BoletoData, custom_property


### CAUTION - NÃO TESTADO ###


class BoletoHsbc(BoletoData):
    '''
        Gera Dados necessários para criação de boleto para o banco HSBC
    '''

    numero_documento = custom_property('numero_documento', 13)

    def __init__(self):
        super(BoletoHsbc, self).__init__()

        self.codigo_banco = "399"
        self.logo_image = "logo_bancohsbc.jpg"
        self.carteira = 'CNR'

    def format_nosso_numero(self):
        nosso_numero = self.nosso_numero
        # Primeiro DV
        nosso_numero += str(self.modulo11(nosso_numero))
        # Cobrança com vencimento = 4
        nosso_numero += "4"
        # Segundo DV
        sum_params = int(nosso_numero) + int(self.conta_cedente)
        sum_params += int(self.data_vencimento.strftime('%d%m%y'))
        sum_params = str(sum_params)
        nosso_numero += str(self.modulo11(sum_params))
        return nosso_numero

    @property
    def data_vencimento_juliano(self):
        data_vencimento = str(self.data_vencimento.timetuple().tm_yday)
        data_vencimento += str(self.data_vencimento.year)[-1:]
        return data_vencimento.zfill(4)

    @property
    def campo_livre(self):
        content = "%7s%13s%4s2" % (self.conta_cedente,
                                   self.nosso_numero,
                                   self.data_vencimento_juliano)
        return content


class BoletoHsbcComRegistro(BoletoData):
    '''
        Gera Dados necessários para criação de boleto para o banco HSBC
        com registro
    '''
    # Nosso numero (sem dv) sao 10 digitos
    nosso_numero = custom_property('nosso_numero', 10)

    def __init__(self):
        super(BoletoHsbcComRegistro, self).__init__()

        self.codigo_banco = "399"
        self.logo_image = "logo_bancohsbc.jpg"
        self.carteira = 'CSB'
        self.especie_documento = 'PD'

    @property
    def dv_nosso_numero(self):
        resto = self.modulo11(self.nosso_numero, 7, 1)
        if resto == 0 or resto == 1:
            return 0
        else:
            return 11 - resto

    @property
    def campo_livre(self):
        content = "%10s%1s%4s%7s001" % (self.nosso_numero,
                                        self.dv_nosso_numero,
                                        self.agencia_cedente.split('-')[0],
                                        self.conta_cedente.split('-')[0])
        return content

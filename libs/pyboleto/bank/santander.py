# -*- coding: utf-8
"""
    pyboleto.bank.santander
    ~~~~~~~~~~~~~~~~~~~~~~~

    Lógica para boletos do banco Santander.
    Carteira ``'101'`` Com Registro
    Carteira ``'102'`` Sem Registro
    Carteira ``'201'`` Penhor Rápido Com Registro

    Baseado no projeto `BoletoPHP <http://boletophp.com.br/>`

    :copyright: © 2011 - 2012 by Eduardo Cereto Carvalho
    :license: BSD, see LICENSE for more details.

"""
from ..data import BoletoData, custom_property


class BoletoSantander(BoletoData):
    '''
        Gera Dados necessários para criação de boleto para o banco Santander
    '''

    nosso_numero = custom_property('nosso_numero', 12)

    #: Também chamado de "ponto de venda"
    agencia_cedente = custom_property('agencia_cedente', 4)

    #: Também chamdo de código do cedente, se for uma conta de 9 dígitos
    #: ignorar os 2 primeiros
    conta_cedente = custom_property('conta_cedente', 7)

    def __init__(self):
        super(BoletoSantander, self).__init__()

        self.codigo_banco = "033"
        self.logo_image = "logo_santander.jpg"
        self.carteira = '102'
        # IOS - somente para Seguradoras (Se 7% informar 7, limitado 9%)
        # Demais clientes usar 0 (zero)
        self.ios = "0"

    def format_nosso_numero(self):
        return "%s-%s" % (
            self.nosso_numero,
            self._dv_nosso_numero()
        )

    def _dv_nosso_numero(self):
        return str(self.modulo11(self.nosso_numero, 9, 0))

    @property
    def campo_livre(self):
        content = "".join([
                           '9',
                           self.conta_cedente,
                           self.nosso_numero,
                           self._dv_nosso_numero(),
                           self.ios,
                           self.carteira,
                           ])
        return content

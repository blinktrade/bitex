# -*- coding: utf-8 -*-
from ..data import BoletoData, custom_property


class BoletoBanrisul(BoletoData):
    conta_cedente = custom_property('conta_cedente', 6)
    nosso_numero = custom_property('nosso_numero', 8)

    def __init__(self):
        BoletoData.__init__(self)
        self.codigo_banco = "041"
        self.logo_image = "logo_banrisul.jpg"

    @property
    def campo_livre(self):
        content = '21%04d%07d%08d40' % (int(self.agencia_cedente),
                                        int(self.conta_cedente),
                                        int(self.nosso_numero))
        return '%s%s' % (content, self._dv_campo_livre(content))

    # From http://jrimum.org/bopepo/browser/trunk/src/br/com/nordestefomento/
    # jrimum/bopepo/campolivre/AbstractCLBanrisul.java
    def _dv_campo_livre(self, campo_livre):
        dv = self.modulo10(campo_livre)
        while True:
            restoMod11 = self.modulo11(campo_livre + str(dv), 7, 1)
            if restoMod11 != 1:
                break
            dv += 1
            dv %= 10

        return str(dv) + str(11 - restoMod11)

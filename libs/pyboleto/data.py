# -*- coding: utf-8 -*-
"""
    pyboleto.data
    ~~~~~~~~~~~~~

    Base para criação dos módulos dos bancos. Comtém funções genéricas
    relacionadas a geração dos dados necessários para o boleto bancário.

    :copyright: © 2011 - 2012 by Eduardo Cereto Carvalho
    :license: BSD, see LICENSE for more details.

"""
import datetime
from decimal import Decimal


class BoletoException(Exception):
    """ Exceções para erros no pyboleto"""
    def __init__(self, message):
        Exception.__init__(self, message)


_EPOCH = datetime.date(1997, 10, 7)


class custom_property(object):
    """Função para criar propriedades nos boletos

    Cria propriedades com getter, setter e delattr.

    Propriedades criadas com essa função sempre são strings internamente.

    O Setter sempre tentará remover qualquer digito verificador se existir.

    Aceita um numero com ou sem DV e remove o DV caso exista. Então preenxe
    com zfill até o tamanho adequado. Note que sempre que possível não use DVs
    ao entrar valores no pyboleto. De preferência o pyboleto vai calcular
    todos os DVs quando necessário.

    :param name: O nome da propriedade.
    :type name: string
    :param length: Tamanho para preencher com '0' na frente.
    :type length: integer

    """
    def __init__(self, name, length):
        self.name = name
        self.length = length
        self._instance_state = {}

    def __set__(self, instance, value):
        if instance is None:
            raise TypeError("can't modify custom class properties")
        if '-' in value:
            values = value.split('-')
            values[0] = values[0].zfill(self.length)
            value = '-'.join(values)
        else:
            value = value.zfill(self.length)
        self._instance_state[instance] = value

    def __get__(self, instance, class_):
        if instance is None:
            return self
        return self._instance_state.get(instance, '0' * self.length)


class BoletoData(object):
    """Interface para implementações específicas de bancos

    Esta classe geralmente nunca será usada diretamente. Geralmente o usuário
    irá usar uma das subclasses com a implementação específica de cada banco.

    As classes dentro do pacote :mod:`pyboleto.bank` extendem essa classe
    para implementar as especificações de cada banco.
    Portanto as especificações dentro desta classe são genéricas seguindo as
    normas da FEBRABAN.

    Todos os parâmetros devem ser passados como ``**kwargs`` para o construtor
    ou então devem ser passados depois, porém antes de imprimir o boleto.

    eg::

        bData = BoletoData(agencia='123', valor='650')
        bData.cedente = u'João Ninguém'
        bData.cedente_cidade = u'Rio de Janeiro'
        bData.cedente_uf = u'RJ'
        # Assim por diante até preencher todos os campos obrigatórios.

    **Parâmetros obrigatórios**:

    :param aceite: 'N' para o caixa não acetitar o boleto após a
        validade ou 'A' para aceitar. *(default: 'N')*
    :param agencia_cedente: Tamanho pode variar com o banco.
    :param carteira: Depende do Banco.
    :param cedente: Nome do Cedente
    :param cedente_cidade:
    :param cedente_uf:
    :param cedente_logradouro: Endereço do Cedente
    :param cedente_bairro:
    :param cedente_cep:
    :param cedente_documento: CPF ou CNPJ do Cedente.
    :param conta_cedente: Conta do Cedente sem o dígito verificador.
    :param data_documento:
    :type data_documento: `datetime.date`
    :param data_processamento:
    :type data_processamento: `datetime.date`
    :param data_vencimento:
    :type data_vencimento: `datetime.date`
    :param numero_documento: Número Customizado para controle. Pode ter até 13
        caracteres dependendo do banco.
    :param sacado_nome: Nome do Sacado
    :param sacado_documento: CPF ou CNPJ do Sacado
    :param sacado_cidade:
    :param sacado_uf:
    :param sacado_endereco: Endereco do Sacado
    :param sacado_bairro:
    :param sacado_cep:

    **Parâmetros não obrigatórios**:

    :param quantidade:
    :param especie: Nunca precisa mudar essa opção *(default: 'R$')*
    :param especie_documento:
    :param local_pagamento: *(default: 'Pagável em qualquer banco
        até o vencimento')*
    :param moeda: Nunca precisa mudar essa opção *(default: '9')*

    """

    def __init__(self, **kwargs):
        # FIXME: valor_documento should be a Decimal and only allow 2 decimals,
        #        otherwise the printed value might diffent from the value in
        #        the barcode.
        self.aceite = kwargs.pop('aceite', "N")
        self.agencia_cedente = kwargs.pop('agencia_cedente', "")
        self.carteira = kwargs.pop('carteira', "")
        self.cedente = kwargs.pop('cedente', "")
        self.cedente_cidade = kwargs.pop('cedente_cidade', "")
        self.cedente_uf = kwargs.pop('cedente_uf', "")
        self.cedente_logradouro = kwargs.pop('cedente_logradouro', "")
        self.cedente_bairro = kwargs.pop('cedente_bairro', "")
        self.cedente_cep = kwargs.pop('cedente_cep', "")
        self.cedente_documento = kwargs.pop('cedente_documento', "")
        self.codigo_banco = kwargs.pop('codigo_banco', "")
        self.conta_cedente = kwargs.pop('conta_cedente', "")
        self.data_documento = kwargs.pop('data_documento', "")
        self.data_processamento = kwargs.pop('data_processamento',
                                             datetime.date.today())
        self.data_vencimento = kwargs.pop('data_vencimento', "")
        self.especie = kwargs.pop('especie', "R$")
        self.especie_documento = kwargs.pop('especie_documento', "")
        self.local_pagamento = kwargs.pop(
            'local_pagamento', u"Pagável em qualquer banco até o vencimento")
        self.logo_image = kwargs.pop('logo_image', "")
        self.moeda = kwargs.pop('moeda', "9")
        self.numero_documento = kwargs.pop('numero_do_documento', "")
        self.quantidade = kwargs.pop('quantidade', "")
        self.sacado_nome = kwargs.pop('sacado_nome', "")
        self.sacado_documento = kwargs.pop('sacado_documento', "")
        self.sacado_cidade = kwargs.pop('sacado_cidade', "")
        self.sacado_uf = kwargs.pop('sacado_uf', "")
        self.sacado_endereco = kwargs.pop('sacado_endereco', "")
        self.sacado_bairro = kwargs.pop('sacado_bairro', "")
        self.sacado_cep = kwargs.pop('sacado_cep', "")
        if kwargs:
            raise TypeError("Paramêtro(s) desconhecido: %r" % (kwargs, ))
        self._cedente_endereco = None
        self._demonstrativo = []
        self._instrucoes = []
        self._sacado = None
        self._valor = None
        self._valor_documento = None

    @property
    def barcode(self):
        """Essa função sempre é a mesma para todos os bancos. Então basta
        implementar o método :func:`barcode` para o pyboleto calcular a linha
        digitável.

        Posição  #   Conteúdo
        01 a 03  03  Número do banco
        04       01  Código da Moeda - 9 para Real
        05       01  Digito verificador do Código de Barras
        06 a 09  04  Data de vencimento em dias partis de 07/10/1997
        10 a 19  10  Valor do boleto (8 inteiros e 2 decimais)
        20 a 44  25  Campo Livre definido por cada banco
        Total    44
        """

        for attr, length, data_type in [
            ('codigo_banco', 3, unicode),
            ('moeda', 1, unicode),
            ('data_vencimento', None, datetime.date),
            ('valor_documento', -1, str),
            ('campo_livre', 25, unicode),
            ]:
            value = getattr(self, attr)
            if not isinstance(value, data_type):
                raise TypeError("%s.%s must be a %s, got %r (type %s)" % (
                    self.__class__.__name__, attr, data_type.__name__, value,
                    type(value).__name__))
            if data_type == str and length != -1 and len(value) != length:
                raise ValueError(
                    "%s.%s must have a length of %d, not %r (len: %d)" % (
                    self.__class__.__name__, attr, length, value, len(value)))

        due_date_days = (self.data_vencimento - _EPOCH).days
        if not (9999 >= due_date_days >= 0):
            raise TypeError(
                "Invalid date, must be between 1997/07/01 and "
                "2024/11/15")
        num = "%s%1s%04d%010d%24s" % (self.codigo_banco,
                                      self.moeda,
                                      due_date_days,
                                      Decimal(self.valor_documento) * 100,
                                      self.campo_livre)
        dv = self.calculate_dv_barcode(num)

        barcode = num[:4] + str(dv) + num[4:]
        if len(barcode) != 44:
            raise BoletoException(
                'The barcode must have 44 characteres, found %d' % len(barcode))
        return barcode

    @property
    def dv_nosso_numero(self):
        """Retorna DV do nosso número

        :exception NotImplementedError: Precisa ser implementado pela classe
            derivada

        """
        raise NotImplementedError(
            'This method has not been implemented by this class'
        )

    def calculate_dv_barcode(self, line):
        """Calcula DV para código de barras

        Está é uma implementação genérica mas pode ser reimplementada pela
        classe derivada dependendo das definições de cada bancoGeralmente
        é implementado pela classe derivada.

        """
        resto2 = self.modulo11(line, 9, 1)
        if resto2 in [0, 1, 10]:
            dv = 1
        else:
            dv = 11 - resto2
        return dv

    def format_nosso_numero(self):
        """
            Geralmente é implementado pela classe derivada. Usada para formatar
            como o noso número será impresso no boleto. Às vezes é o mesmo
            do :prop:`numero_do_documento` e às vezes contém outros campos
            juntos.
        """
        return self.nosso_numero

    nosso_numero = custom_property('nosso_numero', 13)
    """Nosso Número geralmente tem 13 posições

    Algumas subclasses podem alterar isso dependendo das normas do banco

    """

    agencia_cedente = custom_property('agencia_cedente', 4)
    """Agência do Cedente geralmente tem 4 posições

    Algumas subclasses podem alterar isso dependendo das normas do banco

    """

    conta_cedente = custom_property('conta_cedente', 7)
    """Conta do Cedente geralmente tem 7 posições

    Algumas subclasses podem alterar isso dependendo das normas do banco

    """

    def _cedente_endereco_get(self):
        if self._cedente_endereco is None:
            self._cedente_endereco = '%s - %s - %s - %s - %s' % (
                self.cedente_logradouro,
                self.cedente_bairro,
                self.cedente_cidade,
                self.cedente_uf,
                self.cedente_cep
            )
        return self._cedente_endereco

    def _cedente_endereco_set(self, endereco):
        if len(endereco) > 80:
            raise BoletoException(
                u'Linha de endereço possui mais que 80 caracteres')
        self._cedente_endereco = endereco
    cedente_endereco = property(_cedente_endereco_get, _cedente_endereco_set)
    """Endereço do Cedente com no máximo 80 caracteres"""

    def _get_valor(self):
        if self._valor is not None:
            return "%.2f" % self._valor

    def _set_valor(self, val):
        if type(val) is Decimal:
            self._valor = val
        else:
            self._valor = Decimal(str(val), 2)
    valor = property(_get_valor, _set_valor)
    """Valor convertido para :class:`Decimal`.

    Geralmente valor e valor_documento são o mesmo número.

    :type: Decimal

    """

    def _get_valor_documento(self):
        if self._valor_documento is not None:
            return "%.2f" % self._valor_documento

    def _set_valor_documento(self, val):
        if type(val) is Decimal:
            self._valor_documento = val
        else:
            self._valor_documento = Decimal(str(val), 2)
    valor_documento = property(_get_valor_documento, _set_valor_documento)
    """Valor do Documento convertido para :class:`Decimal`.

    De preferência para passar um valor em :class:`Decimal`, se não for passado
    outro tipo será feito um cast para :class:`Decimal`.

    """

    def _instrucoes_get(self):
        return self._instrucoes

    def _instrucoes_set(self, list_inst):
        if isinstance(list_inst, basestring):
            list_inst = list_inst.splitlines()

        if len(list_inst) > 7:
            raise BoletoException(
                u'Número de linhas de instruções maior que 7')
        for line in list_inst:
            if len(line) > 90:
                raise BoletoException(
                    u'Linha de instruções possui mais que 90 caracteres')
        self._instrucoes = list_inst
    instrucoes = property(_instrucoes_get, _instrucoes_set)
    """Instruções para o caixa do banco que recebe o bilhete

    Máximo de 7 linhas com 90 caracteres cada.
    Geralmente contém instruções para aplicar multa ou não aceitar caso tenha
    passado a data de validade.

    """

    def _demonstrativo_get(self):
        return self._demonstrativo

    def _demonstrativo_set(self, list_dem):
        if isinstance(list_dem, basestring):
            list_dem = list_dem.splitlines()

        if len(list_dem) > 12:
            raise BoletoException(
                u'Número de linhas de demonstrativo maior que 12')
        for line in list_dem:
            if len(line) > 90:
                raise BoletoException(
                    u'Linha de demonstrativo possui mais que 90 caracteres')
        self._demonstrativo = list_dem
    demonstrativo = property(_demonstrativo_get, _demonstrativo_set)
    """Texto que vai impresso no corpo do Recibo do Sacado

    Máximo de 12 linhas com 90 caracteres cada.

    """

    def _sacado_get(self):
        """Tenta usar o sacado que foi setado ou constroi um

        Se você não especificar um sacado o boleto tentará construir um sacado
        a partir de outras proriedades setadas.

        Para facilitar você deve sempre setar essa propriedade.

        """
        if self._sacado is None:
            self.sacado = [
                '%s - CPF/CNPJ: %s' % (self.sacado_nome,
                                       self.sacado_documento),
                self.sacado_endereco,
                '%s - %s - %s - %s' % (
                    self.sacado_bairro,
                    self.sacado_cidade,
                    self.sacado_uf,
                    self.sacado_cep
                )
            ]
        return self._sacado

    def _sacado_set(self, list_sacado):
        if len(list_sacado) > 3:
            raise BoletoException(u'Número de linhas do sacado maior que 3')
        self._sacado = list_sacado
    sacado = property(_sacado_get, _sacado_set)
    """Campo sacado composto por até 3 linhas.

    A primeira linha precisa ser o nome do sacado.
    As outras duas linhas devem ser usadas para o endereço do sacado.

    """

    @property
    def agencia_conta_cedente(self):
        return "%s/%s" % (self.agencia_cedente, self.conta_cedente)

    @property
    def codigo_dv_banco(self):
        cod = "%s-%s" % (self.codigo_banco, self.modulo11(self.codigo_banco))
        return cod

    @property
    def linha_digitavel(self):
        """Monta a linha digitável a partir do barcode

        Esta é a linha que o cliente pode utilizar para digitar se o código
        de barras não estiver legível.
        """
        linha = self.barcode
        if not linha:
            raise BoletoException("Boleto doesn't have a barcode")

        def monta_campo(campo):
            campo_dv = "%s%s" % (campo, self.modulo10(campo))
            return "%s.%s" % (campo_dv[0:5], campo_dv[5:])

        return ' '.join([monta_campo(linha[0:4] + linha[19:24]),
                         monta_campo(linha[24:34]),
                         monta_campo(linha[34:44]),
                         linha[4],
                         linha[5:19]])

    @staticmethod
    def modulo10(num):
        if not isinstance(num, basestring):
            raise TypeError
        soma = 0
        peso = 2
        for c in reversed(num):
            parcial = int(c) * peso
            if parcial > 9:
                s = str(parcial)
                parcial = int(s[0]) + int(s[1])
            soma += parcial
            if peso == 2:
                peso = 1
            else:
                peso = 2

        resto10 = soma % 10
        if resto10 == 0:
            modulo10 = 0
        else:
            modulo10 = 10 - resto10

        return modulo10

    @staticmethod
    def modulo11(num, base=9, r=0):
        if not isinstance(num, basestring):
            raise TypeError
        soma = 0
        fator = 2
        for c in reversed(num):
            soma += int(c) * fator
            if fator == base:
                fator = 1
            fator += 1
        if r == 0:
            soma = soma * 10
            digito = soma % 11
            if digito == 10:
                digito = 0
            return digito
        if r == 1:
            resto = soma % 11
            return resto

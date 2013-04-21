__author__ = 'rodrigo'

class BitexExecption(Exception):
  pass

class OrderNotFound(BitexExecption):
  pass

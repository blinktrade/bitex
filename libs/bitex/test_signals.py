__author__ = 'rodrigo'

import unittest

from signals import Signal

signal_calls = []

def onSignalFunction(sender, data):
  signal_calls.append( ( 'function', sender, data   ) )

class A(object):
  def onSignalMethod(self, sender, data):
    signal_calls.append( ( 'A::onSignalMethod', sender, data   ) )

class B(object):
  def __init__(self, signal):
    signal.connect(self.onSignalMethod)

  def onSignalMethod(self, sender, data):
    signal_calls.append( ( 'B::onSignalMethod', sender, data   ) )


class TestSignal(unittest.TestCase):
  def setUp(self):
    self.sig_function = Signal()
    self.sig_method = Signal()
    self.sig_function.connect(onSignalFunction)

    global signal_calls
    signal_calls = []

  def test_signal_function(self):
    self.sig_function('sender1', 'data1')
    self.assertEqual(1, len(signal_calls))

    self.assertEqual( 'function', signal_calls[0][0] )
    self.assertEqual( 'sender1', signal_calls[0][1] )
    self.assertEqual( 'data1', signal_calls[0][2] )


  def test_signal_method(self):
    a = A()
    self.sig_method.connect(a.onSignalMethod)

    self.sig_method('sender1', 'data1')

    self.assertEqual(1, len(signal_calls))
    self.assertEqual( 'A::onSignalMethod',  signal_calls[0][0] )
    self.assertEqual( 'sender1',            signal_calls[0][1] )
    self.assertEqual( 'data1',              signal_calls[0][2] )

    del a
    self.sig_method('sender1', 'data1')
    self.assertEqual(1, len(signal_calls))

    b = B(self.sig_method)
    self.sig_method('sender2', 'data2')

    self.assertEqual(2, len(signal_calls))
    self.assertEqual( 'B::onSignalMethod',  signal_calls[1][0] )
    self.assertEqual( 'sender2',            signal_calls[1][1] )
    self.assertEqual( 'data2',              signal_calls[1][2] )

    del b
    self.sig_method('sender3', 'data3')
    self.assertEqual(2, len(signal_calls))

  def test_sender_signal_method(self):
    a = A()
    self.sig_method.connect(a.onSignalMethod, 'sender1')

    self.sig_method('sender1', 'data1')

    self.assertEqual(1, len(signal_calls))
    self.assertEqual( 'A::onSignalMethod',  signal_calls[0][0] )
    self.assertEqual( 'sender1',            signal_calls[0][1] )
    self.assertEqual( 'data1',              signal_calls[0][2] )


    self.sig_method('sender2', 'data2')
    self.assertEqual(1, len(signal_calls))

    self.sig_method('sender1', 'data2')
    self.assertEqual(2, len(signal_calls))

    del a
    self.sig_method('sender1', 'data3')
    self.assertEqual(2, len(signal_calls))

  def test_sender_signal_function(self):
    def on_signal_func(sender, data):
      signal_calls.append( ( 'function', sender, data   ) )

    self.sig_method.connect( on_signal_func, 'sender1' )
    self.sig_method('sender1', 'data1')

    self.assertEqual(1, len(signal_calls))
    self.assertEqual( 'function',           signal_calls[0][0] )
    self.assertEqual( 'sender1',            signal_calls[0][1] )
    self.assertEqual( 'data1',              signal_calls[0][2] )

    self.sig_method('sender2', 'data2')
    self.assertEqual(1, len(signal_calls))

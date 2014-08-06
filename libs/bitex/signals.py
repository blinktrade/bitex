__author__ = 'rodrigo'
import weakref
import inspect
import traceback
import logging
import threading

class Signal():
  signal_error = None
  _lock = threading.RLock()

  def __init__(self):
    self._functions = weakref.WeakSet()
    self._methods = weakref.WeakKeyDictionary()

    self._methods_subs = {}
    self._functions_subs = {}

    if not Signal.signal_error:
      Signal.signal_error = 1
      Signal.signal_error = Signal()

  def connect(self, slot, sender=None):
    if sender:
      if inspect.ismethod(slot):
        if sender not in self._methods_subs:
          self._methods_subs[sender] = weakref.WeakKeyDictionary()

        if slot.__self__ not in self._methods_subs[sender]:
          self._methods_subs[sender][slot.__self__] = set()

        self._methods_subs[sender][slot.__self__].add(slot.__func__)
      else:
        if sender not in self._functions_subs:
          self._functions_subs[sender] = weakref.WeakSet()
        self._functions_subs[sender].add(slot)
    else:
      if inspect.ismethod(slot):
        if slot.__self__ not in self._methods:
          self._methods[slot.__self__] = set()
        self._methods[slot.__self__].add(slot.__func__)
      else:
        self._functions.add(slot)

  def __call__(self, sender, data=None, error_signal_on_error=True):
    with self._lock:
      sent = False
      errors = []

      def publish_functions(functions):
        for func in functions:
          try:
            func(sender, data)
            sent = True

          # pylint: disable=W0702
          except:
            errors.append(traceback.format_exc())
      publish_functions(self._functions)
      if sender in self._functions_subs:
        publish_functions(self._functions_subs[sender])
        if not self._functions_subs[sender]:
          del self._functions_subs[sender]



      def publish_methods( methods ):
        for obj, funcs in methods.items():
          for func in funcs:
            try:
              func(obj, sender, data)
              sent = True

            # pylint: disable=W0702
            except:
              errors.append(traceback.format_exc())
      publish_methods(self._methods)

      if sender in self._methods_subs:
        publish_methods(self._methods_subs[sender])
        if not self._methods_subs[sender]:
          del self._methods_subs[sender]


      for error in errors:
        if error_signal_on_error:
          Signal.signal_error(self, (error), False)
        else:
          logging.critical(error)

      return sent


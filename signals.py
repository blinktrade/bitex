__author__ = 'rodrigo'
import weakref
import inspect
import traceback
import logging

class Signal():
  signal_error = None

  def __init__(self):
    self._functions = weakref.WeakSet()
    self._methods = weakref.WeakKeyDictionary()

    if not Signal.signal_error:
      Signal.signal_error = 1
      Signal.signal_error = Signal()

  def connect(self, slot):
    if inspect.ismethod(slot):
      if slot.__self__ not in self._methods:
        self._methods[slot.__self__] = set()
      self._methods[slot.__self__].add(slot.__func__)
    else:
      self._functions.add(slot)

  def __call__(self, sender, data, error_signal_on_error=True):
    sent = False
    errors = []
    for func in self._functions:
      try:
        func(sender, data)
        sent = True

      # pylint: disable=W0702
      except:
        errors.append(traceback.format_exc())

    for obj, funcs in self._methods.items():
      for func in funcs:
        try:
          func(obj, sender, data)
          sent = True

        # pylint: disable=W0702
        except:
          errors.append(traceback.format_exc())

    for error in errors:
      if error_signal_on_error:
        Signal.signal_error(self, (error), False)
      else:
        logging.critical(error)

    return sent


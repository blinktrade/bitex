__author__ = 'rodrigo'

from  signals import Signal

trades_signal           = Signal()
top_of_the_book_signal  = Signal()
order_book_signal       = Signal()


class MdSubscriptionHelper(object):
  def __init__(self, market_depth, entry, instrument, handler):
    self.handler = handler

    if entry in ('0', '1', 'B'):  # Bid, Offer, Trade Volume
      if market_depth == 0:
        top_of_the_book_signal.connect( self.signal_handler, instrument + '.' + entry )
      elif market_depth == 1:
        order_book_signal.connect( self.signal_handler, instrument + '.' + entry )

    elif entry == '2': # Trade
      trades_signal.connect(self.signal_handler, instrument)


  def signal_handler(self, *args, **kwargs):
    self.handler(*args, **kwargs)

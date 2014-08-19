import tornado.web
import tornado.httpclient

from tornado import httpclient
from functools import partial

class BlockNotifyHandler(tornado.web.RequestHandler):
  def get(self, hash):
    self.application.log('HTTP_GET', '/api/blocknotify/' + hash )
    from models import ForwardingAddress

    unconfirmed_forwarding_addresses = ForwardingAddress.get_unconfirmed_by_client(self.application.db_session)

    should_commit = False
    for unconfirmed_forwarding_address in unconfirmed_forwarding_addresses:
      try:
        self.application.log('DEBUG', 'invoking bitcoind gettransaction ' + unconfirmed_forwarding_address.input_transaction_hash )
        tx = self.application.bitcoind.gettransaction(unconfirmed_forwarding_address.input_transaction_hash)

        unconfirmed_forwarding_address.confirmations = tx['confirmations']
        unconfirmed_forwarding_address.confirm_callback_attempt += 1
        self.application.db_session.add(unconfirmed_forwarding_address)
        should_commit = True

        self.application.invoke_callback_url(unconfirmed_forwarding_address)
      except Exception,e:
        self.application.log('ERROR', str(e))
    if should_commit:
      self.application.db_session.commit()

    self.write('*ok*')


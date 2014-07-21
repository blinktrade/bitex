import tornado.web
import tornado.httpclient
import decimal

class WalletNotifyHandler(tornado.web.RequestHandler):
  def get(self, txid):
    self.application.log('HTTP_GET', '/api/walletnotify/' + txid )

    miners_fee = self.application.paytxfee

    from models import ForwardingAddress
    transaction = self.application.bitcoind.gettransaction(txid)

    if transaction is None:
      self.send_error(404)
      return

    input_address = None
    for transaction_detail in transaction['details']:
      if transaction_detail['category'] == 'receive':
        input_address = transaction_detail['address']

    if input_address is None:
      self.send_error(404)
      return


    fwd_transaction_record = ForwardingAddress.get_by_input_address(self.application.db_session, input_address)
    if fwd_transaction_record is None:
      self.send_error(404)
      return

    if fwd_transaction_record.is_transmitted():
      self.write('*ok*')
      return


    if not fwd_transaction_record.is_complete():
      destination_address  = fwd_transaction_record.destination_address

      raw_transaction = self.application.bitcoind.getrawtransaction(txid)
      decoded_raw_transaction = self.application.bitcoind.decoderawtransaction(raw_transaction)

      vout_index = 0
      found_address = False
      for vout in decoded_raw_transaction['vout']:
        found_address = False
        for vout_address in vout['scriptPubKey']['addresses']:
          if input_address == vout_address:
            found_address = True
            break
        if found_address:
          break
        vout_index += 1

      if not found_address:
        self.send_error()
        return

      vout = decoded_raw_transaction['vout'][vout_index]
      input_value = vout['value']
      fwd_value = vout['value'] - miners_fee


      fwd_raw_transaction = self.application.bitcoind.createrawtransaction(
        [{"txid" : txid, "vout" : vout_index}],
        { destination_address: float(fwd_value) }
      )

      signed_fwd_raw_transaction = self.application.bitcoind.signrawtransaction (fwd_raw_transaction,[{
          "txid" : txid,
          "vout" : vout_index,
          "scriptPubKey" : vout['scriptPubKey']['hex']
        }])

      decoded_signed_fwd_raw_transaction = self.application.bitcoind.decoderawtransaction(signed_fwd_raw_transaction['hex'])
      transaction_hash = decoded_signed_fwd_raw_transaction['txid']

      fwd_transaction_record.set_as_completed(txid,
                                              transaction_hash,
                                              int(float(input_value) * 1e8),
                                              int(float(miners_fee) * 1e8),
                                              int(float(fwd_value) * 1e8),
                                              signed_fwd_raw_transaction['hex'])
      self.application.db_session.add(fwd_transaction_record)
      self.application.db_session.commit()

      self.application.invoke_callback_url(fwd_transaction_record)

    transaction_hash = self.application.bitcoind.sendrawtransaction(fwd_transaction_record.signed_fwd_transaction)

    fwd_transaction_record.set_as_transmitted(transaction_hash)
    self.application.db_session.add(fwd_transaction_record)
    self.application.db_session.commit()


    self.write('*ok*')

def get_funded_entries(orders, balance, is_total_vol):
  total_vol_usd = 0
  total_vol_btc = 0
  funded_entries = []
  for price_usd, size_btc in orders:
    vol_usd = (price_usd * size_btc) / 1e8
    previous_total_vol_btc = total_vol_btc
    previous_total_vol_usd = total_vol_usd
    total_vol_usd += vol_usd
    total_vol_btc += size_btc
    if is_total_vol:
      if total_vol_usd > balance:
        available_volume = balance - previous_total_vol_usd
        if available_volume:
          funded_entries.append([ price_usd, int( (float (available_volume) / float (price_usd)) * 1.e8) ])
        break
    else:
      if total_vol_btc > balance:
        if balance-previous_total_vol_btc:
          funded_entries.append([ price_usd, int(balance-previous_total_vol_btc) ])
        break
    funded_entries.append([ price_usd, size_btc ])
  return funded_entries


def aggregate_orders(order_list):
  res = []
  for price, size in order_list:
    if res:
      if res[-1][0] == price:
        res[-1][1] += size
      else:
        res.append( [ price, size ] )
    else:
      res.append( [ price, size ] )
  return res

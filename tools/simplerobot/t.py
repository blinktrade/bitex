import json
import urllib2

response = urllib2.urlopen('http://www.bitcointoyou.com/API/orderbook.aspx')
#data = json.load(urllib2.urlopen('http://www.bitcointoyou.com/API/orderbook.aspx'))


print response

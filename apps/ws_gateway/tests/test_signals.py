# -*- coding: utf-8 -*-

import os
import sys
ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert( 0, ROOT_PATH)

import unittest
import mock

from market_data_helper import MarketDataPublisher, MarketDataSubscriber, signal_publish_md_status, signal_publish_md_order_depth_incremental

class MarketDataPubSubTest(unittest.TestCase):
  def setUp(self):
    self.application = mock.Mock()
    self.application.db_session = mock.Mock()

    self.md_subscriber = {}
    self.md_subscriber["BTCUSD"] = MarketDataSubscriber.get("BTCUSD", self.application)
    self.md_subscriptions = {}

    self.zmq_context = mock.Mock()
    self.zmq_context.socket = mock.MagicMock()
    self.zmq_context.connect = mock.MagicMock()
    self.zmq_context.setsockopt = mock.MagicMock()

    self.application_trade_client = mock.Mock()

    self.trade_pub = "XXX"

    self.on_send_json_msg_to_user = mock.Mock(name='send_json_msg_to_user', return_value=None)

  @mock.patch('zmq.eventloop.zmqstream.ZMQStream')
  def testSubscribe(self, ZMQStreamMock):
    self.md_subscriber["BTCUSD"].subscribe(
        self.zmq_context,
        self.trade_pub,
        self.application_trade_client)

    self.application_trade_client.sendJSON.assert_called_with({
        'MDEntryTypes': ['0', '1', '2'],
        'Instruments': ['BTCUSD'],
        'MsgType': 'V',
        'TradeDate': '20150115',
        'MDReqID': '0',
        'MDUpdateType': '0',
        'SubscriptionRequestType': '0',
        'MarketDepth': 0
      })


    md_full_refresh_msg = {"MDReqID": "0", "Symbol": "BTCUSD", "MsgType": "W", "MDFullGrp": [], "MarketDepth": 0}
    self.md_subscriber["BTCUSD"].on_md_full_refresh(md_full_refresh_msg)


    self.md_subscriptions["0"] = []
    self.md_subscriptions["0"].append(
      MarketDataPublisher(
        "0",
        0,
        ["0","1"],
        "BTCUSD",
        self.on_send_json_msg_to_user,
        False))
    print len(signal_publish_md_order_depth_incremental._methods_subs['BTCUSD.3'].items())

    md_incrementa_msg = []
    md_incrementa_msg.append({
      "MsgType": "X",
      "MDBkTyp": "3",
      "MDIncGrp": [{
        "OrderID": 1,
        "MDEntryPx": 40000000000,
        "UserID": 90000002,
        "MDEntryPositionNo": 1,
        "Username": "user",
        "MDUpdateAction": "0",
        "MDEntryTime": "22:08:14",
        "Symbol": "BTCUSD",
        "Broker": "exchange",
        "MDEntryType": "1",
        "MDEntrySize": 100000000,
        "MDEntryID": 1,
        "MDEntryDate": "2015-01-15"
      }]
    })
    self.md_subscriber["BTCUSD"].on_md_incremental(md_incrementa_msg[0])
    self.assertAlmostEquals( 1 ,self.on_send_json_msg_to_user.call_count)
    self.assertAlmostEquals( 0 , len(self.md_subscriber["BTCUSD"].buy_side) )
    self.assertAlmostEquals( 1 , len(self.md_subscriber["BTCUSD"].sell_side) )


    md_incrementa_msg.append({
      "MsgType": "X",
      "MDBkTyp": "3",
      "MDIncGrp": [{
        "OrderID": 2,
        "MDEntryPx": 40000000000,
        "UserID": 90000002,
        "MDEntryPositionNo": 2,
        "Username": "user",
        "MDUpdateAction": "0",
        "MDEntryTime": "22:10:28",
        "Symbol": "BTCUSD",
        "Broker": "exchange",
        "MDEntryType": "1",
        "MDEntrySize": 100000000,
        "MDEntryID": 2,
        "MDEntryDate": "2015-01-15"
      }]
    })
    self.md_subscriber["BTCUSD"].on_md_incremental(md_incrementa_msg[1])
    self.assertAlmostEquals( 2 ,self.on_send_json_msg_to_user.call_count)
    self.assertAlmostEquals( 0 , len(self.md_subscriber["BTCUSD"].buy_side) )
    self.assertAlmostEquals( 2 , len(self.md_subscriber["BTCUSD"].sell_side) )

    print len(signal_publish_md_order_depth_incremental._methods_subs['BTCUSD.3'].items())

    # emulate 2k connections
    for x in xrange(1,2000):
      self.md_subscriptions[str(x)] = []
      self.md_subscriptions[str(x)].append(
        MarketDataPublisher(
          "0",
          str(x),
          ["0","1"],
          "BTCUSD",
          self.on_send_json_msg_to_user,
          False))

    md_incrementa_msg.append({
      "MsgType": "X",
      "MDBkTyp": "3",
      "MDIncGrp": [{
        "OrderID": 3,
        "MDEntryPx": 40000000000,
        "UserID": 90000002,
        "MDEntryPositionNo": 3,
        "Username": "user",
        "MDUpdateAction": "0",
        "MDEntryTime": "22:10:38",
        "Symbol": "BTCUSD",
        "Broker": "exchange",
        "MDEntryType": "1",
        "MDEntrySize": 100000000,
        "MDEntryID": 3,
        "MDEntryDate": "2015-01-15"
      }]
    })
    self.on_send_json_msg_to_user.reset_mock()
    self.md_subscriber["BTCUSD"].on_md_incremental(md_incrementa_msg[2])
    self.assertAlmostEquals( 0 , len(self.md_subscriber["BTCUSD"].buy_side) )
    self.assertAlmostEquals( 3 , len(self.md_subscriber["BTCUSD"].sell_side) )
    self.assertAlmostEquals( 2000 ,self.on_send_json_msg_to_user.call_count)
    print len(signal_publish_md_order_depth_incremental._methods_subs['BTCUSD.3'].items())

    # let's close the first 1k connections
    for x in xrange(0,1000):
      del self.md_subscriptions[str(x)]

    md_incrementa_msg.append({
      "MsgType": "X",
      "MDBkTyp": "3",
      "MDIncGrp": [{
        "OrderID": 4,
        "MDEntryPx": 40000000000,
        "UserID": 90000002,
        "MDEntryPositionNo": 4,
        "Username": "user",
        "MDUpdateAction": "0",
        "MDEntryTime": "22:10:38",
        "Symbol": "BTCUSD",
        "Broker": "exchange",
        "MDEntryType": "1",
        "MDEntrySize": 100000000,
        "MDEntryID": 4,
        "MDEntryDate": "2015-01-15"
      }]
    })
    self.on_send_json_msg_to_user.reset_mock()
    self.md_subscriber["BTCUSD"].on_md_incremental(md_incrementa_msg[2])
    self.assertAlmostEquals( 0 , len(self.md_subscriber["BTCUSD"].buy_side) )
    self.assertAlmostEquals( 4 , len(self.md_subscriber["BTCUSD"].sell_side) )
    self.assertAlmostEquals( 1000 ,self.on_send_json_msg_to_user.call_count)

    print len(signal_publish_md_status._methods_subs['MD_STATUS'].items())
    print len(signal_publish_md_order_depth_incremental._methods_subs['BTCUSD.3'].items())
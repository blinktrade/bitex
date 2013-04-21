__author__ = 'rodrigo'

import unittest

from orders import Order
from execution import  OrderMatcher, execution_report_signal

class TestForbiddenExecutions(unittest.TestCase):
  def setUp(self):
    self.om = OrderMatcher('BRLBTC')
    # BUY
    self.o1 = Order.create('a','a','101', 'BRLBTC', '1','2',100,1)
    self.o2 = Order.create('b','b','102', 'BRLBTC', '1','2',99,2)
    self.o3 = Order.create('c','c','103', 'BRLBTC', '1','2',98,5)

    # SELL
    self.o4 = Order.create('d','d','104', 'BRLBTC', '2','2',101,5)
    self.o5 = Order.create('e','e','105', 'BRLBTC', '2','2',102,2)
    self.o6 = Order.create('f','f','106', 'BRLBTC', '2','2',103,1)

    self.om.match(self.o1)
    self.om.match(self.o2)
    self.om.match(self.o3)
    self.om.match(self.o4)
    self.om.match(self.o5)
    self.om.match(self.o6)

    self.execution_reports = []
    execution_report_signal.connect(self.onExecReport)

  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)

  def test_self_execute(self):
    """Send a buy order that would execute an sell order from the same client. The sending order should be cancelled"""

    o = Order.create('d','d','107', 'BRLBTC', '1','2',102,6)
    self.om.match(o)

    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 3, len(self.om.sell_side) )

    self.assertEqual( "4"      , o.status )
    self.assertEqual( 0        , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 6        , o.cxl_qty )


    self.assertEqual( 1        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 0        ,  self.execution_reports[0].leaves_qty )


  def test_fill_one_order_and_self_execute(self):
    """Send a buy order that will fill o4, but
       that order would also try to match o5, but o5 belong to the same client."""

    o = Order.create('e','e','107', 'BRLBTC', '1','2',102,6)
    self.om.match(o)

    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )

    # order was partially filled and cancelled after.
    self.assertEqual( "4"      , o.status )
    self.assertEqual( 101      , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 5        , o.last_qty )
    self.assertEqual( 1        , o.cxl_qty )

    # o4 was fully filled
    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101      , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5        , self.o4.cum_qty )

    # make sure o5 was not modified
    self.assertEqual( "0"      , self.o5.status )
    self.assertEqual( 0        , self.o5.last_price )
    self.assertEqual( 2        , self.o5.leaves_qty )
    self.assertEqual( 0        , self.o5.cum_qty )


    self.assertEqual( 4        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 6        ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type )
    self.assertEqual( 101      ,  self.execution_reports[1].last_price )
    self.assertEqual( 5        ,  self.execution_reports[1].last_shares )
    self.assertEqual( 1        ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[2].execution_type )
    self.assertEqual( 101      ,  self.execution_reports[2].last_price )
    self.assertEqual( 5        ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[3].execution_type )
    self.assertEqual( 101      ,  self.execution_reports[3].last_price )
    self.assertEqual( 5        ,  self.execution_reports[3].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[3].leaves_qty )


class TestExecutions(unittest.TestCase):
  def setUp(self):
    self.om = OrderMatcher('BRLBTC')
    # BUY
    self.o1 = Order.create('a','a','101', 'BRLBTC', '1','2',100,1)
    self.o2 = Order.create('b','b','102', 'BRLBTC', '1','2',99,2)
    self.o3 = Order.create('c','c','103', 'BRLBTC', '1','2',98,5)

    # SELL
    self.o4 = Order.create('d','d','104', 'BRLBTC', '2','2',101,5)
    self.o5 = Order.create('e','e','105', 'BRLBTC', '2','2',102,2)
    self.o6 = Order.create('f','f','106', 'BRLBTC', '2','2',103,1)

    self.om.match(self.o1)
    self.om.match(self.o2)
    self.om.match(self.o3)
    self.om.match(self.o4)
    self.om.match(self.o5)
    self.om.match(self.o6)

    self.execution_reports = []
    execution_report_signal.connect(self.onExecReport)

  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)



  def test_full_fill_two_orders_and_partially_fill_sending_order(self):
    """create a buy order order that will be partially filled and will fully fill o4 and o5"""
    o = Order.create('g','g','107', 'BRLBTC', '1','2',102,10)
    self.om.match(o)
    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 1, len(self.om.sell_side) )

    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101      , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5        , self.o4.cum_qty )

    self.assertEqual( "2"      , self.o5.status )
    self.assertEqual( 102      , self.o5.last_price )
    self.assertEqual( 0        , self.o5.leaves_qty )
    self.assertEqual( 2        , self.o5.cum_qty )

    self.assertEqual( "1"      , o.status )
    self.assertEqual( 102      , o.last_price )
    self.assertEqual( 3        , o.leaves_qty )
    self.assertEqual( 7        , o.cum_qty )

    self.assertEqual( 5        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 10       ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[1].last_price )
    self.assertEqual( 5        ,  self.execution_reports[1].last_shares )
    self.assertEqual( 5        ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[2].last_price )
    self.assertEqual( 5        ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[3].execution_type)
    self.assertEqual( 102      ,  self.execution_reports[3].last_price )
    self.assertEqual( 2        ,  self.execution_reports[3].last_shares )
    self.assertEqual( 3        ,  self.execution_reports[3].leaves_qty )

    self.assertEqual( "105"    ,  self.execution_reports[4].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[4].execution_type)
    self.assertEqual( 102      ,  self.execution_reports[4].last_price )
    self.assertEqual( 2        ,  self.execution_reports[4].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[4].leaves_qty )

  def test_full_fill_one_orders_and_partially_fill_one_order(self):
    """create a buy order order that will  be fully filled and will full fill o4 and partially fill o5"""
    o = Order.create('g','g','107', 'BRLBTC', '1','2',102,6)
    self.om.match(o)
    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )

    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101      , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5        , self.o4.cum_qty )

    self.assertEqual( "1"      , self.o5.status )
    self.assertEqual( 102      , self.o5.last_price )
    self.assertEqual( 1        , self.o5.leaves_qty )
    self.assertEqual( 1        , self.o5.cum_qty )

    self.assertEqual( "2"      , o.status )
    self.assertEqual( 102      , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 6        , o.cum_qty )


    self.assertEqual( 5        , len(self.execution_reports) )


    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 6        ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[1].last_price )
    self.assertEqual( 5        ,  self.execution_reports[1].last_shares )
    self.assertEqual( 1        ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[2].last_price )
    self.assertEqual( 5        ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[3].execution_type)
    self.assertEqual( 102      ,  self.execution_reports[3].last_price )
    self.assertEqual( 1        ,  self.execution_reports[3].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[3].leaves_qty )

    self.assertEqual( "105"    ,  self.execution_reports[4].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[4].execution_type)
    self.assertEqual( 102      ,  self.execution_reports[4].last_price )
    self.assertEqual( 1        ,  self.execution_reports[4].last_shares )
    self.assertEqual( 1        ,  self.execution_reports[4].leaves_qty )



  def test_full_fill_one_order_and_partially_fill_the_sending_order(self):
    """create a buy order order that will  be fully filled and will full fill o4"""
    o = Order.create('g','g','107', 'BRLBTC', '1','2',101,10)
    self.om.match(o)
    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )

    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101      , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5        , self.o4.cum_qty )

    self.assertEqual( "1"      , o.status )
    self.assertEqual( 101      , o.last_price )
    self.assertEqual( 5        , o.leaves_qty )
    self.assertEqual( 5        , o.cum_qty )


    self.assertEqual( 3        , len(self.execution_reports) )

    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 10       ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[1].last_price )
    self.assertEqual( 5        ,  self.execution_reports[1].last_shares )
    self.assertEqual( 5        ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[2].last_price )
    self.assertEqual( 5        ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )


  def test_partial_fill_one_order_and_fully_fill_the_sending_order(self):
    """create a buy order order that will  be fully filled and will partially fill o4"""
    o = Order.create('g','g','107', 'BRLBTC', '1','2',101,1)
    self.om.match(o)
    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 3, len(self.om.sell_side) )

    self.assertEqual( "1"      , self.o4.status )
    self.assertEqual( 101      , self.o4.last_price )
    self.assertEqual( 4        , self.o4.leaves_qty )
    self.assertEqual( 1        , self.o4.cum_qty )

    self.assertEqual( "2"      , o.status )
    self.assertEqual( 101      , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 1        , o.cum_qty )


    self.assertEqual( 3        , len(self.execution_reports) )

    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 1        ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "2"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[1].last_price )
    self.assertEqual( 1        ,  self.execution_reports[1].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "1"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101      ,  self.execution_reports[2].last_price )
    self.assertEqual( 1        ,  self.execution_reports[2].last_shares )
    self.assertEqual( 4        ,  self.execution_reports[2].leaves_qty )


class TestOrderMatcher(unittest.TestCase):
  def setUp(self):
    self.om = OrderMatcher('BRLBTC')
    # BUY
    self.o1 = Order.create('a','a','10', 'BRLBTC', '1','2',100,1)
    self.o2 = Order.create('b','b', '10', 'BRLBTC', '1','2',99,2)
    self.o3 = Order.create('c','c','10', 'BRLBTC', '1','2',98,5)

    # SELL
    self.o4 = Order.create('d','d','10', 'BRLBTC', '2','2',101,5)
    self.o5 = Order.create('e','e','10', 'BRLBTC', '2','2',102,2)
    self.o6 = Order.create('f','f','10', 'BRLBTC', '2','2',103,1)


    o8 = Order.create('h','h','10', 'BRLBTC', '1','2',101,10)
    o9 = Order.create('i','i','10', 'BRLBTC', '2','2',99,8)

    self.execution_reports = []
    execution_report_signal.connect(self.onExecReport)

  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)

  def testSendBuyOrdersWithoutExecution (self):
    o = self.o1
    self.om.match(o)
    self.assertEqual( 1, len(self.om.buy_side) )

    self.assertEqual( '0'         , o.status )
    self.assertEqual( 0           , o.cum_qty)
    self.assertEqual( o.order_qty , o.leaves_qty)

    self.assertEqual( len(self.execution_reports) , 1  )
    rpt = self.execution_reports[0]
    self.assertEqual( o.id         , rpt.order_id )
    self.assertEqual( '0'          , rpt.execution_type )
    self.assertEqual( '0'          , rpt.order_status )


    self.execution_reports = []
    self.om.match(self.o2)
    self.assertEqual( 2, len(self.om.buy_side) )

    self.om.match(self.o3)
    self.assertEqual( 3, len(self.om.buy_side) )

    self.assertEqual( len(self.execution_reports) , 2 )

    rpt = self.execution_reports[0]
    o = self.o2
    self.assertEqual( '0'         , o.status )
    self.assertEqual( 0           , o.cum_qty)
    self.assertEqual( o.order_qty , o.leaves_qty)
    self.assertEqual( o.id         , rpt.order_id )
    self.assertEqual( '0'          , rpt.execution_type )
    self.assertEqual( '0'          , rpt.order_status )

    rpt = self.execution_reports[1]
    o = self.o3
    self.assertEqual( '0'         , o.status )
    self.assertEqual( 0           , o.cum_qty)
    self.assertEqual( o.order_qty , o.leaves_qty)
    self.assertEqual( o.id         , rpt.order_id )
    self.assertEqual( '0'          , rpt.execution_type )
    self.assertEqual( '0'          , rpt.order_status )


if __name__ == '__main__':
  unittest.main()

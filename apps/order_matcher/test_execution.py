__author__ = 'rodrigo'

import unittest


from models import Order, Base, User
from execution import  OrderMatcher, execution_report_signal

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker




class TestForbiddenExecutions(unittest.TestCase):
  def setUp(self):
    engine = create_engine('sqlite:///:memory:', echo=False)
    Base.metadata.create_all(engine)

    self.session = scoped_session(sessionmaker(bind=engine))
    self.user_a = User( username='a', email='a@example.com', password ='a',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_b = User( username='b', email='b@example.com', password ='b',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_c = User( username='c', email='c@example.com', password ='c',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_d = User( username='d', email='d@example.com', password ='d',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_e = User( username='e', email='e@example.com', password ='e',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_f = User( username='f', email='f@example.com', password ='f',
                        balance_btc=20e8, balance_brl=1000e5 )


    self.session.add( self.user_a )
    self.session.add( self.user_b )
    self.session.add( self.user_c )
    self.session.add( self.user_d )
    self.session.add( self.user_e )
    self.session.add( self.user_f )
    self.session.commit()


    self.om = OrderMatcher('BRLBTC')

    # BUY
    self.o1 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                     client_order_id  = '101', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 100e5,      order_qty = 1e8)

    self.o2 = Order( user_id = self.user_b.id,account_id = self.user_b.account_id, user = self.user_b,
                     client_order_id  = '102', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 99e5,      order_qty = 2e8)

    self.o3 = Order( user_id = self.user_c.id,account_id = self.user_c.account_id, user = self.user_c,
                     client_order_id  = '103', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 98e5,      order_qty = 5e8)


    # SELL
    self.o4 = Order( user_id = self.user_d.id,account_id = self.user_d.account_id, user = self.user_d,
                     client_order_id  = '104', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 101e5,      order_qty = 5e8)

    self.o5 = Order( user_id = self.user_e.id,account_id = self.user_e.account_id, user = self.user_e,
                     client_order_id  = '105', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 102e5,      order_qty = 2e8)

    self.o6 = Order( user_id = self.user_f.id,account_id = self.user_f.account_id, user = self.user_f,
                     client_order_id  = '106', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 103e5,      order_qty = 1e8)



    self.session.add( self.o1 )
    self.session.add( self.o2 )
    self.session.add( self.o3 )
    self.session.add( self.o4 )
    self.session.add( self.o5 )
    self.session.add( self.o6 )
    self.session.commit()


    self.om.match(self.session,self.o1)
    self.om.match(self.session,self.o2)
    self.om.match(self.session,self.o3)
    self.om.match(self.session,self.o4)
    self.om.match(self.session,self.o5)
    self.om.match(self.session,self.o6)

    self.execution_reports = []
    execution_report_signal.connect(self.onExecReport)

  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)

  def test_self_execute(self):
    """Send a buy order that would execute an sell order from the same client. The counter order should be cancelled"""
    o = Order( user_id = self.user_d.id,account_id = self.user_d.account_id, user = self.user_d,
                     client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 101e5,    order_qty = 6e8)
    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)

    self.assertEqual( "4"      , self.o4.status )
    self.assertEqual( 0        , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cxl_qty )

    self.assertEqual( "0"      , o.status )
    self.assertEqual( 0        , o.last_price )
    self.assertEqual( 6e8      , o.leaves_qty )
    self.assertEqual( 0        , o.cxl_qty )

    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )


    self.assertEqual( 2        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 6e8      ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[1].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[1].last_price )
    self.assertEqual( 0        ,  self.execution_reports[1].leaves_qty )

  def test_cancel_counter_order_and_execute_next(self):
    """Send a buy order that would execute an sell order from the same client. The sending order should be cancelled"""
    o = Order( user_id = self.user_d.id,account_id = self.user_d.account_id, user = self.user_d,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 102e5,    order_qty = 6e8)
    self.session.add( o )
    self.session.commit()

    # this order should cause
    #  self.o4 should be cancelled
    #  self.o5 should be fully executed
    #  o  should be partially filled
    self.om.match(self.session, o)


    self.assertEqual( "4"      , self.o4.status )
    self.assertEqual( 0        , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cxl_qty )
    self.assertEqual( 0        , self.o4.cum_qty )

    self.assertEqual( "2"      , self.o5.status )
    self.assertEqual( 102e5    , self.o5.last_price )
    self.assertEqual( 0        , self.o5.leaves_qty )
    self.assertEqual( 0        , self.o5.cxl_qty )
    self.assertEqual( 2e8      , self.o5.cum_qty)


    self.assertEqual( "1"      , o.status )
    self.assertEqual( 102e5    , o.last_price )
    self.assertEqual( 4e8      , o.leaves_qty )
    self.assertEqual( 0        , o.cxl_qty )
    self.assertEqual( 2e8      , o.cum_qty)

    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 1, len(self.om.sell_side) )


    self.assertEqual( 4        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 6e8      ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[1].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[1].last_price )
    self.assertEqual( 0        ,  self.execution_reports[1].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[1].leaves_qty )
    self.assertEqual( 5e8      ,  self.execution_reports[1].cxl_qty )

    self.assertEqual( "107"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[2].execution_type )
    self.assertEqual( 102e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 2e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 4e8      ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "105"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[3].execution_type )
    self.assertEqual( 102e5    ,  self.execution_reports[3].last_price )
    self.assertEqual( 2e8      ,  self.execution_reports[3].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[3].leaves_qty )



  def test_fill_one_order_and_self_execute(self):
    """Send a buy order that will fill o4, but
       that order would also try to match o5, but o5 belong to the same client."""

    # o4 will be fully matched
    # o5 will be cancelled
    # o will be partially filled.

    o = Order( user_id = self.user_e.id,account_id = self.user_e.account_id, user = self.user_e,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 102e5,    order_qty = 6e8)
    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)


    # o4 was fully filled
    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cum_qty )

    # make sure o5 was cancelled
    self.assertEqual( "4"      , self.o5.status )
    self.assertEqual( 0        , self.o5.last_price )
    self.assertEqual( 0        , self.o5.leaves_qty )
    self.assertEqual( 0        , self.o5.cum_qty )
    self.assertEqual( 2e8      , self.o5.cxl_qty )

    # order was partially filled and cancelled after.
    self.assertEqual( "1"      , o.status )
    self.assertEqual( 101e5    , o.last_price )
    self.assertEqual( 1e8      , o.leaves_qty )
    self.assertEqual( 5e8      , o.last_qty )
    self.assertEqual( 0        , o.cxl_qty )


    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 1, len(self.om.sell_side) )


    self.assertEqual( 4        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 6e8      ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type )
    self.assertEqual( 101e5    ,  self.execution_reports[1].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[1].last_shares )
    self.assertEqual( 1e8      ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type )
    self.assertEqual( 101e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "105"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[3].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[3].last_price )
    self.assertEqual( 0        ,  self.execution_reports[3].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[3].leaves_qty )
    self.assertEqual( 2e8      ,  self.execution_reports[3].cxl_qty )


class TestExecutions(unittest.TestCase):
  def setUp(self):
    engine = create_engine('sqlite:///:memory:', echo=False)
    Base.metadata.create_all(engine)

    self.session = scoped_session(sessionmaker(bind=engine))

    self.user_a = User( username='a', email='a@example.com', password ='a',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_b = User( username='b', email='b@example.com', password ='b',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_c = User( username='c', email='c@example.com', password ='c',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_d = User( username='d', email='d@example.com', password ='d',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_e = User( username='e', email='e@example.com', password ='e',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_f = User( username='f', email='f@example.com', password ='f',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_g = User( username='g', email='g@example.com', password ='g',
                        balance_btc=20e8, balance_brl=1000e5 )


    self.session.add( self.user_a )
    self.session.add( self.user_b )
    self.session.add( self.user_c )
    self.session.add( self.user_d )
    self.session.add( self.user_e )
    self.session.add( self.user_f )
    self.session.add( self.user_g )
    self.session.commit()


    self.om = OrderMatcher('BRLBTC')

    # BUY
    self.o1 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                     client_order_id  = '101', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 100e5,      order_qty = 1e8)

    self.o2 = Order( user_id = self.user_b.id,account_id = self.user_b.account_id, user = self.user_b,
                     client_order_id  = '102', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 99e5,      order_qty = 2e8)

    self.o3 = Order( user_id = self.user_c.id,account_id = self.user_c.account_id, user = self.user_c,
                     client_order_id  = '103', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 98e5,      order_qty = 5e8)


    # SELL
    self.o4 = Order( user_id = self.user_d.id,account_id = self.user_d.account_id, user = self.user_d,
                     client_order_id  = '104', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 101e5,      order_qty = 5e8)

    self.o5 = Order( user_id = self.user_e.id,account_id = self.user_e.account_id, user = self.user_e,
                     client_order_id  = '105', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 102e5,      order_qty = 2e8)

    self.o6 = Order( user_id = self.user_f.id,account_id = self.user_f.account_id, user = self.user_f,
                     client_order_id  = '106', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 103e5,      order_qty = 1e8)



    self.session.add( self.o1 )
    self.session.add( self.o2 )
    self.session.add( self.o3 )
    self.session.add( self.o4 )
    self.session.add( self.o5 )
    self.session.add( self.o6 )
    self.session.commit()

    self.om.match(self.session, self.o1)
    self.om.match(self.session, self.o2)
    self.om.match(self.session, self.o3)
    self.om.match(self.session, self.o4)
    self.om.match(self.session, self.o5)
    self.om.match(self.session, self.o6)

    self.execution_reports = []
    execution_report_signal.connect(self.onExecReport)

  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)



  def test_full_fill_two_orders_and_partially_fill_sending_order(self):
    """create a buy order order that will be partially filled and will fully fill o4 and o5"""
    o = Order( user_id = self.user_g.id,account_id = self.user_g.account_id, user = self.user_g,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 102e5,    order_qty = 10e8)

    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)


    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 1, len(self.om.sell_side) )

    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cum_qty )

    self.assertEqual( "2"      , self.o5.status )
    self.assertEqual( 102e5    , self.o5.last_price )
    self.assertEqual( 0        , self.o5.leaves_qty )
    self.assertEqual( 2e8      , self.o5.cum_qty )

    self.assertEqual( "1"      , o.status )
    self.assertEqual( 102e5    , o.last_price )
    self.assertEqual( 3e8      , o.leaves_qty )
    self.assertEqual( 7e8      , o.cum_qty )

    self.assertEqual( 5        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 10e8     ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[1].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[1].last_shares )
    self.assertEqual( 5e8      ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[3].execution_type)
    self.assertEqual( 102e5    ,  self.execution_reports[3].last_price )
    self.assertEqual( 2e8      ,  self.execution_reports[3].last_shares )
    self.assertEqual( 3e8      ,  self.execution_reports[3].leaves_qty )

    self.assertEqual( "105"    ,  self.execution_reports[4].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[4].execution_type)
    self.assertEqual( 102e5    ,  self.execution_reports[4].last_price )
    self.assertEqual( 2e8      ,  self.execution_reports[4].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[4].leaves_qty )

  def test_full_fill_one_orders_and_partially_fill_one_order(self):
    """create a buy order order that will  be fully filled and will full fill o4 and partially fill o5"""
    o = Order( user_id = self.user_g.id,account_id = self.user_g.account_id, user = self.user_g,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 102e5,    order_qty = 6e8)
    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)


    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )

    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cum_qty )

    self.assertEqual( "1"      , self.o5.status )
    self.assertEqual( 102e5    , self.o5.last_price )
    self.assertEqual( 1e8      , self.o5.leaves_qty )
    self.assertEqual( 1e8      , self.o5.cum_qty )

    self.assertEqual( "2"      , o.status )
    self.assertEqual( 102e5    , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 6e8      , o.cum_qty )


    self.assertEqual( 5        , len(self.execution_reports) )


    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 6e8      ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[1].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[1].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[1].last_shares )
    self.assertEqual( 1e8      ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "107"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[3].execution_type)
    self.assertEqual( 102e5    ,  self.execution_reports[3].last_price )
    self.assertEqual( 1e8      ,  self.execution_reports[3].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[3].leaves_qty )

    self.assertEqual( "105"    ,  self.execution_reports[4].client_order_id )
    self.assertEqual( "1"      ,  self.execution_reports[4].execution_type)
    self.assertEqual( 102e5    ,  self.execution_reports[4].last_price )
    self.assertEqual( 1e8      ,  self.execution_reports[4].last_shares )
    self.assertEqual( 1e8      ,  self.execution_reports[4].leaves_qty )



  def test_full_fill_one_order_and_partially_fill_the_sending_order(self):
    """create a buy order order that will  be fully filled and will full fill o4"""
    o = Order( user_id = self.user_g.id,account_id = self.user_g.account_id, user = self.user_g,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 101e5,      order_qty = 10e8)


    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)


    self.assertEqual( 4, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )

    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cum_qty )

    self.assertEqual( "1"      , o.status )
    self.assertEqual( 101e5    , o.last_price )
    self.assertEqual( 5e8      , o.leaves_qty )
    self.assertEqual( 5e8      , o.cum_qty )


    self.assertEqual( 3        , len(self.execution_reports) )

    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 10e8     ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "1"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[1].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[1].last_shares )
    self.assertEqual( 5e8      ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "2"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )


  def test_partial_fill_one_order_and_fully_fill_the_sending_order(self):
    """create a buy order order that will  be fully filled and will partially fill o4"""
    o = Order( user_id = self.user_g.id,account_id = self.user_g.account_id, user = self.user_g,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 101e5,    order_qty = 1e8)
    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)


    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 3, len(self.om.sell_side) )

    self.assertEqual( "1"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( 4e8      , self.o4.leaves_qty )
    self.assertEqual( 1e8      , self.o4.cum_qty )

    self.assertEqual( "2"      , o.status )
    self.assertEqual( 101e5    , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 1e8      , o.cum_qty )

    self.assertEqual( 3        , len(self.execution_reports) )

    self.assertEqual( "0"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 1e8      ,  self.execution_reports[0].leaves_qty )

    self.assertEqual( "2"      ,  self.execution_reports[1].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[1].last_price )
    self.assertEqual( 1e8      ,  self.execution_reports[1].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[1].leaves_qty )

    self.assertEqual( "1"      ,  self.execution_reports[2].execution_type)
    self.assertEqual( 101e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 1e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 4e8      ,  self.execution_reports[2].leaves_qty )


class TestOrderMatcher(unittest.TestCase):
  def setUp(self):
    engine = create_engine('sqlite:///:memory:', echo=False)
    Base.metadata.create_all(engine)

    self.session = scoped_session(sessionmaker(bind=engine))

    self.user_a = User( username='a', email='a@example.com', password ='a',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_b = User( username='b', email='b@example.com', password ='b',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_c = User( username='c', email='c@example.com', password ='c',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_d = User( username='d', email='d@example.com', password ='d',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_e = User( username='e', email='e@example.com', password ='e',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_f = User( username='f', email='f@example.com', password ='f',
                        balance_btc=20e8, balance_brl=1000e5 )

    self.session.add( self.user_a )
    self.session.add( self.user_b )
    self.session.add( self.user_c )
    self.session.add( self.user_d )
    self.session.add( self.user_e )
    self.session.add( self.user_f )
    self.session.commit()


    self.om = OrderMatcher('BRLBTC')

    # BUY
    self.o1 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                     client_order_id  = '101', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 100e5,      order_qty = 1e8)

    self.o2 = Order( user_id = self.user_b.id,account_id = self.user_b.account_id, user = self.user_b,
                     client_order_id  = '102', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 99e5,      order_qty = 2e8)

    self.o3 = Order( user_id = self.user_c.id,account_id = self.user_c.account_id, user = self.user_c,
                     client_order_id  = '103', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 98e5,      order_qty = 5e8)


    # SELL
    self.o4 = Order( user_id = self.user_d.id,account_id = self.user_d.account_id, user = self.user_d,
                     client_order_id  = '104', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 101e5,      order_qty = 5e8)

    self.o5 = Order( user_id = self.user_e.id,account_id = self.user_e.account_id, user = self.user_e,
                     client_order_id  = '105', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 102e5,      order_qty = 2e8)

    self.o6 = Order( user_id = self.user_f.id,account_id = self.user_f.account_id, user = self.user_f,
                     client_order_id  = '106', symbol  = 'BRLBTC', type      = '2',
                     side             = '2',   price   = 103e5,      order_qty = 1e8)


    self.session.add( self.o1 )
    self.session.add( self.o2 )
    self.session.add( self.o3 )
    self.session.add( self.o4 )
    self.session.add( self.o5 )
    self.session.add( self.o6 )
    self.session.commit()

    self.execution_reports = []
    self.execution_reports_by_order_client_id_dict = {}
    execution_report_signal.connect(self.onExecReport)


  def get_total_executed_brl(self, client_order_id):
    total_executed_brl = 0
    if client_order_id not in self.execution_reports_by_order_client_id_dict:
      return total_executed_brl
    for rpt in self.execution_reports_by_order_client_id_dict[client_order_id]:
      total_executed_brl += int ( float(rpt.last_price) * float( rpt.last_shares) / 1.e8 )
    return total_executed_brl


  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)

    if rpt.execution_type in ('1', '2'):
      if rpt.client_order_id not in self.execution_reports_by_order_client_id_dict:
        self.execution_reports_by_order_client_id_dict[rpt.client_order_id] = []
      self.execution_reports_by_order_client_id_dict[rpt.client_order_id].append(rpt)

  def testExecutionOrderWithoutEnoughBTCToSell(self):
    """ user trying to buy from another user who doesn't have enough btc to sell in his portfolio """
    self.om.match(self.session, self.o1 )
    self.om.match(self.session, self.o2 )
    self.om.match(self.session, self.o3 )
    self.om.match(self.session, self.o4 )
    self.om.match(self.session, self.o5 )
    self.om.match(self.session, self.o6 )

    # user_h, 1BTC and 250 BRL on his account
    self.user_h = User( username='h', email='h@example.com', password ='h',
                        balance_btc=1e8, balance_brl=250e5 )
    self.session.add( self.user_h )
    self.session.commit()

    # user_h [o7] will place an sell order of 2 BTC  @ $100
    o7 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '2',   price   = 101e5,    order_qty = 3e8)
    self.session.add( o7 )
    self.session.commit()

    self.om.match(self.session, o7 )

    o8 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                client_order_id  = '108', symbol  = 'BRLBTC', type      = '2',
                side             = '1',   price   = 102e5,    order_qty = 7e8)
    self.session.add( o8 )
    self.session.commit()


    self.execution_reports = []
    self.om.match(self.session, o8 )

    # let's have user_a buying 7 BTC @ 102
    # it should execute:
    #    5 BTC from o4  ( fully execution )
    #    1 BTC from o7
    #    o7 should be canceled
    #    1 BTC from o5
    self.assertEqual( 7e8, o8.cum_qty  )
    self.assertEqual( 0 ,  o8.leaves_qty)
    self.assertEqual( 0 ,  o8.cxl_qty)
    self.assertEqual('2' , o8.status)

    self.assertEqual( 0 , self.o4.leaves_qty)
    self.assertEqual( self.o4.order_qty , self.o4.cum_qty)
    self.assertEqual( '2' , self.o4.status)

    self.assertEqual( 1e8 , self.o5.leaves_qty)
    self.assertEqual( 1e8 , self.o5.cum_qty)
    self.assertEqual( '1' , self.o5.status)

    self.assertEqual( 1e8, o7.cum_qty  )
    self.assertEqual( 2e8, o7.cxl_qty  )
    self.assertEqual( 0 ,  o7.leaves_qty)
    self.assertEqual('4' , o7.status)

    self.assertEqual( 27e8, self.user_a.balance_btc)
    self.assertEqual( 15e8, self.user_d.balance_btc)
    self.assertEqual( 19e8, self.user_e.balance_btc)
    self.assertEqual( 0, self.user_h.balance_btc)

    self.assertEqual(1000e5 -  (self.get_total_executed_brl( "101" )  + self.get_total_executed_brl( "108" )), self.user_a.balance_brl )
    self.assertEqual(1000e5 +  self.get_total_executed_brl( "104" ), self.user_d.balance_brl )
    self.assertEqual(1000e5 +  self.get_total_executed_brl( "105" ), self.user_e.balance_brl )
    self.assertEqual(250e5 +  self.get_total_executed_brl( "107" ), self.user_h.balance_brl )


  def testSellingBTCtoAnotherUserWhoDoesntHaveCash(self):
    # user_h, has 1BTC and 250BRL
    self.user_h = User( username='h', email='h@example.com', password ='h',
                        balance_btc=1e8, balance_brl=250e5 )
    self.session.add( self.user_h )
    self.session.commit()

    # user_h  sends 3 buy orders of 1 BTC @ 200BRL
    oh1 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                client_order_id  = '1081', symbol  = 'BRLBTC', type      = '2',
                side             = '1',   price   = 200e5,    order_qty = 1e8)
    oh2 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                 client_order_id  = '1082', symbol  = 'BRLBTC', type      = '2',
                 side             = '1',   price   = 200e5,    order_qty = 1e8)
    oh3 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                 client_order_id  = '1083', symbol  = 'BRLBTC', type      = '2',
                 side             = '1',   price   = 200e5,    order_qty = 1e8)

    self.session.add( oh1 )
    self.session.add( oh2 )
    self.session.add( oh3 )
    self.session.commit()


    self.execution_reports = []
    self.om.match(self.session, oh1 )
    self.om.match(self.session, oh2 )
    self.om.match(self.session, oh3 )

    self.assertEqual( 0, len(self.om.sell_side) )
    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual('0' , oh1.status)
    self.assertEqual('0' , oh2.status)
    self.assertEqual('0' , oh3.status)


    # user_i has 20BTC and 250BRL
    self.user_i = User( username='i', email='i@example.com', password ='i',
                        balance_btc=20e8, balance_brl=250e5 )
    self.session.add( self.user_i )
    self.session.commit()

    # user_i will sell 10 BTC  @ 200 BRL
    oi1 = Order( user_id = self.user_i.id,account_id = self.user_i.account_id, user = self.user_i,
                 client_order_id  = '1091', symbol  = 'BRLBTC', type      = '2',
                 side             = '2',   price   = 200e5,    order_qty = 10e8)
    self.session.add( oi1 )
    self.session.commit()

    self.execution_reports = []
    self.om.match(self.session, oi1 )

    self.assertEqual( 1, len(self.om.sell_side) )
    self.assertEqual( 0, len(self.om.buy_side) )

    print oh1
    print oh2
    print oh3
    print self.user_h
    print self.user_i

    self.assertEqual('2' , oh1.status)
    self.assertEqual('4' , oh2.status)
    self.assertEqual('4' , oh3.status)

    self.assertEqual('1' , oi1.status)



  def testUserSellingWithoutEnoughBTC_1(self):
    """user without enough money trying to buy more BTC he can possible byu. """
    self.om.match(self.session, self.o1 )
    self.om.match(self.session, self.o2 )
    self.om.match(self.session, self.o3 )
    self.om.match(self.session, self.o4 )
    self.om.match(self.session, self.o5 )
    self.om.match(self.session, self.o6 )

    # user_h, 4BTC and 0BRL on his account
    self.user_h = User( username='h', email='h@example.com', password ='h',
                        balance_btc=4e8, balance_brl=0 )
    self.session.add( self.user_h )
    self.session.commit()


    # user_h [o7] Selling 6 BTC  @ R$ 98  to user_a [self.o4]
    # but user_h has only 4 BTC to sell
    o7 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '2',   price   = 98e5,     order_qty = 6e8)
    self.session.add( o7 )
    self.session.commit()

    self.execution_reports = []
    self.om.match(self.session, o7 )

    self.assertEqual( 4e8, o7.cum_qty  )
    self.assertEqual( 0 ,  o7.leaves_qty)
    self.assertEqual( 2e8, o7.cxl_qty)
    self.assertEqual('4' , o7.status)
    self.assertEqual(98e5 ,o7.last_price)

    self.assertEqual( 1e8, self.o1.cum_qty  )
    self.assertEqual( 0  , self.o1.leaves_qty)
    self.assertEqual( 0  , self.o1.cxl_qty)
    self.assertEqual('2' , self.o1.status)
    self.assertEqual(100e5,self.o1.last_price)

    self.assertEqual( 2e8, self.o2.cum_qty  )
    self.assertEqual( 0,   self.o2.leaves_qty)
    self.assertEqual( 0  , self.o2.cxl_qty)
    self.assertEqual('2' , self.o2.status)
    self.assertEqual(99e5, self.o2.last_price)

    self.assertEqual( 1e8, self.o3.cum_qty  )
    self.assertEqual( 4e8, self.o3.leaves_qty)
    self.assertEqual( 0  , self.o3.cxl_qty)
    self.assertEqual('1' , self.o3.status)
    self.assertEqual(98e5, self.o3.last_price)


    self.assertEqual( 21e8, self.user_a.balance_btc)
    self.assertEqual( 22e8, self.user_b.balance_btc)
    self.assertEqual( 21e8, self.user_c.balance_btc)
    self.assertEqual( 0,    self.user_h.balance_btc)

    self.assertEqual(1000e5 -  self.get_total_executed_brl( "101" ), self.user_a.balance_brl )
    self.assertEqual(1000e5 -  self.get_total_executed_brl( "102" ), self.user_b.balance_brl )
    self.assertEqual(1000e5 -  self.get_total_executed_brl( "103" ), self.user_c.balance_brl )
    self.assertEqual(self.get_total_executed_brl( "107" ), self.user_h.balance_brl )


  def testUserSellingWithoutEnoughBTC_2(self):
    """user without enough money trying to buy more BTC he can possible byu. """
    self.om.match(self.session, self.o1 )
    self.om.match(self.session, self.o2 )
    self.om.match(self.session, self.o3 )
    self.om.match(self.session, self.o4 )
    self.om.match(self.session, self.o5 )
    self.om.match(self.session, self.o6 )

    # user_h, 4BTC and 0BRL on his account
    self.user_h = User( username='h', email='h@example.com', password ='h',
                        balance_btc=3e8, balance_brl=0 )
    self.session.add( self.user_h )
    self.session.commit()


    # user_h [o7] Selling 6 BTC  @ R$ 98  to user_a [self.o4]
    # but user_h has only 4 BTC to sell
    o7 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '2',   price   = 98e5,     order_qty = 6e8)
    self.session.add( o7 )
    self.session.commit()

    self.execution_reports = []
    self.om.match(self.session, o7 )

    self.assertEqual( 3e8, o7.cum_qty  )
    self.assertEqual( 0 ,  o7.leaves_qty)
    self.assertEqual( 3e8, o7.cxl_qty)
    self.assertEqual('4' , o7.status)
    self.assertEqual(99e5 ,o7.last_price)

    self.assertEqual( 1e8, self.o1.cum_qty  )
    self.assertEqual( 0  , self.o1.leaves_qty)
    self.assertEqual( 0  , self.o1.cxl_qty)
    self.assertEqual('2' , self.o1.status)
    self.assertEqual(100e5,self.o1.last_price)

    self.assertEqual( 2e8, self.o2.cum_qty  )
    self.assertEqual( 0,   self.o2.leaves_qty)
    self.assertEqual( 0  , self.o2.cxl_qty)
    self.assertEqual('2' , self.o2.status)
    self.assertEqual(99e5, self.o2.last_price)

    self.assertEqual( 0e8, self.o3.cum_qty  )
    self.assertEqual( 5e8, self.o3.leaves_qty)
    self.assertEqual( 0  , self.o3.cxl_qty)
    self.assertEqual('0' , self.o3.status)

    self.assertEqual( 21e8, self.user_a.balance_btc)
    self.assertEqual( 22e8, self.user_b.balance_btc)
    self.assertEqual( 20e8, self.user_c.balance_btc)
    self.assertEqual( 0,    self.user_h.balance_btc)

    self.assertEqual(1000e5 -  self.get_total_executed_brl( "101" ), self.user_a.balance_brl )
    self.assertEqual(1000e5 -  self.get_total_executed_brl( "102" ), self.user_b.balance_brl )
    self.assertEqual(1000e5 -  self.get_total_executed_brl( "103" ), self.user_c.balance_brl )
    self.assertEqual(self.get_total_executed_brl( "107" ), self.user_h.balance_brl )

  def testUserBuyingWithoutBRL(self):
    """user without enough money trying to buy more BTC he can possible byu. """
    self.om.match(self.session, self.o1 )
    self.om.match(self.session, self.o2 )
    self.om.match(self.session, self.o3 )
    self.om.match(self.session, self.o4 )
    self.om.match(self.session, self.o5 )
    self.om.match(self.session, self.o6 )

    # user_h, 0 BTC and 0 BRL on his account
    self.user_h = User( username='h', email='h@example.com', password ='h',
                        balance_btc=0, balance_brl=0 )
    self.session.add( self.user_h )
    self.session.commit()


    # user_h [o7] send a buy order of 5 BTC  @ $105.
    # o7 would match o4, o5 and o6 if user_h had money, but since he doesn't o7 should be fully cancelled
    # and o4,5,6 should remain intact
    o7 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '1',   price   = 105e5,      order_qty = 10e8)
    self.session.add( o7 )
    self.session.commit()

    self.execution_reports = []
    self.om.match(self.session, o7 )

    self.assertEqual( 3, len(self.om.sell_side) )

    self.assertEqual( "0"               , self.o4.status )
    self.assertEqual(  0                , self.o4.last_price )
    self.assertEqual(  0                , self.o4.cum_qty )
    self.assertEqual( self.o4.order_qty , self.o4.leaves_qty )

    self.assertEqual( "0"               , self.o5.status )
    self.assertEqual(  0                , self.o5.last_price )
    self.assertEqual(  0                , self.o5.cum_qty )
    self.assertEqual( self.o5.order_qty , self.o5.leaves_qty )

    self.assertEqual( "0"               , self.o6.status )
    self.assertEqual(  0                , self.o6.last_price )
    self.assertEqual(  0                , self.o6.cum_qty )
    self.assertEqual( self.o6.order_qty , self.o6.leaves_qty )


    self.assertEqual( 3, len(self.om.buy_side) )

    self.assertEqual( "4"               , o7.status )
    self.assertEqual(  0                , o7.last_price )
    self.assertEqual(  0                , o7.cum_qty )
    self.assertEqual( o7.order_qty      , o7.cxl_qty )


  def testUserBuyingWithoutEnoughBRL(self):
    """user without enough money trying to buy more BTC he can possible byu. """
    self.om.match(self.session, self.o1 )
    self.om.match(self.session, self.o2 )
    self.om.match(self.session, self.o3 )
    self.om.match(self.session, self.o4 )
    self.om.match(self.session, self.o5 )
    self.om.match(self.session, self.o6 )

    # user_h, 0 BTC and 250 BRL on his account
    self.user_h = User( username='h', email='h@example.com', password ='h',
                        balance_btc=0, balance_brl=250e5 )
    self.session.add( self.user_h )
    self.session.commit()


    # user_h [o7] buying 3 BTC  @ $101 from user_d [self.o4], total value is  $303
    # but user_h has only $250 BRL, and no BTC at all
    o7 = Order( user_id = self.user_h.id,account_id = self.user_h.account_id, user = self.user_h,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '1',   price   = 101e5,      order_qty = 3e8)
    self.session.add( o7 )
    self.session.commit()

    user_h_initial_balance_brl = self.user_h.balance_brl
    user_h_initial_balance_btc = self.user_h.balance_btc
    user_d_initial_balance_brl = self.user_d.balance_brl
    user_d_initial_balance_btc = self.user_d.balance_btc

    execution_total_brl = (o7.price * o7.order_qty) / 1e8
    execution_total_btc = o7.order_qty
    if execution_total_brl > self.user_h.balance_brl:
      execution_total_btc = int( float(self.user_h.balance_brl) / float(o7.price) * 1e8)
      execution_total_brl = int( float(o7.price) *  float(execution_total_btc)/1e8  )

    self.execution_reports = []
    self.om.match(self.session, o7 )

    user_h_expected_balance_brl = user_h_initial_balance_brl - execution_total_brl
    user_h_expected_balance_btc = user_h_initial_balance_btc + execution_total_btc
    user_d_expected_balance_brl = user_d_initial_balance_brl + execution_total_brl
    user_d_expected_balance_btc = user_d_initial_balance_btc - execution_total_btc

    self.assertEqual( user_h_expected_balance_btc, self.user_h.balance_btc )
    self.assertEqual( user_d_expected_balance_btc, self.user_d.balance_btc )

    self.assertEqual( user_h_expected_balance_brl, self.user_h.balance_brl )
    self.assertEqual( user_d_expected_balance_brl, self.user_d.balance_brl )

    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 3, len(self.om.sell_side) )

    self.assertEqual( "1"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( execution_total_btc  , self.o4.cum_qty )
    self.assertEqual( self.o4.order_qty - self.o4.cum_qty   , self.o4.leaves_qty )

    self.assertEqual( "4"      , o7.status )
    self.assertEqual( 101e5    , o7.last_price )
    self.assertEqual( execution_total_btc  , o7.cum_qty )
    self.assertEqual( 0        , o7.leaves_qty)
    self.assertEqual( o7.order_qty - o7.cum_qty, o7.cxl_qty)

    self.assertEqual( len(self.execution_reports) , 4 )




  def testUserUpdateBalance(self):
    self.om.match(self.session, self.o1 )
    self.om.match(self.session, self.o2 )
    self.om.match(self.session, self.o3 )
    self.om.match(self.session, self.o4 )
    self.om.match(self.session, self.o5 )
    self.om.match(self.session, self.o6 )

    # user_a [o7] buying 3 BTC  @ $101 from user_d [self.o4]
    o7 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '1',   price   = 101e5,      order_qty = 3e8)
    self.session.add( o7 )
    self.session.commit()

    user_a_initial_balance_brl = self.user_a.balance_brl
    user_a_initial_balance_btc = self.user_a.balance_btc

    user_d_initial_balance_brl = self.user_d.balance_brl
    user_d_initial_balance_btc = self.user_d.balance_btc

    execution_total_brl = (o7.price * o7.order_qty) / 1e8

    self.om.match(self.session, o7 )


    user_a_expected_balance_brl = user_a_initial_balance_brl - execution_total_brl
    user_a_expected_balance_btc = user_a_initial_balance_btc + o7.order_qty

    user_d_expected_balance_brl = user_d_initial_balance_brl + execution_total_brl
    user_d_expected_balance_btc = user_d_initial_balance_btc - o7.order_qty

    self.assertEqual( user_a_expected_balance_brl, self.user_a.balance_brl )
    self.assertEqual( user_a_expected_balance_btc, self.user_a.balance_btc )
    self.assertEqual( user_d_expected_balance_brl, self.user_d.balance_brl )
    self.assertEqual( user_d_expected_balance_btc, self.user_d.balance_btc )


  def testSameClientWithBestOfferAndAsk(self):
    o1 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '1',   price   = 100e5,      order_qty = 1e8)
    o2 = Order( user_id = self.user_a.id,account_id = self.user_a.account_id, user = self.user_a,
                client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                side             = '2',   price   = 101e5,      order_qty = 1e8)

    self.session.add( o1 )
    self.session.add( o2 )
    self.session.commit()


    self.om.match(self.session, o1 )
    self.om.match(self.session, o2 )

    self.assertEqual( 1, len(self.om.buy_side) )
    self.assertEqual( 1, len(self.om.sell_side) )



  def testSendBuyOrdersWithoutExecution (self):
    o = self.o1
    self.om.match(self.session, o)
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
    self.om.match(self.session, self.o2)
    self.assertEqual( 2, len(self.om.buy_side) )

    self.om.match(self.session, self.o3)
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

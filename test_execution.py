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
    self.user_a = User( username='a', first_name='a', last_name='_', email='a@example.com', password ='a',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_b = User( username='b', first_name='b', last_name='_', email='b@example.com', password ='b',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_c = User( username='c', first_name='c', last_name='_', email='c@example.com', password ='c',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_d = User( username='d', first_name='d', last_name='_', email='d@example.com', password ='d',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_e = User( username='e', first_name='e', last_name='_', email='e@example.com', password ='e',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_f = User( username='f', first_name='f', last_name='_', email='f@example.com', password ='f',
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
    """Send a buy order that would execute an sell order from the same client. The sending order should be cancelled"""
    o = Order( user_id = self.user_d.id,account_id = self.user_d.account_id, user = self.user_d,
                     client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
                     side             = '1',   price   = 102e5,    order_qty = 6e8)
    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)

    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 3, len(self.om.sell_side) )

    self.assertEqual( "4"      , o.status )
    self.assertEqual( 0        , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 6e8      , o.cxl_qty )


    self.assertEqual( 1        , len(self.execution_reports) )

    self.assertEqual( "107"    ,  self.execution_reports[0].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[0].execution_type )
    self.assertEqual( 0        ,  self.execution_reports[0].last_price )
    self.assertEqual( 0        ,  self.execution_reports[0].leaves_qty )


  def test_fill_one_order_and_self_execute(self):
    """Send a buy order that will fill o4, but
       that order would also try to match o5, but o5 belong to the same client."""

    o = Order( user_id = self.user_e.id,account_id = self.user_e.account_id, user = self.user_e,
               client_order_id  = '107', symbol  = 'BRLBTC', type      = '2',
               side             = '1',   price   = 102e5,    order_qty = 6e8)
    self.session.add( o )
    self.session.commit()

    self.om.match(self.session, o)


    self.assertEqual( 3, len(self.om.buy_side) )
    self.assertEqual( 2, len(self.om.sell_side) )

    # order was partially filled and cancelled after.
    self.assertEqual( "4"      , o.status )
    self.assertEqual( 101e5    , o.last_price )
    self.assertEqual( 0        , o.leaves_qty )
    self.assertEqual( 5e8      , o.last_qty )
    self.assertEqual( 1e8      , o.cxl_qty )

    # o4 was fully filled
    self.assertEqual( "2"      , self.o4.status )
    self.assertEqual( 101e5    , self.o4.last_price )
    self.assertEqual( 0        , self.o4.leaves_qty )
    self.assertEqual( 5e8      , self.o4.cum_qty )

    # make sure o5 was not modified
    self.assertEqual( "0"      , self.o5.status )
    self.assertEqual( 0        , self.o5.last_price )
    self.assertEqual( 2e8      , self.o5.leaves_qty )
    self.assertEqual( 0        , self.o5.cum_qty )


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

    self.assertEqual( "107"    ,  self.execution_reports[2].client_order_id )
    self.assertEqual( "4"      ,  self.execution_reports[2].execution_type )
    self.assertEqual( 101e5    ,  self.execution_reports[2].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[2].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[2].leaves_qty )

    self.assertEqual( "104"    ,  self.execution_reports[3].client_order_id )
    self.assertEqual( "2"      ,  self.execution_reports[3].execution_type )
    self.assertEqual( 101e5    ,  self.execution_reports[3].last_price )
    self.assertEqual( 5e8      ,  self.execution_reports[3].last_shares )
    self.assertEqual( 0        ,  self.execution_reports[3].leaves_qty )


class TestExecutions(unittest.TestCase):
  def setUp(self):
    engine = create_engine('sqlite:///:memory:', echo=False)
    Base.metadata.create_all(engine)

    self.session = scoped_session(sessionmaker(bind=engine))

    self.user_a = User( username='a', first_name='a', last_name='_', email='a@example.com', password ='a',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_b = User( username='b', first_name='b', last_name='_', email='b@example.com', password ='b',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_c = User( username='c', first_name='c', last_name='_', email='c@example.com', password ='c',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_d = User( username='d', first_name='d', last_name='_', email='d@example.com', password ='d',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_e = User( username='e', first_name='e', last_name='_', email='e@example.com', password ='e',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_f = User( username='f', first_name='f', last_name='_', email='f@example.com', password ='f',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_g = User( username='g', first_name='g', last_name='_', email='g@example.com', password ='g',
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

    self.user_a = User( username='a', first_name='a', last_name='_', email='a@example.com', password ='a',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_b = User( username='b', first_name='b', last_name='_', email='b@example.com', password ='b',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_c = User( username='c', first_name='c', last_name='_', email='c@example.com', password ='c',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_d = User( username='d', first_name='d', last_name='_', email='d@example.com', password ='d',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_e = User( username='e', first_name='e', last_name='_', email='e@example.com', password ='e',
                        balance_btc=20e8, balance_brl=1000e5 )
    self.user_f = User( username='f', first_name='f', last_name='_', email='f@example.com', password ='f',
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
    execution_report_signal.connect(self.onExecReport)

  def onExecReport(self, sender, rpt):
    self.execution_reports.append(rpt)

  def testCheckBalances(self):
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


    self.om.match(self.session, o7 )

    order_total_value = (o7.price * o7.cum_qty) / 1e8

    user_a_expected_balance_brl = user_a_initial_balance_brl - order_total_value
    print  order_total_value /1e5 , user_a_expected_balance_brl/1e5


    print 'user_a', self.user_a, self.user_a.balance_brl, self.user_a.balance_btc, '[',user_a_initial_balance_brl, user_a_initial_balance_btc, ']'
    print 'user_d', self.user_d, self.user_d.balance_brl, self.user_d.balance_btc, '[',user_d_initial_balance_brl, user_d_initial_balance_btc, ']'


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

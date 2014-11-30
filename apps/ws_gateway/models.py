# -*- coding: utf-8 -*-


from datetime import datetime, timedelta

from sqlalchemy import create_engine, func
from sqlalchemy.sql.expression import or_, and_
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

Base = declarative_base()

class Trade(Base):
    __tablename__ = 'trade'
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, nullable=False)
    counter_order_id = Column(Integer, nullable=False)
    buyer_id = Column(Integer, nullable=False)
    seller_id = Column(Integer, nullable=False)
    buyer_username = Column(String(15), nullable=False)
    seller_username = Column(String(15), nullable=False)
    side = Column(String(1), nullable=False)
    symbol = Column(String(12), nullable=False, index=True)
    size = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    created = Column(DateTime, nullable=False, index=True)
    trade_type = Column(Integer, nullable=False, default=0)  # regular trade

    def __repr__(self):
        return "<Trade(id=%r, order_id=%r, counter_order_id=%r,buyer_id=%r,seller_id=%r, buyer_username=%r,seller_username=%r,  " \
               "side=%r, symbol=%r, size=%r, price=%r, created=%r, trade_type=%r )>"\
            % (self.id, self.order_id, self.counter_order_id, self.buyer_id, self.seller_id, self.buyer_username, self.seller_username,
               self.side, self.symbol, self.size, self.price, self.created, self.trade_type)

    @staticmethod
    def get_trade(session, trade_id=None):
        if trade_id:
            filter_obj = or_(Trade.id == trade_id)
        else:
            return None
        trade = session.query(Trade).filter(filter_obj).first()
        if trade:
            return trade
        return None

    @staticmethod
    def get_all_trades(session):
      return session.query(Trade)

    @staticmethod
    def get_trades(session, symbol, since):
        if since > 1000000000:
          since_timestamp = datetime.utcfromtimestamp(since)
          trades = session.query(Trade).filter(
            Trade.created >= since_timestamp).filter(Trade.symbol == symbol).order_by(Trade.id.desc())
        else:
          trades = session.query(Trade).filter(
              Trade.id > int(since)).filter(Trade.symbol == symbol).order_by(Trade.id.desc())

        return trades

    @staticmethod
    def get_last_trade_id(session):
        res = session.query(func.max(Trade.id)).one()
        return res[0]

    @staticmethod
    def get_last_trades(session, since = None, page_size = None, offset = None, sort_column = None, sort_order='ASC'):
        if since is not None:
          if since > 1000000000:
            since = datetime.utcfromtimestamp(since)
            filter_obj  = and_(Trade.created >= since)
          else:
            filter_obj  = and_(Trade.id > int(since))
        else:
          today = datetime.now()
          since = today - timedelta(days=1)
          filter_obj  = and_(Trade.created >= since)

        trades = session.query(Trade).filter(filter_obj).order_by( Trade.id.desc())

        if page_size:
            trades = trades.limit(page_size)
        if offset:
            trades = trades.offset(offset)
        if sort_column:
            if sort_order == 'ASC':
                trades = trades.order(sort_column)
            else:
                trades = trades.order(sort_column).desc()

        return trades

    @staticmethod
    def create(session, msg):
        trade = Trade.get_trade(session, msg['id'])
        if not trade:
            trade = Trade(id=msg['id'],
                          order_id=msg['order_id'],
                          counter_order_id=msg['counter_order_id'],
                          buyer_id=msg['buyer_id'],
                          seller_id=msg['seller_id'],
                          buyer_username=msg['buyer_username'],
                          seller_username=msg['seller_username'],
                          side=msg['side'],
                          symbol=msg['symbol'],
                          size=msg['size'],
                          price=msg['price'],
                          created=datetime.strptime(msg['trade_date'] + ' ' + msg['trade_time'], "%Y-%m-%d %H:%M:%S"))

            session.add(trade)
            session.commit()

        return trade




def db_bootstrap(session):
    pass

# -*- coding: utf-8 -*-

import os
import hashlib

import logging
import hmac, base64, struct, hashlib, time

import datetime

from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import and_, or_, exists
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Numeric, Text, Date, UniqueConstraint
from sqlalchemy.orm import  relationship, backref
from sqlalchemy.ext.declarative import declarative_base
import json

from tornado.options import  options

engine = create_engine( options.db_engine, echo=options.db_echo)
Base = declarative_base()


class Trade(Base):
  __tablename__     = 'trade'
  id                = Column(String,        primary_key=True)
  order_id          = Column(Integer,       nullable=False)
  counter_order_id  = Column(Integer,       nullable=False)
  buyer_username    = Column(String(15),    nullable=False)
  seller_username   = Column(String(15),    nullable=False)
  side              = Column(String(1),     nullable=False)
  symbol            = Column(String(12),    nullable=False, index=True)
  size              = Column(Integer,       nullable=False)
  price             = Column(Integer,       nullable=False)
  created           = Column(DateTime,      nullable=False, index=True)
  trade_type        = Column(Integer,       nullable=False, default=0)  # regular trade

  def __repr__(self):
    return "<Trade(id=%r, order_id:%r, counter_order_id:%r, buyer_username=%r,seller_username=%r,  " \
           "side:%r, symbol=%r, size:%r, price:%r, created=%r, trade_type=%r )>"\
    % (self.id, self.order_id, self.counter_order_id, self.buyer_username, self.seller_username,
       self.side, self.symbol, self.size, self.price, self.created, self.trade_type)

  @staticmethod
  def get_trade( session, trade_id=None ):
    if trade_id:
      filter_obj = or_(Trade.id == trade_id)
    else:
      return  None
    trade = session.query(Trade).filter( filter_obj  ).first()
    if trade:
      return  trade
    return None

  @staticmethod
  def create(session, msg):
    trade = Trade.get_trade( session, msg['id'] )
    if not trade:
      trade =  Trade( id                = msg['id'],
                      order_id          = msg['order_id'],
                      counter_order_id  = msg['counter_order_id'],
                      buyer_username    = msg['buyer_username'],
                      seller_username   = msg['seller_username'],
                      side              = msg['side'],
                      symbol            = msg['symbol'],
                      size              = msg['size'],
                      price             = msg['price'],
                      created           = datetime.datetime.now())

      session.add(trade)
      session.commit()

    return trade


  @staticmethod
  def get_last_trades(session, symbol, timestamp):
    trades = session.query(Trade).filter_by(symbol=symbol).filter(Trade.created >= timestamp).order_by(Trade.created.desc())
    return trades


Base.metadata.create_all(engine)

def db_bootstrap(session):
  pass

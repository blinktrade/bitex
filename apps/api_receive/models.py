from sqlalchemy import create_engine, func
from sqlalchemy.sql.expression import or_
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from tornado.options import options

engine = create_engine( options.db_engine, echo=options.db_echo)
Base = declarative_base()


class ForwardingAddress(Base):
  __tablename__ = 'forwarding_address'
  id                      = Column(Integer, primary_key=True)
  callback                = Column(String(255), nullable=False)
  destination_address     = Column(String(40), nullable=False )
  input_address           = Column(String(40))
  input_transaction_hash  = Column(String(255))
  transaction_hash        = Column(String(255))
  confirmations           = Column(Integer)
  value                   = Column(Integer)
  status                  = Column(Integer)

  def __repr__(self):
    return "<ForwardingAddress(id=%r, callback=%r, destination_address=%r, input_address=%r,input_transaction_hash=%r,"\
           "transaction_hash=%r, confirmations=%r, value=%r, status=%r)>"\
    % (self.id, self.callback, self.destination_address, self.input_address, self.input_transaction_hash,
       self.transaction_hash, self.confirmations, self.value, self.status)

Base.metadata.create_all(engine)

def db_bootstrap(session):
  pass




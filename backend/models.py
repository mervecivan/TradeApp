from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base

class Crypto(Base):
    __tablename__ = "cryptos"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    symbol = Column(String, nullable=False)
    current_price = Column(Float, nullable=False)
    market_cap = Column(Float, nullable=False)
    total_volume = Column(Float, nullable=False, default=0.0)
    last_updated = Column(DateTime, nullable=False)

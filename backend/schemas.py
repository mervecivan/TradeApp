from pydantic import BaseModel
from datetime import datetime

class CryptoBase(BaseModel):
    name: str
    symbol: str
    current_price: float
    market_cap: float
    total_volume: float
    last_updated: datetime

    class Config:
        orm_mode = True

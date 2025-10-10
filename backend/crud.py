# crud operations for the Crypto model

from sqlalchemy.orm import Session
from models import Crypto
from schemas import CryptoBase

# create operation
def create_crypto(db: Session, crypto: CryptoBase):
    db_crypto = Crypto(**crypto.model_dump())
    db.add(db_crypto)
    db.commit()
    db.refresh(db_crypto)
    return db_crypto
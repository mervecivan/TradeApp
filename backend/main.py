# fast api main file

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from crud import create_crypto
from schemas import CryptoBase
import requests
from models import Crypto
from typing import List
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# insert the created models into the db
Base.metadata.create_all(bind= engine)

#create instance of FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal() #db session: create a new session 
    try:
        yield db # this part, incoming func to usable as a dependency
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Welcome to the Crypto API"}

# an endpoint to fetch crytpo data from API and save to db
@app.get("/fetch-and-save")
@app.post("/fetch-and-save") #signature of the function | POST endpoint
def fetch_and_save(db: Session = Depends(get_db)):
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 10,
        "page": 1,
        "sparkline": True
    }
    response = requests.get(url, params=params)
    data = response.json()

    saved = []
    for coin in data:
        crypto_data = CryptoBase(
            name=coin["name"],
            symbol=coin["symbol"],
            current_price=coin["current_price"],
            market_cap=coin["market_cap"],
            total_volume=coin["total_volume"],
            last_updated=coin["last_updated"]
        )

        saved_crypto = create_crypto(db, crypto_data)
        saved.append(saved_crypto)

    return {"saved_cryptos": len(saved)}

@app.get("/cryptos", response_model=List[CryptoBase])
def get_cryptos(db: Session = Depends(get_db)):
    cryptos = db.query(Crypto).all()
    return cryptos

#connecting to database and configuring sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
# link to the database
engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"}) #supabase ssl required
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base() # base class for our db models


import os
from dotenv import load_dotenv



class Config:
    # Use the value from .env if available, otherwise fallback to local db instance
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'mysql+pymysql://root@localhost:3306/lmsdb')
    # SQLALCHEMY_DATABASE_URI = os.getenv('mysql://root@localhost:3306/lmsdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
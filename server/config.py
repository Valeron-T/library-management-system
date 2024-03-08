import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    # Use the value from .env if available, otherwise fallback to local db instance
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'mysql+pymysql://root@localhost:3306/lmsdb')
    # SQLALCHEMY_DATABASE_URI = os.getenv('mysql://root@localhost:3306/lmsdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
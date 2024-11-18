import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/db_pentas'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'dev-key-rahasia'
    
    # Konfigurasi upload
    UPLOAD_FOLDER = 'uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Max 16MB
    ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
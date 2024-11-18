from app import create_app, db

app = create_app()

with app.app_context():
    try:
        # Test koneksi database
        db.engine.connect()
        print("Koneksi database berhasil!")
        
        # Test create table
        db.create_all()
        print("Tables berhasil dibuat!")
        
    except Exception as e:
        print(f"Error: {str(e)}") 
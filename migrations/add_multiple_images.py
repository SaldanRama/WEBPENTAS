from app import db

def upgrade():
    # Tambah kolom baru
    db.engine.execute('ALTER TABLE fasilitas ADD COLUMN IF NOT EXISTS image2 VARCHAR(255)')
    db.engine.execute('ALTER TABLE fasilitas ADD COLUMN IF NOT EXISTS image3 VARCHAR(255)')

def downgrade():
    # Hapus kolom jika perlu rollback
    db.engine.execute('ALTER TABLE fasilitas DROP COLUMN IF EXISTS image2')
    db.engine.execute('ALTER TABLE fasilitas DROP COLUMN IF EXISTS image3') 
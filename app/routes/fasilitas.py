from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.fasilitas import Fasilitas
from werkzeug.utils import secure_filename
import os

fasilitas_bp = Blueprint('fasilitas', __name__)

# Tambahkan konfigurasi upload
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Get semua fasilitas
@fasilitas_bp.route('/fasilitas', methods=['GET'])
def get_all_fasilitas():
    try:
        fasilitas = Fasilitas.query.all()
        return jsonify([{
            'id': f.id,
            'nama_fasilitas': f.nama_fasilitas,
            'image': f.image,
            'image2': f.image2,
            'image3': f.image3,
            'kapasitas': f.kapasitas,
            'created_at': f.created_at
        } for f in fasilitas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get fasilitas by ID
@fasilitas_bp.route('/fasilitas/<int:id>', methods=['GET'])
def get_fasilitas(id):
    try:
        fasilitas = Fasilitas.query.get_or_404(id)
        return jsonify({
            'id': fasilitas.id,
            'nama_fasilitas': fasilitas.nama_fasilitas,
            'image': fasilitas.image,
            'image2': fasilitas.image2,
            'image3': fasilitas.image3,
            'kapasitas': fasilitas.kapasitas,
            'created_at': fasilitas.created_at
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Tambah fasilitas baru
@fasilitas_bp.route('/fasilitas', methods=['POST'])
def add_fasilitas():
    try:
        data = request.form
        images = request.files.getlist('images')  # Ambil semua file gambar
        
        if not images:
            return jsonify({'error': 'Minimal satu gambar harus diupload'}), 400
            
        filenames = []
        for i, file in enumerate(images[:3]):  # Batasi maksimal 3 gambar
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                filenames.append(filename)
                
        new_fasilitas = Fasilitas(
            nama_fasilitas=data['nama_fasilitas'],
            kapasitas=data['kapasitas'],
            image=filenames[0] if len(filenames) > 0 else None,
            image2=filenames[1] if len(filenames) > 1 else None,
            image3=filenames[2] if len(filenames) > 2 else None
        )
        
        db.session.add(new_fasilitas)
        db.session.commit()
        
        return jsonify({
            'message': 'Fasilitas berhasil ditambahkan',
            'id': new_fasilitas.id
        }), 201
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update fasilitas
@fasilitas_bp.route('/fasilitas/<int:id>', methods=['PUT'])
def update_fasilitas(id):
    try:
        fasilitas = Fasilitas.query.get_or_404(id)
        data = request.form
        
        if 'image' in request.files:
            file = request.files['image']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                fasilitas.image = filename
        
        if 'nama_fasilitas' in data:
            fasilitas.nama_fasilitas = data['nama_fasilitas']
        if 'kapasitas' in data:
            fasilitas.kapasitas = data['kapasitas']
        
        db.session.commit()
        return jsonify({'message': 'Fasilitas berhasil diupdate'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Hapus fasilitas
@fasilitas_bp.route('/fasilitas/<int:id>', methods=['DELETE'])
def delete_fasilitas(id):
    try:
        fasilitas = Fasilitas.query.get_or_404(id)
        db.session.delete(fasilitas)
        db.session.commit()
        return jsonify({'message': 'Fasilitas berhasil dihapus'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 
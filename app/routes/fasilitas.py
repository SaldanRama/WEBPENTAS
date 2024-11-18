from flask import Blueprint, request, jsonify
from app import db
from app.models.fasilitas import Fasilitas

fasilitas_bp = Blueprint('fasilitas', __name__)

# Get semua fasilitas
@fasilitas_bp.route('/fasilitas', methods=['GET'])
def get_all_fasilitas():
    try:
        fasilitas = Fasilitas.query.all()
        return jsonify([{
            'id': f.id,
            'nama_fasilitas': f.nama_fasilitas,
            'image': f.image,
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
            'kapasitas': fasilitas.kapasitas,
            'created_at': fasilitas.created_at
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Tambah fasilitas baru
@fasilitas_bp.route('/fasilitas', methods=['POST'])
def add_fasilitas():
    try:
        data = request.get_json()
        new_fasilitas = Fasilitas(
            nama_fasilitas=data['nama_fasilitas'],
            image=data.get('image'),
            kapasitas=data.get('kapasitas')
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
        data = request.get_json()
        
        fasilitas.nama_fasilitas = data.get('nama_fasilitas', fasilitas.nama_fasilitas)
        fasilitas.image = data.get('image', fasilitas.image)
        fasilitas.kapasitas = data.get('kapasitas', fasilitas.kapasitas)
        
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
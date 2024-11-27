from flask import Blueprint, request, jsonify
from app import db
from app.models.disposisi import Disposisi
from app.models.peminjaman import Peminjaman
from datetime import datetime

disposisi_bp = Blueprint('disposisi', __name__)

# Get semua disposisi
@disposisi_bp.route('/disposisi', methods=['GET'])
def get_all_disposisi():
    try:
        disposisi = Disposisi.query.all()
        return jsonify([{
            'id': d.id,
            'id_peminjaman': d.id_peminjaman,
            'dari': d.dari,
            'kepada': d.kepada,
            'status_disposisi': d.status_disposisi,
            'catatan': d.catatan,
            'created_at': d.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for d in disposisi])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get disposisi by ID
@disposisi_bp.route('/disposisi/<int:id>', methods=['GET'])
def get_disposisi(id):
    try:
        d = Disposisi.query.get_or_404(id)
        peminjaman = Peminjaman.query.get(d.id_peminjaman)
        
        if not peminjaman:
            return jsonify({'error': 'Peminjaman tidak ditemukan'}), 404
            
        return jsonify({
            'id': d.id,
            'id_peminjaman': d.id_peminjaman,
            'dari': d.dari,
            'kepada': d.kepada,
            'status': d.status_disposisi,
            'catatan': d.catatan,
            'created_at': d.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'nama_organisasi': peminjaman.nama_organisasi,
            'penanggung_jawab': peminjaman.penanggung_jawab,
            'kontak_pj': peminjaman.kontak_pj,
            'catatan_dekan': d.catatan
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Tambah disposisi baru
@disposisi_bp.route('/disposisi', methods=['POST'])
def add_disposisi():
    try:
        data = request.get_json()
        
        # Validasi input
        required_fields = ['id_peminjaman', 'dari', 'kepada']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Field {field} harus diisi'}), 400
        
        # Validasi peminjaman exists
        peminjaman = Peminjaman.query.get(data['id_peminjaman'])
        if not peminjaman:
            return jsonify({'error': 'Peminjaman tidak ditemukan'}), 404
        
        new_disposisi = Disposisi(
            id_peminjaman=data['id_peminjaman'],
            dari=data['dari'],
            kepada=data['kepada'],
            catatan=data.get('catatan', '')
        )
        
        db.session.add(new_disposisi)
        db.session.commit()
        
        return jsonify({
            'message': 'Disposisi berhasil ditambahkan',
            'data': {
                'id': new_disposisi.id,
                'status_disposisi': new_disposisi.status_disposisi
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update status disposisi
@disposisi_bp.route('/disposisi/<int:id>/status', methods=['PUT'])
def update_status(id):
    try:
        disposisi = Disposisi.query.get_or_404(id)
        data = request.get_json()
        
        if 'status_disposisi' not in data:
            return jsonify({'error': 'Status disposisi harus diisi'}), 400
            
        allowed_status = ['pending', 'approved', 'rejected']
        if data['status_disposisi'] not in allowed_status:
            return jsonify({
                'error': f'Status harus salah satu dari: {", ".join(allowed_status)}'
            }), 400
            
        disposisi.status_disposisi = data['status_disposisi']
        db.session.commit()
        
        return jsonify({
            'message': 'Status disposisi berhasil diupdate',
            'status': disposisi.status_disposisi
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@disposisi_bp.route('/peminjaman/wadek', methods=['GET'])
def get_wadek_peminjaman():
    try:
        # Ambil disposisi yang ditujukan ke wakil dekan
        disposisi_wadek = Disposisi.query.filter_by(kepada='wakil_dekan').all()
        
        # Ambil data peminjaman terkait
        result = []
        for d in disposisi_wadek:
            peminjaman = Peminjaman.query.get(d.id_peminjaman)
            if peminjaman:
                result.append({
                    'id': d.id,
                    'nama_organisasi': peminjaman.nama_organisasi,
                    'penanggung_jawab': peminjaman.penanggung_jawab,
                    'status': d.status_disposisi,
                    'created_at': d.created_at.strftime('%Y-%m-%d %H:%M:%S')
                })
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@disposisi_bp.route('/peminjaman/wadek/notifications', methods=['GET'])
def get_wadek_notifications():
    try:
        # Ambil 5 disposisi terbaru untuk wakil dekan
        recent_disposisi = Disposisi.query.filter_by(kepada='wakil_dekan')\
            .order_by(Disposisi.created_at.desc())\
            .limit(5)\
            .all()
        
        result = []
        for d in recent_disposisi:
            peminjaman = Peminjaman.query.get(d.id_peminjaman)
            if peminjaman:
                result.append({
                    'id': d.id,
                    'nama_organisasi': peminjaman.nama_organisasi,
                    'status': d.status_disposisi,
                    'created_at': d.created_at.strftime('%Y-%m-%d %H:%M:%S')
                })
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
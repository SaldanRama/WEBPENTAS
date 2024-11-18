from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app import db
from app.models.peminjaman import Peminjaman
from datetime import datetime
import os

peminjaman_bp = Blueprint('peminjaman', __name__)

# Konfigurasi upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Get semua peminjaman
@peminjaman_bp.route('/peminjaman', methods=['GET'])
def get_all_peminjaman():
    try:
        peminjaman = Peminjaman.query.all()
        return jsonify([{
            'id': p.id,
            'nama_organisasi': p.nama_organisasi,
            'tanggal_mulai': p.tanggal_mulai.strftime('%Y-%m-%d'),
            'tanggal_selesai': p.tanggal_selesai.strftime('%Y-%m-%d'),
            'waktu_mulai': p.waktu_mulai.strftime('%H:%M'),
            'waktu_selesai': p.waktu_selesai.strftime('%H:%M'),
            'penanggung_jawab': p.penanggung_jawab,
            'status': p.status
        } for p in peminjaman])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get peminjaman by ID
@peminjaman_bp.route('/peminjaman/<int:id>', methods=['GET'])
def get_peminjaman(id):
    try:
        p = Peminjaman.query.get_or_404(id)
        return jsonify({
            'id': p.id,
            'nama_organisasi': p.nama_organisasi,
            'tanggal_mulai': p.tanggal_mulai.strftime('%Y-%m-%d'),
            'tanggal_selesai': p.tanggal_selesai.strftime('%Y-%m-%d'),
            'waktu_mulai': p.waktu_mulai.strftime('%H:%M'),
            'waktu_selesai': p.waktu_selesai.strftime('%H:%M'),
            'penanggung_jawab': p.penanggung_jawab,
            'kontak_pj': p.kontak_pj,
            'keperluan': p.keperluan,
            'email': p.email,
            'status': p.status
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Tambah peminjaman baru
@peminjaman_bp.route('/peminjaman', methods=['POST'])
def add_peminjaman():
    try:
        # Validasi input
        if 'surat_peminjaman' not in request.files:
            return jsonify({'error': 'Surat peminjaman harus diupload'}), 400
            
        data = request.form
        required_fields = [
            'id_user', 'id_fasilitas', 'nama_organisasi', 
            'tanggal_mulai', 'tanggal_selesai', 'waktu_mulai', 
            'waktu_selesai', 'penanggung_jawab', 'kontak_pj', 
            'keperluan', 'email'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Field {field} harus diisi'}), 400
        
        # Proses file
        file = request.files['surat_peminjaman']
        if file.filename == '':
            return jsonify({'error': 'Tidak ada file yang dipilih'}), 400
            
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        # Buat peminjaman baru
        new_peminjaman = Peminjaman(
            id_user=data['id_user'],
            id_fasilitas=data['id_fasilitas'],
            nama_organisasi=data['nama_organisasi'],
            tanggal_mulai=datetime.strptime(data['tanggal_mulai'], '%Y-%m-%d').date(),
            tanggal_selesai=datetime.strptime(data['tanggal_selesai'], '%Y-%m-%d').date(),
            waktu_mulai=datetime.strptime(data['waktu_mulai'], '%H:%M').time(),
            waktu_selesai=datetime.strptime(data['waktu_selesai'], '%H:%M').time(),
            penanggung_jawab=data['penanggung_jawab'],
            kontak_pj=data['kontak_pj'],
            keperluan=data['keperluan'],
            email=data['email'],
            surat_peminjaman=filename
        )
        
        db.session.add(new_peminjaman)
        db.session.commit()
        
        return jsonify({
            'message': 'Peminjaman berhasil ditambahkan',
            'data': {
                'id': new_peminjaman.id,
                'nama_organisasi': new_peminjaman.nama_organisasi,
                'status': new_peminjaman.status
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': str(e),
            'message': 'Gagal menambahkan peminjaman'
        }), 500

# Update status peminjaman
@peminjaman_bp.route('/peminjaman/<int:id>/status', methods=['PUT', 'POST'])
def update_status(id):
    try:
        peminjaman = Peminjaman.query.get_or_404(id)
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({
                'error': 'Status harus diisi'
            }), 400
            
        # Validasi status yang diperbolehkan
        allowed_status = ['pending', 'disetujui', 'ditolak']
        if data['status'] not in allowed_status:
            return jsonify({
                'error': f'Status harus salah satu dari: {", ".join(allowed_status)}'
            }), 400
        
        peminjaman.status = data['status']
        db.session.commit()
        
        return jsonify({
            'message': 'Status peminjaman berhasil diupdate',
            'data': {
                'id': peminjaman.id,
                'status': peminjaman.status
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': str(e),
            'message': 'Gagal mengupdate status peminjaman'
        }), 500 
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../disc/css/main.css';

function FacilityManagement() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama_fasilitas: '',
    kapasitas: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch data fasilitas
  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/fasilitas');
      setFacilities(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error:', error);
      setError('Gagal mengambil data fasilitas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  // Handle tambah/edit fasilitas
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    try {
      if (editingId) {
        console.log('Updating facility with ID:', editingId);
        const response = await axios.put(`http://localhost:5000/fasilitas/${editingId}`, formData);
        console.log('Update response:', response.data);
      } else {
        console.log('Adding new facility');
        const response = await axios.post('http://localhost:5000/fasilitas', formData);
        console.log('Add response:', response.data);
      }
      setShowModal(false);
      setFormData({ nama_fasilitas: '', kapasitas: '', image: '' });
      setEditingId(null);
      fetchFacilities();
    } catch (error) {
      console.error('Error details:', error.response?.data);
      setError(error.response?.data?.error || 'Gagal menyimpan fasilitas');
    }
  };

  // Handle hapus fasilitas
  const handleDelete = async (id) => {
    console.log('Deleting facility with ID:', id);
    if (window.confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/fasilitas/${id}`);
        console.log('Delete response:', response.data);
        fetchFacilities();
      } catch (error) {
        console.error('Error details:', error.response?.data);
        setError('Gagal menghapus fasilitas');
      }
    }
  };

  // Handle edit fasilitas
  const handleEdit = (facility) => {
    console.log('Editing facility:', facility);
    setFormData({
      nama_fasilitas: facility.nama_fasilitas,
      kapasitas: facility.kapasitas,
      image: facility.image || ''
    });
    setEditingId(facility.id);
    setShowModal(true);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="management-card">
      <div className="card-header">
        <h2>Kelola Fasilitas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setFormData({ nama_fasilitas: '', kapasitas: '', image: '' });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          + Tambah Fasilitas
        </button>
      </div>
      
      {/* Modal Form */}
      <div className={`facility-modal ${showModal ? 'show' : ''}`}>
        <div className="facility-modal-dialog">
          <div className="facility-modal-content">
            <div className="facility-modal-header">
              <h5 className="facility-modal-title">
                {editingId ? 'Edit Fasilitas' : 'Tambah Fasilitas'}
              </h5>
              <button 
                type="button" 
                className="btn-close"
                onClick={() => {
                  setShowModal(false);
                  setFormData({ nama_fasilitas: '', kapasitas: '', image: '' });
                  setEditingId(null);
                }}
              />
            </div>
            <div className="facility-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="facility-form-group">
                  <label>Nama Fasilitas:</label>
                  <input
                    type="text"
                    value={formData.nama_fasilitas}
                    onChange={(e) => setFormData({...formData, nama_fasilitas: e.target.value})}
                    required
                  />
                </div>
                <div className="facility-form-group">
                  <label>Kapasitas:</label>
                  <input
                    type="number"
                    value={formData.kapasitas}
                    onChange={(e) => setFormData({...formData, kapasitas: e.target.value})}
                    required
                  />
                </div>
                <div className="facility-form-group">
                  <label>URL Gambar:</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>
                <div className="facility-modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update' : 'Simpan'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Fasilitas */}
      {facilities.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nama Fasilitas</th>
                <th>Kapasitas</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map(facility => (
                <tr key={facility.id}>
                  <td>{facility.nama_fasilitas}</td>
                  <td>{facility.kapasitas} orang</td>
                  <td>
                    {facility.image && (
                      <img 
                        src={facility.image} 
                        alt={facility.nama_fasilitas} 
                        className="facility-image"
                        style={{width: '100px', height: '60px', objectFit: 'cover'}}
                      />
                    )}
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn btn-warning"
                      onClick={() => handleEdit(facility)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDelete(facility.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data">Tidak ada data fasilitas</div>
      )}
    </div>
  );
}

export default FacilityManagement; 
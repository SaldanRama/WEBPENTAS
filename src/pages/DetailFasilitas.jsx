import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'bootstrap';

export const DetailFasilitas = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [formData, setFormData] = useState({
    nama_organisasi: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    waktu_mulai: '',
    waktu_selesai: '',
    penanggung_jawab: '',
    kontak_pj: '',
    keperluan: '',
    email: '',
    surat_peminjaman: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fasilitas/${id}`);
        setFacility(response.data);
        
        // Kumpulkan semua gambar yang tidak null
        const facilityImages = [
          response.data.image,
          response.data.image2,
          response.data.image3
        ].filter(img => img !== null);
        
        // Ubah path gambar menjadi URL lengkap
        const imageUrls = facilityImages.map(img => 
          `http://localhost:5000/uploads/fasilitas/${img}`
        );
        
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching facility:', error);
      }
    };

    if (id) {
      fetchFacility();
    }
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          const response = await axios.get(`http://localhost:5000/users`, {
            params: { email: userEmail }
          });
          
          if (response.data && Array.isArray(response.data)) {
            const user = response.data.find(u => u.email === userEmail);
            if (user) {
              setUserId(user.id);
            } else {
              setError('Data user tidak ditemukan');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Gagal mengambil data user');
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      surat_peminjaman: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!userId) {
      setError('Silakan login terlebih dahulu');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Pastikan userId adalah number
      formDataToSend.append('id_user', String(userId));
      formDataToSend.append('id_fasilitas', id);
      
      // Append data lainnya
      Object.keys(formData).forEach(key => {
        if (key !== 'id_user' && key !== 'id_fasilitas') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post('http://localhost:5000/peminjaman', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        alert(response.data.message);
        // Reset form
        setFormData({
          nama_organisasi: '',
          tanggal_mulai: '',
          tanggal_selesai: '',
          waktu_mulai: '',
          waktu_selesai: '',
          penanggung_jawab: '',
          kontak_pj: '',
          keperluan: '',
          email: '',
          surat_peminjaman: null
        });
      }

    } catch (err) {
      console.error('Error detail:', err.response?.data);
      setError(err.response?.data?.error || 'Terjadi kesalahan saat mengajukan peminjaman');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClick = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      alert('Silakan login terlebih dahulu untuk melakukan peminjaman fasilitas');
      window.location.href = '/login';
      return;
    }
    
    const modal = new Modal(document.getElementById('formModal'));
    modal.show();
  };

  return (
    <div>
        {/* HEADER DETAIL FASILITAS */}
      <div className="row">
        <div className="fixed-size position-relative">
          <img
            src="https://sippn.menpan.go.id/images/article/large/fakultas-mipa-750x375-1-20240905105353.jpeg"
            alt="Fakultas MIPA"
            className="detail-image"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center text-dark">
            <h1 className="fw-bold mb-3 text-uppercase">
              {facility ? facility.nama_fasilitas : 'Loading...'}
            </h1>
            <button 
              className="btn btn-danger" 
              onClick={handleBookingClick}
            >
              Booking
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form Peminjaman */}
      <div 
        className="modal fade" 
        id="formModal" 
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="formModalLabel" 
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="formModalLabel">
                Formulir Peminjaman Fasilitas
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p className="text-center">Ajukan peminjaman fasilitas dengan mengisi formulir berikut secara lengkap</p>
              
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Nama Organisasi</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nama_organisasi"
                    value={formData.nama_organisasi}
                    onChange={handleInputChange}
                    placeholder="Nama Organisasi"
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Tanggal Mulai</label>
                    <input 
                      type="date" 
                      className="form-control"
                      name="tanggal_mulai"
                      value={formData.tanggal_mulai}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tanggal Selesai</label>
                    <input 
                      type="date" 
                      className="form-control"
                      name="tanggal_selesai"
                      value={formData.tanggal_selesai}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Jam Peminjaman</label>
                    <div className="row">
                      <div className="col-5">
                        <input 
                          type="time" 
                          className="form-control"
                          name="waktu_mulai"
                          value={formData.waktu_mulai}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-2 text-center">
                        <span>-</span>
                      </div>
                      <div className="col-5">
                        <input 
                          type="time" 
                          className="form-control"
                          name="waktu_selesai"
                          value={formData.waktu_selesai}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nama Penanggung Jawab</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="penanggung_jawab"
                      value={formData.penanggung_jawab}
                      onChange={handleInputChange}
                      placeholder="Nama Lengkap"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Kontak Penanggung Jawab</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="kontak_pj"
                      value={formData.kontak_pj}
                      onChange={handleInputChange}
                      placeholder="08123456789"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Keperluan Peminjaman</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="keperluan"
                    value={formData.keperluan}
                    onChange={handleInputChange}
                    placeholder="seminar"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="organisasi@gmail.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Surat Peminjaman</label>
                  <input 
                    type="file" 
                    className="form-control"
                    name="surat_peminjaman"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="agreement"/>
                  <label className="form-check-label" htmlFor="agreement">
                    Saya menyetujui syarat dan ketentuan peminjaman fasilitas ini, termasuk bertanggung jawab atas kerusakan, kebersihan, dan pengembalian fasilitas dalam kondisi baik setelah digunakan
                  </label>
                </div>

                <div className="text-end">
                  <button 
                    type="submit" 
                    className="btn btn-danger" 
                    disabled={loading}
                  >
                    {loading ? 'Memproses...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL FASILITAS */}
    <div className="container my-2">
         <h2 className="fw-bold fs-2 text-center py-5">DETAIL FASILITAS</h2>

        <div className="row">
            <div className="col-6">
                <img 
                  src={images[selectedImage]} 
                  alt="" 
                  className="img-fluid rounded" 
                  style={{ 
                    width: '100%', 
                    height: '400px', 
                    objectFit: 'cover' 
                  }}
                />
            </div>

            <div className="col-5 offset-1">
                <p className="fw-semibold">Ruangan ini telah di booking pada:</p>

                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">TANGGAL PINJAM</th>
                        <th scope="col">JAM MULAI</th>
                        <th scope="col">JAM AKHIR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01-01-2024</td>
                        <td>07 : 00</td>
                        <td>08 : 00</td>
                    </tr>
                    <tr>
                        <td>02-01-2024</td>
                        <td>07 : 00</td>
                        <td>08 : 00</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        {/* Thumbnail Images */}
        <div className="row py-3">
          {images.map((img, index) => (
            <div className="col-2" key={index}>
              <img 
                src={img} 
                alt="" 
                className={`img-fluid rounded cursor-pointer ${selectedImage === index ? 'border border-2 border-primary' : ''}`}
                style={{ 
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  opacity: selectedImage === index ? '1' : '0.7'
                }}
                onClick={() => setSelectedImage(index)}
              />
            </div>
          ))}
        </div>

        {/* TABLE */}
        
        <div className="row">
          <div className="col-6">

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Gedung</th>
                  <th scope="col">Lantai</th>
                  <th scope="col">Kapasitas</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td>Scence Building</td>
                  <td>1</td>
                  <td>150 orang</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

    </div>



    </div>
  )
}

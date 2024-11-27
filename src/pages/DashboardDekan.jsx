import { Routes, Route, NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTachometerAlt, FaClipboardList, FaBuilding, FaHistory, FaCheckCircle, FaTimesCircle, FaExchangeAlt } from "react-icons/fa";
import '../disc/css/main.css'; 

export function DashboardDekan() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard Dekan</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaTachometerAlt />
            <span>Beranda</span>
          </NavLink>
          
          <NavLink to="peminjaman" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaClipboardList />
            <span>Daftar Peminjaman</span>
          </NavLink>
          
          <NavLink to="fasilitas" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaBuilding />
            <span>Manajemen Fasilitas</span>
          </NavLink>

          <NavLink to="riwayat" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaHistory />
            <span>Riwayat Aktivitas</span>
          </NavLink>
        </nav>
      </div>

      <main className={`dashboard-main ${!isSidebarOpen ? 'full' : ''}`}>
        <button 
          className="toggle-sidebar"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '←' : '→'}
        </button>

        <Routes>
          <Route index element={<BerandaDekan />} />
          <Route path="peminjaman" element={<DaftarPeminjaman />} />
          <Route path="peminjaman/:id" element={<DetailPeminjaman />} />
          <Route path="fasilitas" element={<ManajemenFasilitas />} />
          <Route path="riwayat" element={<RiwayatAktivitas />} />
        </Routes>
      </main>
    </div>
  );
}

function BerandaDekan() {
  const [stats, setStats] = useState({
    pending: 0,
    disetujui: 0,
    ditolak: 0,
    disposisi: 0
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchNotifications();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/peminjaman');
      const data = await response.json();
      
      // Hitung jumlah masing-masing status
      const counts = data.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      setStats({
        pending: counts.pending || 0,
        disetujui: counts.disetujui || 0,
        ditolak: counts.ditolak || 0,
        disposisi: counts.disposisi || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const [peminjamanRes, disposisiRes] = await Promise.all([
        fetch('http://localhost:5000/peminjaman'),
        fetch('http://localhost:5000/disposisi')
      ]);

      const [peminjamanData, disposisiData] = await Promise.all([
        peminjamanRes.json(),
        disposisiRes.json()
      ]);

      // Gabungkan dan urutkan notifikasi berdasarkan tanggal
      const notifications = [
        ...peminjamanData.map(p => ({
          id: `peminjaman-${p.id}`,
          icon: getStatusIcon(p.status),
          message: `Peminjaman ${p.nama_organisasi} ${getStatusMessage(p.status)}`,
          timestamp: new Date(p.created_at).toLocaleString()
        })),
        ...disposisiData.map(d => ({
          id: `disposisi-${d.id}`,
          icon: 'exchange-alt',
          message: `Disposisi dari ${d.dari} ke ${d.kepada}`,
          timestamp: new Date(d.created_at).toLocaleString()
        }))
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setNotifications(notifications.slice(0, 5)); // Ambil 5 notifikasi terbaru
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return 'clock';
      case 'disetujui': return 'check-circle';
      case 'ditolak': return 'times-circle';
      case 'disposisi': return 'exchange-alt';
      default: return 'bell';
    }
  };

  const getStatusMessage = (status) => {
    switch(status) {
      case 'pending': return 'menunggu persetujuan';
      case 'disetujui': return 'telah disetujui';
      case 'ditolak': return 'telah ditolak';
      case 'disposisi': return 'telah didisposisi';
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon pending">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <h3>Peminjaman Pending</h3>
            <div className="value">{stats.pending}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon approved">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Peminjaman Disetujui</h3>
            <div className="value">{stats.disetujui}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon rejected">
            <FaTimesCircle />
          </div>
          <div className="stat-info">
            <h3>Peminjaman Ditolak</h3>
            <div className="value">{stats.ditolak}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon disposisi">
            <FaExchangeAlt />
          </div>
          <div className="stat-info">
            <h3>Peminjaman Didisposisi</h3>
            <div className="value">{stats.disposisi}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Peminjaman Terbaru</h2>
          </div>
          <div className="peminjaman-list">
            {notifications.slice(0, 5).map((notif) => (
              <div key={notif.id} className="peminjaman-item">
                <div className="peminjaman-info">
                  <h4>{notif.message}</h4>
                  <p>{notif.timestamp}</p>
                  <span className={`status-badge ${notif.icon}`}>
                    {getStatusMessage(notif.icon)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Disposisi Terbaru</h2>
          </div>
          <div className="facility-list">
            {notifications
              .filter(notif => notif.id.startsWith('disposisi-'))
              .slice(0, 5)
              .map((notif) => (
                <div key={notif.id} className="facility-item">
                  <div className="facility-info">
                    <h4>{notif.message}</h4>
                    <p>{notif.timestamp}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DaftarPeminjaman() {
  const navigate = useNavigate();
  const [peminjaman, setPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: 'semua',
    tanggal: '',
    keyword: ''
  });

  useEffect(() => {
    fetchPeminjaman();
  }, [filter]);

  const fetchPeminjaman = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/peminjaman');
      let data = await response.json();

      // Filter berdasarkan status
      if (filter.status !== 'semua') {
        data = data.filter(p => p.status === filter.status);
      }

      // Filter berdasarkan tanggal
      if (filter.tanggal) {
        data = data.filter(p => p.tanggal_mulai === filter.tanggal);
      }

      // Filter berdasarkan keyword
      if (filter.keyword) {
        const keyword = filter.keyword.toLowerCase();
        data = data.filter(p => 
          p.nama_organisasi.toLowerCase().includes(keyword) ||
          p.penanggung_jawab.toLowerCase().includes(keyword)
        );
      }

      setPeminjaman(data);
    } catch (error) {
      console.error('Error fetching peminjaman:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/peminjaman/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchPeminjaman(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Daftar Peminjaman</h1>

      <div className="filter-container">
        <div className="filter-group">
          <select 
            value={filter.status} 
            onChange={(e) => setFilter({...filter, status: e.target.value})}
            className="filter-select"
          >
            <option value="semua">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="disetujui">Disetujui</option>
            <option value="ditolak">Ditolak</option>
            <option value="disposisi">Disposisi</option>
          </select>

          <input 
            type="date" 
            value={filter.tanggal}
            onChange={(e) => setFilter({...filter, tanggal: e.target.value})}
            className="filter-date"
          />

          <input 
            type="text"
            placeholder="Cari peminjaman..."
            value={filter.keyword}
            onChange={(e) => setFilter({...filter, keyword: e.target.value})}
            className="filter-search"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memuat data peminjaman...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Organisasi</th>
                <th>Penanggung Jawab</th>
                <th>Tanggal & Waktu</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {peminjaman.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama_organisasi}</td>
                  <td>{item.penanggung_jawab}</td>
                  <td>
                    {new Date(item.tanggal_mulai).toLocaleDateString()} 
                    <br />
                    <small>
                      {item.waktu_mulai} - {item.waktu_selesai}
                    </small>
                  </td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-detail"
                        onClick={() => navigate(`/dashboard-dekan/peminjaman/${item.id}`)}
                      >
                        <i className="fas fa-eye"></i>
                        Detail
                      </button>
                      {item.status === 'pending' && (
                        <>
                          <button 
                            className="btn-approve"
                            onClick={() => handleStatusUpdate(item.id, 'disetujui')}
                          >
                            <i className="fas fa-check"></i>
                            Setujui
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => handleStatusUpdate(item.id, 'ditolak')}
                          >
                            <i className="fas fa-times"></i>
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DetailPeminjaman() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [peminjaman, setPeminjaman] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/peminjaman/${id}`);
        if (!response.ok) {
          throw new Error('Data tidak ditemukan');
        }
        const data = await response.json();
        setPeminjaman(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Gagal mengambil data peminjaman');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDisposisi = async () => {
    try {
      const response = await fetch(`http://localhost:5000/disposisi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_peminjaman: id,
          dari: 'dekan',
          kepada: 'wakil_dekan'
        })
      });

      if (response.ok) {
        alert('Berhasil mendisposisikan peminjaman');
        navigate('/dashboard-dekan/peminjaman');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal mendisposisikan peminjaman');
    }
  };

  if (loading) {
    return <div>Memuat data...</div>;
  }

  if (!peminjaman) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <div className="detail-container">
      <h2>Detail Peminjaman</h2>
      
      <div className="detail-section">
        <h3>Informasi Pemohon</h3>
        <table>
          <tbody>
            <tr>
              <td>Nama Organisasi</td>
              <td>: {peminjaman.nama_organisasi}</td>
            </tr>
            <tr>
              <td>Penanggung Jawab</td>
              <td>: {peminjaman.penanggung_jawab}</td>
            </tr>
            <tr>
              <td>Kontak</td>
              <td>: {peminjaman.kontak_pj}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {peminjaman.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-section">
        <h3>Informasi Peminjaman</h3>
        <table>
          <tbody>
            <tr>
              <td>Tanggal Mulai</td>
              <td>: {peminjaman.tanggal_mulai}</td>
            </tr>
            <tr>
              <td>Tanggal Selesai</td>
              <td>: {peminjaman.tanggal_selesai}</td>
            </tr>
            <tr>
              <td>Waktu</td>
              <td>: {peminjaman.waktu_mulai} - {peminjaman.waktu_selesai}</td>
            </tr>
            <tr>
              <td>Keperluan</td>
              <td>: {peminjaman.keperluan}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>: <span className={`status ${peminjaman.status}`}>{peminjaman.status}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-section">
        <h3>Dokumen</h3>
        {peminjaman.surat_peminjaman ? (
          <div className="document-preview">
            <p>Nama File: {peminjaman.surat_peminjaman}</p>
            <div className="document-actions">
              <a 
                href={`http://localhost:5000/uploads/${peminjaman.surat_peminjaman}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="fas fa-download"></i> Unduh Surat
              </a>
              {peminjaman.surat_peminjaman.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={`http://localhost:5000/uploads/${peminjaman.surat_peminjaman}#toolbar=0`}
                  type="application/pdf"
                  width="100%"
                  height="500px"
                  style={{ marginTop: '10px', border: '1px solid #ddd' }}
                />
              ) : (
                <img 
                  src={`http://localhost:5000/uploads/${peminjaman.surat_peminjaman}`}
                  alt="Preview Surat"
                  style={{ maxWidth: '100%', marginTop: '10px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                    console.log('Error loading image:', peminjaman.surat_peminjaman);
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <p>Tidak ada dokumen yang tersedia</p>
        )}
      </div>

      <div className="action-buttons">
        {peminjaman.status === 'pending' && (
          <>
            <button onClick={handleDisposisi} className="btn-disposisi">
              <i className="fas fa-exchange-alt"></i>
              Disposisi ke Wakil Dekan
            </button>
            <button onClick={() => navigate('/dashboard-dekan/peminjaman')} className="btn-back">
              <i className="fas fa-arrow-left"></i>
              Kembali
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ManajemenFasilitas() {
  return (
    <div>
      <h1>Manajemen Fasilitas</h1>
      
      <div className="fasilitas-grid">
        {/* Daftar fasilitas */}
      </div>

      <div className="add-fasilitas-form">
        {/* Form tambah/update fasilitas */}
      </div>
    </div>
  );
}

function RiwayatAktivitas() {
  return (
    <div>
      <h1>Riwayat Aktivitas</h1>
      
      <div className="activity-log">
        {/* Log aktivitas akan ditampilkan di sini */}
      </div>
    </div>
  );
} 
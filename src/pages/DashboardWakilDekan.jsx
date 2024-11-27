import { Routes, Route, NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaInbox, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export function DashboardWakilDekan() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard Wakil Dekan</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard-wadek" end className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-home"></i>
            Beranda
          </NavLink>
          
          <NavLink to="/dashboard-wadek/disposisi" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-inbox"></i>
            Daftar Disposisi
          </NavLink>
          
          <NavLink to="/dashboard-wadek/riwayat" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-history"></i>
            Riwayat Peminjaman
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
          <Route index element={<BerandaWadek />} />
          <Route path="disposisi" element={<DaftarDisposisi />} />
          <Route path="disposisi/:id" element={<DetailDisposisi />} />
          <Route path="riwayat" element={<RiwayatPeminjaman />} />
          <Route path="aktivitas" element={<RiwayatAktivitas />} />
        </Routes>
      </main>
    </div>
  );
}

function BerandaWadek() {
  const [stats, setStats] = useState({
    pending: 0,
    disetujui: 0,
    ditolak: 0
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
      const response = await fetch('http://localhost:5000/peminjaman/wadek');
      const data = await response.json();
      
      const counts = data.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      setStats({
        pending: counts.pending || 0,
        disetujui: counts.disetujui || 0,
        ditolak: counts.ditolak || 0
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/peminjaman/wadek/notifications');
      const data = await response.json();

      setNotifications(data.slice(0, 5));
    } catch (error) {
      console.error('Error:', error);
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
            <FaInbox />
          </div>
          <div className="stat-info">
            <h3>Disposisi Pending</h3>
            <div className="value">{stats.pending}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon approved">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Disposisi Disetujui</h3>
            <div className="value">{stats.disetujui}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon rejected">
            <FaTimesCircle />
          </div>
          <div className="stat-info">
            <h3>Disposisi Ditolak</h3>
            <div className="value">{stats.ditolak}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Disposisi Terbaru</h2>
          </div>
          <div className="notification-list">
            {notifications.map((notif) => (
              <div key={notif.id} className="peminjaman-item">
                <div className="peminjaman-info">
                  <h4>{notif.nama_organisasi}</h4>
                  <p>{new Date(new Date(notif.created_at).getTime() + (8 * 60 * 60 * 1000)).toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}</p>
                  <span className={`status-badge ${notif.status}`}>
                    {notif.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DaftarDisposisi() {
  const [disposisi, setDisposisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDisposisi();
  }, []);

  const fetchDisposisi = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/peminjaman/wadek');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const sortedDisposisi = data.sort((a, b) => 
          new Date(a.created_at) - new Date(b.created_at)
        ).reverse();
        
        setDisposisi(sortedDisposisi);
      } else if (data.error) {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setDisposisi([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Daftar Peminjaman Didisposisi</h1>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Organisasi</th>
              <th>Penanggung Jawab</th>
              <th>Fasilitas</th>
              <th>Tanggal & Waktu</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {disposisi.map((item) => (
              <tr key={item.id}>
                <td>{item.nama_organisasi}</td>
                <td>{item.penanggung_jawab}</td>
                <td>{item.nama_fasilitas}</td>
                <td>
                  {new Date(new Date(item.created_at).getTime() + (8 * 60 * 60 * 1000)).toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </td>
                <td>
                  <span className={`status-badge ${item.status_disposisi}`}>
                    {item.status_disposisi}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-detail"
                    onClick={() => navigate(`/dashboard-wadek/disposisi/${item.id}`)}
                  >
                    <i className="fas fa-eye"></i>
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailDisposisi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disposisi, setDisposisi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetailDisposisi();
  }, [id]);

  const fetchDetailDisposisi = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/disposisi/${id}`);
      const data = await response.json();
      setDisposisi(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      const disposisiResponse = await fetch(`http://localhost:5000/disposisi/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status_disposisi: status })
      });

      if (disposisiResponse.ok) {
        const peminjamanResponse = await fetch(`http://localhost:5000/peminjaman/${disposisi.id_peminjaman}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: status })
        });

        if (peminjamanResponse.ok) {
          await fetchDetailDisposisi();
          navigate('/dashboard-wadek/disposisi');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="loading">Memuat data...</div>;
  if (!disposisi) return <div>Data tidak ditemukan</div>;

  return (
    <div className="detail-container">
      <h2>Detail Peminjaman</h2>
      
      <div className="detail-section">
        <h3>Informasi Pemohon</h3>
        <table>
          <tbody>
            <tr>
              <td>Nama Organisasi</td>
              <td>: {disposisi.nama_organisasi}</td>
            </tr>
            <tr>
              <td>Penanggung Jawab</td>
              <td>: {disposisi.penanggung_jawab}</td>
            </tr>
            <tr>
              <td>Kontak</td>
              <td>: {disposisi.kontak_pj}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {disposisi.email}</td>
            </tr>
            <tr>
              <td>Fasilitas</td>
              <td>: {disposisi.nama_fasilitas}</td>
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
              <td>: {disposisi.tanggal_mulai}</td>
            </tr>
            <tr>
              <td>Tanggal Selesai</td>
              <td>: {disposisi.tanggal_selesai}</td>
            </tr>
            <tr>
              <td>Waktu</td>
              <td>: {disposisi.waktu_mulai} - {disposisi.waktu_selesai}</td>
            </tr>
            <tr>
              <td>Keperluan</td>
              <td>: {disposisi.keperluan}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>: <span className={`status-badge ${disposisi.status}`}>{disposisi.status}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-section">
        <h3>Dokumen</h3>
        {disposisi.surat_peminjaman ? (
          <div className="document-preview">
            <p>Nama File: {disposisi.surat_peminjaman}</p>
            <div className="document-actions">
              <a 
                href={`http://localhost:5000/uploads/${disposisi.surat_peminjaman}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="fas fa-download"></i> Unduh Surat
              </a>
              {disposisi.surat_peminjaman.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={`http://localhost:5000/uploads/${disposisi.surat_peminjaman}#toolbar=0`}
                  type="application/pdf"
                  width="100%"
                  height="500px"
                  style={{ marginTop: '10px', border: '1px solid #ddd' }}
                />
              ) : (
                <img 
                  src={`http://localhost:5000/uploads/${disposisi.surat_peminjaman}`}
                  alt="Preview Surat"
                  style={{ maxWidth: '100%', marginTop: '10px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
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
        {disposisi.status_disposisi === 'pending' && (
          <>
            <button 
              className="btn-approve"
              onClick={() => handleStatusUpdate('disetujui')}
            >
              <i className="fas fa-check"></i>
              Setujui
            </button>
            <button 
              className="btn-reject"
              onClick={() => handleStatusUpdate('ditolak')}
            >
              <i className="fas fa-times"></i>
              Tolak
            </button>
          </>
        )}
        <button 
          className="btn-back"
          onClick={() => navigate('/dashboard-wadek/disposisi')}
        >
          <i className="fas fa-arrow-left"></i>
          Kembali
        </button>
      </div>
    </div>
  );
}

function RiwayatPeminjaman() {
  return (
    <div>
      <h1>Riwayat Peminjaman</h1>
      
      <div className="filter-section">
        {/* Filter riwayat */}
      </div>

      <table className="riwayat-table">
        <thead>
          <tr>
            <th>Nama Mahasiswa</th>
            <th>Fasilitas</th>
            <th>Tanggal</th>
            <th>Status Akhir</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {/* Data riwayat peminjaman */}
        </tbody>
      </table>
    </div>
  );
}

function RiwayatAktivitas() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    try {
      const response = await fetch('http://localhost:5000/disposisi/history/wadek');
      const data = await response.json();
      setRiwayat(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Riwayat Aktivitas</h1>
      {loading ? (
        <div className="loading">Memuat data...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Nama Organisasi</th>
                <th>Fasilitas</th>
                <th>Status Akhir</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item) => (
                <tr key={item.id}>
                  <td>
                    {new Date(new Date(item.created_at).getTime() + (8 * 60 * 60 * 1000)).toLocaleString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </td>
                  <td>{item.nama_organisasi}</td>
                  <td>{item.nama_fasilitas}</td>
                  <td>
                    <span className={`status-badge ${item.status_disposisi}`}>
                      {item.status_disposisi}
                    </span>
                  </td>
                  <td>{item.catatan || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
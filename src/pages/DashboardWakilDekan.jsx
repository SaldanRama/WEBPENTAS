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
                  <p>{new Date(notif.created_at).toLocaleString()}</p>
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
      const response = await fetch('http://localhost:5000/disposisi');
      const data = await response.json();
      setDisposisi(data);
    } catch (error) {
      console.error('Error:', error);
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
                <td>
                  {new Date(item.created_at).toLocaleDateString()}
                  <br />
                  <small>{item.waktu_mulai} - {item.waktu_selesai}</small>
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
                      onClick={() => navigate(`/dashboard-wadek/disposisi/${item.id}`)}
                    >
                      <i className="fas fa-eye"></i>
                      Detail
                    </button>
                  </div>
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
      const response = await fetch(`http://localhost:5000/disposisi/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        navigate('/dashboard-wadek/disposisi');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  if (!disposisi) {
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
          </tbody>
        </table>
      </div>

      <div className="detail-section">
        <h3>Informasi Disposisi</h3>
        <table>
          <tbody>
            <tr>
              <td>Tanggal Disposisi</td>
              <td>: {new Date(disposisi.created_at).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>: <span className={`status-badge ${disposisi.status}`}>{disposisi.status}</span></td>
            </tr>
            <tr>
              <td>Catatan Dekan</td>
              <td>: {disposisi.catatan_dekan || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        {disposisi.status === 'pending' && (
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
import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

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
  return (
    <div>
      <h1 className="dashboard-title">Beranda Wakil Dekan</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Peminjaman Didisposisi</h3>
          <div className="value">8</div>
        </div>
        
        <div className="stat-card">
          <h3>Disetujui</h3>
          <div className="value">25</div>
        </div>
        
        <div className="stat-card">
          <h3>Ditolak</h3>
          <div className="value">5</div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Notifikasi Disposisi Baru</h2>
        <div className="notification-list">
          {/* Daftar notifikasi disposisi baru */}
        </div>
      </div>
    </div>
  );
}

function DaftarDisposisi() {
  return (
    <div>
      <h1>Daftar Peminjaman Didisposisi</h1>
      
      <table className="disposisi-table">
        <thead>
          <tr>
            <th>Nama Mahasiswa</th>
            <th>Fasilitas</th>
            <th>Tanggal & Waktu</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Data peminjaman yang didisposisi */}
        </tbody>
      </table>
    </div>
  );
}

function DetailDisposisi() {
  return (
    <div className="detail-disposisi">
      <h1>Detail Peminjaman</h1>
      
      <div className="info-section">
        <div className="info-group">
          <h3>Informasi Mahasiswa</h3>
          {/* Detail informasi mahasiswa */}
        </div>

        <div className="info-group">
          <h3>Detail Peminjaman</h3>
          {/* Detail peminjaman */}
        </div>

        <div className="info-group">
          <h3>Catatan Dekan</h3>
          {/* Catatan dari dekan */}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-approve">Setujui Peminjaman</button>
        <button className="btn-reject">Tolak Peminjaman</button>
      </div>

      <div className="rejection-form" style={{display: 'none'}}>
        <h3>Alasan Penolakan</h3>
        <textarea placeholder="Masukkan alasan penolakan..."></textarea>
        <button className="btn-submit">Kirim</button>
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
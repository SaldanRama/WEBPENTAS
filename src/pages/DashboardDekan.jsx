import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

export function DashboardDekan() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard Dekan</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard-dekan" end className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-home"></i>
            Beranda
          </NavLink>
          
          <NavLink to="/dashboard-dekan/peminjaman" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-clipboard-list"></i>
            Daftar Peminjaman
          </NavLink>
          
          <NavLink to="/dashboard-dekan/fasilitas" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-building"></i>
            Manajemen Fasilitas
          </NavLink>

          <NavLink to="/dashboard-dekan/riwayat" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-history"></i>
            Riwayat Aktivitas
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
  return (
    <div>
      <h1 className="dashboard-title">Beranda Dekan</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Peminjaman Pending</h3>
          <div className="value">12</div>
        </div>
        
        <div className="stat-card">
          <h3>Peminjaman Disetujui</h3>
          <div className="value">45</div>
        </div>
        
        <div className="stat-card">
          <h3>Peminjaman Ditolak</h3>
          <div className="value">8</div>
        </div>

        <div className="stat-card">
          <h3>Peminjaman Didisposisi</h3>
          <div className="value">15</div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Notifikasi Terbaru</h2>
        <div className="notification-list">
          {/* Daftar notifikasi akan ditampilkan di sini */}
        </div>
      </div>
    </div>
  );
}

function DaftarPeminjaman() {
  return (
    <div>
      <h1>Daftar Peminjaman</h1>
      
      <div className="filter-section">
        {/* Filter components */}
      </div>

      <table className="peminjaman-table">
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
          {/* Data peminjaman akan ditampilkan di sini */}
        </tbody>
      </table>
    </div>
  );
}

function DetailPeminjaman() {
  return (
    <div className="detail-peminjaman">
      <h1>Detail Peminjaman</h1>
      
      <div className="info-section">
        {/* Informasi detail peminjaman */}
      </div>

      <div className="action-buttons">
        <button className="btn-approve">Setujui</button>
        <button className="btn-reject">Tolak</button>
        <button className="btn-disposisi">Disposisi ke Wakil Dekan</button>
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
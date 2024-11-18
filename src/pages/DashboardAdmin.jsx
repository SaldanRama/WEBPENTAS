import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

export function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Dashboard</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-home"></i>
            Dashboard
          </NavLink>
          
          <NavLink to="/dashboard/users" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-users"></i>
            Kelola Pengguna
          </NavLink>
          
          <NavLink to="/dashboard/facilities" className={({isActive}) => 
            `nav-item ${isActive ? 'active' : ''}`
          }>
            <i className="fas fa-building"></i>
            Kelola Fasilitas
          </NavLink>
        </nav>
      </div>

      <main className={`dashboard-main ${!isSidebarOpen ? 'full' : ''}`}>
        <button 
          className="toggle-sidebar"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '←'  : '→'}
        </button>

        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="facilities" element={<FacilityManagement />} />
        </Routes>
      </main>
    </div>
  );
}

function DashboardHome() {
  return (
    <div>
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Pengguna</h3>
          <div className="value">1,234</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Fasilitas</h3>
          <div className="value">56</div>
        </div>
        
        <div className="stat-card">
          <h3>Pengunjung Hari Ini</h3>
          <div className="value">89</div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-title">Aktivitas Terbaru</h2>
        {/* Tambahkan konten aktivitas di sini */}
      </div>
    </div>
  );
}

function UserManagement() {
  return <h1>Kelola Pengguna</h1>;
}

function FacilityManagement() {
  return <h1>Kelola Fasilitas</h1>;
} 
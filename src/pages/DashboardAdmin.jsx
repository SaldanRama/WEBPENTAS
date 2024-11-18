import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaUsers, FaBuilding, FaTachometerAlt, FaBars } from "react-icons/fa";
import UserManagement from "./dashboard/UserManagement";
import FacilityManagement from "./dashboard/FacilityManagement";
import DashboardHome from "./dashboard/DashboardHome";

export function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <Link 
            to="" 
            className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="users" 
            className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}
          >
            <FaUsers />
            <span>Kelola Pengguna</span>
          </Link>
          <Link 
            to="facilities" 
            className={`nav-item ${location.pathname === '/admin/facilities' ? 'active' : ''}`}
          >
            <FaBuilding />
            <span>Kelola Fasilitas</span>
          </Link>
        </nav>
      </div>

      {/* Toggle Sidebar Button */}
      <button 
        className={`toggle-sidebar ${!isSidebarOpen ? 'closed' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <div className={`dashboard-main ${!isSidebarOpen ? 'full' : ''}`}>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="facilities" element={<FacilityManagement />} />
        </Routes>
      </div>
    </div>
  );
} 
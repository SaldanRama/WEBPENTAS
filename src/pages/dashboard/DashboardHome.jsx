import { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

function DashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFacilities: 0,
    activeFacilities: 0,
    inactiveFacilities: 0
  });

  const [recentData, setRecentData] = useState({
    users: [],
    facilities: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, facilitiesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/users'),
          axios.get('http://localhost:3000/api/facilities')
        ]);

        setRecentData({
          users: usersRes.data.slice(-5),  // 5 user terbaru
          facilities: facilitiesRes.data.slice(-5) // 5 fasilitas terbaru
        });

        setStats({
          totalUsers: usersRes.data.length,
          totalFacilities: facilitiesRes.data.length,
          activeFacilities: facilitiesRes.data.filter(f => f.status === 'tersedia').length,
          inactiveFacilities: facilitiesRes.data.filter(f => f.status !== 'tersedia').length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Total Pengguna</h3>
            <div className="value">{stats.totalUsers}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon facilities">
            <FaBuilding />
          </div>
          <div className="stat-info">
            <h3>Total Fasilitas</h3>
            <div className="value">{stats.totalFacilities}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon active">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Fasilitas Aktif</h3>
            <div className="value">{stats.activeFacilities}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon inactive">
            <FaExclamationCircle />
          </div>
          <div className="stat-info">
            <h3>Fasilitas Non-Aktif</h3>
            <div className="value">{stats.inactiveFacilities}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h2>Aktivitas Terbaru</h2>
          <button className="view-all">Lihat Semua</button>
        </div>
        <div className="activity-list">
          {/* Activity items will be mapped here */}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Pengguna Terbaru</h2>
          </div>
          <div className="user-list">
            {recentData.users.map(user => (
              <div key={user.id} className="user-item">
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Fasilitas Terbaru</h2>
          </div>
          <div className="facility-list">
            {recentData.facilities.map(facility => (
              <div key={facility.id} className="facility-item">
                <span>{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome; 
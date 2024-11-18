import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailFasilitas } from './pages/DetailFasilitas';
import { Login } from './pages/Login';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { NavbarComponents } from './components/NavbarComponents';
import NotificationComponents from './components/NotificationComponents';
import { PeminjamanPage } from './pages/PeminjamanPage';
import { DashboardDekan } from './pages/DashboardDekan';
import { DashboardWakilDekan } from './pages/DashboardWakilDekan';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <div>
      {!isLoginPage && !isDashboardPage && <NavbarComponents />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail-fasilitas" Component={DetailFasilitas}/>
        <Route path="/login" Component={Login}/>
        <Route path="/notifications" Component={NotificationComponents}/>
        <Route path="/dashboard/*" Component={DashboardAdmin}/>
        <Route path="/peminjaman" Component={PeminjamanPage}/>
        <Route path="/dashboard-dekan/*" Component={DashboardDekan}/>
        <Route path="/dashboard-wadek/*" Component={DashboardWakilDekan}/>
      </Routes>


    </div>

  )
}

export default App

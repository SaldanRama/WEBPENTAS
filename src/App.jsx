import { Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavbarComponents } from "./components/NavbarComponents";

import { HomePage } from "./pages/HomePage";
import { DetailFasilitas } from "./pages/DetailFasilitas";
import { Login } from "./pages/Login";
import NotificationComponents from "./components/NotificationComponents";
import { DashboardAdmin } from "./pages/DashboardAdmin";
import { PeminjamanPage } from "./pages/PeminjamanPage";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <div>
      {!isLoginPage && !isDashboardPage && <NavbarComponents />}

      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/detail-fasilitas" Component={DetailFasilitas}/>
        <Route path="/login" Component={Login}/>
        <Route path="/notifications" Component={NotificationComponents}/>
        <Route path="/dashboard/*" Component={DashboardAdmin}/>
        <Route path="/peminjaman" Component={PeminjamanPage}/>
      </Routes>


    </div>

  )
}

export default App

import { Routes, Route, useLocation } from "react-router-dom";

import { NavbarComponents } from "./components/NavbarComponents";

import { HomePage } from "./pages/HomePage";
import { DetailFasilitas } from "./pages/DetailFasilitas";
import { Login } from "./pages/Login";
import NotificationComponents from "./components/NotificationComponents";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <NavbarComponents />}

      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/detail-fasilitas" Component={DetailFasilitas}/>
        <Route path="/login" Component={Login}/>
        <Route path="/notifications" Component={NotificationComponents}/>
      </Routes>


    </div>

  )
}

export default App

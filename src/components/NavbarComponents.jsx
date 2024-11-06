import { FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export const NavbarComponents = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid">
       <div className="container-fluid">
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
            <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
            <img src="public/logoUnhas.png" alt="Logo" width="25" className="me-2" />
            <span className="my-auto">PENTAS</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Fasilitas</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Peminjaman</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Kontak</a>
                </li>
            </ul>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Link to="/notifications" className="position-relative">
                  <FaBell size={20} className="text-dark" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                  <span className="visually-hidden">notifikasi baru</span>
                  </span>
              </Link>
              <button 
                type="button" 
                className="btn btn-outline-danger"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
        </div>
        </nav>
       </div>
    </div>
  )
}

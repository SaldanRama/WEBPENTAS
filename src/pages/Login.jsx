import { useState } from 'react';
import '../disc/css/main.css';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const { role } = response.data;
      
      // Simpan data user ke localStorage
      localStorage.setItem('userRole', role);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect berdasarkan role
      switch(role) {
        case 'admin':
          window.location.href = '/dashboard';
          break;
        case 'dekan':
          window.location.href = '/dashboard-dekan';
          break;
        case 'wakil_dekan':
          window.location.href = '/dashboard-wadek';
          break;
        default:
          window.location.href = '/';
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="fw-bold">WELCOME TO PENTAS</h1>
        <p>WEBSITE PEMINJAMAN FASILITAS FMIPA UNHAS</p>
      </div>
      
      <div className="login-right">
        <div className="login-form">
          <h2 className='fw-bold'>LOGIN</h2>
          <p>masukkan data dengan lengkap</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
            
            <div className="forgot-password">
              <a href="#">Forgot Password</a>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

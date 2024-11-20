import { useState } from 'react';
import '../disc/css/main.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const { role } = response.data;
      
      // Tambahkan email ke localStorage
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Tampilkan alert sukses
      alert('Login berhasil!');
      
      // Redirect berdasarkan role
      switch(role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'dekan':
          navigate('/dashboard-dekan');
          break;
        case 'wakil_dekan':
          navigate('/dashboard-wadek');
          break;
        default:
          navigate('/');
      }
      
    } catch (err) {
      // Tampilkan alert error
      alert('Login gagal: ' + (err.response?.data?.message || 'Email atau password salah!'));
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
              <div className="password-input-container" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? "🙉" : "🙈"}
                </button>
              </div>
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

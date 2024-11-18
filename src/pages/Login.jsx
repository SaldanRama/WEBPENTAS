import { useState } from 'react';
import '../disc/css/main.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Data login sederhana
    const users = [
      { email: 'user@example.com', password: 'user123', role: 'user' },
      { email: 'admin@example.com', password: 'admin123', role: 'admin' }
    ];

    // Cek kredensial
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      alert(`Login berhasil sebagai ${user.role}`);
      // Simpan data user ke localStorage
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect berdasarkan role
      if (user.role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }
    } else {
      alert('Email atau password salah!');
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
          </form>
        </div>
      </div>
    </div>
  );
};

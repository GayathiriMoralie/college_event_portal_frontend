import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Custom CSS for styling
import clgLogo from '../images/clglogo.png';  // Import logo image

function LoginPage({ setUserRole }) {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Correct backend URL
  const BACKEND_URL = "https://college-event-portal-backend-a8dht5bme.vercel.app";

  // Generate random CAPTCHA
  const generateCaptcha = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    setCaptcha(randomNumber);
    setCaptchaInput('');
  };

  // // ✅ Verify backend CORS headers
  // useEffect(() => {
  //   fetch(`${BACKEND_URL}/ping`, {
  //     method: 'GET',
  //     mode: 'cors',  // ✅ Ensure CORS is enabled
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  //       return res.json();
  //     })
  //     .then((data) => console.log("✅ Backend Response:", data.message))
  //     .catch((err) => console.error("❌ Backend Wake-up Error:", err.message));
  // }, []);

  // Generate CAPTCHA on page load
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (!role) {
      setError('Please select a role.');
      return;
    }
    if (!id.trim()) {
      setError(role === 'student' ? 'Student ID is required.' : 'Faculty ID is required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }
    if (password !== '12345') {
      setError('Invalid password.');
      return;
    }
    if (captcha !== parseInt(captchaInput)) {
      setError('Captcha does not match.');
      return;
    }

    // Role-based ID validation
    if (role === 'student' && id.toLowerCase() !== 'student') {
      setError('Invalid Student ID. It should be "student".');
      return;
    }
    if (role === 'faculty' && id.toLowerCase() !== 'faculty') {
      setError('Invalid Faculty ID. It should be "faculty".');
      return;
    }

    // Show success alert and redirect to the respective homepage
    setUserRole(role);
    if (role === 'student') {
      alert('✅ Successfully logged in as a Student');
      navigate('/StudentHomePage');
    } else if (role === 'faculty') {
      alert('✅ Successfully logged in as a Faculty');
      navigate('/FacultyHomePage');
    }
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <div className="navbar-login">
        <img src={clgLogo} alt="College Logo" className="logo" />
        <span className="title">College Event Portal</span>
      </div>

      {/* Login Form */}
      <div className="login-container">
        <div className="login-form">
          <h2>College Event Portal Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>

            <div className="form-group">
              <label>{role === 'student' ? 'Student ID' : 'Faculty ID'}</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                placeholder={role === 'student' ? 'Enter Student ID' : 'Enter Faculty ID'}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group captcha">
              <label>Captcha: {captcha}</label>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                placeholder="Enter CAPTCHA"
              />
              <span onClick={generateCaptcha} className="refresh-btn" role="button">
                &#x21bb; {/* Refresh symbol */}
              </span>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

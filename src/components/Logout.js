import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setUserRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear userRole from localStorage and reset state
    setUserRole('');
    localStorage.removeItem('userRole');

    // Redirect to login after clearing user session
    navigate('/login');
  }, [setUserRole, navigate]);

  return (
    <div className="logout-page">
      <h2>You have been logged out</h2>
      <p>For security reasons, you have been logged out of your account.</p>
      <p>Please log in to continue.</p>
      <button onClick={() => navigate('/login')} className="login-btn">
        Go to Login
      </button>
    </div>
  );
};

export default Logout;

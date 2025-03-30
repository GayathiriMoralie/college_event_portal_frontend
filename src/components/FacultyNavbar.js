import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/clglogo.png';
import './FacultyNavbar.css'; // Import the CSS for styling

const FacultyNavbar = () => {
  return (
    <nav className="faculty-navbar">
      <div className="navbar-left">
        <img src={logo} alt="College Logo" className="navbar-logo" />
        <span className="navbar-title">College Event Portal</span>
      </div>
      <div className="navbar-right">
        <Link to="/FacultyViewEvents" className="navbar-link">View Events</Link>
        <Link to="/StudentsRegistered" className="navbar-link">Students Registered</Link>
        <Link to="/Logout" className="navbar-logout">Logout</Link>
      </div>
    </nav>
  );
};

export default FacultyNavbar;

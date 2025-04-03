import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentsRegistered.css";
import ClgLogo from "../images/clglogo.png";

const StudentsRegistered = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging
        setStudents(data);  // Ensure data contains `id`
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setError("Failed to load student data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Handle Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    alert("You successfully logged out as a faculty, kindly log in for further details.");
  };

  return (
    <div className="students-registered-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ClgLogo} alt="College Logo" className="navbar-logo" />
          <span className="navbar-title">College Event Portal</span>
        </div>
        <div className="navbar-links">
          <Link to="/FacultyHomePage" className="navbar-link">Home</Link>
          <Link to="/FacultyViewEvents" className="navbar-link">View Events</Link>
          <Link to="/StudentsRegistered" className="navbar-link active">Students Registered</Link>
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Students Registered Heading */}
      <h2 className="students-registered-heading">Students Registered</h2>

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="loading-message">Loading students...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="students-table-container">
         <table>
  <thead>
    <tr>
      <th>S.No</th>
      <th>Name of Student</th>
      <th>Email</th>
      <th>Registered Event</th>
      <th>Payment Method</th>
      <th>Contact No</th>
      <th>Registration Date</th>
    </tr>
  </thead>
  <tbody>
    {students.map((student, index) => (
      <tr key={index}>
        <td>{student.s_no}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.event}</td>
        <td>{student.payment_method}</td>
        <td>{student.contact_no}</td>
        <td>{new Date(student.created_at).toLocaleDateString()}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      )}
    </div>
  );
};

export default StudentsRegistered;

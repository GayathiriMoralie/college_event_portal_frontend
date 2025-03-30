import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentsRegistered.css";
import ClgLogo from "../images/clglogo.png";

const StudentsRegistered = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registered students from backend
  useEffect(() => {
    fetch("http://localhost:8001/api/register")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging
        setStudents(data);
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
          <table className="students-table">
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
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.Name}</td>
                    <td>{student.Email}</td>
                    <td>{student.Event}</td>
                    <td>{student.Payment_Method}</td>
                    <td>{student.Contact_No}</td>
                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">No students registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentsRegistered;

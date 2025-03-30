import React from 'react';
import FacultyNavbar from './FacultyNavbar'; // Import the Faculty Navbar
import './FacultyHomePage.css'; // CSS for Faculty Home Page Styling

const FacultyHomePage = () => {
  const facultyDetails = [
    { id: 1, year: '3', department: 'Computer Science', representative: 'John Doe', phone: '9876543210' },
    { id: 2, year: '2', department: 'Electrical', representative: 'Jane Smith', phone: '9876543211' },
    // Add more faculty details as needed
  ];

  return (
    <div>
      {/* Faculty Navbar */}
      <FacultyNavbar />

      {/* Faculty Home Page Content */}
      <div className="faculty-home-container">
        <h1>Faculty Home Page</h1> <br></br>
        <p>Welcome to the Faculty Dashboard! Below is the list of student representative names for a particular department and year.</p>

        <div className="faculty-table-container">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Year & Department</th>
                <th>Representative Name</th>
                <th>Phone No</th>
              </tr>
            </thead>
            <tbody>
              {facultyDetails.map((faculty, index) => (
                <tr key={faculty.id}>
                  <td>{index + 1}</td>
                  <td>{faculty.year} - {faculty.department}</td>
                  <td>{faculty.representative}</td>
                  <td>{faculty.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyHomePage;

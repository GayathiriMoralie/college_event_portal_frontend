import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import FacultyHomePage from './components/FacultyHomePage';
import FacultyViewEvents from './components/FacultyViewEvents';
import StudentsRegistered from './components/StudentsRegistered';
import StudentHomePage from './components/student-components/StudentHomePage';
import StudentEvents from './components/student-components/StudentEvents';
import RegistrationForm from './components/student-components/RegistrationForm';

import Logout from './components/Logout';

function App() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole); // Ensure userRole is set properly
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route - Always go to Login Page */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />

          {/* Faculty Routes */}
          <Route path="/FacultyHomePage" element={userRole === 'faculty' ? <FacultyHomePage /> : <Navigate to="/login" />} />
          <Route path="/FacultyViewEvents" element={userRole === 'faculty' ? <FacultyViewEvents /> : <Navigate to="/login" />} />
          <Route path="/StudentsRegistered" element={userRole === 'faculty' ? <StudentsRegistered /> : <Navigate to="/login" />} />
          

          {/* Student Routes */}
          <Route path="/StudentHomePage" element={userRole === 'student' ? <StudentHomePage /> : <Navigate to="/login" />} />
          <Route path="/StudentEvents" element={userRole === 'student' ? <StudentEvents /> : <Navigate to="/login" />} />
          <Route path="/RegistrationForm" element={userRole === 'student' ? <RegistrationForm /> : <Navigate to="/login" />} />

          {/* Logout Route */}
          <Route path="/logout" element={<Logout setUserRole={setUserRole} />} />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentEvents.css';
import ClgLogo from '../../images/clglogo.png';

// Event images
import CulturalsImg from '../../images/culturals';
import SymposiumImg from '../../images/symposium.jfif';
import HackathonImg from '../../images/hackathon.jfif';
import ScienceExhibitionImg from '../../images/event3.jfif';

const StudentEvents = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
    alert('You have successfully logged out.');
  };

  // Event Data
  const events = [
    { id: 1, name: 'Culturals', image: CulturalsImg, description: 'A celebration of dance, music, and drama.', date: '2025-02-15', location: 'LCTPL', fee: '100' },
    { id: 2, name: 'Symposium', image: SymposiumImg, description: 'Technical paper presentations and workshops.', date: '2025-03-10', location: 'CS DPT', fee: '150' },
    { id: 3, name: 'Hackathon', image: HackathonImg, description: '24-hour coding challenge with exciting prizes.', date: '2025-04-05', location: 'Computer Lab', fee: '200' },
    { id: 4, name: 'Science Exhibition', image: ScienceExhibitionImg, description: 'Showcasing innovative projects and models.', date: '2025-05-01', location: 'Science Block', fee: '100' }
  ];

  return (
    <div className="student-events-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ClgLogo} alt="College Logo" className="navbar-logo" />
          <span className="navbar-title">College Event Portal</span>
        </div>
        <div className="navbar-links">
          <Link to="/StudentHomePage" className="navbar-link">Home</Link>
          <Link to="/RegistrationForm" className="navbar-link">Registration Form</Link>
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="spacer"></div>
      <br></br><br></br><br></br>
      <h2>STUDENT EVENTS</h2>
      
      {/* Marquee Announcement */}
      <div className="marquee-container">
        <marquee behavior="scroll" direction="left">
          🌟 Upcoming Events: Culturals | Symposium | Hackathon | Science Exhibition - Register Now! 🌟
        </marquee>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h2 className="event-title">{event.name}</h2>
            <div className="event-image-container">
              <img 
                src={event.image} 
                alt={event.name} 
                className="event-image zoom-effect" 
                onClick={() => setSelectedImage(event.image)} 
              />
            </div>
            <div className="event-details">
              <p className="event-description">{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Registration Fee:</strong> {event.fee}</p>
            </div>
            <button className="register-button" onClick={() => navigate('/RegistrationForm')}>
              Click to Register
            </button>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged Event" className="modal-image" />
            <button className="close-button" onClick={() => setSelectedImage(null)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEvents;

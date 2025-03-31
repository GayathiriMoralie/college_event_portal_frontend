import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentHomePage.css';
import Event1 from '../../images/event1.jpeg';
import Event2 from '../../images/event2.jpeg';
import Event3 from '../../images/event3.jfif';
import Event4 from '../../images/event4.jfif';
import ClgLogo from '../../images/clglogo.png';

const StudentHomePage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
    alert('You have successfully logged out.');
  };

  const handleHover = () => {
    setScrollPosition(scrollPosition === 0 ? -100 : 0);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setZoomed(false);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setZoomed(false);
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  return (
    <div className="student-home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ClgLogo} alt="College Logo" className="navbar-logo" />
          <span className="navbar-title">College Event Portal</span>
        </div>
        <div className="navbar-links">
        <Link to="/StudentEvents" className="navbar-link">Student Events</Link>

          <Link to="/RegistrationForm" className="navbar-link">Registration Form</Link>
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Page Title Below Navbar */}
      <div className="content">
        <h1 className="page-title">Student Home Page</h1>
        <p className="welcome-text">Welcome Students! Explore and register for the upcoming events!<br></br><br></br> The below images are the events held with 2023-2025 batch students.Explore them too..!!</p>
      </div>

      {/* Event Slider */}
      <div className="event-slider" onMouseEnter={handleHover}>
        <div className="event-track" style={{ transform: `translateX(${scrollPosition}%)` }}>
          {[
            { image: Event1, title: "Donating for Kerala Flood Relief" },
            { image: Event2, title: "Pongal Celebration 2k24" },
            { image: Event3, title: "Science Exhibition" },
            { image: Event4, title: "Technova 2k24" }
          ].map((event, index) => (
            <div className="event-card" key={index} onClick={() => openImageModal(event.image)}>
              <img src={event.image} alt={event.title} className="event-image" />
              <p className="event-title">{event.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeImageModal}>&times;</span>
            <img
              src={selectedImage}
              alt="Zoomed Event"
              className={`modal-image ${zoomed ? 'zoomed' : ''}`}
              onClick={toggleZoom}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomePage;

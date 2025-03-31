import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import ClgLogo from "../../images/clglogo.png";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL?.trim() || "https://college-event-portal-backend.onrender.com";

  useEffect(() => {
    console.log("🔗 Using API URL:", API_URL);
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!event.trim()) newErrors.event = "Please select an event";
    if (!contactNo) {
      newErrors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(contactNo)) {
      newErrors.contactNo = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = { name, email, event, contact_no: contactNo };

    try {
      console.log("🚀 Sending form data:", formData);

      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("🔄 Server Response:", data);

      if (response.ok) {
        alert(`✅ Successfully registered for '${event}'!`);
        setName("");
        setEmail("");
        setEvent("");
        setContactNo("");
        setErrors({});
      } else {
        alert(`❌ ${data.error || "Error submitting form. Try again!"}`);
      }
    } catch (error) {
      alert("❌ Network error! Please check your connection.");
      console.error("🛑 Form Submission Error:", error);
    }
  };

  return (
    <div className="registration-form-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ClgLogo} alt="College Logo" className="navbar-logo" />
          <span className="navbar-title">College Event Portal</span>
        </div>
        <div className="navbar-links">
          <button onClick={() => navigate("/StudentEvents")} className="navbar-link">
            Student Events
          </button>
          <button onClick={() => navigate("/RegistrationForm")} className="navbar-link">
            Registration Form
          </button>
          <button onClick={() => navigate("/logout")} className="navbar-logout">
            Logout
          </button>
        </div>
      </nav>

      <h2>Event Registration Form</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Event:</label>
          <select value={event} onChange={(e) => setEvent(e.target.value)} required>
            <option value="">Select Event</option>
            <option value="Cultural Event">Cultural Event</option>
            <option value="Symposium">Symposium</option>
            <option value="Technova">Technova</option>
            <option value="Pongal Celebration">Pongal Celebration</option>
          </select>
          {errors.event && <p className="error-message">{errors.event}</p>}
        </div>

        <div className="form-group">
          <label>Contact No:</label>
          <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
          {errors.contactNo && <p className="error-message">{errors.contactNo}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;

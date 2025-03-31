import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import ClgLogo from "../../images/clglogo.png";

function RegistrationForm() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Event, setEvent] = useState("");
  const [Contact_No, setContact_No] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL?.trim();

  useEffect(() => {
    console.log("🔗 API URL from .env:", API_URL); // Debugging
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!Name.trim()) newErrors.Name = "Name is required";
    if (!Email) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.Email = "Invalid email format";
    }
    if (!Event) newErrors.Event = "Please select an event";
    if (!Contact_No) {
      newErrors.Contact_No = "Contact number is required";
    } else if (!/^\d{10}$/.test(Contact_No)) {
      newErrors.Contact_No = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = { name: Name, email: Email, event: Event, contact_no: Contact_No };

    try {
      console.log("🚀 Sending form data:", formData);

      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("🔄 Response from server:", data);

      if (response.ok) {
        alert(`✅ Successfully registered for '${Event}'!`);
        setName("");
        setEmail("");
        setEvent("");
        setContact_No("");
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
          <input type="text" value={Name} onChange={(e) => setName(e.target.value)} required />
          {errors.Name && <p className="error-message">{errors.Name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.Email && <p className="error-message">{errors.Email}</p>}
        </div>

        <div className="form-group">
          <label>Event:</label>
          <select value={Event} onChange={(e) => setEvent(e.target.value)} required>
            <option value="">Select Event</option>
            <option value="Cultural Event">Cultural Event</option>
            <option value="Symposium">Symposium</option>
            <option value="Technova">Technova</option>
            <option value="Pongal Celebration">Pongal Celebration</option>
          </select>
          {errors.Event && <p className="error-message">{errors.Event}</p>}
        </div>

        <div className="form-group">
          <label>Contact No:</label>
          <input type="text" value={Contact_No} onChange={(e) => setContact_No(e.target.value)} required />
          {errors.Contact_No && <p className="error-message">{errors.Contact_No}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;

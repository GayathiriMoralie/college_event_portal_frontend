import React, { useState } from 'react';
import axios from 'axios';

function AddEvent() {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://college-event-portal-backend.onrender.com/api/events', eventData, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("🎉 Event added successfully!", response.data);
      alert("Event added successfully!");
      setEventData({ name: '', description: '', date: '', location: '' }); // Reset form
    } catch (error) {
      console.error("❌ Error adding event!", error.response?.data || error.message);
      alert("Failed to add event. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={eventData.name} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={eventData.description} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Date:
          <input type="datetime-local" name="date" value={eventData.date} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={eventData.location} onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;

import React, { useState } from 'react';
import axios from 'axios';

function AddEventForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventFees, setEventFees] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Collect data from the form
    const eventData = {
      name,
      description,
      date,
      location,
      event_fees: eventFees,
      created_by: 'Faculty Name'  // This can be dynamically set depending on the logged-in faculty
    };

    try {
      const response = await axios.post('http://localhost:5000/api/events', eventData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Event created successfully!');
    } catch (error) {
      setMessage('Error creating event: ' + error.response.data.error);
    }
  };

  return (
    <div className="add-event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Event Fees"
          value={eventFees}
          onChange={(e) => setEventFees(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddEventForm;

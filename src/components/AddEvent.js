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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Send data to backend API
  //   axios.post('http://localhost:8001/api/events', eventData)
  //     .then(response => {
  //       console.log("Event added successfully", response);
  //     })
  //     .catch(error => {
  //       console.error("There was an error adding the event!", error);
  //     });
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('https://college-event-portal-backend-779hpsv14.vercel.app/api/events', eventData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log("🎉 Event added successfully!", response.data);
    })
    .catch(error => {
      console.error("❌ There was an error adding the event!", error);
    });
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

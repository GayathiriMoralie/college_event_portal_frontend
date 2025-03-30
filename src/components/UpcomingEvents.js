import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch upcoming events from backend API
    axios.get('http://localhost:8001/api/events/upcoming') // backend endpoint for upcoming events
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching upcoming events!", error);
      });
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEvents;

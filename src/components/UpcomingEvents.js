// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UpcomingEvents() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch upcoming events from backend API
//     axios.get('http://localhost:8001/api/events/upcoming') // backend endpoint for upcoming events
//       .then(response => {
//         setEvents(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching upcoming events!", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Upcoming Events</h1>
//       <ul>
//         {events.map(event => (
//           <li key={event.id}>{event.name} - {event.date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UpcomingEvents;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001/api";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/events/upcoming`)
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
        {events.length > 0 ? (
          events.map(event => (
            <li key={event.id || event._id}>
              {event.name} - {new Date(event.date).toLocaleString()}
            </li>
          ))
        ) : (
          <p>No upcoming events found.</p>
        )}
      </ul>
    </div>
  );
}

export default UpcomingEvents;

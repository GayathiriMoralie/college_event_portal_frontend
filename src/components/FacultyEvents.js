// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function FacultyEvents() {
//   const [events, setEvents] = useState([]);
//   const [eventName, setEventName] = useState('');
//   const [eventDescription, setEventDescription] = useState('');
//   const [eventDate, setEventDate] = useState('');
//   const [eventLocation, setEventLocation] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingEventId, setEditingEventId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query

//   useEffect(() => {
//     axios.get("http://localhost:8001/api/events")
//       .then((response) => {
//         setEvents(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the events!", error);
//       });
//   }, []);

//   const handleAddEvent = () => {
//     axios.post("http://localhost:8001/api/events", {
//       name: eventName,
//       description: eventDescription,
//       date: eventDate,
//       location: eventLocation
//     })
//     .then((response) => {
//       setEvents([...events, response.data]);
//       resetForm();
//     })
//     .catch((error) => {
//       console.error("There was an error adding the event!", error);
//     });
//   };

//   const handleUpdateEvent = () => {
//     axios.put(`http://localhost:8001/api/events/${editingEventId}`, {
//       name: eventName,
//       description: eventDescription,
//       date: eventDate,
//       location: eventLocation
//     })
//     .then((response) => {
//       setEvents(events.map(event => event.id === editingEventId ? response.data : event));
//       resetForm();
//       setIsEditing(false);
//     })
//     .catch((error) => {
//       console.error("There was an error updating the event!", error);
//     });
//   };

//   const handleDeleteEvent = (id) => {
//     axios.delete(`http://localhost:8001/api/events/${id}`)
//       .then(() => {
//         setEvents(events.filter(event => event.id !== id));
//       })
//       .catch((error) => {
//         console.error("There was an error deleting the event!", error);
//       });
//   };

//   const handleEditEvent = (event) => {
//     setEventName(event.name);
//     setEventDescription(event.description);
//     setEventDate(event.date);
//     setEventLocation(event.location);
//     setIsEditing(true);
//     setEditingEventId(event.id);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Reset form after add/update
//   const resetForm = () => {
//     setEventName('');
//     setEventDescription('');
//     setEventDate('');
//     setEventLocation('');
//   };

//   // Filter events based on search query
//   const filteredEvents = events.filter(event =>
//     event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     event.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div>
//       <h2>Faculty Events</h2>

//       {/* Search bar */}
//       <div>
//         <input
//           type="text"
//           placeholder="Search Events"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ padding: '10px', margin: '20px 0', width: '100%' }}
//         />
//       </div>

//       {/* Event Form (Add or Update) */}
//       <h3>{isEditing ? 'Update Event' : 'Add Event'}</h3>
//       <form onSubmit={e => { e.preventDefault(); isEditing ? handleUpdateEvent() : handleAddEvent(); }}>
//         <input
//           type="text"
//           placeholder="Event Name"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Event Description"
//           value={eventDescription}
//           onChange={(e) => setEventDescription(e.target.value)}
//           required
//         />
//         <input
//           type="datetime-local"
//           value={eventDate}
//           onChange={(e) => setEventDate(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Event Location"
//           value={eventLocation}
//           onChange={(e) => setEventLocation(e.target.value)}
//           required
//         />
//         <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
//       </form>

//       {/* Existing Events */}
//       <h3>Existing Events</h3>
//       {filteredEvents.length > 0 ? (
//         <ul>
//           {filteredEvents.map(event => (
//             <li key={event.id}>
//               <h4>{event.name}</h4>
//               <p>{event.description}</p>
//               <p>{event.date} - {event.location}</p>
//               <button onClick={() => handleEditEvent(event)}>Edit</button>
//               <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No events found matching your search criteria.</p>
//       )}
//     </div>
//   );
// }

// export default FacultyEvents;






import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function FacultyEvents() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const handleAddEvent = () => {
    axios.post(`${BACKEND_URL}/events`, {
      name: eventName,
      description: eventDescription,
      date: eventDate,
      location: eventLocation
    })
    .then((response) => {
      setEvents([...events, response.data]);
      resetForm();
    })
    .catch((error) => {
      console.error("There was an error adding the event!", error);
    });
  };

  const handleUpdateEvent = () => {
    axios.put(`${BACKEND_URL}/events/${editingEventId}`, {
      name: eventName,
      description: eventDescription,
      date: eventDate,
      location: eventLocation
    })
    .then((response) => {
      setEvents(events.map(event => event.id === editingEventId ? response.data : event));
      resetForm();
      setIsEditing(false);
    })
    .catch((error) => {
      console.error("There was an error updating the event!", error);
    });
  };

  const handleDeleteEvent = (id) => {
    axios.delete(`${BACKEND_URL}/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the event!", error);
      });
  };

  const handleEditEvent = (event) => {
    setEventName(event.name);
    setEventDescription(event.description);
    setEventDate(event.date);
    setEventLocation(event.location);
    setIsEditing(true);
    setEditingEventId(event.id);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setEventDate('');
    setEventLocation('');
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Faculty Events</h2>

      <div>
        <input
          type="text"
          placeholder="Search Events"
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: '10px', margin: '20px 0', width: '100%' }}
        />
      </div>

      <h3>{isEditing ? 'Update Event' : 'Add Event'}</h3>
      <form onSubmit={e => { e.preventDefault(); isEditing ? handleUpdateEvent() : handleAddEvent(); }}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
      </form>

      <h3>Existing Events</h3>
      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map(event => (
            <li key={event.id}>
              <h4>{event.name}</h4>
              <p>{event.description}</p>
              <p>{event.date} - {event.location}</p>
              <button onClick={() => handleEditEvent(event)}>Edit</button>
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found matching your search criteria.</p>
      )}
    </div>
  );
}

export default FacultyEvents;

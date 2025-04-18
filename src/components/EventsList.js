// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function EventsList() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]); // To store filtered events
//   const [userRole] = useState(localStorage.getItem('userRole') || ''); // Fetch user role from localStorage
//   const [searchQuery, setSearchQuery] = useState(''); // For search query

//   useEffect(() => {
//     axios.get("http://localhost:8001/api/events")
//       .then((response) => {
//         setEvents(response.data);
//         setFilteredEvents(response.data); // Initially show all events
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the events!", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Filter events based on search query
//     setFilteredEvents(events.filter(event => 
//       event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       event.description.toLowerCase().includes(searchQuery.toLowerCase())
//     ));
//   }, [searchQuery, events]); // Trigger filtering whenever searchQuery or events changes

//   const handleDelete = (id) => {
//     if (userRole === 'faculty') {
//       axios.delete(`http://localhost:8001/api/events/${id}`)
//         .then(() => {
//           setEvents(events.filter(event => event.id !== id));
//         })
//         .catch((error) => {
//           console.error("There was an error deleting the event!", error);
//         });
//     } else {
//       alert('Only faculty can delete events');
//     }
//   };

//   return (
//     <div>
//       {/* Search Bar */}
//       <div style={styles.searchContainer}>
//         <input 
//           type="text"
//           placeholder="Search events..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={styles.searchInput}
//         />
//       </div>

//       <h2>Upcoming Events</h2>
//       {filteredEvents.length === 0 ? (
//         <p>No events available</p>
//       ) : (
//         filteredEvents.map((event) => (
//           <div key={event.id} style={styles.eventCard}>
//             <h3>{event.name}</h3>
//             <p>{event.description}</p>
//             <p>{new Date(event.date).toLocaleString()} - {event.location}</p>
//             {/* Show delete option only for faculty */}
//             {userRole === 'faculty' && (
//               <button
//                 onClick={() => handleDelete(event.id)}
//                 style={styles.deleteButton}
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// // Basic styling for the events and search bar
// const styles = {
//   searchContainer: {
//     marginBottom: '20px',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   searchInput: {
//     width: '50%',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//   },
//   eventCard: {
//     padding: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     marginBottom: '10px',
//     backgroundColor: '#f9f9f9',
//   },
//   deleteButton: {
//     backgroundColor: '#ff4d4d',
//     color: '#fff',
//     padding: '8px 12px',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '5px',
//     marginTop: '10px',
//   },
// };

// export default EventsList;




import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://college-event-portal-backend.onrender.com/api/events";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userRole] = useState(localStorage.getItem("userRole") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(API_BASE_URL)
      .then((response) => {
        if (isMounted) {
          setEvents(response.data);
          setFilteredEvents(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        [event.name, event.description]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, events]);

  const handleDelete = async (id) => {
    if (userRole !== "faculty") {
      alert("Only faculty can delete events");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id && event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <h2>Upcoming Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p>No events available</p>
      ) : (
        filteredEvents.map((event) => (
          <div key={event.id || event._id} style={styles.eventCard}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>
              {new Date(event.date).toLocaleString()} - {event.location}
            </p>
            {userRole === "faculty" && (
              <button onClick={() => handleDelete(event.id || event._id)} style={styles.deleteButton}>
                Delete Event
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  searchContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    width: "50%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  eventCard: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default EventsList;
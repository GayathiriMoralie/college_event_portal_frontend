import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultyNavbar from './FacultyNavbar'; // Import FacultyNavbar
import './FacultyViewEvents.css';

const FacultyViewEvents = () => {
  const navigate = useNavigate();

  // State for events
  const [events, setEvents] = useState([
    { id: 1, title: 'Cultuals', date: '2025-02-15', venue: 'LCTPL', fees: '100' },
    { id: 2, title: 'Symposium', date: '2025-03-10', venue: 'CS DPT', fees: '150' },
    { id: 3, title: 'Hackathon', date: '2025-04-05', venue: 'Computer Lab', fees: '200' },
    { id: 4, title: 'Science Exhibition', date: '2025-05-10', venue: 'Science Block', fees: '100' },
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', venue: '', fees: '' });
  const [editingEventId, setEditingEventId] = useState(null);
  const [popup, setPopup] = useState({ visible: false, message: '', action: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventId = events.length + 1;
    const newEventObj = { id: eventId, ...newEvent };
    setEvents([...events, newEventObj]);
    setNewEvent({ title: '', date: '', venue: '', fees: '' });

    setPopup({
      visible: true,
      message: 'Event added successfully!',
      action: () => handleDelete(newEventObj.id),
    });
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setNewEvent(eventToEdit);
    setEditingEventId(id);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingEventId === null) return;

    const updatedEvents = events.map((event) =>
      event.id === editingEventId ? { ...event, ...newEvent } : event
    );

    setEvents(updatedEvents);
    setNewEvent({ title: '', date: '', venue: '', fees: '' });
    setEditingEventId(null);

    setPopup({ visible: true, message: 'Event updated successfully!', action: null });
  };

  const handleDelete = (id) => {
    const eventToDelete = events.find((event) => event.id === id);
    setEvents(events.filter((event) => event.id !== id));

    setPopup({
      visible: true,
      message: 'Event deleted successfully!',
      action: () => {
        setEvents([...events, eventToDelete]);
        setPopup({ ...popup, visible: false });
      },
    });
  };

  const closePopup = () => {
    setPopup({ ...popup, visible: false });
  };

  return (
    <div className="faculty-view-events-container">
      {/* Faculty Navbar */}
      <FacultyNavbar />

      {/* View Events Content */}
      <div className="view-events-container">
        <h2>View Events</h2> <br></br>

        {/* Add/Edit Event Section */}
        <div className="add-event-form-container">
          <h3>{editingEventId ? 'Edit Event' : 'Add New Event'}</h3>
          <form onSubmit={editingEventId ? handleSaveEvent : handleAddEvent}>
            <input type="text" name="title" value={newEvent.title} onChange={handleChange} placeholder="Event Name" required />
            <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />
            <input type="text" name="venue" value={newEvent.venue} onChange={handleChange} placeholder="Venue" required />
            <input type="number" name="fees" value={newEvent.fees} onChange={handleChange} placeholder="Event Fees" required />
            <button type="submit">{editingEventId ? 'Save Event' : 'Add Event'}</button>
          </form>
        </div>

        {/* Event Grid Section */}
        <div className="view-events-grid-container">
          <div className="view-events-grid">
            {events.map((event) => (
              <div className="view-events-card" key={event.id}>
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
                <p>Venue: {event.venue}</p>
                <p>Fees: ₹{event.fees}</p>
                <div className="event-actions">
                  <button className="view-events-button" onClick={() => handleEdit(event.id)}>Edit</button>
                  <button className="view-events-button" onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup Message */}
        {popup.visible && (
          <div className="popup-message">
            <p>{popup.message}</p>
            {popup.action && (
              <button className="undo-button" onClick={popup.action}>Undo</button>
            )}
            <button className="close-popup" onClick={closePopup}>&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyViewEvents;

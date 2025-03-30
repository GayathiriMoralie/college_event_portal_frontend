// src/services/eventService.js
import axios from 'axios';

// Set up the backend API URL
const API_URL = 'http://localhost:8001/api'; // Backend URL

// Fetch events from the backend
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`); // Make a GET request to fetch events
    return response.data; // Return the data (events) from the response
  } catch (error) {
    console.error('Error fetching events:', error); // Handle any errors
    return []; // Return an empty array in case of an error
  }
};

// Add a new event to the backend
export const addEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData); // Make a POST request to add the event
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error adding event:', error); // Handle any errors
  }
};

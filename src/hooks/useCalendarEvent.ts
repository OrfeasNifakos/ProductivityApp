import { useState, useEffect } from 'react';
import { CalendarEvent } from '../models/CalendarEvent';

// Hook to manage calendar events
const useCalendarEvents = () => {
  // State for the events
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventNotes, setEventNotes] = useState(''); // Add this line for notes state

  // State for the current event to be deleted
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  // State for delete modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for add event popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State for form inputs
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  // Load events from localStorage on mount
  useEffect(() => {
    const localData = localStorage.getItem('calendarEvents');
    if (localData) {
      setEvents(JSON.parse(localData));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Function to add a new event
  const addEvent = (title: string, start: string, end: string, notes: string) => {
    // Use the parameters directly, rather than the state variables
    console.log("Adding event with notes:", notes); // Now logs the passed notes
    const currentDate = new Date().toISOString().substring(0, 10); // Gets the current date as "YYYY-MM-DD"
    const newEvent: CalendarEvent = {
      title, // Use the title parameter
      start: `${currentDate}T${start}`, // Use the start parameter
      end: `${currentDate}T${end}`, // Use the end parameter
      notes, // Use the notes parameter
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
    // Clear form and close popup
    setIsPopupOpen(false);
    setEventTitle('');
    setEventStart('');
    setEventEnd('');
    setEventNotes(''); // Clear the notes as well
  };

  // Function to delete an event
  const deleteEvent = (eventId: string | number) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsDeleteModalOpen(false);
  };

  return {
    events,
    setEvents,
    eventToDelete,
    setEventToDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isPopupOpen,
    setIsPopupOpen,
    eventTitle,
    setEventTitle,
    eventStart,
    setEventStart,
    eventEnd,
    setEventEnd,
    addEvent,
    deleteEvent,
    eventNotes,
    setEventNotes,
  };
};

export default useCalendarEvents;

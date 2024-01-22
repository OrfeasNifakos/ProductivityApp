"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventPopup from './EventPopup';
import useCalendarEvents from '@/hooks/useCalendarEvent';
import DeleteModal from './DeleteModal';
import { CalendarEvent } from '@/models/CalendarEvent';
import EventDetailsPopup from './EventDetailsPopup';


interface ClickInfo {
  event: {
    id: string | number;
    title: string;
    start: Date;
    end: Date;
    // ... any other properties you use from the event object
  };
  // ... any other properties you use from clickInfo
}



const MyCalendar = () => {
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  // State to store the selected event for details
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);


  const [notes, setNotes] = useState('');

  const {
    events,
    setEvents,
    eventToDelete,
    setEventToDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    addEvent,
    deleteEvent,
    isPopupOpen,
    setIsPopupOpen,
    eventTitle,
    setEventTitle,
    eventStart,
    setEventStart,
    eventEnd,
    setEventEnd
  } = useCalendarEvents();

  const handleEventClick = (clickInfo: any) => {
    // Convert dates to strings if necessary
    const formattedStart = clickInfo.event.start ? clickInfo.event.start.toISOString() : '';
  const formattedEnd = clickInfo.event.end ? clickInfo.event.end.toISOString() : '';
  
    const eventDetails: CalendarEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: formattedStart, // Or format it as needed
      end: formattedEnd, // Or format it as needed
      notes: clickInfo.event.extendedProps.notes || '', // If you have notes in extendedProps
    };
  
    setSelectedEvent(eventDetails);
    setIsEventDetailsOpen(true);
  };

  // Define the event handlers within an options object
  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'timeGridDay',
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    slotDuration: '00:30:00',
    allDaySlot: false,
    events: events.map((event: CalendarEvent) => ({
      ...event,
      id: event.id.toString()
    })),
    eventClick: handleEventClick
  };

  

  // Function to close the event details modal
  const closeDetails = () => {
    setIsEventDetailsOpen(false);
    setSelectedEvent(null);
  };

  // Function to delete an event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      // Delete the event using your existing logic
      deleteEvent(selectedEvent.id);
      // Close the details modal
      closeDetails();
    }
  };

  const handleAddEvent = () => {
    addEvent(eventTitle, eventStart, eventEnd, notes);
  };


  return (
    <>
      <button onClick={() => setIsPopupOpen(true)}>Add Event</button>

      {isPopupOpen && (
        <EventPopup
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventStart={eventStart}
        setEventStart={setEventStart}
        eventEnd={eventEnd}
        setEventEnd={setEventEnd}
        addEvent={handleAddEvent} // Pass the new function here
        setIsPopupOpen={setIsPopupOpen}
        notes={notes}
        setNotes={setNotes}
      />
      )}

      <div className="w-full h-screen">
        <FullCalendar {...calendarOptions} />
      </div>

      {isEventDetailsOpen && selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          closeDetails={closeDetails}
          deleteEvent={handleDeleteEvent}
        />
      )}
    </>
  );
};

export default MyCalendar;
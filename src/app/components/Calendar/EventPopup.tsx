import React from 'react';

interface EventPopupProps {
  eventTitle: string;
  setEventTitle: (title: string) => void;
  eventStart: string;
  setEventStart: (start: string) => void;
  eventEnd: string;
  setEventEnd: (end: string) => void;
  addEvent: (title: string, start: string, end: string, notes: string) => void; // Updated this line
  setIsPopupOpen: (isOpen: boolean) => void;
  notes: string;
  setNotes: (notes: string) => void;
}



const EventPopup: React.FC<EventPopupProps> = ({
  eventTitle,
  setEventTitle,
  eventStart,
  setEventStart,
  eventEnd,
  setEventEnd,
  addEvent,
  setIsPopupOpen,
  notes,
  setNotes,
}) => {

  const handleSave = (e:any) => {
    e.preventDefault(); // Prevent default form action
    console.log("Save clicked");
    console.log("Notes before adding event:", notes); // Add this line
    addEvent(eventTitle, eventStart, eventEnd, notes);
  }
  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="modal-content relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500px h-500px bg-white shadow-lg rounded-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add Event</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="event-title">Event Title</label>
            <input
              id="event-title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="start-time">Start Time</label>
            <input
              id="start-time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="time"
              value={eventStart}
              onChange={(e) => setEventStart(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="end-time">End Time</label>
            <input
              id="end-time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="time"
              value={eventEnd}
              onChange={(e) => setEventEnd(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              placeholder="Notes"
              value={notes}
              onChange={(e) => {
                console.log("Notes updated:", e.target.value); // Check if this logs correctly
                setNotes(e.target.value);
              }}
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSave}
            >
              Save Event
            </button>
            <button
              className="bg-transparent hover:bg-grey text-grey-dark font-semibold py-2 px-4 border border-grey rounded"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;

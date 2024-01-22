import { CalendarEvent } from "@/models/CalendarEvent";

interface EventDetailsPopupProps {
    event: CalendarEvent;
    closeDetails: () => void;
    deleteEvent: () => void;
  }
  
  const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({
    event,
    closeDetails,
    deleteEvent,
  }) => {
    return (
      <div className="modal-backdrop-event fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="event-details-modal">
        <div className="modal-content-event relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500px h-auto bg-white shadow-lg rounded-md p-4">
          <h3 className="text-lg font-bold mb-4">Event Details</h3>
          <p><strong>Title:</strong> {event.title}</p>
          <p><strong>Start Time:</strong> {event.start}</p>
          <p><strong>End Time:</strong> {event.end}</p>
          <p><strong>Notes:</strong> {event.notes}</p>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={deleteEvent}
            >
              Delete Event
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              onClick={closeDetails}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EventDetailsPopup;
  
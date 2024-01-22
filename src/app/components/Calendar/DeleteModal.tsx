import React from 'react';

interface DeleteModalProps {
  deleteEvent: () => void; // Function to call when confirming deletion
  setIsDeleteModalOpen: (isOpen: boolean) => void; // Function to close the modal
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteEvent,
  setIsDeleteModalOpen
}) => {
  return (
    <div className="delete-modal">
      <div className="overlay" onClick={() => setIsDeleteModalOpen(false)}></div>
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this event?</p>
        <div className="modal-actions">
          <button onClick={deleteEvent}>Delete</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

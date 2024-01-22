import { useState, useCallback } from 'react';

// Hook to manage the open/close state of a modal
const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  // Function to open the modal
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Function to close the modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Toggle the modal state
  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;

import React, { useEffect, useRef } from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current.querySelectorAll('button, [href], input');
      if (focusableElements.length) focusableElements[0].focus();
      
      const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <h2 className="heading-m">Confirm Deletion</h2>
        <p className="body">
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
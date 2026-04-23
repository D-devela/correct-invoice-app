import React from 'react';

const StatusBadge = ({ status }) => {
  const statusClass = {
    paid: 'status-paid',
    pending: 'status-pending',
    draft: 'status-draft'
  }[status] || 'status-draft';

  return (
    <div className={`status-badge ${statusClass}`}>
      <span className="status-dot"></span>
      <span>{status}</span>
    </div>
  );
};

export default StatusBadge;
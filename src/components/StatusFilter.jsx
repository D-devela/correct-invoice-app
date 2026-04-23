import React, { useState, useRef, useEffect } from 'react';

const StatusFilter = ({ activeFilters, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filters = ['all', 'draft', 'pending', 'paid'];

  const toggleFilter = (filter) => {
    if (filter === 'all') {
      onChange(['all']);
    } else {
      const newFilters = activeFilters.includes(filter)
        ? activeFilters.filter(f => f !== filter)
        : [...activeFilters.filter(f => f !== 'all'), filter];
      onChange(newFilters.length === 0 ? ['all'] : newFilters);
    }
  };

  return (
    <div className="filter-container" ref={dropdownRef}>
      <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="body">Filter by status</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="filter-dropdown">
          {filters.map(filter => (
            <label key={filter} className="filter-option">
              <input 
                type="checkbox"
                checked={activeFilters.includes(filter)}
                onChange={() => toggleFilter(filter)}
              />
              <span className="body">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
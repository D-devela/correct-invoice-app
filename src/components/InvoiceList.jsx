import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import StatusFilter from './StatusFilter';
import ThemeToggle from './ThemeToggle';

const InvoiceList = ({ invoices, onDelete, onMarkAsPaid }) => {
  const [filter, setFilter] = useState(['all']);
  
  const filteredInvoices = invoices.filter(invoice => {
    if (filter.includes('all')) return true;
    return filter.includes(invoice.status);
  });

  return (
    <>
      <div className="invoice-header">
        <div className="header-left">
          <h1 className="heading-l">Invoices</h1>
          <p className="body">
            <span className="desktop-text">
              {filteredInvoices.length === 0 ? 'No invoices' : `There are ${filteredInvoices.length} total invoices`}
            </span>
            <span className="mobile-text" style={{ display: 'none' }}>
              {filteredInvoices.length} invoices
            </span>
          </p>
        </div>
        <div className="header-right">
          <StatusFilter activeFilters={filter} onChange={setFilter} />
          <ThemeToggle />
          <Link to="/invoice/new" className="btn-primary">
            <span>+</span>
            <span>New Invoice</span>
          </Link>
        </div>
      </div>

      <div className="invoices-list">
        {filteredInvoices.length === 0 ? (
          <div className="empty-state">
            <img src="/assets/illustration-empty.svg" alt="No invoices" />
            <h2 className="heading-m">There is nothing here</h2>
            <p className="body">
              Create an invoice by clicking the <strong>New Invoice</strong> button and get started
            </p>
          </div>
        ) : (
          filteredInvoices.map(invoice => (
            <Link to={`/invoice/${invoice.id}`} key={invoice.id} className="invoice-card">
              <div className="invoice-id heading-s">{invoice.id}</div>
              <div className="invoice-due body-variant">Due {invoice.dueDate}</div>
              <div className="invoice-client body">{invoice.clientName}</div>
              <div className="invoice-amount heading-s">£ {invoice.total.toFixed(2)}</div>
              <StatusBadge status={invoice.status} />
              <div className="invoice-arrow">→</div>
            </Link>
          ))
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-text { display: none; }
          .mobile-text { display: inline !important; }
        }
        @media (min-width: 768px) {
          .desktop-text { display: inline; }
          .mobile-text { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default InvoiceList;
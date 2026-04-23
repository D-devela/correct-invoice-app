import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';

const STORAGE_KEY = 'invoices';

function App() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    
    // Sample data matching screenshots
    return [
      { id: 'RT3080', clientName: 'Jensen Huang', dueDate: '19 Aug 2021', total: 1800.90, status: 'paid', clientEmail: 'jensen@example.com', items: [] },
      { id: 'XM9141', clientName: 'Alex Grim', dueDate: '20 Sep 2021', total: 556.00, status: 'pending', clientEmail: 'alex@example.com', items: [] },
      { id: 'RG0314', clientName: 'John Morrison', dueDate: '01 Oct 2021', total: 14002.33, status: 'pending', clientEmail: 'john@example.com', items: [] },
      { id: 'RT2080', clientName: 'Alysa Werner', dueDate: '12 Oct 2021', total: 102.04, status: 'pending', clientEmail: 'alysa@example.com', items: [] },
      { id: 'AA1449', clientName: 'Melissa Clarke', dueDate: '14 Oct 2021', total: 4032.33, status: 'pending', clientEmail: 'melissa@example.com', items: [] },
      { id: 'TY9141', clientName: 'Thomas Wayne', dueDate: '31 Oct 2021', total: 6155.91, status: 'pending', clientEmail: 'thomas@example.com', items: [] },
      { id: 'FV2353', clientName: 'Anita Weimwright', dueDate: '12 Nov 2021', total: 3102.04, status: 'draft', clientEmail: 'anita@example.com', items: [] }
    ];
  });

  const saveInvoices = (newInvoices) => {
    setInvoices(newInvoices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newInvoices));
  };

  const createInvoice = (invoice) => {
    const newInvoice = { 
      ...invoice, 
      id: `RT${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString()
    };
    saveInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (updatedInvoice) => {
    saveInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  };

  const deleteInvoice = (id) => {
    saveInvoices(invoices.filter(inv => inv.id !== id));
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={
              <InvoiceList 
                invoices={invoices} 
                onDelete={deleteInvoice}
                onMarkAsPaid={(id) => updateInvoice({ ...invoices.find(i => i.id === id), status: 'paid' })}
              />
            } />
            <Route path="/invoice/:id" element={
              <InvoiceDetail 
                invoices={invoices}
                onUpdate={updateInvoice}
                onDelete={deleteInvoice}
              />
            } />
            <Route path="/invoice/new" element={
              <InvoiceForm onSubmit={createInvoice} />
            } />
            <Route path="/invoice/edit/:id" element={
              <InvoiceForm 
                onSubmit={updateInvoice} 
                initialData={invoices.find(i => i.id === window.location.pathname.split('/')[3])}
              />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
export const useInvoiceValidation = () => {
  const validateInvoice = (invoice) => {
    const errors = {};
    
    if (!invoice.clientName?.trim()) {
      errors.clientName = 'Client name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(invoice.clientEmail)) {
      errors.clientEmail = 'Valid email is required';
    }
    
    if (!invoice.dueDate) {
      errors.dueDate = 'Due date is required';
    }
    
    if (!invoice.items?.length) {
      errors.items = 'At least one item is required';
    } else {
      invoice.items.forEach((item, idx) => {
        if (!item.name?.trim()) {
          errors[`items.${idx}.name`] = 'Item name required';
        }
        if (item.quantity <= 0) {
          errors[`items.${idx}.quantity`] = 'Quantity must be positive';
        }
        if (item.price <= 0) {
          errors[`items.${idx}.price`] = 'Price must be positive';
        }
      });
    }
    
    return errors;
  };
  
  return { validateInvoice };
};
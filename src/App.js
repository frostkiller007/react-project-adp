import React, { useState } from 'react';
import customersData from './data.js';
import './App.css';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

const log = (message) => console.log(message);

const App = () => {
  const [customers, setCustomers] = useState(customersData);
  const [formObject, setFormObject] = useState({ id: -1, name: '', email: '', password: '' });
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleListClick = (item) => {
    log("in handleListClick()");
    if (selectedCustomerId === item.id) {
      setFormObject({ id: -1, name: '', email: '', password: '' });
      setSelectedCustomerId(null);
    } else {
      setFormObject(item);
      setSelectedCustomerId(item.id);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    log("in handleInputChange()");
  };

  const handleCancelClick = () => {
    log("in handleCancelClick()");
    setFormObject({ id: -1, name: '', email: '', password: '' });
    setSelectedCustomerId(null);
  };

  const handleDeleteClick = () => {
    log("in handleDeleteClick()");
    setCustomers(customers.filter(customer => customer.id !== selectedCustomerId));
    setFormObject({ id: -1, name: '', email: '', password: '' });
    setSelectedCustomerId(null);
  };

  const handleSaveClick = () => {
    log("in handleSaveClick()");
    if (formObject.id === -1) {
      // Add new customer
      const newCustomer = { ...formObject, id: customers.length + 1 };
      setCustomers([...customers, newCustomer]);
    } else {
      // Update existing customer
      setCustomers(customers.map(customer => (customer.id === formObject.id ? formObject : customer)));
    }
    setFormObject({ id: -1, name: '', email: '', password: '' });
    setSelectedCustomerId(null);
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        handleListClick={handleListClick}
      />
      <CustomerAddUpdateForm
        formObject={formObject}
        handleInputChange={handleInputChange}
        handleDeleteClick={handleDeleteClick}
        handleSaveClick={handleSaveClick}
        handleCancelClick={handleCancelClick}
      />
    </div>
  );
};

export default App;

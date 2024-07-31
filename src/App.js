import React, { useState } from 'react';
import customersData from './data.js';
import './App.css';

const log = (message) => console.log(message);

const App = () => {
  const [customers, setCustomers] = useState(customersData);
  const [formObject, setFormObject] = useState({ id: -1, name: '', email: '', password: '' });
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const mode = formObject.id >= 0 ? 'Update' : 'Add';

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
      <div className="boxed">
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleListClick(item)}
                style={selectedCustomerId === item.id ? { fontWeight: 'bold', backgroundColor: '#d1ecf1' } : {}}
              >
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form>
          <table id="customer-add-update">
            <tbody>
              <tr>
                <td className="label">Name:</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formObject.name}
                    onChange={handleInputChange}
                    placeholder="Customer Name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formObject.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Password:</td>
                <td>
                  <input
                    type="text"
                    name="password"
                    value={formObject.password}
                    onChange={handleInputChange}
                    placeholder="password"
                  />
                </td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Delete" onClick={handleDeleteClick} disabled={formObject.id === -1} />
                  <input type="button" value="Save" onClick={handleSaveClick} />
                  <input type="button" value="Cancel" onClick={handleCancelClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default App;

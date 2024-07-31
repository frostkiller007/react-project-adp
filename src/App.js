import React, { useState } from 'react';
import customers from './data.js';
import './App.css';

const log = (message) => console.log(message);

const App = () => {
  const [formObject, setFormObject] = useState(customers[0]);
  const mode = formObject.id >= 0 ? 'Update' : 'Add';

  const handleListClick = (item) => {
    log("in handleListClick()");
    setFormObject(item);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    log("in handleInputChange()");
  };

  const handleCancelClick = () => {
    log("in handleCancelClick()");
  };

  const handleDeleteClick = () => {
    log("in handleDeleteClick()");
  };

  const handleSaveClick = () => {
    log("in handleSaveClick()");
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
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr key={item.id} onClick={() => handleListClick(item)}>
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
                <td className="label">Pass:</td>
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
                  <input type="button" value="Delete" onClick={handleDeleteClick} />
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

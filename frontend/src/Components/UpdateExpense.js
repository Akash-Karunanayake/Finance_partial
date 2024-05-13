import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import './FinanceCSS/DisplayDatabase.css';

function UpdateExpense({ expenseId,onUpdate, onClose }) {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/expenses/get/${expenseId}`);
        setInputs(response.data.expense);
      } catch (error) {
        console.error('Error fetching expense:', error);
      }
    };
    fetchHandler();
  }, [expenseId]);

  const [formData, setFormData] = useState({
    expense_id: '',
    date: '',
    category: '',
    amount: '',
    payment_method: '',
    description: '',
    receipt_no: '',
    name: '',
    location: '',
  });

  useEffect(() => {
    // Populate formData with inputs
    setFormData(inputs);
  }, [inputs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
  
    try {
      await axios.put(`http://localhost:8080/expenses/update/${expenseId}`, formData);
      onUpdate(formData);
        onClose();
        history.push(``);
        

    } catch (error) {
      console.error('Error updating expense:', error);
      
    }
  };
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Update The Expense</h2>
        <form >
          <div className="form-group">
            <label htmlFor="expenseId">Expense ID:</label>
            <input
              type="text"
              name="expenseId"
              value={formData.expense_id}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Documents">Documents</option>
            <option value="Sales Goods">Sales Goods</option>
            <option value="Salaries">Salaries</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="payment_method">Payment Method:</label>
            <input
              type="text"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="receipt_no">Receipt No:</label>
            <input
              type="text"
              name="receipt_no"
              value={formData.receipt_no}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Admin Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="button-group-update">
            <button type="button" className="submit-button-update" onClick={handleSubmit}>Submit</button>
            <button type="button" className="cancel-button-update" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateExpense;

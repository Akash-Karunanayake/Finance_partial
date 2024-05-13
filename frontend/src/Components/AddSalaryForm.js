import React, { useState, useEffect } from 'react';
import './FinanceCSS/AddExpenseForm.css'; 

function AddSalaryForm({ onCancel, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    base_salary: '',
    ot_payment: '',
    bonus: '',
    deduction: '',
    net_salary: '',
    pay_period: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
//validation process
    const validationErrors = {};

  if (!formData.name.trim()) {
    validationErrors.name = 'Employee name is required';
  }else if (/\d/.test(formData.name)) {
    validationErrors.name = 'Name cannot contain numbers';
  }


  if (!formData.position) {
    validationErrors.position = 'Position is required';
  }

  if (!formData.base_salary.trim()) {
    validationErrors.base_salary = 'Base salary is required';
  } else if (isNaN(formData.base_salary)) {
    validationErrors.base_salary = 'Base salary must be a number';
  }

  if (!formData.ot_payment.trim()) {
    validationErrors.ot_payment = 'Over-Time Pay is required';
  } else if (isNaN(formData.ot_payment)) {
    validationErrors.ot_payment = 'Over-Time Pay must be a number';
  }

  if (!formData.bonus.trim()) {
    validationErrors.bonus = 'Bonuses are required';
  } else if (isNaN(formData.bonus)) {
    validationErrors.bonus = 'Bonuses must be a number';
  }

  if (!formData.deduction.trim()) {
    validationErrors.deduction = 'Deductions are required';
  } else if (isNaN(formData.deduction)) {
    validationErrors.deduction = 'Deductions must be a number';
  }

  if (!formData.pay_period) {
    validationErrors.pay_period = 'Pay Period is required';
  }

  // Check if there are validation errors
  if (Object.keys(validationErrors).length > 0) {
    // Update state to display validation errors
    setValidationErrors(validationErrors);
    return;
  }



    setIsLoading(true);
    setShowPopup(true);

    setTimeout(() => {
      onAdd(formData);
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
  };

 useEffect(() => {
  if (isSuccess) {
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false); // Hide the popup after 3 seconds
      setIsSuccess(false); // Reset success state
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }
}, [isSuccess]);

  return (
    <div className="form-container">
      <h2>Add New Salary Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Employee Name:</label>
          <input
            type="text"
            name="name"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {validationErrors.name && <span className="error">{validationErrors.name}</span>}
        </div>
        <div className="form-row">
          <label>Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          >
            {validationErrors.position && <span className="error">{validationErrors.position}</span>}
            <option value="">Select Position</option>
            <option value="Manager">Manager</option>
            <option value="Technician">Technician</option>
            <option value="Accountant">Accountant</option>
            <option value="Cleaner">Cleaner</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="form-row">
          <label>Base Salary:</label>
          <input
            type="text"
            name="base_salary"
            value={formData.base_salary}
            onChange={handleChange}
            required
          />
          {validationErrors.base_salary && <span className="error">{validationErrors.base_salary}</span>}
        </div>
        <div className="form-row">
          <label>Over-Time Pay:</label>
          <input
            type="text"
            name="ot_payment"
            value={formData.ot_payment}
            onChange={handleChange}
            required
          />
          {validationErrors.ot_payment && <span className="error">{validationErrors.ot_payment}</span>}
        </div>
        <div className="form-row">
          <label>Bonuses:</label>
          <input
          type="text"
            name="bonus"
            value={formData.bonus}
            onChange={handleChange}
            required
          />
          {validationErrors.bonus && <span className="error">{validationErrors.bonus}</span>}
        </div>
        <div className="form-row">
          <label>Deductions:</label>
          <input
            type="text"
            name="deduction"
            value={formData.deduction}
            onChange={handleChange}
            required
          />
          {validationErrors.deduction && <span className="error">{validationErrors.deduction}</span>}
        </div>
       
        <div className="form-row">
          <label>Pay Period:</label>
          <select
            name="pay_period"
            value={formData.pay_period}
            onChange={handleChange}
            required
          >
            {validationErrors.pay_period && <span className="error">{validationErrors.pay_period}</span>}
            <option value="">Select Pay-Period</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="form-row">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>

        {/* Popup Screen */}
      {showPopup && (
        <div className="popup-screen">
          <div className="popup-content">
            {isLoading ? (
              <>
                <div className="loading-circle"></div>
                <p>Record is adding...</p>
              </>
            ) : (
              <>
                <p>Record added successfully.</p>
                
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default AddSalaryForm;

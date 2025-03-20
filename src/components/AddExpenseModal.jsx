import React from "react";
import "./AddExpenseModal.css"; // Import the CSS file

const AddExpenseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Expense</h2>
        <form className="expense-form">
          <input type="date" className="input-field" />

          <select className="input-field">
            <option value="">Salary</option>
            <option value="">Events</option>
            <option value="">Reimbursement</option>
          </select>

          <select className="input-field">
            <option value="">Tech</option>
            <option value="">Sales & Marketing</option>
            <option value="">Services</option>
          </select>

          <select className="input-field">
            <option value="">Utility</option>
            <option value="">AR School</option>
            <option value="">Happy Moves</option>
          </select>

          <input type="number" placeholder="Amount" className="input-field" />
          <input type="text" placeholder="Remarks" className="input-field" />

          <div className="button-container">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-button">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;

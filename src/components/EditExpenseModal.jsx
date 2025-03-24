import React from 'react'
import './EditExpenseModal.css'

const EditExpenseModal = () => {
  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <h2>Edit Expense</h2>
      <form className="expense-form">
        <input onChange={(e)=>setExpenseDetails({...expenseDetails,date:e.target.value})} type="date" className="input-field" />

        <select onChange={(e)=>setExpenseDetails({...expenseDetails,category:e.target.value})} className="input-field">
          <option default selected disabled>Select Category</option>
          <option value="Salary">Salary</option>
          <option value="Events">Events</option>
          <option value="Reimbursement">Reimbursement</option>
        </select>

        <select onChange={(e)=>setExpenseDetails({...expenseDetails,type:e.target.value})} className="input-field">
        <option default selected disabled>Select Type</option>
          <option value="Tech">Tech</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="Services">Services</option>
        </select>

        <select onChange={(e)=>setExpenseDetails({...expenseDetails,service:e.target.value})} className="input-field">
        <option default selected disabled>Select Service</option>
          <option value="Utility">Utility</option>
          <option value="AR School">AR School</option>
          <option value="Happy Moves">Happy Moves</option>
        </select>

        <input onChange={(e)=>setExpenseDetails({...expenseDetails,amount:e.target.value})} type="number" placeholder="Amount" className="input-field" />
        <input onChange={(e)=>setExpenseDetails({...expenseDetails,remarks:e.target.value})} type="text" placeholder="Remarks" className="input-field" />

        <div className="button-container">
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button className="add-button" onClick={addExpense}>
            Add Expense
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditExpenseModal
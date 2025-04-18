import React, { useState } from 'react'
import './addExpense.css'
import revenueImg from '../assets/revenue.png'
import addexp from '../assets/addexp.png'
import AddExpenseModal from './AddExpenseModal';
import AddRevenueModal from './AddRevenueModal';

const AddExpense = ({onExpenseAdded,expenseCategories,departmentOptions, serviceOptions, sourceOptions}) => {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);

  return (
    <>
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className='addExp'>
      <button className='add' onClick={() => setExpenseModalOpen(true)} style={{width:'180px',height:'20px'}}> <img style={{width:'20px',marginRight:'5px'}} src={addexp} alt="" /> Add New Expense</button>
      <button className='add' onClick={() => setRevenueModalOpen(true)} style={{width:'180px',height:'20px'}}> <img style={{width:'20px',marginRight:'5px'}} src={revenueImg} alt="" /> Add New Revenue</button>
      </div>
      <AddExpenseModal onExpenseAdded={onExpenseAdded} isOpen={expenseModalOpen} expenseCategories={expenseCategories} departmentOptions={departmentOptions} serviceOptions={serviceOptions} sourceOptions={sourceOptions} onClose={() => setExpenseModalOpen(false)} />
      <AddRevenueModal onExpenseAdded={onExpenseAdded} isOpen={revenueModalOpen} serviceOptions={serviceOptions} onClose={() => setRevenueModalOpen(false)}/>
    </div>
    </>
  )
}

export default AddExpense
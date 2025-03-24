import React, { useState } from 'react'
import './addExpense.css'
import revenueImg from '../assets/revenue.png'
import addexp from '../assets/addexp.png'
import AddExpenseModal from './AddExpenseModal';
import AddRevenueModal from './AddRevenueModal';

const AddExpense = ({onExpenseAdded}) => {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);

  return (
    <>
    <div className='addExp'>
    <button className='add' onClick={() => setExpenseModalOpen(true)}> <img style={{width:'20px',marginRight:'5px'}} src={addexp} alt="" /> Add New Expense</button>
    <button className='add' onClick={() => setRevenueModalOpen(true)}> <img style={{width:'20px',marginRight:'5px'}} src={revenueImg} alt="" /> Add New Revenue</button>

    </div>
    <AddExpenseModal onExpenseAdded={onExpenseAdded} isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
    <AddRevenueModal onExpenseAdded={onExpenseAdded} isOpen={revenueModalOpen} onClose={() => setRevenueModalOpen(false)}/>
    </>
  )
}

export default AddExpense
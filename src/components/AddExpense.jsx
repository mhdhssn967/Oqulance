import React, { useState } from 'react'
import './addExpense.css'
import AddExpenseModal from './AddExpenseModal';

const AddExpense = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className='addExp'>
    <h2>Expense Overview Table</h2>
    <button className='add' onClick={() => setModalOpen(true)}>Add New Expense</button>
    </div>
    <AddExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default AddExpense
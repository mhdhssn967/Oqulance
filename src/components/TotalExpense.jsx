import React from 'react'
import './totalExpense.css'

const TotalExpense = ({total}) => {
  return (
    <>
    <div className='totalContainer'>
        <h1>Total Expense</h1>
        <button className='timeFrame'>Select Time Frame</button>
        <h1>₹{total}</h1>
    </div>
    </>
  )
}

export default TotalExpense
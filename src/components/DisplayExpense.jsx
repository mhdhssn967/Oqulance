import React from 'react'
import './displayExpense.css'

const DisplayExpense = () => {
  return (
    <>
    <div className='displayMain'>
      <div className='exp'>
        <h1>Tech</h1>
        <h2>$60</h2>
      </div>
      <div className='exp'>
        <h1>Sales</h1>
        <h2>$200</h2>
      </div>
      <div className='exp'>
        <h1>Marketing</h1>
        <h2>$850</h2>
      </div>
      <div className='exp'>
        <h1>Salary</h1>
        <h2>$33560</h2>
      </div>
      <div className='exp'>
        <h1>Utilities</h1>
        <h2>$230</h2>
      </div>
      <div className='exp'>
        <h1>Reimbursement</h1>
        <h2>$560</h2>
      </div>
      </div></>
  )
}

export default DisplayExpense
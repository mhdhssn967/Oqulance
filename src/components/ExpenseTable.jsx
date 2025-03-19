import React from 'react'
import './expenseTable.css'
import TotalExpense from './TotalExpense'
import AddExpense from './AddExpense'

const ExpenseTable = () => {
  return (
    <>
    <AddExpense/>
    <div className='tableDiv'>   
      <table>
        <thead>
          <th>#</th>
          <th>Date</th>
          <th>Category</th>
          <th>Type</th>
          <th>Service</th>
          <th>Amount</th>
          <th>Remarks</th>
        </thead>
        <tbody>
          {/* <td>1</td>
          <td><input type="date" /></td>
          <td><select name="" id="">
            <option value="">Salary</option>
            <option value="">Events</option>
            <option value="">Reimbursement</option>
            </select></td>
            <td><select name="" id="">
            <option value="">Tech</option>
            <option value="">Sales & marketing</option>
            <option value="">Services</option>
            </select></td>
            <td><select name="" id="">
            <option value="">Utility</option>
            <option value="">AR School</option>
            <option value="">Happy Moves</option>
            </select></td>
            <td>
              <input type="text" name="" id="" />
            </td> */}
           <tr>
              <td>1</td>
              <td>04/12/2024</td>
              <td>Salary</td>
              <td>Sales & Marketing</td>
              <td>Happy Moves</td>
              <td>$2400</td>
              <td>Awaiting Call</td>
           </tr><tr>
              <td>1</td>
              <td>04/12/2024</td>
              <td>Salary</td>
              <td>Sales & Marketing</td>
              <td>Happy Moves</td>
              <td>$2400</td>
              <td>Awaiting Call</td>
           </tr><tr>
              <td>1</td>
              <td>04/12/2024</td>
              <td>Salary</td>
              <td>Sales & Marketing</td>
              <td>Happy Moves</td>
              <td>$2400</td>
              <td>Awaiting Call</td>
           </tr><tr>
              <td>1</td>
              <td>04/12/2024</td>
              <td>Salary</td>
              <td>Sales & Marketing</td>
              <td>Happy Moves</td>
              <td>$2400</td>
              <td>Awaiting Call</td>
           </tr>
        </tbody>
       
      </table>
      <TotalExpense/>
    </div>
    </>
  )
}

export default ExpenseTable
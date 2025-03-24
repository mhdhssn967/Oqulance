import React from 'react'
import './insights.css'
import ExpenseChart from "../components/ExpenseChart";
import useFetchExpenses from '../services/useFetchExpenses';


const Insights = () => {
  const expenses=useFetchExpenses()
  console.log("in insights",expenses);
  
  return (
    <div>
      <div>
      <h1>Expense Insights</h1>
      <p>Here, you will see graphical representations of your expenses.</p>
      {/* Expense Growth Chart */}
      <ExpenseChart />
    </div>
    </div>
  )
}

export default Insights
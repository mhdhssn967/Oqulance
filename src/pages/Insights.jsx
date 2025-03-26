import React from 'react'
import './insights.css'
import ExpenseChart from "../components/ExpenseChart";
import Navbar from '../components/Navbar';

const Insights = () => {  
  return (
    <>
      <div><Navbar/></div>
      <div>
      <h1 style={{fontSize:'60px', fontWeight:'100', textAlign:'center'}}>Financial Insights</h1>
      {/* Expense Growth Chart */}
      <ExpenseChart />
    </div>
    </>
  )
}

export default Insights
import React, { useEffect, useState } from 'react'
import './expenseInsights.css'
import { average } from 'firebase/firestore'

const ExpenseInsights = ({setInsightOpen,expenses}) => {

    const today = new Date().toISOString().split('T')[0];
    const [startDate,setStartDate]=useState("2025-01-01")
    const [endDate,setEndDate]=useState(today)
    console.log(endDate);
    
    const [timeFilteredExpenses,settimeFilteredExpenses]=useState([expenses])
    const [filteredValues,setFilteredValues]=useState({total:0,avg:0})

    useEffect(()=>{
        timeFrameFilterExpenses()
    },[])


    const timeFrameFilterExpenses=()=>{
        if(endDate>=startDate){
        const timeFrameExpenses = expenses.filter(expense=>{
            const expenseDate=new Date(expense.date);
            return expenseDate >=new Date(startDate)  && expenseDate <= new Date(endDate)
        })
        settimeFilteredExpenses(timeFrameExpenses)
        const totalAmount=timeFrameExpenses.reduce((sum,expense)=>sum+Number(expense.amount||0),0)
        const avgAmount = timeFrameExpenses.length > 0 ? totalAmount / timeFrameExpenses.length : 0;
        setFilteredValues({...filteredValues,total:totalAmount, avg: avgAmount })
       }
        else{
            alert("End date should be greater than start date")
        }
    }
    
  return (
    <>
    <div className='insightsContainer'>
        <h1>Expense Insights</h1>
        <div className='insightDate'>
            <h3>From <input value={startDate} onChange={(e)=>setStartDate(e.target.value)} type="date" /></h3>
            <h3>To <input value={endDate} onChange={(e)=>setEndDate(e.target.value)}type="date" /></h3>
            <button className='setBtn' onClick={timeFrameFilterExpenses}>Set</button>
        </div>
        
        <div className='insights'>
            <p>Total Expense<span>: ${filteredValues.total}</span></p>
            <p>Average monthly expense <span>: ${filteredValues.avg}</span></p>
            <div className='insightDivButtons'><button className='insightClose' onClick={()=>setInsightOpen(0)}>Close</button><button className='insightDownload'>Download Report</button></div>
        </div>
        
    </div>
    </>
  )
}

export default ExpenseInsights
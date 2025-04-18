import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Pie, PieChart } from "recharts";
import useFetchExpenses from "../services/useFetchExpenses";
import useFetchRevenue from "../services/useFetchRevenue";
import { processDataByCategory, processDataByService, processDataByType } from "../utils/processFinanceData";



const ExpenseChart = () => {

  const today = new Date().toISOString().split('T')[0];
      const [startDate,setStartDate]=useState("2025-01-01")
      const [endDate,setEndDate]=useState(today)
      const [view,setView]=useState("all")
      console.log(view);
      
  const expenseDetails = useFetchExpenses(startDate,endDate); //Fetch Expense Details

  const revenueDetails = useFetchRevenue(startDate,endDate); //Fetch Revenue Details

  const expenseByService = processDataByService(expenseDetails)
  const expenseByType = processDataByType(expenseDetails)
  const expenseByCategory = processDataByCategory(expenseDetails)
  const revenueByService = processDataByService(revenueDetails)
  const revenueByType = processDataByType(revenueDetails)

  
 const resetDate=()=>{
    setStartDate("2025-01-01")
    setEndDate(today)
 }


  return (
    <>
  
      <div style={{display:'flex',flexDirection:'column',margin:'5% 0% 1% 5%'}}>
        <div className="dateSelect" style={{display:'flex',alignItems:'center'}}>
          From<input value={startDate} onChange={(e)=>setStartDate(e.target.value)} type="date" style={{color:'black',margin:'1%',borderRadius:'10px',border:'none',padding:'5px'}} /> 
            To<input value={endDate} onChange={(e)=>setEndDate(e.target.value)}type="date" style={{color:'black',margin:'1%',borderRadius:'10px',border:'none',padding:'5px'}} />
          <button onClick={resetDate} style={{backgroundColor:'black',borderRadius:'10px',color:'white', padding:'5px',border:'solid 0.5px white',cursor:'pointer',marginLeft:'0%'}}>Reset</button>
        </div>
        <div>View <select style={{margin:'1%'}} onChange={(e)=>setView(e.target.value)} name="" id="">
          <option value="all">All</option>
          <option value="expenses">Expenses</option>
            <option value="revenue">Revenue</option>
          </select></div>
      </div>
{ (view=='all' || view=='expenses' || view=='revenue')&&(
  <div>
      <div>
        {/* ---------------------------------------------------------------Expense--------------------------------------------------------------- */}
        {/* Expense Chart */}
        {(view=="expenses"||view=="all")&&
        (
        <div>
          <div style={{ width: "80%", height: 300, color: 'black', margin: '2% 0% 5% 5%' }}>
            <h2>Expense Growth Over Time</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseDetails}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <Tooltip contentStyle={{ backgroundColor: 'black' }} />
                <Line type="monotone" dataKey="amount" stroke="red" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          {/* Bar Charts  Expenses */}
          {/* Expense by service */}
          <div className="barCharts" style={{ width: "80%", height: 300, color: 'black', margin: '5%', display: 'flex' }}>
            <ResponsiveContainer width="100%" height="100%" style={{ marginRight: '7%' }}>
              <h2>Expenses by Service</h2>
              <BarChart data={expenseByService}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                <Bar dataKey="amount" fill="#8884d8" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
  
            {/* Expense by type */}
            <ResponsiveContainer width="100%" height="100%" style={{ marginRight: '7%' }}>
              <h2>Expenses by Type</h2>
              <BarChart data={expenseByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis domain={[0, 150000]} />
                <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                <Bar dataKey="amount" fill="#8884d8" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
  
            {/* Expense by category */}
            <ResponsiveContainer width="100%" height="100%" style={{ marginRight: '7%' }}>
              <h2>Expenses by Category</h2>
              <BarChart data={expenseByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 150000]} />
                <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                <Bar dataKey="amount" fill="#8884d8" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>)}

        {/* ---------------------------------------------------------------Revenue--------------------------------------------------------------- */}

        {/* Revenue chart */}
        {(view=='all' || view=='revenue')&&
        <div>
          <div style={{ width: "80%", height: 300, color: 'black', margin: '2% 0% 5% 5%' }}>
            <h2>Revenue Growth Over Time</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueDetails}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <Tooltip contentStyle={{ backgroundColor: 'black' }} />
                <Line type="monotone" dataKey="amount" stroke="green" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          {/* Bar charts */}
          {/* Reenue by service */}
          <div className="barCharts" style={{ width: "80%", height: 300, color: 'black', margin: '5%', display: 'flex', justifyContent:'center' }}>
            <ResponsiveContainer width="100%" height="100%" style={{ marginRight: '7%' }}>
              <h2>Revenue Generated via Service</h2>
              <BarChart data={revenueByService}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                <Bar dataKey="amount" fill="#FC1253" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
  
          {/* Revenue by Type */}
            <ResponsiveContainer width="100%" height="100%" style={{ marginRight: '7%' }}>
              <h2>Revenue Generated via Type</h2>
              <BarChart data={revenueByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                <Bar dataKey="amount" fill="#FC1253" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>}
        </div>
  </div>)}
    </>
  );
};

export default ExpenseChart;

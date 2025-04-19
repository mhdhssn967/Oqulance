import React, { useState } from 'react'
import './HomePage.css'
import Navbar from '../components/Navbar'
import ExpenseTable from '../components/ExpenseTable'
import setting from '../assets/setting.png'
import close from '../assets/close.png'
import Settings from '../components/Settings'


const HomePage = () => {
    const [settingsView, setSettingsView] = useState(0)

    const expenseCategories = [
      "Allowance",
      "Consultation & Outsourcing",
      "Consumables",
      "Events",
      "Fixed Assets",
      "Food & refreshments",
      "GST",
      "Incentive",
      "Legal complainces",
      "Lodging Expenses",
      "Promotions",
      "Purchase",
      "Repairs & Maintenance",
      "Salary",
      "Tax",
      "Travel Expense",
      "Utility"
    ];
    
    const departmentOptions = [
      "Business Development",
      "Office Expense",
      "Operations & Administration",
      "Services",
      "Tech"
    ];
    
    const serviceOptions = [
      "AR School",
      "General",
      "Happy Moves"
    ];
    
    const sourceOptions = [
      "Anjana Ramesh",
      "Oqulix HDFC",
      "Sandeep Pattena",
      "Vishnuprakash"
    ];
    
        
    
  return (
    <>
<div><Navbar/></div>

{settingsView==1&&
<div className='settingsDiv'><Settings /></div>}
        <div className='settingButton'><img onClick={()=>settingsView==0?setSettingsView(1):setSettingsView(0)} src={settingsView==0?setting:close} alt="" /></div>

 <div style={settingsView==0?{filter:'blur(0px)'}:{filter:'blur(10px)'}}>
    <div style={{marginLeft:'2%'}}>
      <div style={{marginLeft:'2%'}}>
        <h1 style={{fontSize:'75px', fontWeight:'400'}}>Oqulix Finance</h1>
        <h1 style={{fontSize:'25px', fontWeight:'100'}}>Track and optimize company expenses with ease.</h1>
      </div>
    </div>
    <ExpenseTable expenseCategories={expenseCategories} departmentOptions={departmentOptions} serviceOptions={serviceOptions} sourceOptions={sourceOptions}/>
    </div>
    </>
  )
}

export default HomePage
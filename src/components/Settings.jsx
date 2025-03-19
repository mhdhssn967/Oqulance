import React from 'react'
import './Settings.css'
import add from '../assets/add.png'

const Settings = () => {
  return (
    <>
    <div className='settingsPage'>
    <h1 style={{fontWeight:'500',marginBottom:'30px'}}>Edit your preferences</h1>

<div style={{display:'flex'}}>
            <h2>Company Name</h2>
            <input className='companyNameBox' type="text" />
</div>
<div style={{marginTop:'40px'}}>
  <h2>Fields</h2>
  <ul>
    <li>Category</li>
  <div className='fields'>
    <ul className='fieldItems'>
      <li>Salary</li>
      <li>Events</li>
      <li>Reimbursement</li> 
      <li className='addbtn'><button><img src={add} alt="" /></button></li>
    </ul>
  </div>
</ul>
<ul>
    <li>Type</li>
  <div className='fields'>
    <ul className='fieldItems'>
      <li>Tech</li>
      <li>Sales</li>
      <li>Service</li> 
      <li className='addbtn'><button><img src={add} alt="" /></button></li>
    </ul>
  </div>
</ul>
<ul>
    <li>Service</li>
  <div className='fields'>
    <ul className='fieldItems'>
      <li>Utility</li>
      <li>Happy Moves</li>
      <li>AR School</li> 
      <li className='addbtn'><button><img src={add} alt="" /></button></li>
    </ul>
  </div>
</ul>
<div className='FieldBtn'><button>Add  New Field</button>
<button>Save Preferences</button>
</div>
</div>
    </div>
    </>
  )
}

export default Settings
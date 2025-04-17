import React, { useState } from 'react'
import OQLogo from '../assets/OQ.png'
import './navbar.css'


const Navbar = () => {

  return (
    <>
     <div className='navmain'>
        <div className='logo'>
          <img src={OQLogo} alt="Oqulix Logo" />
          <h2 style={{color:'white',fontSize:'30px'}}>Oqulix</h2>
        </div>
        </div>   
    </>
  )
}

export default Navbar
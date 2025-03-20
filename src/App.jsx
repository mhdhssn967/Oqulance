import React, { useState } from 'react'
import Navbar from './components/Navbar'
import ExpenseTable from './components/ExpenseTable'
import DisplayExpense from './components/DisplayExpense'
import setting from './assets/setting.png'
import close from './assets/close.png'
import Settings from './components/Settings'
import './App.css'
import HomePage from './pages/HomePage'

export const App = () => {

  const [settingsView, setSettingsView] = useState(0)

  return (
    <div>
        <HomePage/>
    </div>
  )
}



export default App
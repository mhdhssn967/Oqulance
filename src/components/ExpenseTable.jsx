import React, { useEffect, useState } from 'react'
import './expenseTable.css'
import TotalExpense from './TotalExpense'
import AddExpense from './AddExpense'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import { tr } from 'framer-motion/client'

const ExpenseTable = () => {

const [expenses,setExpenses]=useState([])
const [totalExpenses, setTotalExpenses] = useState(0);

useEffect(() => {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  setTotalExpenses(total);
}, [expenses]);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      setExpenses([]); // No user logged in
      return;
    }

    console.log("Fetching expenses for:", user.uid);

    const userExpensesRef = collection(db, `users/${user.uid}/expenses`);

    try {
      const querySnapshot = await getDocs(userExpensesRef);
      const expensesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched expenses:", expensesList);
      setExpenses(expensesList);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  });

  return () => unsubscribe();
}, []);
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
           {expenses.length>0?(
            expenses.map((expense, index)=>(
            <tr key={expense.id}>
              <td>{index+1}</td>
              <td>{expense.date || "N/A"}</td>
              <td>{expense.category || "N/A"}</td>
              <td>{expense.type || "N/A"}</td>
              <td>{expense.service || "N/A"}</td>
              <td>₹{expense.amount || "0"}</td>
              <td>{expense.remarks || "N/A"}</td>
           </tr>))):
           (
            <tr>
              <td colSpan="7" style={{textAlign:'center'}}>No expenses found</td>
            </tr>
           )
           }
        </tbody>
       
      </table>
      <TotalExpense total={totalExpenses}/>
    </div>
    </>
  )
}

export default ExpenseTable
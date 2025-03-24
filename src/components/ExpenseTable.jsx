import React, { useEffect, useState } from 'react'
import './expenseTable.css'
import TotalExpense from './TotalExpense'
import AddExpense from './AddExpense'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import { tr } from 'framer-motion/client'
import { setUserId } from 'firebase/analytics'
import edit from '../assets/edit.png'
import deleteImg from '../assets/delete.png'
import ExpenseInsights from './ExpenseInsights'
import insightImg from '../assets/exp.png'
import close from '../assets/close.png'

const ExpenseTable = () => {

  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0)
  const [insightOpen,setInsightOpen]=useState(0)

  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    setTotalExpenses(total);
  }, [expenses]);


  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const filteredData = expenses.filter(exp => {
      const [year, month] = exp.date.split("-").map(Number);
      return year === currentYear && month == currentMonth;
    })
    setMonthlyTotal(filteredData.reduce((sum, expense) => sum + Number(expense.amount || 0), 0))
  }, [JSON.stringify(expenses)])


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setExpenses([]); // No user logged in
        return;
      }

      console.log("Fetching expenses for:", user.uid);

      const userExpensesRef = collection(db, `users/${user.uid}/expenses`);
      const q = query(userExpensesRef, orderBy("date", "desc")); // Order By Date

      try {
        const querySnapshot = await getDocs(q);
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
  }, [triggerFetch]);

  const handleExpenseAdded = () => {
    setTriggerFetch((prev) => !prev);
  };


  return (
    <>
      <AddExpense onExpenseAdded={handleExpenseAdded} />
      {insightOpen==1&&
        <div className='insightsDiv'><ExpenseInsights expenses={expenses} setInsightOpen={setInsightOpen} /></div>}
      <div className='insightButtons'>
        <h3 className='monthExp'>Total expense of this month : ₹{monthlyTotal}</h3>
        <button onClick={()=>setInsightOpen(1)}> <img style={{ width: '20px', marginRight: '5px' }} src={insightImg} alt="" />View Expense Insights</button>
      </div>    

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
            <th>Actions</th>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.date || "N/A"}</td>
                  <td>{expense.category || "N/A"}</td>
                  <td>{expense.type || "N/A"}</td>
                  <td>{expense.service || "N/A"}</td>
                  <td>₹{expense.amount || "0"}</td>
                  <td>{expense.remarks || "N/A"}</td>
                  <td className='actionCell'><img src={edit} alt="" /> <img src={deleteImg} alt="" /></td>
                </tr>))) :
              (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No expenses found</td>
                </tr>
              )
            }
          </tbody>

        </table>
        <TotalExpense total={totalExpenses} />
      </div>
    </>
  )
}

export default ExpenseTable
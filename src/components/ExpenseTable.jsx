import React, { useEffect, useState } from 'react'
import './expenseTable.css'
import AddExpense from './AddExpense'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import edit from '../assets/edit.png'
import deleteImg from '../assets/delete.png'
import insightImg from '../assets/exp.png'
import close from '../assets/close.png'
import { Link } from 'react-router-dom'
import { deleteData } from '../services/services'

const ExpenseTable = () => {

  const [expenses, setExpenses] = useState([])
  const [revenue, setRevenue] = useState([])
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0)
  const [monthlyTotalRevenue, setMonthlyTotalRevenue] = useState(0)
  const [view, setView] = useState("all")
  
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const totalRevenue = revenue.reduce((sum, revenue)=> sum +Number(revenue.amount || 0), 0);
    setTotalExpenses(total);
    setRevenueTotal(totalRevenue)
  }, [expenses,revenue]);


  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const filteredData = expenses.filter(exp => {
      const [year, month] = exp.date.split("-").map(Number);
      return year === currentYear && month == currentMonth;
    })
    setMonthlyTotal(filteredData.reduce((sum, expense) => sum + Number(expense.amount || 0), 0))

    const filteredDataRevenue = revenue.filter(rev => {
      const [year, month] = rev.date.split("-").map(Number);
      return year === currentYear && month == currentMonth;
    })
    setMonthlyTotalRevenue(filteredDataRevenue.reduce((sum, revenue) => sum + Number(revenue.amount || 0), 0))
  }, [JSON.stringify(revenue)])


  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setExpenses([]); 
        setRevenue([]);// No user logged in
        return;
      }

      const userExpensesRef = collection(db, `users/${user.uid}/expenses`);
      const userRevenueRef = collection(db, `users/${user.uid}/revenue`);

      const q = query(userExpensesRef, orderBy("date", "desc")); // Order By Date
      const p = query(userRevenueRef, orderBy("date", "desc")); // Order By Date

      try {
        const querySnapshot = await getDocs(q);
        const querySnapshotRevenue = await getDocs(p)
        const expensesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const revenueList = querySnapshotRevenue.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log("Fetched expenses:", expensesList);
        setExpenses(expensesList);
        // console.log("Fetched revenue:", revenueList);
        setRevenue(revenueList);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    });

    return () => unsubscribe();
  }, [triggerFetch]);

  const handleExpenseAdded = () => {
    setTriggerFetch((prev) => !prev);
  };

  const handleDeleteData = async (type,id) => {
   
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (confirmDelete) {
      try {
        await deleteData(type,id);
        alert("Expense deleted successfully!");
        setTriggerFetch((prev) => !prev);
      } catch (error) {
        alert("Failed to delete expense.");
        console.error(error);
      }
    }
  };


  return (
    <>
      <div className='insightButtons'>
          <table>
           <table>
              <tr><td>Total expense of this month</td> <td>: ₹{monthlyTotal}</td></tr>
            <tr><td>Total revenue generated this month</td> <td>: ₹{monthlyTotalRevenue}</td></tr>
               <tr><td>Gross expenses:</td><td>: ₹{totalExpenses}</td></tr>
               <tr><td>Gross revenue:</td><td>: ₹{revenueTotal}</td></tr>
               <tr><td><Link to="/home/insights"><button onClick={()=>setInsightOpen(1)}> View more Insights</button></Link>
               </td></tr>
           </table>
          </table>
      </div>    
      
      <div style={{display:'flex',justifyContent:'space-between',marginRight:'150px',alignItems:'center'}}><AddExpense onExpenseAdded={handleExpenseAdded} />
      <div>
        View <select name="" id="" onChange={(e)=>setView(e.target.value)}>
          <option value="all">All</option>
          <option value="expenses">Expenses</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>
      </div>
      
      
{/* \Expense table */}
      
        {(view=="all" || view=="expenses")&&(
          <div className='tableDiv'>
        <h2>Expense Overview</h2>
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
                  <td className='actionCell'><img src={edit} alt=""  /> <img onClick={()=>handleDeleteData('expenses',expense.id)} src={deleteImg} alt="" /></td>
                </tr>))) :
              (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>No record found</td>
                </tr>
              )
            }
          </tbody>
        </table>
        </div>)}
  


{/* Revenue Table */}


{(view=="revenue" || view=="all") &&
          <div className='tableDiv'>
            <h2>Revenue Overview</h2>
            <table>
              <thead>
              <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Remarks</th>
                <th>Actions</th>
              </thead>
              <tbody>
              {
      revenue.length> 0 && (
        revenue.map((revenue, index)=>(
          <tr key={revenue.id}>
            <td>{index + 1}</td>
          <td>{revenue.date || "N/A"}</td>
          <td>{revenue.type || "N/A"}</td>
          <td>{revenue.service || "N/A"}</td>
          <td>₹{revenue.amount || "0"}</td>
          <td>{revenue.remarks || "N/A"}</td>
          <td className='actionCell'><img src={edit} alt="" /> <img onClick={()=>handleDeleteData('revenue',revenue.id)} src={deleteImg} alt="" /></td>
          </tr>
        ))
      )
    }
  
              </tbody>
            </table>
          </div>
}
    </>
  )
}

export default ExpenseTable


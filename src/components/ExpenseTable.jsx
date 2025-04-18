import React, { useEffect, useState } from 'react'
import './expenseTable.css'
import AddExpense from './AddExpense'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import edit from '../assets/edit.png'
import deleteImg from '../assets/delete.png'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { deleteData, filterExpenses } from '../services/services'
import Filters from './Filters'

const ExpenseTable = ({ expenseCategories,departmentOptions, serviceOptions, sourceOptions }) => {

  const [expenses, setExpenses] = useState([])

  const [displayExpenses, setDisplayExpenses] = useState([]) //Display data
  const [displayRevenue, setDisplayRevenue] = useState([]) // Display data

  const [revenue, setRevenue] = useState([])
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0)
  const [monthlyTotalRevenue, setMonthlyTotalRevenue] = useState(0)
  const [view, setView] = useState("all")

  const [editRowId, setEditRowId] = useState(null); // stores the ID of the row being edited
  const [editRowData, setEditRowData] = useState({}); // stores editable data

  const [triggerFetch, setTriggerFetch] = useState(false);
  const [filterValues, setFilterValues] = useState({categoryF:'All',typeF:'All',sourceF:'All',serviceF:'All'})
  const [searchText, setSearchText]=useState('')
  
  console.log(filterValues);
  

  const saveEditedExpense = async (id) => {
    const userId = auth.currentUser.uid; // assuming Firebase Auth is being used
    try {
      await updateDoc(doc(db, "users", userId, "expenses", id), editRowData);
      setTriggerFetch((prev) => !prev);
      Swal.fire({
        icon: "success",
        title: "✔️ Expense Updated!",
        showConfirmButton: false,
        timer: 800
      });
      setEditRowId(null);

    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const totalRevenue = revenue.reduce((sum, revenue) => sum + Number(revenue.amount || 0), 0);
    setTotalExpenses(total);
    setRevenueTotal(totalRevenue)
  }, [expenses, revenue]);

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
        setDisplayExpenses(expensesList)
        // console.log("Fetched revenue:", revenueList);
        setRevenue(revenueList);
        setDisplayRevenue(revenueList)
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    });

    return () => unsubscribe();
  }, [triggerFetch]);

  const handleExpenseAdded = () => {
    setTriggerFetch((prev) => !prev);
  };

  const handleDeleteData = async (type, id) => {

    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (confirmDelete) {
      try {
        await deleteData(type, id);
        Swal.fire({
          icon: 'success',
          title: `✔️ ${type} Deleted!`,
          showConfirmButton: false,
          timer: 800,
        });
        setTriggerFetch((prev) => !prev);
      } catch (error) {
        alert("Failed to delete expense.");
        console.error(error);
      }
    }
  };
  
    useEffect(() => {
      const filtered = filterExpenses(expenses, filterValues, searchText);
      setDisplayExpenses(filtered);
    }, [expenses, filterValues, searchText]);

    return (
      <>
        <div className='insightButtons'>
            <table>
             <table>
                <tr><td>Total expense of this month</td> <td>: ₹{monthlyTotal}</td></tr>
              <tr><td>Total revenue generated this month</td> <td>: ₹{monthlyTotalRevenue}</td></tr>
                 <tr><td>Gross expenses:</td><td>: ₹{totalExpenses}</td></tr>
                 <tr><td>Gross revenue:</td><td>: ₹{revenueTotal}</td></tr>
                 <tr><td><Link to="/home/insights"><button> View more Insights</button></Link>
                 </td></tr>
             </table>
            </table>
        </div>    
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '100px', alignItems: 'center' }}><AddExpense onExpenseAdded={handleExpenseAdded} expenseCategories={expenseCategories} departmentOptions={departmentOptions} serviceOptions={serviceOptions} sourceOptions={sourceOptions}/></div>

        <div className='filter-container'>
  <Filters expenseCategories={expenseCategories} departmentOptions={departmentOptions} serviceOptions={serviceOptions} sourceOptions={sourceOptions} filterValues={filterValues} setFilterValues={setFilterValues} setSearchText={setSearchText}/>
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
              <th>Source</th>
              <th>Amount</th>
              <th>Remarks</th>
              <th>Actions</th>
            </thead>
            <tbody>
            {displayExpenses.map((expense, index) => (
    <tr key={expense.id}>
      <td>{index + 1}</td>
      
      {editRowId === expense.id ? (
        <>
          <td><input className='edit-input' type="date" value={editRowData.date} onChange={(e)=>setEditRowData({...editRowData, date: e.target.value})} /></td>
          <td>
            <select value={editRowData.category} onChange={(e)=>setEditRowData({...editRowData, category: e.target.value})}>
                  <option value="">Select</option>
                  <option value="Salary">Salary</option>
                  <option value="Events">Events</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Lodging Expenses">Lodging Expenses</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Utility">Utility</option>
                  <option value="Fixed Assets">Fixed Assets</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Promotions">Promotions</option>
                  <option value="Repairs & Maintenance">Repairs & Maintenance</option>
                  <option value="Travel Expense">Travel Expense</option>
                  <option value="Food & refreshments">Food & refreshments</option>
                  <option value="Legal complainces">Legal compliances</option>
                  <option value="Tax">Tax</option>
                  <option value="GST">GST</option>
                  <option value="Consultation & Outsourcing">Consultation & Outsourcing</option>
                  <option value="Incentive">Incentive</option>
  
            </select>
          </td>
          <td>
            <select value={editRowData.type} onChange={(e)=>setEditRowData({...editRowData, type: e.target.value})}>
                  <option value="">Select</option>
                  <option value="Tech">Tech</option>
                  <option value="Business Development">Business Development</option>
                  <option value="Operations & Administration">Operations & Administration</option>
                  <option value="Services">Services</option>
                  <option value="Office Expense">Office Expense</option>
            </select>
          </td>
          <td><select value={editRowData.service} onChange={(e)=>setEditRowData({...editRowData, service: e.target.value})} >
          <option default selected disabled>Select Service</option>
                  <option value="AR School">AR School</option>
                  <option value="Happy Moves">Happy Moves</option>
                  <option value="General">General</option>
                </select>
          </td>
          <td><select value={editRowData.source} onChange={(e)=>setEditRowData({...editRowData, source: e.target.value})} >
          <option default selected disabled>Source</option>
                  <option value="Oqulix HDFC">Oqulix HDFC</option>
                  <option value="Anjana Ramesh">Anjana Ramesh</option>
                  <option value="Sandeep Pattena">Sandeep Pattena</option>
                  <option value="Vishnuprakash">Vishnuprakash</option>
      
                </select>
          </td>
          <td><input className='edit-input' type="number" value={editRowData.amount} onChange={(e)=>setEditRowData({...editRowData, amount: e.target.value})} /></td>
          <td><input className='edit-input' type="text" value={editRowData.remarks} onChange={(e)=>setEditRowData({...editRowData, remarks: e.target.value})} /></td>
          <td className='edit-btns'>
            <button className='edit-btn' onClick={() => saveEditedExpense(expense.id)}><i className="fa-solid fa-check"></i></button>
            <button className='edit-btn' onClick={() => setEditRowId(null)}><i className="fa-solid fa-xmark"></i></button>
          </td>
        </>
      ) : (
        <>
          <td>{expense.date || "N/A"}</td>
          <td>{expense.category || "N/A"}</td>
          <td>{expense.type || "N/A"}</td>
          <td>{expense.service || "N/A"}</td>
          <td>{expense.source || "N/A"}</td>
          <td>₹{expense.amount || "0"}</td>
          <td>{expense.remarks || "N/A"}</td>
          <td className='actionCell'>
            <img onClick={() => {
              setEditRowId(expense.id);
              setEditRowData(expense);
            }} src={edit} alt="Edit" />
            <img onClick={() => handleDeleteData('expenses', expense.id)} src={deleteImg} alt="Delete" />
          </td>
        </>
      )}
    </tr>
  ))}
  
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
        displayRevenue.length> 0 && (
          displayRevenue.map((revenue, index)=>(
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


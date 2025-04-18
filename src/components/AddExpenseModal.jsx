import React, { useState } from "react";
import "./AddExpenseModal.css"; 
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";


const AddExpenseModal = ({ isOpen, onClose,onExpenseAdded, expenseCategories,departmentOptions, serviceOptions, sourceOptions}) => {
  if (!isOpen) return null;

  const [expenseDetails, setExpenseDetails]=useState({date:"",category:"",type:"",service:"",amount:"",remarks:"",source:""})
  console.log(expenseDetails);
  
  const closeModal=()=>{
    setExpenseDetails({date:"",category:"",type:"",service:"",amount:"",remarks:""})
    onClose()
  }

  const user=auth.currentUser;
  const userId=user?user.uid:null
  const addExpense=async(event)=>{
    event.preventDefault();

    if(!userId){
      alert("Error!!! Login to continue")
      return;
    }

    const {date,category,type,service,source,amount,remarks}=expenseDetails

    if (!date || !category || !type || !service || !amount ) {
      alert("Fill the form completely");
      return;
    }

    try{
      const expenseRef=collection(db,"users",userId,"expenses")
      await addDoc(expenseRef,{
        userID:user.uid,
        date,
        category,
        type,
        service,
        source,
        amount,
        remarks,
        createdAt: new Date(),
      });
      // onClose()
      Swal.fire({
        icon: 'success',
        title: '✔️ Expense Added!',
        showConfirmButton: false,
        timer: 800,
      });
      onExpenseAdded()
    }catch(error){
      console.log("Error while adding expense",error);
      Swal.fire({
        icon: 'error',
        title: '❌ Error Adding Expense',
        showConfirmButton: false,
        timer: 800,
      });
    }
  }

  return (
    <>

      <div className="modal-overlay">
        
        <div className="modal-content">
          <h2>Add New Expense</h2>
          <form className="expense-form">
            <div>
              <input onChange={(e)=>setExpenseDetails({...expenseDetails,date:e.target.value})} type="date" className="input-field" />
    
              <select onChange={(e)=>setExpenseDetails({...expenseDetails,category:e.target.value})} className="input-field">
                <option default selected disabled>Select Category</option>
                {expenseCategories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}



              </select>
    
              <select onChange={(e)=>setExpenseDetails({...expenseDetails,type:e.target.value})} className="input-field">
              <option default selected disabled>Select Type</option>
              {departmentOptions.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
    
              </select>
            </div>
  
            <div>
              <select onChange={(e)=>setExpenseDetails({...expenseDetails,service:e.target.value})} className="input-field">
              <option default selected disabled>Select Service</option>
              {serviceOptions.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
              </select>
    
              <select onChange={(e)=>setExpenseDetails({...expenseDetails,source:e.target.value})} className="input-field">
              <option default selected disabled>Source</option>
              {sourceOptions.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
    
              </select>
    
              <input onChange={(e)=>setExpenseDetails({...expenseDetails,amount:e.target.value})} type="number" placeholder="Amount" className="input-field" />
            </div>
  
  <div>
              <input onChange={(e)=>setExpenseDetails({...expenseDetails,remarks:e.target.value})} type="text" placeholder="Remarks" className="input-field remarks" />
    
  </div>          <div className="button-container">
              <button type="button" className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="add-button" onClick={addExpense}>
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;

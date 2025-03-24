import React, { useState } from "react";
import "./AddExpenseModal.css"; 
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AddRevenueModal = ({ isOpen, onClose,onExpenseAdded}) => {
  if (!isOpen) return null;

  const [revenueDetails, setRevenueDetails]=useState({date:"",type:"",service:"",amount:"",remarks:""})
  console.log(revenueDetails);
  
  const closeModal=()=>{
    setRevenueDetails({date:"",type:"",service:"",amount:"",remarks:""})
    onClose()
  }

  const user=auth.currentUser;
  const userId=user?user.uid:null
  const addRevenue=async(event)=>{
    event.preventDefault();

    if(!userId){
      alert("Error!!! Login to continue")
      return;
    }

    const {date,type,service,amount,remarks}=revenueDetails

    if (!date || !type || !service || !amount || !remarks) {
      alert("Fill the form completely");
      return;
    }

    try{
      const revenueRef=collection(db,"users",userId,"revenue")
      await addDoc(revenueRef,{
        userID:user.uid,
        date,
        type,
        service,
        amount,
        remarks,
        createdAt: new Date(),
      });
      onClose()
      onExpenseAdded()
    }catch(error){
      console.log("Error while adding revenue",error);
      alert("Failed to add response")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Revenue</h2>
        <form className="expense-form">
          <input onChange={(e)=>setRevenueDetails({...revenueDetails,date:e.target.value})} type="date" className="input-field" />

          <select onChange={(e)=>setRevenueDetails({...revenueDetails,type:e.target.value})} className="input-field">
          <option default selected disabled>Select Type</option>
            <option value="Tech">Tech</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="Services">Services</option>
          </select>

          <select onChange={(e)=>setRevenueDetails({...revenueDetails,service:e.target.value})} className="input-field">
          <option default selected disabled>Select Service</option>
            <option value="Utility">Utility</option>
            <option value="AR School">AR School</option>
            <option value="Happy Moves">Happy Moves</option>
          </select>

          <input onChange={(e)=>setRevenueDetails({...revenueDetails,amount:e.target.value})} type="number" placeholder="Amount" className="input-field" />
          <input onChange={(e)=>setRevenueDetails({...revenueDetails,remarks:e.target.value})} type="text" placeholder="Remarks" className="input-field" />

          <div className="button-container">
            <button type="button" className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
            <button className="add-button" onClick={addRevenue}>
              Add Revenue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRevenueModal;

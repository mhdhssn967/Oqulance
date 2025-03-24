import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot,  getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Adjust the path if needed

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  

  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged(async (user)=>{
      if(!user){
        setExpenses([])
        return;
      }
      console.log("Fetching Expenses for",user.uid);

      const userExpensesRef = collection(db, `users/${user.uid}/expenses`);
      const q = query(userExpensesRef, orderBy("date", "asc")); // Order By Date
      try{
        const querySnapshot = await getDocs(q);
        const expensesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched expenses", expensesList);
        setExpenses(expensesList);
      }catch (error) {
        console.error("Error fetching expenses:", error);
  }})
  return ()=>unsubscribe();
},[]);
return expenses
}

export default useFetchExpenses;

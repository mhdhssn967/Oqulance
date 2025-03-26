import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot,  getDocs, where } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Adjust the path if needed

const useFetchRevenue = (startDate,endDate) => {
  const [revenue, setRevenue] = useState([]);
  

  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged(async (user)=>{
      if(!user){
        setRevenue([])
        return;
      }
      console.log("Fetching Expenses for",user.uid);

      const userRevenueRef = collection(db, `users/${user.uid}/revenue`);
      const q = query(
        userRevenueRef,
        where("date",">=",startDate),
        where("date","<=",endDate),
         orderBy("date", "asc")); // Order By Date
      try{
        const querySnapshot = await getDocs(q);
        const revenueList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched revenue", revenueList);
        setRevenue(revenueList);
      }catch (error) {
        console.error("Error fetching revenue:", error);
  }})
  return ()=>unsubscribe();
},[startDate, endDate]);
return revenue
}

export default useFetchRevenue;

// Export the function to use it in other parts of the application// deleteExpense.js
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // adjust path as needed

export const deleteData = async (type,id) => {
    console.log(type,id);
    
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        reject("User not authenticated");
        return;
      }

      try {
        const expenseRef = doc(db, `users/${user.uid}/${type}`, id);
        await deleteDoc(expenseRef);
        console.log(`Deleted ${type}:`, id);
        resolve();
      } catch (error) {
        console.error("Error deleting expense:", error);
        reject(error);
      }
    });
  });
};

export default deleteData;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgiY7yY3bnQgQAT18Ns3htjTcfjIxG438",
  authDomain: "oqulance.firebaseapp.com",
  projectId: "oqulance",
  storageBucket: "oqulance.firebasestorage.app",
  messagingSenderId: "138307888804",
  appId: "1:138307888804:web:433c12e0e618e134eea831",
  measurementId: "G-QLE757SNJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };
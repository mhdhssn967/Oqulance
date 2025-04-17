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
  apiKey: "AIzaSyCmPP2xR6SrF2N9hgqMtdYw7WTBtiynYyc",
  authDomain: "oqulix-finance.firebaseapp.com",
  projectId: "oqulix-finance",
  storageBucket: "oqulix-finance.firebasestorage.app",
  messagingSenderId: "658879172276",
  appId: "1:658879172276:web:4a89a72aa06f67b0a911e1",
  measurementId: "G-D7T35DZVSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };






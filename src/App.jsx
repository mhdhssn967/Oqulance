import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { auth } from "./firebaseConfig"; // Import Firebase auth
import Login from "./pages/Login";
import HomePage from "./pages/HomePage"; 
import Insights from "./pages/Insights";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // State to track user authentication
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true); // Set user as authenticated
        navigate("/home"); // Navigate to HomePage when logged in
      } else {
        setIsAuthenticated(false); // Set user as not authenticated
        navigate("/"); // Navigate to Login page when not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }

  return (
  
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/insights" element={<Insights />} />
        </Routes>
     
  
  );
};

export default App;

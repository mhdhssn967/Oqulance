import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // ✅ Import auth and db correctly
import "./Login.css";
import logo from "../assets/OQ.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: "John Doe", // You can modify this to dynamically store user details
          email: user.email,
        });
      }

      console.log("User logged in:", user.email);
      navigate("/home"); // Redirect to home page
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" style={{ width: "60px" }} />
        <h1 style={{ fontWeight: "300" }}>Oqulance</h1>
        <p style={{ fontWeight: "100" }}>Track and optimize company expenses with ease.</p>
        <h2 style={{ fontWeight: "200" }}>Login to your account</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

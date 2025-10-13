// LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user's team from backend
      const res = await axios.get(`http://localhost:5000/users/${user.uid}/team`);
      
      if (res.data && res.data.team) {
        navigate("/team"); // User already has a team
      } else {
        navigate("/team-selection"); // No team → select/create one
      }

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Log In</button>
      </form>
      <p><Link to="/reset-password" className="forgot-password-link">Forgot your password?</Link></p>
      <p className="message">{message}</p>
      <p className="already-account">
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;
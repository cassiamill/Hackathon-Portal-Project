import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { mockTeams } from "../mockData";
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // check if user already has a team
      const userTeam = mockTeams.find(
        t => t.leader === auth.currentUser.email || t.members.includes(auth.currentUser.email)
      );

      if (userTeam) {
        navigate("/team"); // already has a team
      } else {
        navigate("/team-selection"); // no team → create one
      }

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
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

        <button type="submit">Sign In</button>
      </form>

      <p className="message">{message}</p>
      <p className="already-account">
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;
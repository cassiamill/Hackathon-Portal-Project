import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
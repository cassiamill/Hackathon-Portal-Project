// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import logo from "../images/1.png"; // ✅ import your logo
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Hackathon Logo" className="nav-logo" />
        </Link>
      </div>

      {user && (
        <div className="nav-right">
          <div className="hamburger" onClick={() => setDropdownOpen(!dropdownOpen)}>
            &#9776; {/* three horizontal lines */}
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/team">Team</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}

      {!user && (
        <div className="nav-right">
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
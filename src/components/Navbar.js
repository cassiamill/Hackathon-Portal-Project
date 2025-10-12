import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
      </div>

      {user && (
        <div className="nav-right">
          <div 
            className="user-dropdown" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user.displayName || user.email} ▼
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
    </nav>
  );
}

export default Navbar;
// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import logo from "../images/1.png"; 
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load user from Firebase or localStorage
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // For Firebase auth
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email
        });
        // Optional: save to localStorage for persistence
        localStorage.setItem("user", JSON.stringify({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email
        }));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Hackathon Logo" className="nav-logo" />
        </Link>
      </div>

      {user ? (
        <div className="nav-right">
          <div className="hamburger" onClick={() => setDropdownOpen(!dropdownOpen)}>
            &#9776;
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/team">Team</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      ) : (
        <div className="nav-right">
          <Link to="/login" className="nav-btn">Log In</Link>
          <Link to="/register" className="nav-btn signup-highlight">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
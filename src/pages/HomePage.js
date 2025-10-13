import React from "react"; // remove useEffect
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // keep firebase auth
import axios from "axios"; // for backend requests
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleJoinHackathon = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = await user.getIdToken();
      const res = await axios.get('http://localhost:5000/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userProject = res.data.find(p => p.user === user.uid);

      if (userProject) {
        navigate("/team");
      } else {
        navigate("/team-selection");
      }
    } catch (err) {
      console.error("Error fetching user projects:", err);
      navigate("/team-selection");
    }
  };

  return (
    <div className="home-container">
      <main className="main-content">
        <h1 className="main-title">GUS Hackathon Portal</h1>
        <h2 className="subtitle">The home for hackathons.</h2>
        <p className="description">
          Where students collaborate on projects, showcase their skills, and win amazing prizes!
        </p>
        <button className="cta-btn" onClick={handleJoinHackathon}>
          Join the Hackathon
        </button>
      </main>
    </div>
  );
}
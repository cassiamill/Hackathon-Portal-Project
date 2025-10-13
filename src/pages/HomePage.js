// HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { mockTeams } from "../mockData";
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleJoinHackathon = () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    const userTeam = mockTeams.find(
      t => t.leader === user.email || t.members.includes(user.email)
    );

    if (userTeam) {
      navigate("/team");
    } else {
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
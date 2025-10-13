// LeaderboardPage.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config"; // Keep your Firebase auth
import axios from "axios"; // We'll fetch leaderboard from backend
import './LeaderboardPage.css';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;

    // Simple admin check for now (replace with backend role check later)
    const adminEmail = "coordinator@example.com";
    if (!user || user.email !== adminEmail) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    // Fetch leaderboard from backend (replace URL with actual backend later)
    axios.get("http://localhost:5000/leaderboard") // backend endpoint
      .then(res => {
        setLeaderboard(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (accessDenied) return <p>Access denied. Only admins can view this page.</p>;

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{team.teamName}</td>
                <td>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
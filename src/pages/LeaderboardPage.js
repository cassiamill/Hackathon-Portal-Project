import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import "./LeaderboardPage.css";

function LeaderboardPage() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([
    { name: "They Hack a Tons", score: 92 },
    { name: "Code Ninjas", score: 87 },
    { name: "Hack Masters", score: 85 },
    { name: "Dev Squad", score: 78 },
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  if (!user) return <p>Please log in to see the leaderboard.</p>;

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard Fall 2025</h1>
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
            {sortedTeams.map((team, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{team.name}</td>
                <td>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardPage;
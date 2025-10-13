// LeaderboardPage.js
import React from "react";
import { mockLeaderboard } from "../mockData";

export default function LeaderboardPage() {
  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {mockLeaderboard.map((team, idx) => (
          <li key={idx}>{team.teamName} - {team.score} points</li>
        ))}
      </ol>
    </div>
  );
}
// TeamSelectionPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeamSelectionPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [memberEmails, setMemberEmails] = useState(["", "", "", ""]);

  const handleCreateTeam = () => {
    // Mock creation: you can add validation later
    alert("Team created (mock)!");
    navigate("/team");
  };

  return (
    <div>
      <h2>Create Team</h2>
      <input placeholder="Team Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Leader Email" value={leaderEmail} onChange={e => setLeaderEmail(e.target.value)} />
      {memberEmails.map((email, idx) => (
        <input
          key={idx}
          placeholder={`Member ${idx + 1} Email`}
          value={email}
          onChange={e => {
            const newMembers = [...memberEmails];
            newMembers[idx] = e.target.value;
            setMemberEmails(newMembers);
          }}
        />
      ))}
      <button onClick={handleCreateTeam}>Create Team</button>
    </div>
  );
}
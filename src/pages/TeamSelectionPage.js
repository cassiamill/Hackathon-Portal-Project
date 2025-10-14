import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // import axios for future API calls
import "./TeamSelectionPage.css";

export default function TeamSelectionPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [memberEmails, setMemberEmails] = useState(["", "", "", ""]);

  const handleCreateTeam = async () => {
    // Prepare the data to send
    const teamData = { name, description, leaderEmail, memberEmails };

    // MOCK for now
    alert("Team created (mock)!");
    navigate("/team");

    // FUTURE BACKEND CALL (once backend is ready)
    /*
    try {
      const res = await axios.post("http://localhost:5000/teams", teamData);
      console.log("Team created:", res.data);
      navigate("/team"); // go to the team page
    } catch (error) {
      console.error("Failed to create team:", error);
      alert("Failed to create team");
    }
    */
  };

  return (
    <div className="team-selection-container">
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

import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import FileUpload from "../components/FileUpload";
import "./TeamPage.css";

function TeamPage() {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState({
    id: "team123",
    name: "They Hack a Tons",
    logo: "https://via.placeholder.com/120",
    description: "A great team doing their best",
    leader: "Cássia",
    members: ["Lucas", "Anish", "Mathew", "Ananya"],
    mentor: { name: "Dr. John Mentor", email: "mentor@nct.ca" },
    presentationTime: "Day 4, 2:30 PM at Mirvish Hall",
  });

  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleAddUpdate = () => {
    if (newUpdate.trim() !== "") {
      setUpdates([...updates, newUpdate]);
      setNewUpdate("");
    }
  };

  if (!user) return <p>Please log in to see your team page.</p>;

  return (
    <div className="team-container">
      <div className="team-header">
        <img src={team.logo} alt="Team Logo" className="team-logo" />
        <h1>{team.name}</h1>
        <p>{team.description}</p>
      </div>

      <div className="team-section">
        <h3>Team Leader:</h3>
        <p><strong>{team.leader}</strong></p>
      </div>

      <div className="team-section">
        <h3>Team Members:</h3>
        <ul>
          {team.members.map((member, index) => <li key={index}>{member}</li>)}
        </ul>
      </div>

      <div className="team-section">
        <h3>Mentor:</h3>
        <p>
          <strong>{team.mentor.name}</strong> — <a href={`mailto:${team.mentor.email}`}>{team.mentor.email}</a>
        </p>
      </div>

      <div className="team-section">
        <h3>Upload your team files:</h3>
        <FileUpload teamId={team.id} userId={user.uid} />
      </div>

      <div className="team-section">
        <h3>Team Updates:</h3>
        <div className="update-input">
          <input
            type="text"
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            placeholder="Share your progress..."
          />
          <button onClick={handleAddUpdate}>Post</button>
        </div>
        <ul className="update-list">
          {updates.length === 0 ? <p>No updates yet.</p> :
            updates.map((update, index) => <li key={index}>{update}</li>)}
        </ul>
      </div>

      <div className="team-section">
        <h3>Presentation Schedule:</h3>
        <p>{team.presentationTime}</p>
      </div>
    </div>
  );
}

export default TeamPage;
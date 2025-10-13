import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import "./TeamPage.css";

function TeamPage() {
  // Get user info from localStorage (set at login)
  const [user, setUser] = useState(null);

  // Team data (mock for now, backend not ready)
  const [team, setTeam] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);

      // Mock team data (replace with backend fetch when available)
      setTeam({
        id: "team123",
        name: "They Hack a Tons",
        logo: "https://via.placeholder.com/120",
        description: "A passionate team building something amazing together.",
        leader: "Cássia",
        members: ["Lucas", "Anish", "Mathew", "Ananya"],
        mentor: { name: "Mauro M.", email: "mauromentor@nctoronto.ca" },
        presentationTime: "Day 4, 2:30 PM at Mirvish Hall",
      });
    }
  }, []);

  const handleAddUpdate = () => {
    if (!newUpdate.trim()) return;
    setUpdates([...updates, newUpdate]);
    setNewUpdate("");

    // TODO: send update to backend /projects endpoint when ready
  };

  const handleLeaveTeam = () => {
    if (window.confirm("Are you sure you want to leave the team?")) {
      setTeam(null);
      alert("You have left the team.");

      // TODO: call backend API to leave team when endpoint is ready
    }
  };

  if (!user) return <p className="team-message">Please log in to see your team page.</p>;
  if (!team) return <p className="team-message">You are not part of a team.</p>;

  return (
    <div className="team-container">
      <div className="team-card">
        {/* Team header */}
        <div className="team-header">
          <h1 className="team-title">{team.name}</h1>
          <p className="team-description">{team.description}</p>
        </div>

        {/* Leader */}
        <div className="team-section">
          <h3>Team Leader</h3>
          <p><strong>{team.leader}</strong></p>
        </div>

        {/* Members */}
        <div className="team-section">
          <h3>Team Members</h3>
          <ul className="member-list">
            {team.members.map((member, index) => <li key={index}>{member}</li>)}
          </ul>
        </div>

        {/* Mentor */}
        <div className="team-section">
          <h3>Mentor</h3>
          <p>
            <strong>{team.mentor.name}</strong> -{" "}
            <a href={`mailto:${team.mentor.email}`} className="mentor-link">{team.mentor.email}</a>
          </p>
        </div>

        {/* File upload */}
        <div className="team-section">
          <h3>Upload Team Files</h3>
          <FileUpload teamId={team.id} userId={user.id} />
        </div>

        {/* Updates */}
        <div className="team-section">
          <h3>Team Updates</h3>
          <div className="update-input">
            <input
              type="text"
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              placeholder="Share your progress..."
            />
            <button onClick={handleAddUpdate} className="post-btn">Post</button>
          </div>
          <ul className="update-list">
            {updates.length === 0 ? <p className="no-updates">No updates yet.</p> :
              updates.map((update, index) => <li key={index}>{update}</li>)}
          </ul>
        </div>

        {/* Presentation schedule */}
        <div className="team-section">
          <h3>Presentation Schedule</h3>
          <p>{team.presentationTime}</p>
        </div>

        {/* Leave team */}
        <div className="team-section">
          <button onClick={handleLeaveTeam} className="leave-team-button">Leave Team</button>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

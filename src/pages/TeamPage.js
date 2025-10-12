import React from 'react';
import FileUpload from '../components/FileUpload';
import { auth } from '../firebase/config';

function TeamPage() {
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const teamId = "TEAM_ID"; // Replace with actual team ID logic

  return (
    <div>
      <h1>Team Page</h1>
      <p>This is where the team info will appear.</p>
      {userId ? (
        <FileUpload teamId={teamId} userId={userId} />
      ) : (
        <p>Please log in to upload files.</p>
      )}
    </div>
  );
}

export default TeamPage;
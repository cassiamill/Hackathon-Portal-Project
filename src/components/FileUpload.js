import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/config';
import { getIdToken } from 'firebase/auth';

function FileUpload({ teamId, userId }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    // 1️⃣ Get Firebase token
    const user = auth.currentUser;
    if (!user) return alert('You must be logged in!');
    const token = await getIdToken(user);

    // 2️⃣ Request signed signature from backend
    const signRes = await axios.post(
      'https://YOUR_BACKEND_URL/api/cloudinary-sign',
      { fileName: file.name, fileType: file.type },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { signature, timestamp, apiKey, cloudName } = signRes.data;

    // 3️⃣ Upload file to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    const cloudRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData
    );

    // 4️⃣ Send file metadata to backend
    await axios.post(
      'https://YOUR_BACKEND_URL/api/files',
      {
        userId,
        teamId,
        fileName: file.name,
        fileType: file.type,
        fileUrl: cloudRes.data.secure_url,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert('File uploaded successfully!');
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
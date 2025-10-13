import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase/config";
import { getIdToken } from "firebase/auth";
import "./FileUpload.css";

function FileUpload({ teamId, userId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in!");

    try {
      setUploading(true);

      // 1️⃣ Get Firebase token
      const token = await getIdToken(user);

      // 2️⃣ Ask backend for Cloudinary signature (when available)
      // ⚠️ Replace "YOUR_BACKEND_URL" when backend is live
      const signResponse = await axios
        .post(
          "http://localhost:5000/api/cloudinary-sign",
          { fileName: file.name, fileType: file.type },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch(() => {
          console.warn("Backend not ready — skipping signature request");
          return { data: {} }; // avoid breaking while backend is missing
        });

      const { signature, timestamp, apiKey, cloudName } = signResponse.data;

      // 3️⃣ Upload to Cloudinary (mock for now)
      // When backend ready, remove "demo" section
      const formData = new FormData();
      formData.append("file", file);
      if (apiKey) {
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
      }

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          cloudName || "demo"
        }/auto/upload`,
        formData
      );

      const uploadedUrl = cloudRes.data.secure_url;

      // 4️⃣ Send metadata to backend
      await axios
        .post(
          "http://localhost:5000/api/files",
          {
            userId,
            teamId,
            fileName: file.name,
            fileType: file.type,
            fileUrl: uploadedUrl,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch(() =>
          console.warn("Backend not ready — skipping file metadata save")
        );

      alert("✅ File uploaded successfully!");
    } catch (err) {
      console.error("File upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default FileUpload;
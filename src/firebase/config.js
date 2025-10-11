// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeDx2qnUdc3Adv3FaJik2p5_VeocIqv0s",
  authDomain: "hackathonportal-1212.firebaseapp.com",
  projectId: "hackathonportal-1212",
  storageBucket: "hackathonportal-1212.firebasestorage.app",
  messagingSenderId: "290334924729",
  appId: "1:290334924729:web:cb4066b0344ef807f02068"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
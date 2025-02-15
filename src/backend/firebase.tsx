// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const key = import.meta.env.VITE_FIREBASEAPIKEY
// Firebase configuration
const firebaseConfig = {
    apiKey: key,
    authDomain: "markdown-editor-88700.firebaseapp.com",
    projectId: "markdown-editor-88700",
    storageBucket: "markdown-editor-88700.firebasestorage.app",
    messagingSenderId: "830909505362",
    appId: "1:830909505362:web:02d1c8c1699e76ed91648b"
  };

// Initialise Firebase
const app = initializeApp(firebaseConfig);


// Initialise Firestore
const db = getFirestore(app);


export { db };

export default app;

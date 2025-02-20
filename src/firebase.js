// firebase.js (Updated for Firebase v9+)

import { initializeApp } from "firebase/app";  // Modular import for app initialization
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Modular imports for auth

// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyCesafRV5rrcG8Z6iN1eDicVAx-XBQ0i7A",
  authDomain: "task-flow-7a8f2.firebaseapp.com",
  projectId: "task-flow-7a8f2",
  storageBucket: "task-flow-7a8f2.firebasestorage.app",
  messagingSenderId: "116576367141",
  appId: "1:116576367141:web:a252b7b75c7f8048f4c5cc",
  measurementId: "G-57QM1ELF40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance and Google Auth provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

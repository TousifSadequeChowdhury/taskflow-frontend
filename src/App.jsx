// App.jsx
import React, { useState, useEffect } from 'react';
import { auth, provider } from './firebase'; // Import the firebase config
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup

// NavBar Component
const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">TaskFlow</div>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/tasks" className="hover:text-gray-400">Tasks</a>
        </div>
      </div>
    </nav>
  );
};

// Body Component
const Body = ({ user, signInWithGoogle }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        {user ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-6">Welcome, {user.displayName}</h1>
            <button
              onClick={() => auth.signOut()}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
              Sign out
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Sign in to get started!</h1>
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Google Sign-In function
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google
      const user = result.user; // Get user info from result
      console.log("User signed in: ", user);
      setUser(user); // Set the user in state
    } catch (error) {
      console.error("Error signing in with Google: ", error.message);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />  {/* Navigation bar */}
      <Body user={user} signInWithGoogle={signInWithGoogle} />  {/* Main body */}
    </div>
  );
}

export default App;

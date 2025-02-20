import React, { useState } from "react";
import { auth, provider } from "../../firebase";
// import { auth, provider } from ".../../.././src/firebase";  // Updated Firebase import

const Login = ({ onLoginSuccess }) => {
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(provider);  // Firebase auth method
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      onLoginSuccess(userData); // Pass user data to parent
    } catch (error) {
      console.error("Error signing in: ", error);
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to TaskFlow</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign in with Google
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

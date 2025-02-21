import React, { useState, useEffect } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                <span>{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4">
            {user ? (
              <>
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
                <span className="text-lg font-medium">{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200"
              >
                Login with Google
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

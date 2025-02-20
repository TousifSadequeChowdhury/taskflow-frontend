import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300">Dashboard</a>
            <a href="#" className="hover:text-gray-300">Tasks</a>
            <a href="#" className="hover:text-gray-300">Profile</a>
          </div>

          {/* Login Button */}
          <div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

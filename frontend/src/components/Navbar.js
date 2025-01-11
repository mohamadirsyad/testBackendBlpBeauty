import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold">BlogApp</span>
        </div>
        <div>
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

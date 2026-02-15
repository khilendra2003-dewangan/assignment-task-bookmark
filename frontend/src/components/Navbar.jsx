import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Bookmark, Plus } from "lucide-react";
import api from "../api/api";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const linkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition w-full md:w-auto ${location.pathname === path
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:bg-indigo-100"
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          🔖 BookmarkApp
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700 font-medium">
                Welcome, {user.name}
              </span>
              <button
                onClick={() => navigate("/bookmark")}
                className={linkStyle("/bookmark")}
              >
                <Plus size={18} />
                Add
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-indigo-600 hover:bg-indigo-50 transition font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 pb-4 animate-fade-in-down">
          {user ? (
            <>
              <div className="px-4 py-2 text-gray-700 font-medium border-b border-gray-100 mb-2">
                Welcome, {user.name}
              </div>
              <button
                onClick={() => { navigate("/bookmark"); setIsMenuOpen(false); }}
                className={linkStyle("/bookmark")}
              >
                <Plus size={18} />
                Add New Bookmark
              </button>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition w-full"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-indigo-600 hover:bg-indigo-50 transition font-medium w-full"
              >
                Login
              </button>
              <button
                onClick={() => { navigate("/register"); setIsMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium shadow-md w-full"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

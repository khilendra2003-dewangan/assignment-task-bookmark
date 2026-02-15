import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Bookmark, Plus } from "lucide-react";
import api from "../api/api";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const linkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition ${location.pathname === path
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:bg-indigo-100"
    }`;

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
      >
        🔖 BookmarkApp
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {user?.name && (
          <span className="text-gray-700 font-medium hidden sm:block">
            Welcome, {user.name}
          </span>
        )}


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
      </div>
    </nav>
  );
};

export default Navbar;

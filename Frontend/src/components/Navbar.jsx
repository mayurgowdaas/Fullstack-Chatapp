import React from "react";
import { LogOut, Settings, User, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logOut } = useAuthStore();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav className="h-16 flex items-center px-4 bg-base-300 text-base-content shadow z-10">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <MessageCircle size={20} className="text-primary" />
          Chit-Chat
        </Link>
      </div>

      {/* Right: Nav actions */}
      <div className="flex-none flex gap-4 items-center text-sm">
        <Link
          to="/setting"
          className="flex items-center gap-1 hover:text-primary transition"
        >
          <Settings size={16} />
          Settings
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-1 hover:text-primary transition"
        >
          <User size={16} />
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 hover:text-error transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

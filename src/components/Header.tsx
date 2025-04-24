import React from "react";
import { User } from "lucide-react";

const Header: React.FC = () => {
  const hasProfileImage = false; // Replace with actual condition
  const user = {
    name: "Juan Dela Cruz",
    role: "Owner",
    profileImage: "/images/profile.jpeg",
  };

  return (
    <div className="navbar fixed top-0 bg-base-100 shadow-sm z-50 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            {hasProfileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="w-6 h-6" />
            )}
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-56 text-sm"
          >
            <li className="mb-2">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{user.name}</span>
                <span className="text-xs text-gray-500">{user.role}</span>
              </div>
            </li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#logout">Logout</a></li>
          </ul>
        </div>
      </div>

      <div className="navbar-center flex items-center justify-center gap-2">
        <img src="/images/app-logo.jpeg" alt="TindaTrack Logo" className="w-8 h-8" />
        <span className="text-lg font-bold">TindaTrack</span>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
};

export default Header;

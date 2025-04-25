import React from "react";
import { User } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useLogoutMutation } from "hooks/auth";
import { useNavigate } from "react-router-dom";
import { Role, ROLES } from "constants/roles";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const firstName = Cookies.get('firstname')
  const lastName = Cookies.get('lastname')
  const userRole = (Cookies.get('role') as Role) ?? ''

  const roleMap: Record<string, string> = {
    [ROLES.SUPER_ADMIN]: 'Super Administrator',
    [ROLES.BUSINESS_ADMIN]: 'Business Admin',
  };

  const formattedRole = roleMap[userRole] || 'Unknown';

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      toast.info("Successfully logged out.");

      Cookies.remove('auth_status');
      Cookies.remove('firstname');
      Cookies.remove('lastname');
      Cookies.remove('token');
      Cookies.remove('role');

      navigate("/login");
    },
    onError: () => {}
  });

  const onLogoutHandler = () => {
    logoutMutation.mutate({});
  };

  return (
    <div className="navbar fixed top-0 bg-base-100 shadow-sm z-50 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <User className="w-6 h-6" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-56 text-sm"
          >
            <li className="mb-2">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{`${firstName} ${lastName}`}</span>
                <span className="text-xs text-gray-500">{formattedRole}</span>
              </div>
            </li>
            <li><a onClick={onLogoutHandler}>Logout</a></li>
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

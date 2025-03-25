import React from "react";
import { FiX, FiHome, FiUser, FiTag, FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeCookie } from "../../axiosConfig/cookieFunc";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("accessToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} z-50 border-r border-gray-300 dark:border-gray-700`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <button
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-5 px-3 space-y-2">
          <SidebarLink to="/dashboard" icon={<FiHome />} label="Coupon List" />
          <SidebarLink to="/dashboard/add-coupon" icon={<FiUser />} label="Add Coupon" />
          <SidebarLink to="/dashboard/set-availability" icon={<FiTag />} label="Set Availability" />
          <SidebarLink to="/dashboard/history" icon={<FiTag />} label="History" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
          >
            <FiLogOut size={20} className="mr-3" />
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

// Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
        isActive
          ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`
    }
  >
    <span className="mr-3 text-lg">{icon}</span>
    {label}
  </NavLink>
);

export default Sidebar;
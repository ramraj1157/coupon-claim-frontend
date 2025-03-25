import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="w-full border-b-2 border-b-blue-500 py-6 px-8 sm:px-6 flex justify-between items-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      {/* App Title */}
      <Link 
        to="/" 
        className="text-2xl font-bold  text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        Claim The Coupon
      </Link>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-600 transition-colors"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
      </button>
    </header>
  );
};

export default Header;
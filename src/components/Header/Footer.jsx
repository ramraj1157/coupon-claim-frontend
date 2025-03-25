import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 px-8 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span className="text-2xl text-blue-500 font-bold tracking-tight">
            Claim The Copoun
          </span>
          <div className="flex gap-6 text-blue-500 text-lg">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
  );
};

export default Footer;

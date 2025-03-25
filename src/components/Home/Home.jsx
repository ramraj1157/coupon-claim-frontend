import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCookie } from "../../utils/cookieUtils"; // Utility function to get cookies
import Footer from "../Header/Footer";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = getCookie("accessToken"); // Check if user is logged in

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col items-center justify-center"
      >
        {/* Hero Section */}
        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-3 drop-shadow-lg">
            Exclusive Deals Await!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md">
            Get ready to unlock premium discounts and special offers.
          </p>
        </motion.section>

        {/* Buttons */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 mb-10"
        >
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 cursor-pointer rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-transform duration-200"
            >
              Go to Dashboard
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="px-6 py-3 cursor-pointer rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-transform duration-200"
            >
              Login as Admin
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/claim")}
            className="px-6 py-3 cursor-pointer rounded-lg bg-cyan-600 text-white font-semibold shadow-md hover:bg-cyan-700 transition-transform duration-200"
          >
            Claim Your Coupon
          </motion.button>
        </motion.div>

        {/* Rules Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 text-center">
            Redemption Rules
          </h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-3 text-base">
            <li className="list-disc">Each user is eligible for one coupon only.</li>
            <li className="list-disc">Coupons must be redeemed before their expiration date.</li>
            <li className="list-disc">Unauthorized distribution of coupons is not allowed.</li>
            <li className="list-disc">Admins reserve the right to revoke coupons if necessary.</li>
          </ul>
        </motion.section>
      </motion.div>

      <Footer />
    </>
  );
};

export default Home;

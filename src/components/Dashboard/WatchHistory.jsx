import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { motion } from "framer-motion";

const WatchHistory = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axiosInstance.get("/claim/all");
        if (response.data) {
          console.log("data: ", response.data);
          setClaims(response.data);
        }
      } catch (err) {
        setError("Failed to fetch claim history.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-300 dark:border-gray-800 mt-12"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-semibold mb-5 text-blue-600 dark:text-blue-400 text-center"
      >
        📜 Coupon Claim History
      </motion.h2>

      {loading ? (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-blue-500 dark:text-blue-300 text-center"
        >
          Loading...
        </motion.p>
      ) : error ? (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-red-500 text-center"
        >
          {error}
        </motion.p>
      ) : claims.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-blue-500 dark:text-blue-300 text-center"
        >
          No claims found.
        </motion.p>
      ) : (
        <div className="overflow-x-auto">
          <motion.table 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg"
          >
            <thead className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
              <tr className="text-left text-sm sm:text-base">
                <th className="p-3 border-b dark:border-gray-800">Coupon Code</th>
                <th className="p-3 border-b dark:border-gray-800">Claimed By (IP)</th>
                <th className="p-3 border-b dark:border-gray-800">Date</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <motion.tr
                  key={claim._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`transition-colors duration-200 ${
                    index % 2 === 0
                      ? "bg-blue-50 dark:bg-blue-800"
                      : "bg-white dark:bg-blue-900"
                  } hover:bg-blue-200 dark:hover:bg-blue-700`}
                >
                  <td className="p-3 border-b dark:border-gray-800 font-mono text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                    {claim?.couponId?.code || "N/A"}
                  </td>
                  <td className="p-3 border-b dark:border-gray-800 text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                    {claim.ip || "Unknown"}
                  </td>
                  <td className="p-3 border-b dark:border-gray-800 text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                    {new Date(claim.claimedAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      )}
    </motion.div>
  );
};

export default WatchHistory;

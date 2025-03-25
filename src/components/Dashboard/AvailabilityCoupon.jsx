import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Availability() {
  const [coupons, setCoupons] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // ✅ Fetch Coupons from API
  const fetchCoupons = async () => {
    try {
      setLoadingAvailability(true);
      const response = await axiosInstance.get("/coupon/all");
      if (response.data) setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ✅ Toggle Coupon Availability
  const toggleAvailability = async (couponId) => {
    setLoadingId(couponId);

    try {
      const response = await axiosInstance.get(`/coupon/toggle/${couponId}`);
      if (response.data) {
        setCoupons((prevCoupons) =>
          prevCoupons.map((coupon) =>
            coupon._id === couponId
              ? { ...coupon, isAvailable: !coupon.isAvailable }
              : coupon
          )
        );
        toast.success("Availability toggled successfully!");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error("Failed to toggle availability.");
    }

    setLoadingId(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-8"
    >
      {/* Availability Heading */}
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8"
      >
        Manage Availability
      </motion.h1>

      {/* Loading Indicator */}
      {loadingId && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full absolute top-12 max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700"
        >
          <h2 className="text-lg text-center font-semibold text-blue-600 dark:text-blue-400 animate-pulse">
            Toggling Availability...
          </h2>
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-6">
          Coupons List
        </h2>

        {loadingAvailability ? (
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading...</span>
          </div>
        ) : (
          <>
            {coupons.length > 0 ? (
              <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                {coupons.map((coupon) => (
                  <motion.li 
                    key={coupon._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between px-4 py-3 rounded-lg transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm"
                  >
                    <span className="font-mono text-lg text-gray-900 dark:text-gray-200">
                      {coupon.code}
                    </span>

                    {/* Toggle Switch */}
                    <motion.button
                      onClick={() => toggleAvailability(coupon._id)}
                      disabled={loadingId === coupon._id}
                      className={`relative cursor-pointer w-16 h-8 flex items-center rounded-full transition-all duration-300 ease-in-out shadow-md ${
                        coupon.isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {/* Sliding Circle */}
                      <motion.div
                        className="absolute w-6 h-6 bg-white rounded-full shadow-md"
                        animate={{ x: coupon.isAvailable ? 24 : 0 }}
                        transition={{ duration: 0.2 }}
                      />

                      <span
                        className={`absolute w-full text-xs font-semibold text-white text-center transition-opacity ${
                          loadingId === coupon._id ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {coupon.isAvailable ? "ON" : "OFF"}
                      </span>
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 dark:text-gray-400 text-center text-lg"
              >
                No coupons available.
              </motion.p>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Availability;
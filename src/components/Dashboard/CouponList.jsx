import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";

const CouponsList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/coupon/all");
        if (response.data) {
          setCoupons(response.data);
        }
      } catch (err) {
        setError("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const openEditModal = (coupon) => setSelectedCoupon({ ...coupon });
  const handleInputChange = (e) =>
    setSelectedCoupon({ ...selectedCoupon, code: e.target.value });

  const toggleIsClaimed = () => {
    const coupon = coupons.find((c) => c._id === selectedCoupon._id);
    if (selectedCoupon.isClaimed && !coupon.claimedByIp) {
      toast.warn("Cannot toggle claim this coupon");
      return;
    }
    setSelectedCoupon((prev) => ({ ...prev, isClaimed: !prev.isClaimed }));
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.put(
        `/coupon/update/${selectedCoupon._id}`,
        {
          code: selectedCoupon.code,
          isClaimed: selectedCoupon.isClaimed,
        }
      );

      if (response.data) {
        toast.success("Coupon updated successfully!");
        setCoupons((prev) =>
          prev.map((coupon) =>
            coupon._id === selectedCoupon._id ? selectedCoupon : coupon
          )
        );
        setSelectedCoupon(null);
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCoupons = coupons.filter((coupon) => {
    if (filter === "claimed") return coupon.isClaimed;
    if (filter === "unclaimed") return !coupon.isClaimed;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto w-full p-6 rounded-lg shadow-lg bg-white dark:bg-black border-1 border-gray-900 mt-12"
    >
      <motion.h2 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-2xl text-center font-bold mb-4 text-blue-600 dark:text-blue-400"
      >
        Coupons List
      </motion.h2>

      <div className="mb-4">
        <label className="block text-blue-700 dark:text-blue-300 font-medium">
          Filter by:
        </label>
        <motion.select
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-1 w-full p-2 border dark:border-gray-600 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="claimed">Claimed</option>
          <option value="unclaimed">Unclaimed</option>
        </motion.select>
      </div>

      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="w-full text-center text-blue-500"
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
            Available Coupons
          </h3>
          {filteredCoupons.length > 0 ? (
            <ul className="space-y-2">
              {filteredCoupons.map((coupon) => (
                <motion.li
                  key={coupon._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 flex justify-between items-center bg-gray-100 dark:bg-gray-800 border-l-4 rounded-lg transition-all hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${coupon.isClaimed ? "bg-red-500" : "bg-green-500"}`} />
                    <span className="font-mono text-blue-700 dark:text-blue-300">
                      {coupon.code}
                    </span>
                  </div>
                  <button
                    onClick={() => openEditModal(coupon)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-2 rounded-md"
                  >
                    <FaEdit size={18} />
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-blue-500 dark:text-blue-300 text-sm">No coupons available.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CouponsList;

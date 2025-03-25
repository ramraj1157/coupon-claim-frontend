import { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const [codes, setCodes] = useState([""]); // Start with one empty field
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle input change
  const handleInputChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  // ✅ Add a new input field
  const addField = () => {
    setCodes([...codes, ""]);
  };

  // ✅ Submit to backend
  const submitCoupons = async () => {
    if (codes.some(code => code.trim() === "")) {
      setMessage("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/coupon/add", { codes });
      if (res.data) {
        console.log("res:", res.data);
        toast.success("Coupons added successfully!");
        setCodes([""]); // Reset input fields after successful submission
      }
    } catch (err) {
      setMessage("Error adding coupons.");
      toast.error("Failed to add coupons.");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-12"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 text-center"
      >
        Add Coupons
      </motion.h2>

      {codes.map((code, index) => (
        <motion.input
          key={index}
          type="text"
          value={code}
          onChange={(e) => handleInputChange(index, e.target.value)}
          placeholder={`Coupon Code ${index + 1}`}
          className="w-full mb-3 p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        />
      ))}

      {/* Add Another Button */}
      <motion.button 
        onClick={addField} 
        className="w-full p-3 rounded-md text-white font-medium
                   bg-blue-500 cursor-pointer
                   hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        + Add Another
      </motion.button>

      {/* Submit Button */}
      <motion.button 
        onClick={submitCoupons} 
        className="w-full p-3 mt-3 rounded-md text-white font-medium
                   bg-gradient-to-r from-green-500 to-teal-500 cursor-pointer
                   hover:from-green-600 hover:to-teal-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Submitting..." : "Submit Coupons"}
      </motion.button>

      {/* Message Display */}
      {message && <motion.p 
        className="mt-4 text-center text-blue-700 dark:text-blue-300 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {message}
      </motion.p>}
    </motion.div>
  );
};

export default AddCoupon;

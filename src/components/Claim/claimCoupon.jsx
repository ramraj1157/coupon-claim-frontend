import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { FaTicketAlt } from "react-icons/fa";
import { MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { BsLightningFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const ClaimCoupon = () => {
  const [claimedCoupon, setClaimedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClaimCoupon = async () => {
    setLoading(true);
    setError("");
    setClaimedCoupon(null);

    try {
      const sessionId = sessionStorage.getItem("sessionId");
      if (!sessionId) {
        toast.error("Please refresh the page to initialize your session");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/claim/claim", {
        userSession: sessionId,
      });

      if (response.data) {
        setClaimedCoupon(response.data.couponCode);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to claim coupon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="dark:bg-black">
     <div className="max-w-md mx-auto p-4 min-h-screen flex flex-col bg-white dark:bg-gray-950">
  {/* Header */}
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
      <BsLightningFill className="text-blue-500" />
      Claim Your Coupon
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      Get your exclusive discount code in one click
    </p>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col justify-center">
    {claimedCoupon ? (
      <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg flex flex-col items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <FaTicketAlt className="text-xl" />
          <span className="font-medium">Coupon Claimed!</span>
        </div>
        <div className="font-mono bg-white dark:bg-gray-800 px-4 py-2 rounded-md border border-blue-300 dark:border-blue-600 text-lg font-bold text-blue-800 dark:text-blue-300">
          {claimedCoupon}
        </div>
      </div>
    ) : (
      <button
        onClick={handleClaimCoupon}
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-70 disabled:cursor-not-allowed mb-6 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {loading ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <FaTicketAlt />
            Claim Your Coupon
          </>
        )}
      </button>
    )}

    {error && (
      <div className="flex items-start gap-2 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 mb-6">
        <MdErrorOutline className="flex-shrink-0 mt-0.5" />
        <span>{error}</span>
      </div>
    )}
  </div>

  {/* Info Section */}
  <div className="mt-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700">
    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
      <MdInfoOutline className="text-blue-500" />
      How It Works
    </h3>
    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
      <li className="flex gap-2">
        <span className="text-blue-500">•</span>
        Coupons are assigned sequentially and uniquely to each user
      </li>
      <li className="flex gap-2">
        <span className="text-blue-500">•</span>
        No login required - instant access to your discount
      </li>
      <li className="flex gap-2">
        <span className="text-blue-500">•</span>
        Anti-abuse protections:
        <ul className="ml-4 mt-1 space-y-2">
          <li className="flex gap-2">
            <span className="text-blue-400">◦</span>
            IP address tracking prevents duplicate claims
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">◦</span>
            Browser session cookies ensure fair distribution
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
   </div>

  );
};

export default ClaimCoupon;
import { useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { setCookie } from "../../axiosConfig/cookieFunc";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = isLogin ? "user/login" : "user/register";

    try {
      const response = await axiosInstance.post(url, formData);
      if (response.data) {
        const { user, token } = response.data;
        setCookie("accessToken", token);
        dispatch(login({ user }));
        toast.success("Successfully Logged in");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400"
        >
          {isLogin ? "Login" : "Sign Up"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(formData).map((key, index) => (
            (key !== "email" || !isLogin) && (
              <motion.input
                key={key}
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChange={handleChange}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
                required
              />
            )
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg text-white font-medium bg-blue-500 cursor-pointer hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin text-lg" /> : isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <motion.button
          onClick={() => setIsLogin(!isLogin)}
          whileHover={{ scale: 1.05 }}
          className="mt-6 cursor-pointer block w-full text-center text-blue-500 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-500 transition-all"
        >
          {isLogin ? "Don't have an account yet? Sign Up" : "Already have an account? Login"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default AuthForm;

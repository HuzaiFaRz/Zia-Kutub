import { useState } from "react";
import { FaEye, FaRegistered } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router";
import api from "../api/axios";

const Sign_Up = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(["Salam! Kese hain Ap", true]);
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signup_input_Handler = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const signup_Handler = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupForm;
    try {
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        setMsg(["No empty fields allowed", false]);
        return;
      }
      if (/^\s|\s$|\s{2,}/.test(name)) {
        setMsg(["No extra spaces allowed in name", false]);
        return;
      }

      if (password.includes(" ")) {
        setMsg(["No spaces allowed in password", false]);
        return;
      }
      if (name.length < 3) {
        setMsg(["No names shorter than 3 characters", false]);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMsg(["No invalid email formats allowed", false]);
        return;
      }
      if (password.length < 8) {
        setMsg(["No passwords shorter than 8 characters", false]);
        return;
      }
      setLoading(true);
      const res = await api.post("/auth/signup", signupForm);
      setMsg([res.data.message, res.data.success]);
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error.response?.data?.message);
      setMsg([error.response?.data?.message || "An error Occurred", false]);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to get started with Zia-Kutub
          </p>
        </div>

        {/* Error Message Display Example */}
        <div
          className={`mb-4 p-3 border ${msg[1] ? "bg-green-50 border-green-400 text-green-400" : "bg-red-50 border-red-400 text-red-700"} text-sm rounded-lg`}
        >
          {msg[0]}
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={signup_Handler}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              disabled={loading}
              type="text"
              placeholder="John Doe"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none border-gray-300"
              onChange={signup_input_Handler}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              disabled={loading}
              type="email"
              placeholder="example@gmail.com"
              name="email"
              className="w-full font-mono px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none border-gray-300"
              onChange={signup_input_Handler}
              required
            />
          </div>

          {/* Password Field with Eye Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                disabled={loading}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none border-gray-300 pr-10"
                onChange={signup_input_Handler}
                required
              />
              <button
                disabled={loading}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex justify-center items-center gap-4"
          >
            {loading ? "Please Wait" : "Sign Up"}
            {loading ? (
              <AiOutlineLoading3Quarters size={20} className="animate-spin" />
            ) : (
              <FaRegistered size={20} />
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink
            to={"/login"}
            className="text-indigo-600 font-medium hover:underline"
          >
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Sign_Up;

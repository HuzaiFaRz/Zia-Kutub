import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  Eye,
  EyeOff,
  IdCard,
  LoaderCircle,
  Lock,
  Mail,
  MailBadge,
} from "lucide-react";

const Sign_Up = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(["Hello!", true]);
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
    <div className="h-full flex items-center justify-center p-2">
      <div className="w-full max-w-125 bg-mehroon rounded-2xl shadow-lg p-5 sm:p-8">
        {/* Heading */}
        <div className="text-center mb-6 text-beige">
          <h2 className="text-3xl font-bold font-playfair-bold">
            Create an Account
          </h2>
          <p className="text-sm text-beige/70 mt-1 font-lato-regular">
            Sign up to get started with Zia-Kutub
          </p>
        </div>

        {/* Error Message Display Example */}
        <div
          className={`mb-4 p-3 text-lg font-cinzel-bold border bg-beige text-mehroon`}
        >
          {msg[0]}
        </div>

        {/* Form Fields */}
        <form className="space-y-6" onSubmit={signup_Handler}>
          {/* Name Field */}
          <div>
            <label
              className="block text-sm font-medium text-beige/70 mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative w-full">
              <IdCard className="absolute left-2 top-1/2 -translate-y-1/2 text-beige/80 size-6" />

              <input
                disabled={loading}
                type="text"
                placeholder="John Doe"
                id="name"
                name="name"
                className="w-full px-10 py-3 outline-0 bg-brown border-b border-l border-beige/70 text-beige"
                onChange={signup_input_Handler}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-beige/70 mb-1"
            >
              Email Address
            </label>

            <div className="relative w-full">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-beige/80 size-6" />
              <input
                disabled={loading}
                type="email"
                placeholder="example@gmail.com"
                id="email"
                name="email"
                className="w-full px-10 py-3 outline-0 bg-brown border-b border-l border-beige/70 text-beige"
                onChange={signup_input_Handler}
                required
              />
            </div>
          </div>

          {/* Password Field with Eye Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-beige/70 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 text-beige/80 size-6" />

              <input
                disabled={loading}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                id="password"
                name="password"
                className="w-full px-10 py-3 outline-0 bg-brown border-b border-l border-beige/70 text-beige"
                onChange={signup_input_Handler}
                required
              />
              <button
                disabled={loading}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-beige/60 hover:text-beige/70 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-beige text-mehroon font-playfair-bold font-extrabold py-2 text-lg sm:text-xl flex items-center justify-center gap-3"
          >
            <span>{loading ? "Please Wait" : "Sign Up"}</span>

            {loading ? (
              <LoaderCircle size={20} className="animate-spin" />
            ) : (
              <MailBadge size={20} />
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-beige/60 mt-6">
          Already have an account?{" "}
          <NavLink to={"/login"} className="text-beige font-medium underline">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Sign_Up;

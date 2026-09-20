import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Eye, EyeOff, LoaderCircle, Lock, Mail, UserKey } from "lucide-react";

const Log_In = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(["Hello!", true]);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const login_input_Handler = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const login_Handler = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    try {
      if (!email?.trim() || !password?.trim()) {
        setMsg(["No empty fields allowed", false]);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMsg(["No invalid email formats allowed", false]);
        return;
      }
      setLoading(true);
      const res = await api.post("/auth/login", loginForm);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
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
            Welcome Back
          </h2>
          <p className="text-sm text-beige/70 mt-1 font-lato-regular">
            Sign in to access your account
          </p>
        </div>

        {/* Error Message Display */}
        <div
          className={`mb-4 p-3 text-lg font-cinzel-bold border bg-beige text-mehroon`}
        >
          {msg[0]}
        </div>

        {/* Form Fields */}
        <form
          className="space-y-4 flex flex-col gap-5"
          onSubmit={login_Handler}
        >
          {/* Email Field */}
          <div className="flex flex-col justify-center items-start mb-1 w-full">
            <label
              className="block text-sm font-medium text-beige/70 mb-1"
              htmlFor="email"
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
                onChange={login_input_Handler}
                required
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-start mb-1 w-full">
            <label
              className="block text-sm font-medium text-beige/70 mb-1"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative w-full">
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 text-beige/80  size-6" />
              <input
                disabled={loading}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                id="password"
                name="password"
                className="w-full px-10 py-3 outline-0 bg-brown border-b border-l border-beige/70 text-beige"
                onChange={login_input_Handler}
                required
              />
              <button
                disabled={loading}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
            <span> {loading ? "Please Wait" : "Log in"}</span>

            {loading ? (
              <LoaderCircle size={20} className="animate-spin" />
            ) : (
              <UserKey size={20} />
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-beige/60 mt-6">
          Don't have an account?{" "}
          <NavLink to={"/sign-up"} className="text-beige font-medium underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Log_In;

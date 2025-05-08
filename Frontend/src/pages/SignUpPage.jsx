import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/authImagePatttern";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

export default function CreateAccount() {
  const { signUp, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation === true) signUp(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0b14] text-yellow-100">
      <div className="flex w-full max-w-6xl rounded-xl overflow-hidden shadow-lg">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 bg-[#1a141f] p-10">
          <div className="mb-6 flex items-center space-x-2">
            <MessageSquare className="text-yellow-400 text-2xl font-bold" />
            <div className="text-yellow-400 text-2xl font-bold"> Chit-Chat</div>
          </div>
          <h2 className="text-2xl font-semibold mb-1">Create Account</h2>
          <p className="text-sm mb-6 text-yellow-200">
            Stay connected with your friends
          </p>

          <form onSubmit={handelSubmit} className="space-y-5">
            {/* Full Name */}
            <label className="text-yellow-300 text-xl">Full Name</label>

            <div className="relative">
              <User className="absolute left-3 top-3 text-yellow-300" />{" "}
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="Your Name"
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-yellow-400"
              />
            </div>

            {/* Email */}
            <label className="text-yellow-300 text-xl">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-yellow-300" />
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-yellow-400"
              />
            </div>

            {/* Password */}
            <label className="text-yellow-300 text-xl">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-yellow-300" />
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 bg-transparent border border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-yellow-400"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeOff className="absolute right-3 top-3 text-yellow-400 cursor-pointer" />
                ) : (
                  <Eye className="absolute right-3 top-3 text-yellow-400 cursor-pointer" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 underline hover:text-yellow-500"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Right: Community Section */}
        <AuthImagePattern />
      </div>
    </div>
  );
}

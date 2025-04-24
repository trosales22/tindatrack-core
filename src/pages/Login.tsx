import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation to the registration page

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex justify-center items-center py-12 bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 bg-opacity-80">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {/* Logo Image */}
          <img src="/images/app-logo.jpeg" alt="TindaTrack Logo" className="w-12 h-12" />
          <h2 className="text-3xl font-bold text-primary">TindaTrack</h2>
        </div>
        
        {/* Welcome Text */}
        <p className="text-center text-gray-600 mb-6 text-lg">
        Welcome! Please log in to get started.
        </p>

        <form className="space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label htmlFor="email" className="label text-sm font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full p-3 text-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label htmlFor="password" className="label text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full p-3 text-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full py-3 rounded-md text-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              Login
            </button>
          </div>

          {/* Forgot Password and Register Links */}
          <div className="flex justify-between items-center mt-4">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
            <Link to="/register" className="text-sm text-primary hover:underline">Don't have an account? Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

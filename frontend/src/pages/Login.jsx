import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ TEMPORARY DEMO LOGIN
  // Real JWT auth will be connected tomorrow
  const handleLogin = async () => {
    try {
      setError("");

      // Store demo token
      localStorage.setItem("token", "demo-token");

      // Store email
      localStorage.setItem("userEmail", email);

      // Redirect
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center">

      <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px]">

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          ML Advisor
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Sign in to your account
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center mb-4">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full mb-6 p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="password"
          className="w-full mb-6 p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white font-semibold text-xl hover:opacity-90 transition"
        >
          Sign In
        </button>

      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple validation (optional)
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // ✅ SAVE LOGIN STATE
    localStorage.setItem("isLoggedIn", "true");

    // (Optional: store email for later use)
    localStorage.setItem("userEmail", email);

    // ✅ REDIRECT
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center">
      
      <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px]">
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          ML Advisor
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Sign in to your account
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white font-semibold hover:opacity-90"
        >
          Sign In
        </button>

      </div>
    </div>
  );
}
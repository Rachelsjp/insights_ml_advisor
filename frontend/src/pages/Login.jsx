import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(
        "http://127.0.0.1:8000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("userEmail", email);

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Invalid login credentials");
    }
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

        {error && (
          <p className="text-red-400 text-center mb-3">{error}</p>
        )}

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
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white font-semibold"
        >
          Sign In
        </button>

      </div>
    </div>
  );
}
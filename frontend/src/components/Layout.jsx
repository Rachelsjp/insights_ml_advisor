import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  // Get email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  // Extract name from email (rachel@gmail.com → Rachel)
  const userName = userEmail
    ? userEmail.split("@")[0].charAt(0).toUpperCase() +
      userEmail.split("@")[0].slice(1)
    : "User";

  const handleLogout = () => {
    // ✅ Remove JWT token (IMPORTANT)
    localStorage.removeItem("token");

    // Cleanup user info
    localStorage.removeItem("userEmail");

    // Redirect to login
    navigate("/");
  };

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 min-h-screen p-4 text-white">
        
        <h2 className="text-xl font-bold mb-1">✨ ML Advisor</h2>

        {/* Welcome */}
        <p className="text-purple-400 text-sm mb-6">
          Welcome, {userName} 👋
        </p>

        {/* Navigation */}
        <div
          className="mb-4 cursor-pointer hover:text-purple-400"
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </div>

        <div
          className="mb-4 cursor-pointer hover:text-purple-400"
          onClick={() => navigate("/chat")}
        >
          💬 AI Assistant
        </div>

        {/* Logout */}
        <div
          className="text-red-400 cursor-pointer hover:text-red-300"
          onClick={handleLogout}
        >
          🚪 Logout
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black min-h-screen">
        {children}
      </div>
    </div>
  );
}
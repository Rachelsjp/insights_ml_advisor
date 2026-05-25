import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear fake login (for now)
    localStorage.removeItem("isLoggedIn");

    // Redirect to login
    navigate("/");
  };

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 min-h-screen p-4 text-white">
        
        <h2 className="text-xl font-bold mb-6">✨ ML Advisor</h2>

        <div
          className="mb-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </div>

        <div
          className="mb-4 cursor-pointer"
          onClick={() => navigate("/chat")}
        >
          💬 AI Assistant
        </div>

        <div
          className="text-red-400 cursor-pointer"
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
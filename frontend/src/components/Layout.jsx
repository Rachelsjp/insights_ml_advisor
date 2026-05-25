import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-5 flex flex-col">
        
        <h1 className="text-xl font-bold mb-8 text-purple-400">
          ✨ ML Advisor
        </h1>

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-purple-400">
            📊 Dashboard
          </Link>

          <Link to="/chat" className="hover:text-purple-400">
            💬 AI Assistant
          </Link>

          <Link to="/" className="mt-auto text-red-400">
            🚪 Logout
          </Link>
        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}
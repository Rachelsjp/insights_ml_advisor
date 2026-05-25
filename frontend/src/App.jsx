import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

// ✅ Check login state
const isLoggedIn = localStorage.getItem("isLoggedIn");

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/" />
          }
        />

        {/* Protected Chat */}
        <Route
          path="/chat"
          element={
            isLoggedIn ? <Chat /> : <Navigate to="/" />
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}
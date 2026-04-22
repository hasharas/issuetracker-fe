import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import Navbar from "./components/ui/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import CreateIssuePage from "./pages/CreateIssuePage";
import Spinner from "./components/ui/Spinner";

const ProtectedRoute = ({ children }) => {
      const { token } = useAuthStore();
      return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
      const { token } = useAuthStore();
      return !token ? children : <Navigate to="/dashboard" replace />;
};

export default function App() {
      const { token, fetchMe, loading } = useAuthStore();

      useEffect(() => {
            if (token) fetchMe();
      }, []);

      if (loading) return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                  <Spinner size="lg" />
            </div>
      );

      return (
            <div className="min-h-screen bg-zinc-950">
                  {token && <Navbar />}
                  <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/issues/new" element={<ProtectedRoute><CreateIssuePage /></ProtectedRoute>} />
                        <Route path="/issues/:id" element={<ProtectedRoute><IssueDetailPage /></ProtectedRoute>} />
                  </Routes>
            </div>
      );
}
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Recommender from "./pages/Recommender";
import History from "./pages/History";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>

      {/* Smart Default Route */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      <Route
        path="/recommender"
        element={<ProtectedRoute><Recommender /></ProtectedRoute>}
      />

      <Route
        path="/history"
        element={<ProtectedRoute><History /></ProtectedRoute>}
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

    </Routes>
  );
}
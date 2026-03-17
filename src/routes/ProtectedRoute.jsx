import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ FIXED PATH

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Optional safety check (prevents crash if context fails)
  if (user === undefined) {
    return null;
  }

  return user ? children : <Navigate to="/login" />;
}
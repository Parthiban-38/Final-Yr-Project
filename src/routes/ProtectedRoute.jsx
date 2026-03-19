import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Show loading while checking auth
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // If not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → show page
  return children;
}
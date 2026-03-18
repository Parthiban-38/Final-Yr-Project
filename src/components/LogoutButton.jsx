// src/components/LogoutButton.jsx
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to log out. Try again.");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
}
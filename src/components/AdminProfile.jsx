

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminProfile.css";

const Menu = () => <span style={{ fontSize: "24px" }}>☰</span>;
const X = () => <span style={{ fontSize: "24px" }}>✕</span>;

function AdminProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // ==================== SAFE ADMIN DATA PARSER ====================
  const getAdminData = () => {
    try {
      const stored = localStorage.getItem("admin");
      if (!stored) return null;

      const parsed = JSON.parse(stored);

      // Make sure it's a real object, not true/false or string
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
      return null;
    } catch (error) {
      console.error("Failed to parse admin data from localStorage:", error);
      return null;
    }
  };

  const admin = getAdminData() || {
    name: "Administrator",
    email: "admin@school.com",
  };

  // ==================== HANDLERS ====================
  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminAuth");
    alert("Logged out successfully");
    navigate("/admin-login");
  };

  const goToDashboard = () => {
    navigate("/admin");
  };

  return (
    <>
      {/* DESKTOP/TABLET PROFILE */}
      <div className="admin-profile desktop-admin-profile">
        <div className="admin-left">
          <div className="admin-avatar">
            {admin.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="admin-info">
            <h3>{admin.name}</h3>
            <p>{admin.email}</p>
          </div>
        </div>

        <div className="admin-actions">
          {location.pathname !== "/admin" && (
            <button className="dashboard-btn" onClick={goToDashboard}>
              Dashboard
            </button>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="mobile-admin-navbar">
        <div className="mobile-admin-left">
          <div className="admin-avatar small-avatar">
            {admin.name?.charAt(0) || "A"}
          </div>
          <span>Admin</span>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-admin-menu">
          <p>{admin.email}</p>
          {location.pathname !== "/admin" && (
            <button className="dashboard-btn" onClick={goToDashboard}>
              Dashboard
            </button>
          )}

          <button
            className="logout-btn mobile-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default AdminProfile;
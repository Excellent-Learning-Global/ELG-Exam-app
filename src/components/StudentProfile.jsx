import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";

function StudentProfile() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const Menu = () => <span style={{ fontSize: "24px" }}>☰</span>;

  const X = () => <span style={{ fontSize: "24px" }}>✕</span>;

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };
    const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="student-profile-card desktop-profile">
        <div className="profile-left">
          <div className="student-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div className="student-details">
            <h3>{user?.name || "Student"}</h3>
            <p>{user?.email || "No Email"}</p>
          </div>
        </div>
        {location.pathname !== "/dashboard" && (
            <button
              className="dashboard-btn"
              onClick={goToDashboard}
            >
              Dashboard
            </button>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="mobile-navbar">
        <div className="mobile-brand">
          <div className="student-avatar small-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <span>{user?.name || "Student"}</span>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <p>{user?.email || "No Email"}</p>

          {location.pathname !== "/dashboard" && (
            <button
              className="dashboard-btn"
              onClick={goToDashboard}
            >
              Dashboard
            </button>
          )}
          <button className="logout-btn mobile-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default StudentProfile;
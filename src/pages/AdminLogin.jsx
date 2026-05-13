import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple hardcoded admin for now
    if (email === "admin@school.com" && password === "admin123") {
      
      const adminData = {
        name: "Administrator",
        email: email,
        role: "admin",           // Good to add this
        loggedInAt: new Date().toISOString()
      };

      localStorage.setItem("admin", JSON.stringify(adminData));
      
      // Optional: You can also store a simple auth flag
      localStorage.setItem("adminAuth", "true");

      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="School Logo" />
          <h1>Admin Login</h1>
        </div>

        {/* <h2>Admin Login</h2> */}

        <input
          type="email"
          placeholder="Admin Email"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
    </div>
  );
}

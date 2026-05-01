import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
   
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("studentName", name);
    navigate("/dashboard");
  };
  return (
  <div className="auth-container">
    <form onSubmit={handleLogin} className="auth-card">
      <div className="auth-logo">
        <img src={logo} alt="School Logo" />
        <h1>CBT Examination System</h1>
      </div>

      <h2>Student Login</h2>

      <input
        type="email"
        placeholder="Email"
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
      <p className="auth-link">
        Don’t have an account? <span onClick={() => navigate("/Signup")}>Sign Up</span>
      </p>
    </form>
  </div>
);
}

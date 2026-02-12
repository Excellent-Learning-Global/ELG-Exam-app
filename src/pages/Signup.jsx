import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.jpg";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    parentEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, parentEmail, password } = formData;

        if (!name || !email || !parentEmail || !password) {
            alert("All fields are required!");
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Invalid student email format");
            return;
        }

        if (!emailRegex.test(parentEmail)) {
            alert("Invalid parent email format");
            return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate student email
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
        alert("Email already registered!");
        return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    navigate("/login");
    };

  return (

    <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-card">
        <div className="auth-logo">
            <img src={logo} alt="School Logo" />
            <h1>CBT Examination System</h1>
        </div>
            
        <h2>Student Signup</h2>

        <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="auth-input"
            onChange={handleChange}
        />

        <input
            type="email"
            name="email"
            placeholder="Student Email"
            className="auth-input"
            onChange={handleChange}
        />

        <input
            type="email"
            name="parentEmail"
            placeholder="Parent's Email (Required)"
            className="auth-input"
            onChange={handleChange}
            required
        />

        <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            onChange={handleChange}
        />

        <button type="submit" className="auth-btn">
            Sign Up
        </button>

        <div className="auth-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
        </div>
        </form>
    </div>
);
}

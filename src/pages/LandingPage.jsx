import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./LandingPage.css";
import logo from "../assets/logo.jpg";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">

        <div className="logo-area">
          <img src={logo} alt="Logo" className="logo" />
          <p>Excellent Learning Global Testing Platform</p>
        </div>

        <div className="landing-content">
          <h2>Welcome</h2>
          <p>Select how you want to continue</p>

          <div className="landing-buttons">
            <Button onClick={() => navigate("/login")}>
              Continue as Student
            </Button>
            <p style={{ margin: "0px auto", color: "#777" }}>OR</p>
            <Button
              type="secondary"
              onClick={() => navigate("/admin-login")}
            >
              Admin Panel
            </Button>
          </div>
        </div>
        <p style={{ marginTop: "20px", color: "#777" }}>
            Admin access is restricted
        </p>
      </div>
    </div>
  );
}

export default Landing;
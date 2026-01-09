function Button({
  children,
  onClick,
  type = "primary",
  disabled = false
}) {
  const styles = {
    primary: {
      background: "#3B0A72",
      color: "#FFFFFF"
    },
    secondary: {
      background: "#6C63FF",
      color: "#FFFFFF"
    },
    outline: {
      background: "transparent",
      color: "#3B0A72",
      border: "1px solid #3B0A72"
    },
    danger: {
      background: "#dc2626",
      color: "#FFFFFF"
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        fontSize: "14px",
        margin: "15px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease",
        ...styles[type]
      }}
      onMouseOver={(e) => {
        if (!disabled && type === "primary") {
          e.target.style.background = "#2E0859";
        }
      }}
      onMouseOut={(e) => {
        if (!disabled && type === "primary") {
          e.target.style.background = "#3B0A72";
        }
      }}
    >
      {children}
    </button>
  );
}

export default Button;

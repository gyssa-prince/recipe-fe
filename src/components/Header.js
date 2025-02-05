// Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("auth"); // Check if the user is logged in

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the authentication token
    navigate("/sign-in"); // Redirect to the sign-in page
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.button}>
            Sign Out
          </button>
        ) : (
          <Link to="/sign-in" style={styles.link}>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

// Styles
const styles = {
  header: {
    backgroundColor: "#2d3748",
    padding: "20px 8%",
    color: "#fff",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Header;
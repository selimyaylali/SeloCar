import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ReactComponent as LoginIcon } from "../assets/login.svg";
import "./styles/NavBar.scss";

const NavBar = ({ showLoginButton = true ,centerLogo= false}) => { 
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const logoClass = centerLogo ? "navbar-logo-centered" : "navbar-logo";

  return (
    <div className="navbar">
      <img
        src={logo}
        alt="Logo"
        className={logoClass}
        onClick={navigateToHome}
      />
      {showLoginButton && (
        <div className="login-section" onClick={navigateToLogin}>
          <LoginIcon className="navbar-login-icon" />
          <span className="login-text">Sign in | Register</span>
        </div>
      )}
    </div>
  );
};

export default NavBar;

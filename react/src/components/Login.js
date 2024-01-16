import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.scss";

const Login = ({ onLoginSuccess }) => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage({ text: "", type: "" });
    setIsLoggingIn(false);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        { email, password }
      );
      onLoginSuccess(response.data);
      setMessage({ text: "Successfully signed in!", type: "success" });
      setIsLoggingIn(true);

      const id = setTimeout(() => {
        setIsLoggingIn(false);
        navigate("/", { state: { username: response.data.user.name } });
      }, 3000);
      setTimeoutId(id);
    } catch (error) {
      setMessage({ text: "Incorrect password. Please try again.", type: "error" });
    }
  };

  return (
    <div>
      <h2>Sign in </h2>
      <form className="login-form-container" onSubmit={handleLogin}>
        <div>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      {message.text && (
        <div className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </div>
      )}
      {isLoggingIn && (
        <div className="redirecting-message">
          <div className="loading-spinner"></div>
          <span>Heading you to the home page...</span>
        </div>
      )}
    </div>
  );
};

export default Login;

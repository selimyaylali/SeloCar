import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Register.scss";

const Register = ({ onRegisterSuccess }) => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [timeoutId, setTimeoutId] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = () => {
    // Ensure password has at least 8 characters, 1 number, 1 non-alphanumeric character
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(formData.password);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage({ text: "", type: "" });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    if (!validatePassword()) {
      setMessage({
        text: "Password does not meet the complexity requirements.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        city: formData.city,
      });

      if (response.status === 201) {
        try {
          onRegisterSuccess(response.data);
          setMessage({ text: "Successfully registered!", type: "success" });
          setIsRedirecting(true);

          const id = setTimeout(() => {
            setIsRedirecting(false);
            navigate("/",{state:{username: formData.username}});
          }, 3000);
          setTimeoutId(id);
       
        } catch (callbackError) {
          console.error(
            "Error in onRegisterSuccess or setMessage:",
            callbackError
          );
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (
        error.response?.status === 400 &&
        error.response.data.message ===
          "An account with this email already exists."
      ) {
        setMessage({
          text: "An account with the given email already exists.",
          type: "error",
        });
      } else {
        setMessage({
          text: "Registration failed. Please try again.",
          type: "error",
        });
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="register-form-container" onSubmit={handleRegister}>
        <div>
          <input
            id="register-username"
            type="string"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            id="register-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            id="register-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div>
          <input
            id="country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
        </div>
        <div>
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
        </div>
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
  
      {message.text && (
        <div className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </div>
      )}
      {isRedirecting && (
        <div className="redirecting-message">
          <div className="loading-spinner"></div>
          <span>Heading you to the home page...</span>
        </div>
      )}
    </div>
  );
};

export default Register;

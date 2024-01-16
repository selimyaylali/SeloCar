import React, { useState } from 'react';
import Login from '../components/Login'; 
import Register from '../components/Register'; 
import NavBar from '../components/NavBar';
import { ReactComponent as GoogleIcon } from "../assets/google.svg";
import "../components/styles/LoginPage.scss"


const LoginPage = () => {
    const [user, setUser] = useState(null);


    const handleLoginSuccess = (userData) => {
        console.log('User logged in:', userData);
        setUser(userData);
    };

    const handleRegisterSuccess = (userData) => {
        setUser(userData);   
    };
 
    return (
        <>
          <NavBar className="navbar" showLoginButton={false} centerLogo={true}/>
          <div className="login-page-container"> 
            <div className="auth-container">
              <h1>Create account or sign in</h1>
              <button className="google-auth-button">
                <GoogleIcon className="google-icon"/>
                Continue with Google
              </button>
              <div className="divider">
                <h1>Or</h1>
              </div>
              <div className="auth-options">
                <Login onLoginSuccess={handleLoginSuccess} />
                <Register onRegisterSuccess={handleRegisterSuccess} />
              </div>
            </div>
          </div>
        </>
      );
};

export default LoginPage;

import React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import OfficeMap from "../components/OfficeMap";
import { useLocation } from "react-router-dom";
import "../components/styles/HomePage.scss"



const HomePage = () => {
  const location = useLocation();
  const username = location.state?.username;


  return (
    <div>
      <NavBar showLoginButton={true} centerLogo={false} />
      {username && <h1 className="welcome-header">Hi, {username}</h1>}
      <SearchBar />
      <OfficeMap/>
    </div>
  );
};

export default HomePage;

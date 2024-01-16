import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchResults from "./pages/SearchResults";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/search-results/:officeId" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;

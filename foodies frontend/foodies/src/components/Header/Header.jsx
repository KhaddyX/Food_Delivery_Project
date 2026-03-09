import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className="header-title">Order your favorite food here</h1>
        <p className="header-subtitle">
          Discover the best food and drinks at your doorstep
        </p>
        <Link to="/explore" className="header-button">
          Explore Menu
        </Link>
      </div>
    </div>
  );
};

export default Header;
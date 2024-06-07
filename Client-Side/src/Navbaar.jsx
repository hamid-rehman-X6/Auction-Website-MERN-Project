import React, { useState, useEffect } from "react";
import "./navbaar.css";
import {
  FaSearch,
  FaUser,
  FaUserPlus,
  FaUserShield,
  FaAngleDown,
  FaAngleUp,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbaar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyLogo</div>
      <ul className="navbar-links">
        <li className="navbar-link">Home</li>
        <li className="navbar-link">About</li>
        <li className="navbar-link">Services</li>
        <li className="navbar-link">Contact</li>
      </ul>
      <div className="navbar-actions">
        <FaSearch
          className="navbar-search-icon"
          onClick={handleSearchIconClick}
        />
        {showSearch && (
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search..."
          />
        )}
        <div className="navbar-theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>
        <div className="navbar-account">
          <button
            className="navbar-account-button"
            onClick={handleDropdownClick}
          >
            Create Account
            {showDropdown ? (
              <FaAngleUp className="navbar-angle-icon" />
            ) : (
              <FaAngleDown className="navbar-angle-icon" />
            )}
          </button>
          {showDropdown && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-item">
                <FaUser className="navbar-dropdown-icon" /> Login
              </div>
              <div className="navbar-dropdown-item">
                <FaUserPlus className="navbar-dropdown-icon" /> Signup
              </div>
              <div className="navbar-dropdown-item">
                <FaUserShield className="navbar-dropdown-icon" /> Admin
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbaar;

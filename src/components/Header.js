// src/components/Header.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FiUser, FiLock, FiLogOut } from "react-icons/fi";

function Header({ userName }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">{/* Optional title/logo */}</div>

      <div className="header-right" ref={dropdownRef}>
        <div className="user-dropdown" onClick={toggleDropdown}>
          <span className="user-name">Hi, {userName}</span>
          <span className="dropdown-arrow">▾</span>
        </div>

        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => navigate("/profile")}>
              <FiUser className="icon" />
              <span>Profile</span>
            </div>
            <div
              className="dropdown-item"
              onClick={() => navigate("/change-password")}
            >
              <FiLock className="icon" />
              <span>Change Password</span>
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              <FiLogOut className="icon" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

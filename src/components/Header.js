// src/components/Header.js
import React from "react";
import "./Header.css";

function Header({ userName }) {
  return (
    <header className="header">
      <div className="header-left">
        {/* Optional app title or logo area */}
      </div>
      <div className="header-right">
       
        <span className="user-name">Hi, {userName}</span>
      </div>
    </header>
  );
}

export default Header;

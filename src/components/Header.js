// src/components/Header.js
import React from "react";
import "./Header.css";
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <div className="app-header">
      <div className="header-left">
        <h2>Home</h2>
      </div>

      <div className="header-right">
        <div className="product-select">
          <select>
            <option>Select a product</option>
            <option>PRWBLAKBLAZER-0 : BLACK GOWN</option>
            <option>PRW-0 : GOWN BLUE</option>
            <option>PRW-34 : RED</option>
          </select>
        </div>

        <button className="create-btn">+ Create Booking</button>

        <div className="user-info">
          <span>Hi, Aradhana S</span>
          <span className="arrow">▼</span>
        </div>
      </div>
    </div>
  );
}

export default Header;

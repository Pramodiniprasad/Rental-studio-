import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">⭮</div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/delivery">Delivery</NavLink>
        <NavLink to="/return">Return</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/statistics">Statistics</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;

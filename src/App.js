import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import Return from "./pages/Return";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Statistics from "./pages/Statistics";
import Sidebar from "./components/Sidebar";
import OrderView from "./pages/OrderView";
import CreateBooking from "./pages/CreateBooking";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import "./App.css";

function App() {
  // Read login status from localStorage (so it persists on refresh)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "User";
  });

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header userName={userName} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/return" element={<Return />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id/view" element={<OrderView />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/create-booking" element={<CreateBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

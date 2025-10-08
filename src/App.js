import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import Return from "./pages/Return";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Statistics from "./pages/Statistics";
import Sidebar from "./components/Sidebar";
<<<<<<< HEAD
import OrderView from "./pages/OrderView";
import Header from "./components/Header"; // ✅ make sure this file exists
=======
import Header from "./components/Header"; 
import CreateBooking from "./pages/CreateBooking"; 
>>>>>>> 545d73e (createbook page fixes)
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Aradhana S"); // ✅ set a default username

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // Main layout after login
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {/* ✅ Header added */}
        <Header userName={userName} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/return" element={<Return />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id/view" element={<OrderView />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/create-booking" element={<CreateBooking />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

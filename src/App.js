<<<<<<< HEAD
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
  import OrderView from "./pages/OrderView";
  import "./App.css";
=======
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
import Header from "./components/Header"; // 
import "./App.css";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");


    if (!isLoggedIn) {
      return <Login onLogin={() => setIsLoggedIn(true)} />;
    }

    return (
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/return" element={<Return />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id/view" element={<OrderView />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    );
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header userName={userName} /> {/* ✅ header added */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/return" element={<Return />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

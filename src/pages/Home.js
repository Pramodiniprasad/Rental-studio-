import React from "react";
import Calendar from "../components/Calendar";
import "./Home.css";
import { FiSearch } from "react-icons/fi";

function Home() {
  return (
    <div className="page home-page">
      <div className="home-header">
        <h2>Home</h2>
        <div className="home-actions">
          <div className="product-select">
            <select>
              <option>Select a product</option>
              <option>Camera</option>
              <option>Tripod</option>
              <option>Lighting Kit</option>
            </select>
          </div>
          <button className="search-btn">
            <FiSearch size={18} />
          </button>
          <button className="create-btn">+ Create Booking</button>
        </div>
      </div>

      <div className="home-calendar">
        <Calendar />
      </div>
    </div>
  );
}

export default Home;

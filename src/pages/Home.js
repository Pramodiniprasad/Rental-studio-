import React, { useState } from "react";
import Calendar from "../components/Calendar";
import "./Home.css";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Select a product");

  const navigate = useNavigate(); 

  const products = [
    "PRWBLAKBLAZER-0 : BLACK GOWN",
    "PRW-0 : GOWN BLUE",
    "PRW-34 : RED",
  ];

  const filteredProducts = products.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setShowDropdown(false);
  };

  const handleCreateBooking = () => {
    navigate("/create-booking"); // navigate to the booking form
  };

  return (
    <div className="page home-page">
      <div className="home-header">
        <h2>Home</h2>

        <div className="home-actions">
          {/* Product Dropdown */}
          <div className="product-select">
            <div
              className="select-box"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedProduct}</span>
              <span className="arrow">▾</span>
            </div>

            {showDropdown && (
              <div className="dropdown">
                <div className="dropdown-search">
                  <FiSearch size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <ul className="dropdown-list">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p, i) => (
                      <li key={i} onClick={() => handleSelect(p)}>
                        {p}
                      </li>
                    ))
                  ) : (
                    <li className="no-results">No products found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* ✅ Create Booking Button with onClick handler */}
          <button className="create-btn" onClick={handleCreateBooking}>
            + Create Booking
          </button>
        </div>
      </div>

      <div className="home-calendar">
        <Calendar />
      </div>
    </div>
  );
}

export default Home;

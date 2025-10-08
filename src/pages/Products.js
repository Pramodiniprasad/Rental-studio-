import React, { useState, useEffect } from "react";
import "./Products.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("Available");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Handle status update
  const handleStatusChange = (id, newStatus) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setProducts(updated);
  };

  // Delete product
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesFilter = filter === "All" ? true : p.status === filter;
    const matchesSearch = p.sku.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="products-page">
      <h2>Products</h2>

      <div className="products-header">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="Available">Available</option>
          <option value="In Laundry">In Laundry</option>
          <option value="Archived">Archived</option>
          <option value="All">All</option>
        </select>

        <input
          type="text"
          placeholder="Search by SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="header-buttons">
          <button className="add-btn" onClick={() => navigate("/add-product")}>
            + Add Product
          </button>
          {/* ✅ Import button now redirects */}
          <button className="import-btn" onClick={() => navigate("/import-products")}>
            Import
          </button>
        </div>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="product-img" />
                    ) : (
                      <div className="placeholder-img">🖼️</div>
                    )}
                  </td>
                  <td>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>{p.amount}</td>
                  <td>
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      className={`status-select ${
                        p.status === "Available"
                          ? "available"
                          : p.status === "In Laundry"
                          ? "laundry"
                          : "archived"
                      }`}
                    >
                      <option value="Available">Available</option>
                      <option value="In Laundry">In Laundry</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td>
                    <FaEdit
                      className="action-icon edit"
                      onClick={() =>
                        navigate(`/products/${p.id}/edit`, { state: { product: p } })
                      }
                    />
                    <FaTrashAlt
                      className="action-icon delete"
                      onClick={() => handleDelete(p.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

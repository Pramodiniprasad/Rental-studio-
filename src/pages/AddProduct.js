import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: Date.now(),
    gender: "Women",
    sku: "",
    name: "",
    category: "",
    amount: "",
    size: "",
    description: "",
    image: "",
    status: "Available", // default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.sku ||
      !product.category ||
      !product.amount ||
      !product.size
    ) {
      alert("Please fill all required fields!");
      return;
    }

    // ✅ Save to localStorage
    const existing = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem("products", JSON.stringify([...existing, product]));

    // ✅ Redirect to products page
    navigate("/products");
  };

  return (
    <div className="add-product-page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate("/products")}>
          Products
        </span>{" "}
        &gt; <span className="breadcrumb-active">Add Product</span>
      </div>

      <div className="add-form">
        <form onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Gender Type:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Men"
                    checked={product.gender === "Men"}
                    onChange={handleChange}
                  />{" "}
                  Men
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Women"
                    checked={product.gender === "Women"}
                    onChange={handleChange}
                  />{" "}
                  Women
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="form-row">
            <div className="form-group">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                placeholder="SKU"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Gown">Gown</option>
                <option value="Overcoat">Overcoat</option>
                <option value="Chaniya-Choli">Chaniya-Choli</option>
                <option value="Kurta">Kurta</option>
                <option value="Saree">Saree</option>
              </select>
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={product.amount}
                onChange={handleChange}
                placeholder="Enter Amount"
                required
              />
            </div>

            <div className="form-group">
              <label>Size</label>
              <select
                name="size"
                value={product.size}
                onChange={handleChange}
                required
              >
                <option value="">Select size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="Free Size">Free Size</option>
              </select>
            </div>
          </div>

          {/* Description + Upload */}
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Description"
                maxLength="1000"
              />
              <small>{product.description.length} / 1000</small>
            </div>

            <div className="upload-section">
              <label>Upload Images</label>
              <div
                className="upload-box"
                onClick={() =>
                  document.getElementById("fileInput").click()
                }
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt="Preview"
                    className="preview-image"
                  />
                ) : (
                  <p>
                    Drag & Drop images here, or{" "}
                    <span className="click-text">click to select</span>
                    <br />
                    Supported Formats: PNG, JPG, JPEG
                    <br />
                    Max Size: 25MB
                  </p>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>
            <button type="submit" className="add-btn">
              + Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

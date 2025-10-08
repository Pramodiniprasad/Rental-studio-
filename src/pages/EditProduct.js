// src/pages/EditProduct.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditProduct.css";

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    gender: product?.gender || "Women",
    productName: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "Gown",
    amount: product?.amount?.replace("₹", "") || "",
    size: product?.size || "Free Size",
    description: product?.description || "",
    images: product?.image ? [product.image] : [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, images: [imageUrl] }));
    }
  };

  const handleSave = () => {
    alert("Product updated successfully!");
    navigate("/products");
  };

  return (
    <div className="edit-product-page">
      <h2>Products &gt; Edit Product</h2>

      <div className="edit-form">
        <div className="form-row">
          <div className="form-group">
            <label>Gender Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Men"
                  checked={formData.gender === "Men"}
                  onChange={handleChange}
                />
                Men
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Women"
                  checked={formData.gender === "Women"}
                  onChange={handleChange}
                />
                Women
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Gown">Gown</option>
              <option value="Chaniya-Choli">Chaniya-Choli</option>
              <option value="Overcoat">Overcoat</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Size</label>
            <select name="size" value={formData.size} onChange={handleChange}>
              <option value="Free Size">Free Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Upload Images</label>
          <div className="upload-box" onClick={() => document.getElementById("imageInput").click()}>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            {formData.images.length > 0 ? (
              <img src={formData.images[0]} alt="preview" className="preview-img" />
            ) : (
              <p>Click to upload (PNG, JPG, JPEG)</p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate("/products")}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

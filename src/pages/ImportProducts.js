import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ImportProducts.css";

export default function ImportProducts() {
  const navigate = useNavigate();
  const [gender, setGender] = useState("Women");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) {
      alert("Please select a CSV file to import.");
      return;
    }

    alert(`Imported successfully: ${file.name}`);
    navigate("/products");
  };

  return (
    <div className="import-products-page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate("/products")}>
          Products
        </span>{" "}
        &gt; <span className="breadcrumb-active">Import Products</span>
      </div>

      <div className="import-box">
        <div className="form-row">
          <div className="form-group">
            <label>Gender Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Men"
                  checked={gender === "Men"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Men
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Women"
                  checked={gender === "Women"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Women
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Gown">Gown</option>
              <option value="Overcoat">Overcoat</option>
              <option value="Chaniya-Choli">Chaniya-Choli</option>
              <option value="Kurta">Kurta</option>
              <option value="Saree">Saree</option>
            </select>
          </div>
        </div>

        <div className="upload-section">
          <label>Import Product CSV</label>
          <a href="/sample.csv" className="download-link">
            Download Sample CSV
          </a>
          <div
            className="upload-box"
            onClick={() => document.getElementById("csvInput").click()}
          >
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>
                Select a CSV file to import
                <br />
                or drag and drop it here
                <br />
                <span>(Max: 1MB)</span>
              </p>
            )}
          </div>
          <input
            id="csvInput"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/products")}
          >
            Discard
          </button>
          <button type="button" className="add-btn" onClick={handleImport}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
}

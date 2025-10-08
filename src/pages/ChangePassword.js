// src/pages/ChangePassword.js
import React, { useState } from "react";
import "./ChangePassword.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // TODO: Replace with actual API call
    console.log("Password change submitted:", form);

    alert("Password changed successfully (simulated)");
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <p className="subtitle">Please kindly set your new password</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type={showPassword.current ? "text" : "password"}
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
          <span onClick={() => toggleVisibility("current")} className="eye-icon">
            {showPassword.current ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="form-group">
          <input
            type={showPassword.new ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <span onClick={() => toggleVisibility("new")} className="eye-icon">
            {showPassword.new ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="form-group">
          <input
            type={showPassword.confirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <span onClick={() => toggleVisibility("confirm")} className="eye-icon">
            {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="change-password-btn">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

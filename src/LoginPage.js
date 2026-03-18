import React, { useState } from "react";
import API from "./api";

function LoginPage({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/admin/login", formData);
      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        onLoginSuccess();
      } else {
        setError(response.data.message || "Invalid login");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        console.log("Backend response:", err.response.data);
        setError(err.response.data.message || "Server error");
      } else if (err.request) {
        setError("No response from backend");
      } else {
        setError("Request error");
      }
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  </div>
);
  
}

export default LoginPage;
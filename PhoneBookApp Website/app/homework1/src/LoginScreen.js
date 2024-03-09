// LoginScreen.js
import React, { useState } from "react";
import axios from "axios";
import "./LoginScreen.css";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      try {
        const response = await axios.post("http://localhost:5000/login", { username, password });

        if (response.data.success) {
          // Login successful, call the onLogin callback
          onLogin(username, password);
        } else {
          // Login failed, handle the error
          console.error(response.data.message);
        }
      } catch (error) {
        // Handle other errors, such as network issues
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <div className="phone-image">
          <img src="https://cdn-icons-png.flaticon.com/512/6501/6501442.png" alt="Phone" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;


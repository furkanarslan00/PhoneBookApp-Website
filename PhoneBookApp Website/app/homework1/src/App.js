// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import PersonScreen from "./PersonScreen";
import EditScreen from "./EditScreen";
import axios from "axios";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      console.log("Login response:", response.data);
  
      if (response.data.success) {
        setLoggedIn(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/main" /> : <LoginScreen onLogin={handleLogin} />}
        />
        <Route
          path="/main"
          element={loggedIn ? <MainScreen onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/person/:id" element={<PersonScreen />} />
        <Route path="/edit/:id" element={<EditScreen />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

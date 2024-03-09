import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PersonScreen.css";

const PersonScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleAddContact = async () => {
    try {
      // Check if name and phone number are provided
      if (!name.trim() || !phoneNumber.trim()) {
        alert("Name and Phone Number are required fields.");
        return;
      }

      // Send a request to add the new contact
      await axios.post("/contacts", {
        name: name,
        phonenumber: phoneNumber,
      });

      // Redirect back to the main page
      navigate("/main");
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("An error occurred while adding the contact. Please try again.");
    }
  };

  return (
    <div className="person-container">
      <h2 className="page-title">New Contact</h2>
      <div className="frame">
        <div className="top-section">
          <img src="https://www.iconbolt.com/preview/facebook/ionicons-outline/person-circle.svg" alt="Person Placeholder" className="person-image" />
          <div className="filler-text">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>
        <div className="middle-section">
          <button className="add-button" onClick={handleAddContact}>
            Add
          </button>
        </div>
      </div>
      <Link to="/" className="back-link">
        Back to Main Page
      </Link>
    </div>
  );
};

export default PersonScreen;

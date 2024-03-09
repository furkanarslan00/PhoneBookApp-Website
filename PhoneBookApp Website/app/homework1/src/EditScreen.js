// EditScreen.js
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PersonScreen.css";

const EditScreen = () => {
  const { id } = useParams(); // Get the contact id from the route parameters
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleEditContact = async () => {
    try {
      // Check if name and phone number are provided
      if (!name.trim() || !phoneNumber.trim()) {
        alert("Name and Phone Number are required fields.");
        return;
      }

      // Send a request to update the contact information
      await axios.put(`/contacts/${id}`, {
        name: name,
        phonenumber: phoneNumber,
      });

      // Redirect back to the main page after editing
      navigate("/main");
    } catch (error) {
      console.error("Error editing contact:", error);
      alert("An error occurred while editing the contact. Please try again.");
    }
  };

  return (
    <div className="person-container">
      <h2 className="page-title">Edit Contact</h2>
      <div className="frame">
        <div className="top-section">
          <img src="https://www.iconbolt.com/preview/facebook/ionicons-outline/person-circle.svg" alt="Person Placeholder" className="person-image" />
          <div className="filler-text">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>
        <div className="middle-section">
          <button className="add-button" onClick={handleEditContact}>
            Edit
          </button>
        </div>
      </div>
      <Link to="/" className="back-link">
        Back to Main Page
      </Link>
    </div>
  );
};

export default EditScreen;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MainScreen.css";

const MainScreen = ({ onLogout }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = () => {
    // Filter contacts based on the search term
    const filteredContacts = contacts.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.phone.includes(searchTerm)
    );

    // Update the state with filtered contacts
    setContacts(filteredContacts);
  };

  const handleRemove = async (id) => {
    try {
      // Send a DELETE request to the server to remove the contact
      await axios.delete(`http://localhost:5000/contacts/${id}`);

      // Update the state to reflect the removal
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  };

  return (
    <div className="main-container">
      <h2 className="app-title">Contacts</h2>
      <div className="content-container">
        <div className="menu-section">
          <div className="menu-title">Main Menu</div>
          <div className="search-panel">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Find</button>
          </div>
          <Link to="/person/new" className="menu-link">
            New Contact
          </Link>
          <button onClick={onLogout} className="menu-button">
            Logout
          </button>
        </div>
        <div className="people-section">
          {contacts.map((person) => (
            <div key={person.id} className="person-card">
              <div className="person-info">
                <div className="text-info">
                  <h3>
                    {person.name} {person.surname}
                  </h3>
                  <p>Phone: {person.phone}</p>
                </div>
              </div>
              <div className="button-group">          
                <button onClick={() => handleRemove(person.id)} className="remove-button">
                  Remove
                </button>
                <Link to={`/edit/${person.id}`} className="remove-button">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

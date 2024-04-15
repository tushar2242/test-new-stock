import React, { useState, useEffect } from "react";
import { FrappeApp } from "frappe-js-sdk";
import { useNavigate } from "react-router-dom";

function Scaner() {
  const [warehouseList, setWarehouseList] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const frappe = new FrappeApp("http://194.31.55.40:14000");
  const db = frappe.db();

  useEffect(() => {
    db.getDocList("Warehouse")
      .then((docList) => {
        const warehouses = docList.map((doc) => doc.name);
        setWarehouseList(warehouses);
      })
      .catch((error) => console.error(error));
  }, [db]);

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedWarehouse(value);
    const suggestions = warehouseList.filter((warehouse) =>
      warehouse.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedWarehouse(suggestion);
    setSuggestions([]);
  };

  const handleSubmitButtonClick = () => {
    navigate("/Warehouse", { state: { selectedWarehouse } });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("isLoggedIn");
    console.log("User details removed from localStorage");
    navigate("/login");
    console.log("Navigated to login page");
  };

  const handleHomeButtonClick = () => {
    navigate("/Scaner");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        padding: "10px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Stock Scanner
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <div
        style={{
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Enter a warehouse..."
          value={selectedWarehouse}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "5px 0",
              width: "100%",
              position: "absolute",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ccc",
                  overflow: "hidden",
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="btn btn-primary"
        onClick={handleSubmitButtonClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Scaner;

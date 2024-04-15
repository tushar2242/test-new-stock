import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ItemList() {
  const location = useLocation();
  const { searchTerm, selectedItem, count, selectedWarehouse } = location.state;
  const navigate = useNavigate();

  const itemsRef = useRef([]);

  const [, setRender] = useState({});

  const addItem = (item) => {
    if (searchTerm && searchTerm.trim() !== "") {
      const existingItemIndex = itemsRef.current.findIndex(
        (i) => i.name === item.name
      );
      if (existingItemIndex === -1) {
        itemsRef.current.push(item);
        setRender({});
        localStorage.setItem("items", JSON.stringify(itemsRef.current));
      }
    }
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      itemsRef.current = JSON.parse(storedItems);
      setRender({});
    }
  }, []);

  useEffect(() => {
    addItem({
      name: searchTerm,
      quantity: count,
      id: selectedItem,
      warehouse: selectedWarehouse,
    });
  }, [searchTerm, count]);

  const handleButtonClick = () => {
    navigate(`/ShareStock`);
  };

  const handleButtonClick2 = () => {
    navigate("/SendItem", { state: { selectedWarehouse } });
  };

  const handleHomeButtonClick = () => {
    navigate("/Scaner");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1em",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1em",
        }}
      >
        <h1 style={{ margin: 0 }}>Items List</h1>
        <button
          onClick={handleHomeButtonClick}
          className="btn btn-primary Home"
          style={{ width: "60px", height: "30px", borderRadius: "5px" }}
        >
          Home
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          marginBottom: "1em",
        }}
      >
        <h4
          style={{ flexBasis: "50%", textAlign: "center", fontSize: "1.2em" }}
        >
          Items Name
        </h4>
        <h4
          style={{ flexBasis: "50%", textAlign: "center", fontSize: "1.2em" }}
        >
          Quantity
        </h4>
      </div>
      {itemsRef.current.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "90%",
            marginBottom: "1em",
          }}
        >
          <h6
            style={{ flexBasis: "50%", textAlign: "center", fontSize: "1.1em" }}
          >
            {item.name}
          </h6>
          <h6
            style={{ flexBasis: "50%", textAlign: "center", fontSize: "1.1em" }}
          >
            {item.quantity}
          </h6>
        </div>
      ))}

      <div
        style={{
          marginTop: "auto",
          marginBottom: "1em",
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
        }}
      >
        <button
          className="btn btn-primary"
          style={{ width: "30%", fontSize: "1.2em" }}
          onClick={handleButtonClick2}
        >
          ←
        </button>
        <button
          className="btn btn-primary"
          style={{ width: "30%", fontSize: "1.2em" }}
          onClick={handleButtonClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ItemList;

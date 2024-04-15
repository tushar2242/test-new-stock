import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FrappeApp } from "frappe-js-sdk";

function SendItem() {
  const location = useLocation();
  const { selectedWarehouse } = location.state || {};

  const [count, setCount] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const frappe = new FrappeApp("http://194.31.55.40:14000");
  const db = frappe.db();

  useEffect(() => {
    db.getDocList("Item", {
      fields: ["item_name", "name"],
    })
      .then((docList) => {
        const items = docList.map((doc) => ({
          item_name: doc.item_name,
          name: doc.name,
        }));
        setItemList(items);
      })
      .catch((error) => console.error(error));
  }, [db]);

  const navigate = useNavigate();

  const handleItemClick = (itemname, itemvalue) => {
    setSelectedItem(itemvalue);
    setSelectedItemName(itemname);
    setShowDropdown(false);
    setSearchTerm(itemname);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);

    if (value.length === 1) {
      setFilteredItemList([]);
    }

    const filteredItems = itemList.filter((item) =>
      item.item_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredItemList(filteredItems);
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleButtonClick = () => {
    navigate(`/ItemList`, {
      state: { searchTerm, selectedItem, count, selectedWarehouse },
    });
  };

  const handleHomeButtonClick = () => {
    navigate("/Scaner");
  };

  return (
    <center>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "10px",
          }}
        >
          <h1 style={{ margin: 0 }}>Send Items</h1>
          <button
            onClick={handleHomeButtonClick}
            className="btn btn-dark Home"
            style={{
              width: "60px",
              height: "30px",
              borderRadius: "5px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Home
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            id="searchItem"
            placeholder="Search for an item..."
            value={searchTerm}
            onChange={handleInputChange}
            style={{
              padding: "10px",
              width: "80%",
              fontSize: "1em",
              borderRadius: "5px",
            }}
          />
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {filteredItemList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleItemClick(item.item_name, item.name)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {item.item_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <img
          src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M="
          alt=""
          style={{ width: "200px", height: "200px", marginBottom: "1em" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <button
            className="btn"
            style={{
              backgroundColor: "grey",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={decrementCount}
          >
            -
          </button>
          <h4 className="count" style={{ margin: 0, fontSize: "1.5em" }}>
            {count}
          </h4>
          <button
            className="btn"
            style={{
              backgroundColor: "grey",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={incrementCount}
          >
            +
          </button>
        </div>
        <div style={{ position: "relative", marginTop: "1em" }}>
          <button
            onClick={handleButtonClick}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1em",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </center>
  );
}

export default SendItem;

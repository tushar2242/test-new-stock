import { React, useEffect } from "react";
import { FrappeApp } from "frappe-js-sdk";
import { useNavigate } from "react-router-dom";

function ShareStock() {
  const navigate = useNavigate();
  const frappe = new FrappeApp("http://194.31.55.40:14000");
  const db = frappe.db();

  const storedData = JSON.parse(localStorage.getItem("items"));
  const btnclick = localStorage.getItem("clickbtn");

  console.log(btnclick);
  let item_list = [];

  if (btnclick == "btn btn-primary send") {
    for (let i of storedData) {
      item_list.push({
        item_code: i["id"],
        qty: i.quantity,
        s_warehouse: i.warehouse,
      });
    }
    useEffect(() => {
      db.createDoc("Stock Entry", {
        stock_entry_type: "Material Issue",
        items: item_list,
      })
        .then((doc) => console.log(doc))
        .catch((error) => console.error(error));
      localStorage.clear("items", "clickbtn");
    });
  } else {
    for (let i of storedData) {
      item_list.push({
        item_code: i["id"],
        qty: i.quantity,
        t_warehouse: i.warehouse,
      });
    }
    useEffect(() => {
      db.createDoc("Stock Entry", {
        stock_entry_type: "Material Receipt",
        items: item_list,
      })
        .then((doc) => "")
        .catch((error) => console.error(error));
      localStorage.clear("items", "clickbtn");
    });
  }

  const handleHomeButtonClick = () => {
    navigate("/Scaner");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
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
          position: "absolute",
          top: "5px",
          right: "10px",
        }}
      >
        Home
      </button>
      <div
        className="stock confirmation"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          className="btns"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Received
          </button>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: `10px 20px`,
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareStock;

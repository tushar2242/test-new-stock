import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Warehouse() {
  const location = useLocation();
  const { selectedWarehouse } = location.state;

  const navigate = useNavigate();

  const handleSendButtonClick = (e) => {
    navigate("/SendItem", { state: { selectedWarehouse } });
    localStorage.setItem("clickbtn", e.target.className);
  };

  const handleReceiveButtonClick = (e) => {
    navigate("/SendItem", { state: { selectedWarehouse } });
    localStorage.setItem("clickbtn", e.target.className);
  };

  const handleRequestButtonClick = (e) => {
    navigate("/Request", { state: { selectedWarehouse } });
  };

  const handleHomeButtonClick = () => {
    navigate("/Scaner");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          padding: "10px",
          justifyContent: "space-between", // Use "space-between" for right alignment
          width: "100vw",
        }}
      >
        <h1>Warehouse</h1>
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
            position: "relative",
          }}
        >
          Home
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          top: "2em",
        }}
      >
        <div
          className="btns d-flex"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
            top: "15em",
            gap: "60px",
            width: "100vw",
          }}
        >
          <button
            onClick={handleSendButtonClick}
            className="btn btn-primary send"
            style={{ width: "60%" }}
          >
            Send
          </button>
          <button
            onClick={handleRequestButtonClick}
            className="btn btn-primary Request"
            style={{ width: "60%" }}
          >
            Request
          </button>
          <button
            onClick={handleReceiveButtonClick}
            className="btn btn-primary Receive"
            style={{ width: "60%" }}
          >
            Receive
          </button>
        </div>
      </div>
    </>
  );
}

export default Warehouse;

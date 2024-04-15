import React from "react";

function Request() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Request Form</h1>
      </div>
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            width: "30%",
            height: "50%",
          }}
        ></h1>
        <input type="text" placeholder="Text box" readOnly />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          padding: "20px",
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
      >
        <button
          className="btn btn-primary"
          style={{
            borderRadius: "50%",
            padding: "20px",
          }}
        >
          →
        </button>
      </div>
    </>
  );
}

export default Request;

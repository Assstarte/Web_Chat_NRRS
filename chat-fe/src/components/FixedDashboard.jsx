import React, { Component } from "react";
import "../css/chatRoom.css";

const FixedDashboard = ({ user_name, screenType, functionToExec }) => (
  <React.Fragment>
    <div id="fixed-head">
      <h2 style={{ display: `inlineBlock`, color: `#fff` }}>
        $_ΣZIC > Welcome, {user_name}
      </h2>
      {screenType === "chat" ? (
        <button
          onClick={
            typeof functionToExec === "function"
              ? e => functionToExec(e)
              : e => console.log("ERROR DURING EVENT HANDLING PASSAGE")
          }
          className="pulse btn-login"
        >
          Room Screen
        </button>
      ) : (
        <button
          onClick={
            typeof functionToExec === "function"
              ? e => functionToExec(e)
              : e => console.log("ERROR DURING EVENT HANDLING PASSAGE")
          }
          className="pulse btn-login"
        >
          Create New Room
        </button>
      )}
      <button className="raise btn-signup">Logout</button>
    </div>
    <hr />
  </React.Fragment>
);

export default FixedDashboard;

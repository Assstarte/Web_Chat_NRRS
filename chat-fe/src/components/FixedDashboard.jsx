import React, { Component } from "react";
import "../css/chatRoom.css";

const FixedDashboard = ({ user_name }) => (
  <React.Fragment>
    <div id="fixed-head">
      <h2 style={{ display: `inlineBlock`, color: `#fff` }}>
        $_ΣZIC > Welcome, {user_name}
      </h2>
      <button className="pulse btn-login">Dashboard</button>
      <button className="raise btn-signup">Logout</button>
    </div>
    <hr />
  </React.Fragment>
);

export default FixedDashboard;

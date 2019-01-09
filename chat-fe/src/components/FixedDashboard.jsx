import React, { Component } from "react";
import "../css/chatRoom.css";
import { connect } from "react-redux";
import { exec_logout } from "../actions/login";

const FixedDashboard = props => (
  <React.Fragment>
    <div id="fixed-head">
      <h2 style={{ display: `inlineBlock`, color: `#fff` }}>
        {props.user_name !== null
          ? `$_ΣZIC > Welcome${props.user_name}`
          : `$_ΣZIC > NOT LOGGED IN`}
      </h2>
      {props.screenType === "chat" ? (
        <button
          onClick={
            typeof props.functionToExec === "function"
              ? e => props.functionToExec(e)
              : e => console.log("ERROR DURING EVENT HANDLING PASSAGE")
          }
          className="pulse btn-login"
        >
          Room Screen
        </button>
      ) : (
        <button
          onClick={
            typeof props.functionToExec === "function"
              ? e => props.functionToExec(e)
              : e => console.log("ERROR DURING EVENT HANDLING PASSAGE")
          }
          className="pulse btn-login"
        >
          Create New Room
        </button>
      )}
      <button onClick={e => props.exec_logout()} className="raise btn-signup">
        Logout
      </button>
    </div>
    <hr />
  </React.Fragment>
);

export default connect(
  null,
  { exec_logout }
)(FixedDashboard);

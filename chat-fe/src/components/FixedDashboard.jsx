import React, { Component } from "react";
import "../css/chatRoom.css";
import { connect } from "react-redux";
import { exec_logout } from "../actions/login";
import {
  exec_show_popup,
  exec_hide_popup,
  exec_set_popup_btn_action
} from "../actions/popups";
import Popup from "./Popup";

const FixedDashboard = props => (
  <React.Fragment>
    <div id="fixed-head">
      <h2 style={{ display: `inlineBlock`, color: `#fff` }}>
        {props.user_name !== null
          ? `$_ΣZIC > Welcome, ${props.user_name}`
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
      <button
        onClick={e => {
          props.exec_logout();
          props.exec_show_popup(`SUCCESS`, `LOGGED OUT!`);
          props.exec_set_popup_btn_action(
            () => (window.location.href = "/home")
          );
        }}
        className="raise btn-signup"
      >
        Logout
      </button>
    </div>
    <hr />
    <Popup
      type={props.popup_type}
      message={props.popup_message}
      shown={props.popup_shown}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  popup_shown: state.popup.popup_shown,
  popup_type: state.popup.popup_type,
  popup_message: state.popup.popup_message
});

export default connect(
  mapStateToProps,
  { exec_logout, exec_show_popup, exec_hide_popup, exec_set_popup_btn_action }
)(FixedDashboard);

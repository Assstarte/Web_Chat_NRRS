import React, { Component } from "react";
import "../css/buttons.css";
import "../css/login.css";
import { exec_login } from "../actions/login";
import {
  exec_show_popup,
  exec_hide_popup,
  exec_set_popup_btn_action
} from "../actions/popups";
import Popup from "./Popup";

import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.inputLoginRef = React.createRef();
    this.inputPassRef = React.createRef();
    this.execute_login = this.execute_login.bind(this);
    this.is_logging = props.is_logging;
    this.prepare_popup = false;
  }

  checkIfLoggedIn() {
    //console.log(`LOGGEDIN = ${this.props.loggedIn}`);
    if (this.props.loggedIn) {
      this.props.exec_set_popup_btn_action(() =>
        this.props.history.push("/rooms")
      );
      this.props.exec_show_popup(`SUCCESS`, `LOGGED IN SUCCESSFULLY!`);
    } else this.props.exec_show_popup(`ERROR`, `Oops! Invalid Credentials ;(`);
  }

  //Prevent re-rendering when popup button is clicked
  // shouldComponentUpdate(popup_shown) {
  //   return false;
  // }

  componentDidUpdate() {
    //console.log("IS LOGGING - " + this.props.is_logging);

    if (!this.props.is_logging && this.prepare_popup) {
      //console.log(`IF TRIGGERED?`);
      this.checkIfLoggedIn();
      this.prepare_popup = false;
    }
  }

  render() {
    this.is_logging = this.props.is_logging ? true : false;
    return (
      <div>
        <form className="login-form" id="auth" method="post">
          <p className="login-text" />
          <input
            ref={this.inputLoginRef}
            type="text"
            name="un"
            className="login-username"
            autoFocus
            required
            placeholder="Login"
            id="auth-login"
          />
          <input
            ref={this.inputPassRef}
            type="password"
            name="pw"
            className="login-password"
            required
            placeholder="Password"
            id="auth-pass"
          />
          <input
            type="submit"
            name="Login"
            value="Login"
            className="login-submit"
            id="auth-submit"
            onClick={e => this.execute_login(e)}
          />
        </form>
        <a href="#" className="login-forgot-pass">
          forgot password?
        </a>
        <div className="underlay-photo" />
        <div className="underlay-black" />
        <Popup
          type={this.props.popup_type}
          message={this.props.popup_message}
          ref={this.popup}
          shown={this.props.popup_shown}
        />
      </div>
    );
  }

  execute_login(e) {
    e.preventDefault();
    //console.log("handling");
    this.props.exec_login(
      this.inputLoginRef.current.value,
      this.inputPassRef.current.value
    );
    this.prepare_popup = true;
    //this.checkIfLoggedIn();
    //this.checkIfLoggedIn();
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  is_logging: state.login.is_logging,
  errorOccurred: state.login.errorOccurred,
  user_id: state.login.user_id,
  popup_shown: state.popup.popup_shown,
  popup_type: state.popup.popup_type,
  popup_message: state.popup.popup_message
});

export default connect(
  mapStateToProps,
  { exec_login, exec_show_popup, exec_hide_popup, exec_set_popup_btn_action }
)(Login);

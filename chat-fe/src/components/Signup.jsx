import React, { Component } from "react";
import "../css/buttons.css";
import "../css/login.css";
import { exec_signup } from "../actions/login";
import {
  exec_show_popup,
  exec_hide_popup,
  exec_set_popup_btn_action
} from "../actions/popups";
import Popup from "./Popup";

import { connect } from "react-redux";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.inputLoginRef = React.createRef();
    this.inputPassRef = React.createRef();
    this.execute_signup = this.execute_signup.bind(this);
  }

  componentDidUpdate() {
    this.props.loggedIn
      ? (window.location.href = "/rooms")
      : console.log("Oops! Invalid Credentials");
  }

  render() {
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
            name="Signup"
            value="Signup"
            className="login-submit"
            id="auth-submit"
            onClick={e => this.execute_signup(e)}
          />
        </form>
        <a href="#" className="login-forgot-pass">
          forgot password?
        </a>
        <div className="underlay-photo" />
        <div className="underlay-black" />
      </div>
    );
  }

  execute_signup(e) {
    e.preventDefault();
    console.log("handling");
    this.props.exec_signup(
      this.inputLoginRef.current.value,
      this.inputPassRef.current.value
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  errorOccurred: state.login.errorOccurred,
  user_id: state.login.user_id
});

export default connect(
  mapStateToProps,
  { exec_signup }
)(Signup);

import React, { Component } from "react";
import "../css/buttons.css";
import "../css/login.css";
import { exec_login } from "../actions/login";

import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.inputLoginRef = React.createRef();
    this.inputPassRef = React.createRef();
    this.execute_login = this.execute_login.bind(this);
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
      </div>
    );
  }

  execute_login(e) {
    e.preventDefault();
    console.log("handling");
    this.props.exec_login(
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
  { exec_login }
)(Login);

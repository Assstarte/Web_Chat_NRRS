import React, { Component } from "react";
import "../css/chat.css";
import "../css/buttons.css";

import { exec_whoami } from "../actions/login";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="container demo">
        <h2
          style={{
            color: "#fff",
            textAlign: "center"
          }}
        >
          $_ΣZIC
        </h2>
        <hr />
        <div style={{ textAlign: "center" }}>
          <button
            onClick={e => this.redirectToLogin(e)}
            className="pulse btn-login"
          >
            Login
          </button>
          <button className="raise btn-signup">Sign Up</button>
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.exec_whoami();
  }

  componentDidUpdate() {
    this.props.auth
      ? this.props.history.push("/rooms")
      : console.log("Not Logged In");
  }

  redirectToLogin(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }
}

const mapStateToProps = state => ({
  auth: state.login.loggedIn,
  errorOccurred: state.login.errorOccurred,
  user_id: state.login.user_id
});

export default connect(
  mapStateToProps,
  { exec_whoami }
)(Home);

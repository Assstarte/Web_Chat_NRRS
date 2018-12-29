import React, { Component } from "react";
import "../css/chat.css";
import "../css/buttons.css";
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
          <button className="pulse btn-login">Login</button>
          <button className="raise btn-signup">Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Home;

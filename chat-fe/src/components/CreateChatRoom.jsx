import React, { Component } from "react";
import "../css/chat.css";
import FixedDashboard from "./FixedDashboard";

import { connect } from "react-redux";
import { exec_create_chat_room } from "../actions/chat";

class CreateChatRoom extends Component {
  constructor(props) {
    super(props);
    this.roomName = React.createRef();
  }

  render() {
    //Parsing time
    return (
      <React.Fragment>
        <FixedDashboard
          user_name={this.props.user_name}
          screenType="chat"
          functionToExec={this.redirectToRoomScreen.bind(this)}
        />

        <div className="create-chat-room">
          <h3>Please fill out the form</h3>
          <form className="login-form" id="auth" method="post">
            <p className="login-text" />

            <input
              type="text"
              name="owner"
              className="login-password"
              value={
                this.props.user_name ? this.props.user_name : `NOT LOGGED IN`
              }
              id="auth-pass"
              disabled
            />
            <input
              ref={this.roomName}
              type="text"
              name="room-name"
              className="login-username"
              autoFocus
              required
              placeholder="Room Name"
              id="auth-login"
            />

            <input
              type="submit"
              name="Create"
              value="Create"
              className="login-submit"
              id="auth-submit"
              onClick={e => this.execute_create_chat_room(e)}
            />
          </form>
          <hr />
        </div>
      </React.Fragment>
    );
  }

  execute_create_chat_room(e) {
    e.preventDefault();
    console.log(this.roomName);
    console.log(this.roomName.current.value);
    let roomName = this.roomName.current.value;
    if (this.props.user_id && this.props.user_name) {
      this.props.exec_create_chat_room(
        roomName,
        this.props.user_id,
        this.props.user_name
      );
    } else return false;
  }

  redirectToRoomScreen() {
    this.props.history.push("/rooms");
  }
}

const mapStateToProps = state => ({
  user_id: state.login.user_id,
  user_name: state.login.user_name,
  loggedIn: state.login.loggedIn
});

export default connect(
  mapStateToProps,
  { exec_create_chat_room }
)(CreateChatRoom);

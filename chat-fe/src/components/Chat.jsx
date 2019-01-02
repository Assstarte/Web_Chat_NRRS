import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import Inputs from "./Inputs";

//RDX

import { connect } from "react-redux";
import {
  exec_fetch_messages,
  exec_fetch_rooms
} from "../actions/f_msgs_and_rooms";
import FixedDashboard from "./FixedDashboard";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.currentRoom = this.props.currentRoom;
  }

  render() {
    return (
      <React.Fragment>
        <FixedDashboard user_name={this.props.user_name} />
        <div id="chat">
          {this.props.messages.map(msg => (
            <ChatMessage key={msg.id} data={msg} />
          ))}
          <Inputs />
        </div>
      </React.Fragment>
    );
  }

  componentWillMount() {
    if (!this.props.loggedIn) this.props.history.push("/login");
    this.loopedCheck(this.props.currentRoom);
  }

  loopedCheck(roomId) {
    setInterval(this.props.exec_fetch_messages.bind(this, roomId), 1000);
  }
}

const mapStateToProps = state => ({
  rooms: state.fetch.rooms,
  messages: state.fetch.messages,
  errorOccurred: state.fetch.errorOccurred,
  roomScreen: state.fetch.roomScreen,
  msgScreen: state.fetch.msgScreen,
  currentRoom: state.chat.currentRoom,
  user_name: state.login.user_name,
  loggedIn: state.login.loggedIn
});

export default connect(
  mapStateToProps,
  { exec_fetch_messages, exec_fetch_rooms }
)(Chat);

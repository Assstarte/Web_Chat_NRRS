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
    if (!this.props.currentRoom) this.props.history.push("/rooms");
    this.currentRoom = this.props.currentRoom;
    this.intervalID = null;
  }

  render() {
    return (
      <React.Fragment>
        <FixedDashboard
          user_name={this.props.user_name}
          screenType="chat"
          functionToExec={this.redirectToRoomScreen.bind(this)}
        />
        <div id="chat">
          {this.props.messages.map(msg => (
            <ChatMessage key={msg.id} data={msg} />
          ))}
        </div>
        <Inputs />
      </React.Fragment>
    );
  }

  componentWillMount() {
    if (!this.props.loggedIn) this.props.history.push("/login");
    this.props.exec_fetch_messages(this.props.currentRoom);
  }

  componentDidMount() {
    this.chatWindow = document.querySelector("#chat");
    this.messageAmount = this.props.messages.length;
    console.info("Did Mount" + this.messageAmount);
    this.chatWindow.scrollTo(0, Number.MAX_SAFE_INTEGER);
    //comment next line to test w/o issue
    this.intervalID = this.loopedCheck(this.props.currentRoom);
  }

  componentDidUpdate() {
    //Checking if any actual new messages were received during SQL queries ea. 1 sec. If yes ---> Scroll the chat window to bottom;
    if (this.props.messages.length > this.messageAmount) {
      this.messageAmount++;
      this.chatWindow.scrollTo({
        top: Number.MAX_SAFE_INTEGER,
        left: 0,
        options: `smooth`
      });
    }
  }

  loopedCheck(roomId) {
    let intervalID = setInterval(
      this.props.exec_fetch_messages.bind(this, roomId),
      1000
    );
    return intervalID;
  }

  redirectToRoomScreen() {
    //Clearing old interval to avoid multiple sessions
    clearInterval(this.intervalID);
    this.props.history.push("/rooms");
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

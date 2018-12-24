import React, { Component } from "react";
import ChatMessage from "./ChatMessage";

//RDX

import { connect } from "react-redux";
import {
  exec_fetch_messages,
  exec_fetch_rooms
} from "../actions/f_msgs_and_rooms";

class Chat extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     messages: []
  //   };
  //   this.getMessages = this.getMessages.bind(this);
  // }

  render() {
    return (
      <div id="chat">
        {this.props.messages.map(msg => (
          <ChatMessage data={msg} />
        ))}
      </div>
    );
  }

  //hooks

  // componentWillMount() {
  //   this.getMessagesFromRoom(4);
  //   console.log("Mounting");
  //   this.loopedCheck(4);
  // }

  // loopedCheck(roomId) {
  //   setInterval(this.getMessagesFromRoom.bind(this, roomId), 1000);
  // }

  // async getMessages() {
  //   console.log("getMessages() triggered");
  //   await fetch("http://localhost:3030/message").then(r => {
  //     //console.log(r);
  //     r.text().then(r => {
  //       this.setState({
  //         messages: JSON.parse(r)
  //       });
  //     });
  //   });
  // }

  // async getMessagesFromRoom(roomId) {
  //   console.log("getMessages() triggered");
  //   await fetch(`http://localhost:3030/message/${roomId}`).then(r => {
  //     //console.log(r);
  //     r.text().then(r => {
  //       this.setState({
  //         messages: JSON.parse(r)
  //       });
  //     });
  //   });
  // }

  componentWillMount() {
    this.props.exec_fetch_rooms();
  }
}

const mapStateToProps = state => ({
  rooms: state.fetch.rooms,
  messages: state.fetch.messages,
  errorOccurred: state.fetch.errorOccurred,
  roomScreen: state.fetch.roomScreen,
  msgScreen: state.fetch.msgScreen
});

export default connect(
  mapStateToProps,
  { exec_fetch_messages, exec_fetch_rooms }
)(Chat);

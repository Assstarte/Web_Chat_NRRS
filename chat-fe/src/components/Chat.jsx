import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import Inputs from "./Inputs";

//RDX

import { connect } from "react-redux";
import {
  exec_fetch_messages,
  exec_fetch_rooms
} from "../actions/f_msgs_and_rooms";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.currentRoom = this.props.currentRoom;
  }

  render() {
    return (
      <div id="chat">
        {this.props.messages.map(msg => (
          <ChatMessage key={msg.id} data={msg} />
        ))}
        <Inputs />
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
    //=======TEST SECTION=======

    //this.props.exec_fetch_messages(this.props.currentRoom);
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
  currentRoom: state.chat.currentRoom
});

export default connect(
  mapStateToProps,
  { exec_fetch_messages, exec_fetch_rooms }
)(Chat);

import React, { Component } from "react";
import ChatMessage from "./ChatMessage";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.getMessages = this.getMessages.bind(this);
  }

  render() {
    return (
      <div id="chat">
        {this.state.messages.map(msg => (
          <ChatMessage data={msg} />
        ))}
      </div>
    );
  }

  //hooks

  componentWillMount() {
    this.getMessagesFromRoom(3);
    console.log("Mounting");
    this.loopedCheck(3);
  }

  loopedCheck(roomId) {
    setInterval(this.getMessagesFromRoom.bind(this, roomId), 1000);
  }

  async getMessages() {
    console.log("getMessages() triggered");
    await fetch("http://localhost:3030/message").then(r => {
      //console.log(r);
      r.text().then(r => {
        this.setState({
          messages: JSON.parse(r)
        });
      });
    });
  }

  async getMessagesFromRoom(roomId) {
    console.log("getMessages() triggered");
    await fetch(`http://localhost:3030/message/${roomId}`).then(r => {
      //console.log(r);
      r.text().then(r => {
        this.setState({
          messages: JSON.parse(r)
        });
      });
    });
  }
}

export default Chat;

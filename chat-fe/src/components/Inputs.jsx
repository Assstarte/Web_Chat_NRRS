import React, { Component } from "react";
import "../css/chat.css";
import "../css/buttons.css";
class Inputs extends Component {
  constructor() {
    super();
    this.inputNameRef = React.createRef();
    this.inputTextRef = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
  }

  state = {};
  render() {
    return (
      <div className="inputs">
        <input
          type="text"
          name="name"
          className="raise"
          ref={this.inputNameRef}
          id="username"
          placeholder="Enter username..."
        />
        <input
          type="text"
          name="text"
          ref={this.inputTextRef}
          id="message"
          placeholder="Enter message..."
        />
        <button
          className="raise"
          onClick={e => this.sendMessageToChatRoom(e, 4)} //=======CHANGE AFTER TESTING!!1
          value="Send"
        >
          Send >
        </button>
      </div>
    );
  }

  sendMessage(e) {
    fetch("/message", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        //time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        name: this.inputNameRef.current.value,
        text: this.inputTextRef.current.value
        //name: `Test Name`,
        //text: `Txt`
      })
    })
      .then(res => res.json().then(res => console.log(res)))
      .catch(function(res) {
        console.log(res);
      });
  }

  sendMessageToChatRoom(e, chatRoom) {
    fetch(`/message/room/${chatRoom}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        //time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        name: this.inputNameRef.current.value,
        text: this.inputTextRef.current.value,
        chatRoomId: chatRoom,
        userId: 1 //Replace to REDUX Session once implemented
        //name: `Test Name`,
        //text: `Txt`
      })
    })
      .then(res => res.json().then(res => console.log(res)))
      .catch(function(res) {
        console.log(res);
      });
  }
}

export default Inputs;

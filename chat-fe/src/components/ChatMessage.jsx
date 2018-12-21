import React, { Component } from "react";
import style from "../css/chat.css";

class ChatMessage extends Component {
  state = {
    nick: this.props.data.nick,
    message: this.props.data.message,
    time: this.props.data.createdAt
  };
  render() {
    //Parsing time
    let timeStamp = this.state.time.slice(11, 19);

    return (
      <div className="chat-message">
        <h4>
          <span className="author">{this.state.nick}</span>:{"   "}
          {this.state.message}{" "}
          <span className="timeStamp">
            {"   | "}
            {timeStamp}
          </span>
        </h4>
      </div>
    );
  }
}

export default ChatMessage;

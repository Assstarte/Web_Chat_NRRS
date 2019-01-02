import React, { Component } from "react";
import "../css/chat.css";
import "../css/buttons.css";
import { connect } from "react-redux";

class Inputs extends Component {
  constructor() {
    super();
    this.inputNameRef = React.createRef();
    this.inputTextRef = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
  }

  state = {};
  render() {
    console.log("Curr Room - " + this.props.currentRoom);
    return (
      <div className="inputs">
        <textarea
          style={{ height: 300 + "px", width: 600 + "px" }}
          name="text"
          ref={this.inputTextRef}
          id="message"
          defaultValue="Enter message..."
        />
        <button
          className="raise"
          onClick={e => this.sendMessageToChatRoom(e, this.props.currentRoom)} //=======CHANGE AFTER TESTING!!1
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
        text: this.inputTextRef.current.value,
        chatRoomId: chatRoom,
        userId: this.props.userId, //Replace to REDUX Session once implemented -- DONE
        user_name: this.props.user_name
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

const mapStateToProps = state => ({
  rooms: state.fetch.rooms,
  errorOccurred: state.fetch.errorOccurred,
  roomScreen: state.fetch.roomScreen,
  msgScreen: state.fetch.msgScreen,
  currentRoom: state.chat.currentRoom,
  userId: state.login.user_id,
  user_name: state.login.user_name
});

export default connect(
  mapStateToProps,
  {}
)(Inputs);

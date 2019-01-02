import React, { Component } from "react";
import "../css/chat.css";
import "../css/buttons.css";

import { connect } from "react-redux";
import {
  exec_fetch_messages,
  exec_fetch_rooms
} from "../actions/f_msgs_and_rooms";
import { exec_set_current_room } from "../actions/chat";
import ChatRoom from "./ChatRoom";

class RoomScreen extends Component {
  componentWillMount() {
    this.props.exec_fetch_rooms();
  }

  componentDidUpdate() {
    this.props.currentRoom
      ? this.props.history.push("/chat")
      : console.log("Select Room");
  }

  render() {
    return (
      <div className="container demo">
        <h2
          style={{
            color: "#fff",
            textAlign: "center"
          }}
        >
          $_ROOMS
        </h2>
        <hr />
        <div style={{ textAlign: "center", color: "#fff" }}>
          {console.log(this.props.rooms)}
          {this.props.rooms.map(room => (
            <ChatRoom
              name={room.name}
              key={room.id}
              owner={room.OwnerId}
              enterRoom={this.setCurrentRoom.bind(this, room.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  setCurrentRoom(room) {
    this.props.exec_set_current_room(room);
  }
}

const mapStateToProps = state => ({
  rooms: state.fetch.rooms,
  errorOccurred: state.fetch.errorOccurred,
  roomScreen: state.fetch.roomScreen,
  msgScreen: state.fetch.msgScreen,
  currentRoom: state.chat.currentRoom
});

export default connect(
  mapStateToProps,
  { exec_fetch_rooms, exec_set_current_room }
)(RoomScreen);

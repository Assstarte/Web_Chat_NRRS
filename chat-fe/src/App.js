import React, { Component } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Inputs from "./components/Inputs";
import "./css/chat.css";

class App extends Component {
  render() {
    return (
      <div id="root">
        <Chat />
        <Inputs />
      </div>
    );
  }
}

export default App;

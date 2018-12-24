import React, { Component } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Inputs from "./components/Inputs";
import "./css/chat.css";

//==============
//     RDX
//==============

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { exec_login } from "./actions/login";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="root">
          <Chat />
          <Inputs />
        </div>
      </Provider>
    );
  }
}

export default App;

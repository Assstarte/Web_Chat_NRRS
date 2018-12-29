import React, { Component } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Inputs from "./components/Inputs";
import Home from "./components/Home";
import RoomScreen from "./components/RoomScreen";
import "./css/chat.css";

//==============
//     RDX
//==============

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { exec_login } from "./actions/login";
import { Router, Route, Link, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="root">
          <Router history={createHistory()}>
            <div>
              <Switch>
                <Route
                  path="/"
                  component={store.getState().fetch.roomScreen ? Chat : Home}
                  exact
                />
                <Route path="/home" component={Home} />
                <Route path="/chat" component={Chat} />
                <Route path="/rooms" component={RoomScreen} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}
// For Debugging Redux Store
store.subscribe(() => console.log(store.getState()));
export default App;

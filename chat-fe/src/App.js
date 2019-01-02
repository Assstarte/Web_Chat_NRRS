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
import Login from "./components/Login";
import Signup from "./components/Signup";

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
                  component={
                    store.getState().login.loggedIn ? RoomScreen : Home
                  }
                  exact
                />
                <Route path="/home" component={Home} />
                <Route path="/chat" component={Chat} />
                <Route path="/rooms" component={RoomScreen} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
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
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
export default App;

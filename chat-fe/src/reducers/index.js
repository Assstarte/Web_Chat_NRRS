import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchReducer from "./fetchReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  login: loginReducer,
  fetch: fetchReducer,
  chat: chatReducer
});

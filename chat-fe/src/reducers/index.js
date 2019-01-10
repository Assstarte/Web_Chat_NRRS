import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchReducer from "./fetchReducer";
import chatReducer from "./chatReducer";
import popupReducer from "./popupReducer";

export default combineReducers({
  login: loginReducer,
  fetch: fetchReducer,
  chat: chatReducer,
  popup: popupReducer
});

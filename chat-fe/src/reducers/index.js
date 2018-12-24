import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchReducer from "./fetchReducer";

export default combineReducers({
  login: loginReducer,
  fetch: fetchReducer
});

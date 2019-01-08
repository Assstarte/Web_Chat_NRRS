import {
  LOGIN,
  AUTH,
  WHOAMI,
  ERROR_OCCURRED,
  SIGNUP,
  LOGOUT
} from "../actions/types";

const initialState = {
  loggedIn: false,
  errorOccurred: false,
  user_id: null,
  user_name: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      let server_response = action.payload;
      //SUCCESS
      if (server_response.loggedIn === true) {
        return {
          ...state,
          loggedIn: true,
          errorOccurred: false,
          user_id: server_response.id,
          user_name: server_response.login
        };
      }
      //ERROR
      else {
        return {
          ...state,
          loggedIn: false,
          errorOccurred: true,
          user_id: null
        };
      }

    case SIGNUP:
      if (action.payload.created) {
        return {
          ...state,
          loggedIn: false,
          errorOccurred: false
        };
      } else
        return {
          ...state,
          loggedIn: false,
          errorOccurred: true
        };

    case WHOAMI:
      console.log(action.payload);
      if (action.payload.session !== "DENIED") {
        console.log("WORKING");
        return {
          ...state,
          loggedIn: true,
          errorOccurred: false,
          user_id: action.payload.id,
          user_name: action.payload.login
        };
      } else {
        return {
          ...state,
          loggedIn: false,
          errorOccurred: false,
          user_id: null
        };
      }

    case LOGOUT:
      console.log("===========LOGOUT WORKS!!!=========");
      return {
        ...state,
        loggedIn: false,
        user_id: null,
        user_name: null,
        errorOccurred: false
      };

    default:
      return state;
  }
}

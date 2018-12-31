import { LOGIN, AUTH, WHOAMI, ERROR_OCCURRED } from "../actions/types";

const initialState = {
  loggedIn: false,
  errorOccurred: false,
  user_id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      let server_response = action.payload;
      console.log(server_response);
      //SUCCESS
      if (server_response.loggedIn === true) {
        return {
          ...state,
          loggedIn: true,
          errorOccurred: false,
          user_id: server_response.id
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

    case WHOAMI:
      console.log(action.payload);
      if (action.payload.session !== "DENIED") {
        console.log("WORKING");
        return {
          ...state,
          loggedIn: true,
          errorOccurred: false,
          user_id: action.payload.id
        };
      } else {
        return {
          ...state,
          loggedIn: false,
          errorOccurred: false,
          user_id: null
        };
      }

    default:
      return state;
  }
}

import { LOGIN, AUTH, IF_AUTH, ERROR_OCCURRED } from "../actions/types";

const initialState = {
  loggedIn: false,
  errorOccurred: false,
  user_id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      let server_response = JSON.parse(action.payload);

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

    default:
      return state;
  }
}

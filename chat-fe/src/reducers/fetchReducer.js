import {
  FETCH_MESSAGES,
  FETCH_CHATROOMS,
  ERROR_OCCURRED
} from "../actions/types";

const initialState = {
  roomScreen: true,
  msgScreen: false,
  rooms: [],
  messages: [],
  errorOccurred: false
};

export default function(state = initialState, action) {
  let server_response;
  switch (action.type) {
    case FETCH_CHATROOMS:
      console.log(action.payload);
      server_response = action.payload;
      console.log(server_response);
      //SUCCESS
      if (server_response) {
        return {
          ...state,
          rooms: server_response,
          errorOccurred: false,
          msgScreen: true,
          roomScreen: false
        };
      }
      //ERROR
      else {
        return {
          ...state,
          roomScreen: true,
          errorOccurred: true,
          msgScreen: false
        };
      }

    case FETCH_MESSAGES:
      server_response = action.payload;

      //SUCCESS
      if (server_response) {
        return {
          ...state,
          messages: server_response,
          errorOccurred: false,
          msgScreen: true,
          roomScreen: false
        };
      }
      //ERROR
      else {
        return {
          ...state,
          roomScreen: false,
          errorOccurred: true,
          msgScreen: true
        };
      }

    default:
      return state;
  }
}

import { SET_CURRENT_ROOM, FLUSH_CURRENT_ROOM } from "../actions/types";

const initialState = {
  currentRoom: null,
  theme: "DARK"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM:
      console.log(action.payload);
      //SUCCESS
      return {
        ...state,
        currentRoom: action.payload
      };

    case FLUSH_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: null
      };

    default:
      return state;
  }
}

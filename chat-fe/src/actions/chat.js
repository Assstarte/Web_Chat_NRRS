import { SET_CURRENT_ROOM } from "./types";

export const exec_set_current_room = roomId => dispatch => {
  dispatch({
    type: SET_CURRENT_ROOM,
    payload: roomId
  });
};

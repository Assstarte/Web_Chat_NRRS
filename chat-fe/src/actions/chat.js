import { SET_CURRENT_ROOM, FLUSH_CURRENT_ROOM } from "./types";

export const exec_set_current_room = roomId => dispatch => {
  dispatch({
    type: SET_CURRENT_ROOM,
    payload: roomId
  });
};

export const exec_flush_current_room = () => dispatch => {
  dispatch({
    type: FLUSH_CURRENT_ROOM
  });
};

import { SET_CURRENT_ROOM, FLUSH_CURRENT_ROOM, CREATE_CHATROOM } from "./types";

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

export const exec_create_chat_room = (
  roomName,
  ownerId,
  owner_username
) => dispatch => {
  fetch("/rooms", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: roomName,
      creator: ownerId,
      creatorName: owner_username
    })
  }).then(res =>
    res.json().then(data =>
      dispatch({
        type: CREATE_CHATROOM,
        payload: data
      })
    )
  );
};

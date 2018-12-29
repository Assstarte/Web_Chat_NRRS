import { FETCH_MESSAGES, FETCH_CHATROOMS, ERROR_OCCURRED } from "./types";

export const exec_fetch_rooms = () => dispatch => {
  fetch("/rooms", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(res =>
    res
      .json()
      .then(data =>
        dispatch({
          type: FETCH_CHATROOMS,
          payload: data
        })
      )
      .catch(res => {
        dispatch({
          type: ERROR_OCCURRED,
          payload: res
        });
      })
  );
};

export const exec_fetch_messages = roomId => dispatch => {
  fetch(`/message/${roomId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(res =>
    res
      .json()
      .then(data =>
        dispatch({
          type: FETCH_MESSAGES,
          payload: data
        })
      )
      .catch(res => {
        dispatch({
          type: ERROR_OCCURRED,
          payload: res
        });
      })
  );
};

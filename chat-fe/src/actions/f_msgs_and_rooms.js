import { FETCH_MESSAGES, FETCH_CHATROOMS, ERROR_OCCURRED } from "./types";

import { GraphQLClient } from "graphql-request";

const gql = new GraphQLClient("http://localhost:3030/api", { headers: {} });

export const exec_fetch_rooms = () => dispatch => {
  gql
    .request(
      `query getChatRooms {
    getChatRooms {
      id
      name
      owner_name
    }
  }`,
      {}
    )
    .then(data => {
      console.dir(`DATA========= ${data}`);
      dispatch({
        type: FETCH_CHATROOMS,
        payload: data.getChatRooms
      });
    })
    .catch(res => {
      dispatch({
        type: ERROR_OCCURRED,
        payload: res
      });
    });
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

import { LOGIN, AUTH, IF_AUTH, ERROR_OCCURRED } from "./types";

export const exec_login = (login, pass) => dispatch => {
  fetch("/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: pass
    })
  }).then(res =>
    res
      .json()
      .then(data =>
        dispatch({
          type: LOGIN,
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

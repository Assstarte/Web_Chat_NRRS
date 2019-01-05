import { LOGIN, AUTH, WHOAMI, ERROR_OCCURRED, SIGNUP } from "./types";

export const exec_login = (login, pass) => dispatch => {
  fetch("/api/login", {
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

export const exec_signup = (login, pass) => dispatch => {
  fetch("/api/signup", {
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
          type: SIGNUP,
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

export const exec_whoami = () => dispatch => {
  fetch("/api/whoami").then(res =>
    res.json().then(data =>
      dispatch({
        type: WHOAMI,
        payload: data
      })
    )
  );
};

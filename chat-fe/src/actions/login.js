import {
  LOGIN,
  LOGGING_IN,
  AUTH,
  LOGOUT,
  WHOAMI,
  ERROR_OCCURRED,
  SIGNUP
} from "./types";

export const exec_login = (login, pass) => dispatch => {
  dispatch({
    type: LOGGING_IN,
    payload: { in_process: true }
  });
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
      .then(data => {
        dispatch({
          type: LOGIN,
          payload: data
        });
        dispatch({
          type: LOGGING_IN,
          payload: { in_process: false }
        });
      })
      .catch(res => {
        dispatch({
          type: ERROR_OCCURRED,
          payload: res
        });
        dispatch({
          type: LOGGING_IN,
          payload: { in_process: false }
        });
      })
  );
};

export const exec_signup = (login, pass) => dispatch => {
  fetch("/signup", {
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
  fetch("/whoami").then(res =>
    res.json().then(data =>
      dispatch({
        type: WHOAMI,
        payload: data
      })
    )
  );
};

export const exec_logout = () => dispatch => {
  fetch("/logout").then(res =>
    res.json().then(data =>
      dispatch({
        type: LOGOUT,
        payload: data
      })
    )
  );
};

import { SHOW_POPUP, HIDE_POPUP, SET_POPUP_BTN_ACTION } from "./types";

export const exec_show_popup = (type, message) => dispatch => {
  let data = { type, message };
  console.log("Showing popup...");
  dispatch({
    type: SHOW_POPUP,
    payload: data
  });
};

export const exec_hide_popup = () => dispatch => {
  dispatch({
    type: HIDE_POPUP
  });
};

export const exec_set_popup_btn_action = func => dispatch => {
  typeof func === `function`
    ? dispatch({
        type: SET_POPUP_BTN_ACTION,
        payload: func
      })
    : console.log("NOT A FUNCTION!");
};

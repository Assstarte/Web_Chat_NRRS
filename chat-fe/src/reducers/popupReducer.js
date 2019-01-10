import { SHOW_POPUP, HIDE_POPUP, SET_POPUP_BTN_ACTION } from "../actions/types";

const initialState = {
  popup_shown: false,
  popup_type: null,
  popup_message: null,
  popup_btn_action: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_POPUP:
      return {
        ...state,
        popup_shown: true,
        popup_type: action.payload.type,
        popup_message: action.payload.message
      };

    case HIDE_POPUP:
      return {
        ...state,
        popup_shown: false
      };

    case SET_POPUP_BTN_ACTION:
      return {
        ...state,
        popup_btn_action: action.payload
      };

    default:
      return state;
  }
}

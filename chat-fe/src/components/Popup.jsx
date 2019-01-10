import React, { Component } from "react";
import { exec_show_popup, exec_hide_popup } from "../actions/popups";
import { connect } from "react-redux";

//========@DOCUMENTATION========
/*
Types | Property "type" can accept the followig popup types (passed as a String):
1) DEFAULT - Default popup which appears as a box of text with the close button | COLOR #fff
2) WARNING - Popup which appears as a box of text with a warning image and message with the close button | COLOR #ffdb3a
3) ERROR - Popup which appears as a box of text with an error image and message with the close button | COLOR #ff3939
4) CONFIRM - Popup which appears as a box of text w/ question and 2 buttons (OK & CANCEL) | COLOR #38ffff
5) INPUT - Popup which appears as a box with an input for user to interact | COLOR #37ff69
6) SUCCESS - Popup which appears as a box with only success message and OK button | COLOR #0afc12

Messages | Property "message" can accept any String to initially pass a message which shoule appear in a popup box
*/
//==============================

class Popup extends Component {
  constructor(props) {
    super(props);
    this.popupRef = React.createRef();
  }

  render() {
    //Shaping popup params obj
    let shape = this.shapePopupObject(
      this.props.popup_type,
      this.props.popup_message,
      this.props.popup_btn_action
    );
    return this.props.popup_shown && shape ? (
      <div className="popup" ref={this.popupRef} style={shape.styleObj}>
        <img
          src={`/assets/icons/${shape.icon}.png`}
          alt="INFO"
          className="popup-icon"
        />
        <h4 className="popup-message">{shape.message}</h4>
        <button className="popup-button" onClick={shape.button1Action}>
          {shape.button1Text}
        </button>
      </div>
    ) : (
      <div />
    );
  }

  shapePopupObject(type, message, btn_action) {
    switch (type) {
      case `DEFAULT`:
        let styleObj = {
          display: `inline-block`,
          backgroundColor: `#fff`,
          color: `#000`
        };
        return {
          message,
          styleObj,
          icon: `popup_info`,
          buttonsAmount: 1,
          button1Text: `OK`,
          button1Action: e => {
            this.props.exec_hide_popup();
            typeof btn_action === `function`
              ? btn_action()
              : console.log(`Not executed`);
          }
        };
    }
  }
}

const mapStateToProps = state => ({
  popup_shown: state.popup.popup_shown,
  popup_type: state.popup.popup_type,
  popup_message: state.popup.popup_message,
  popup_btn_action: state.popup.popup_btn_action
});

export default connect(
  mapStateToProps,
  { exec_show_popup, exec_hide_popup }
)(Popup);

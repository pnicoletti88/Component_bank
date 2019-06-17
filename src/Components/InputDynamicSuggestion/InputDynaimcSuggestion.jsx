import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./InputDynamicSuggestion.module.css";

const escapeSpaces = text => {
  return text.replace(/ /g, "/");
};

const handle = "@rbc.com";

class InputDynamicSuggestion extends Component {
  constructor(props) {
    super(props);
    const { initialPlaceHolder } = this.props;
    this.state = {
      placeholder: initialPlaceHolder,
      textValue: ""
    };
    this.leftValueInput = React.createRef();
    this.rightValueInput = React.createRef();
    this.leftPlaceHoldDiv = React.createRef();
    this.rightPlaceHoldDiv = React.createRef();
  }

  onValueChange = event => {
    const val = event.target.value;
    const { initialPlaceHolder } = this.props;
    let placeholder = val ? handle : initialPlaceHolder;
    if (val && val.includes("@")) {
      const index = val.indexOf("@");
      const extension = val.substring(index);
      if (handle.includes(extension)) {
        placeholder = placeholder.replace(extension, "");
      } else {
        placeholder = "";
      }
    }
    this.setState({
      textValue: val,
      placeholder
    });
  };

  focusOnInput = () => {
    this.leftValueInput.current.focus();
  };

  componentDidMount(){
    this.alignWidths()
  }

  componentDidUpdate(){
      this.alignWidths();
  }

  alignWidths = () => {
    this.leftValueInput.current.style.width = `${Math.max(this.leftPlaceHoldDiv.current.clientWidth+0.5, 1)}px`;
    this.rightValueInput.current.style.width = `${this.rightPlaceHoldDiv.current.clientWidth}px`;
  }

  render() {
    const { placeholder, textValue } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.groundProxy}>
          <div className={styles.valueText} ref={this.leftPlaceHoldDiv}>{escapeSpaces(textValue)}</div>
          <div className={styles.placeHoldText} ref={this.rightPlaceHoldDiv}>{escapeSpaces(placeholder)}</div>
        </div>
        <div className={styles.floatingInputs}>
          <input
            className={styles.input}
            ref={this.leftValueInput}
            value={textValue}
            onChange={this.onValueChange}
          />
          <input
            className={styles.inputTemp}
            ref={this.rightValueInput}
            value={placeholder}
            onFocus={this.focusOnInput}
          />
        </div>
      </div>
    );
  }
}

InputDynamicSuggestion.propTypes = {
  initialPlaceHolder: PropTypes.string
};

InputDynamicSuggestion.defaultProps = {
  initialPlaceHolder: ""
};

export default InputDynamicSuggestion;

import React, { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./InputDynamicSuggestion.module.css";

const escapeSpaces = (text) => {
    return text.replace(/ /g, '/');
}

const handle = "@rbc.com"

class InputDynamicSuggestion extends Component {
  constructor(props) {
    super(props);
    const { initialPlaceHolder } = this.props;
    this.state = {
      placeholder: initialPlaceHolder,
      textValue: "",
    };
    this.inputRef = React.createRef();
  }


  onValueChange = event => {
    const val = event.target.value;
    const { initialPlaceHolder } = this.props;
    let placeholder = val ? handle : initialPlaceHolder;
    if (val && val.includes("@")){
        const index = val.indexOf("@");
        const extension = val.substring(index);
        if (handle.includes(extension)){
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
      this.inputRef.current.focus();
  }

  render() {
    const { placeholder, textValue } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.text}>{escapeSpaces(textValue)}</div>
        <input className={styles.dumbyInput} value={placeholder} onFocus={this.focusOnInput}/>
        <input className={styles.input} ref={this.inputRef} value={textValue} onChange={this.onValueChange} />
      </div>
    );
  }
}

InputDynamicSuggestion.propTypes = {
    initialPlaceHolder: PropTypes.string
}

InputDynamicSuggestion.defaultProps = {
    initialPlaceHolder: ''
}

export default InputDynamicSuggestion;

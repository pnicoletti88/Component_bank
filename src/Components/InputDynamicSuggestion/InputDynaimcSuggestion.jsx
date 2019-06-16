import React, { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./InputDynamicSuggestion.module.css";

class InputDynamicSuggestion extends Component {
  constructor(props) {
    super(props);
    const { initialPlaceHolder } = this.props;
    this.state = {
      placeholder: initialPlaceHolder,
      textValue: ""
    };
  }

  onValueChange = event => {
    const val = event.target.value;
    const { initialPlaceHolder } = this.props;
    const placeholder = val ? "@rbc.com" : initialPlaceHolder;
    this.setState({
      textValue: val,
      placeholder
    });
  };

  render() {
    
    const { placeholder, textValue } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.text}>{textValue}</div>
        <div className={styles.placehold}>{placeholder}</div>
        <input className={styles.input} value={textValue} onChange={this.onValueChange} />
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

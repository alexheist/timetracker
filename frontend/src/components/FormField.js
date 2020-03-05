import React from "react";

import PropTypes from "prop-types";
import "../styles/forms.scss";

class FormField extends React.Component {
  state = { focused: false };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = e => {
    if (!e.target.value) {
      this.setState({ focused: false });
    }
  };

  render() {
    return (
      <div className={"field" + (this.state.focused ? " field--active" : "")}>
        <label
          className="field__label"
          id={this.props.name + "-label"}
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
        <input
          className="field__input"
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default FormField;

FormField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

import React from "react";

import PropTypes from "prop-types";
import FormField from "./components/FormField";

class Login extends React.Component {
  state = { email: "", password: "" };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFocus = () => {
    this.setState({ focused: false });
  };

  render() {
    return (
      <form
        id="login-form"
        onSubmit={e => this.props.handleLogin(e, this.state)}
      >
        <FormField
          handleChange={this.handleChange}
          id={"login-email"}
          name={"email"}
          label={"Email Address"}
          type={"email"}
          value={this.state.email}
        />
        <FormField
          handleChange={this.handleChange}
          id={"login-password"}
          name={"password"}
          label={"Password"}
          type={"password"}
          value={this.state.password}
        />
        <input className="actionBtn" type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

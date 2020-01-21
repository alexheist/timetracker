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

  render() {
    return (
      <form
        id="login-form"
        method="post"
        onSubmit={e => this.props.handleLogin(e, this.state)}
      >
        <h2>Login</h2>
        <div className={"fields"}>
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
        </div>
        <input className="actionBtn" type="submit" value="Login" />
        <div className="spinner js-spinner"></div>
      </form>
    );
  }
}

export default Login;

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

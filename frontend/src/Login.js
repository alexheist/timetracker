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
        className="auth-form"
        id="login-form"
        method="post"
        onSubmit={e => this.props.handleLogin(e, this.state)}
      >
        <h2 className="auth-form__header">Login</h2>
        <div className="auth-form__fields">
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
        <input className="auth-form__btn" type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

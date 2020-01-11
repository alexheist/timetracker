import React from "react";

import FormModal from "./FormModal";
import PropTypes from "prop-types";
import "./styles/auth.css";

class Login extends React.Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <FormModal show={this.state.show} handleClose={this.hideModal}>
          <h2>Login</h2>
          <form id="loginForm" onSubmit={this.props.handleLogin}>
            <div className="fields">
              <label id="email-label" htmlFor="login-email">
                Email Address
              </label>
              <input type="email" id="login-email" name="email" />
              <label id="password-label" htmlFor="password">
                Password
              </label>
              <input type="password" id="login-password" name="password" />
            </div>
            <input className="actionBtn" type="submit" value="Submit" />
          </form>
        </FormModal>
        <span></span>
        <button className="navBtn" type="button" onClick={this.showModal}>
          Login
        </button>
      </>
    );
  }
}

export default Login;

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

import React, { Component } from "react";
import Modal from "./formModal";
import "./auth.css";

class Login extends Component {
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
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h2>Login</h2>
          <form id="loginForm">
            <div className="fields">
              <label id="email-label" htmlFor="email">
                Email Address
              </label>
              <input type="email" id="email" name="email" />
              <label id="password-label" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" name="password" />
            </div>
            <input className="actionBtn" type="submit" value="Submit" />
          </form>
        </Modal>
        <button className="navBtn" type="button" onClick={this.showModal}>
          Login
        </button>
      </>
    );
  }
}

export default Login;

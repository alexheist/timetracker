import React, { Component } from "react";
import Modal from "./formModal";
import "./auth.css";

class Signup extends Component {
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
          <h2>Signup</h2>
          <form id="signupForm">
            <div className="fields">
              <label id="email-label" htmlFor="email">
                Email Address
              </label>
              <input type="email" id="signup-email" name="email" />
              <label id="fname-label" htmlFor="fname">
                First Name
              </label>
              <input type="text" id="fname" name="fname" />
              <label id="lname-label" htmlFor="lname">
                Last Name
              </label>
              <input type="text" id="lname" name="fname" />
              <label id="password-label" htmlFor="password">
                Password
              </label>
              <input type="password" id="signup-password" name="password" />
              <label id="confirm-label" htmlFor="confirm">
                Confirm Password
              </label>
              <input type="password" id="confirm" name="confirm" />
            </div>
            <input className="actionBtn" type="submit" value="Submit" />
          </form>
        </Modal>
        <button className="navBtn" type="button" onClick={this.showModal}>
          Signup
        </button>
      </>
    );
  }
}

export default Signup;

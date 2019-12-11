import React, { Component } from "react";
import Modal from "./formModal";
import "./auth.css";

class Form extends Component {
  handleChange(id) {
    let label = document.getElementById(id);
    let input = document.getElementById(id.slice(0, -6));
    if (input.value.length > 0 && window.innerWidth > 768) {
      label.setAttribute("style", "color: transparent");
      label.innerHTML =
        input.name.charAt(0).toUpperCase() + input.name.slice(1);
      input.setAttribute("style", "border-color: #CCCCCC;");
    } else {
      label.setAttribute("style", "color: #656565");
    }
    this.setState({
      [input.name]: input.value
    });
    document.getElementById("success-response").innerHTML = "";
  }

  render() {
    return (
      <form>
        <div id="email-field">
          <label id="email-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={() => this.handleChange("email-label")}
          />
        </div>
        <div id="password-field">
          <label id="password-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={() => this.handleChange("email-label")}
          />
        </div>
      </form>
    );
  }
}

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
          <Form />
        </Modal>
        <button type="button" onClick={this.showModal}>
          Signup
        </button>
      </>
    );
  }
}

export default Signup;

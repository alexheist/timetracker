import React from "react";

import FormField from "./components/FormField";

class Signup extends React.Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <form id="signupForm">
        <FormField
          handleChange={this.handleChange}
          id={"signup-email"}
          name={"email"}
          label={"Email Address"}
          type={"email"}
          value={this.state.email}
        />
        <FormField
          handleChange={this.handleChange}
          id={"fname"}
          name={"fname"}
          label={"First Name"}
          type={"text"}
          value={this.state.fname}
        />
        <FormField
          handleChange={this.handleChange}
          id={"lname"}
          name={"lname"}
          label={"Last Name"}
          type={"text"}
          value={this.state.lname}
        />
        <FormField
          handleChange={this.handleChange}
          id={"signup-password"}
          name={"password"}
          label={"Password"}
          type={"password"}
          value={this.state.password}
        />
        <FormField
          handleChange={this.handleChange}
          id={"confirmation"}
          name={"confirmation"}
          label={"Confirm Password"}
          type={"password"}
          value={this.state.confirmation}
        />
        <input className="actionBtn" type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default Signup;

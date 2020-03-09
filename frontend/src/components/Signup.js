import React from "react";

import FormField from "./FormField";

class Signup extends React.Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmation: ""
  };

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
        className="card card--auth form"
        id="signup-form"
        onSubmit={e => this.props.handleSignup(e, this.state)}
        method="post"
      >
        <h2 className="form__header">Sign Up</h2>
        <div className="form__fields">
          <FormField
            handleChange={this.handleChange}
            id={"signup-email"}
            name={"email"}
            label={"Email Address"}
            type={"email"}
            value={this.state.email}
            double={true}
          />
          <FormField
            handleChange={this.handleChange}
            id={"fname"}
            name={"first_name"}
            label={"First Name"}
            type={"text"}
            value={this.state.first_name}
          />
          <FormField
            handleChange={this.handleChange}
            id={"lname"}
            name={"last_name"}
            label={"Last Name"}
            type={"text"}
            value={this.state.last_name}
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
        </div>
        <input className="form__btn" type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default Signup;

import React from "react";
import PropTypes from "prop-types";

import FormField from "./FormField";

class TeamForm extends React.Component {
  state = { name: "", owner: localStorage.getItem("user_id") };

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
        className="form"
        method="post"
        onSubmit={e => this.props.handleSubmit(e, this.state)}
      >
        <div className="form__fields">
          <FormField
            handleChange={this.handleChange}
            id={"name"}
            name={"name"}
            label={"Team Name"}
            type={"text"}
            value={this.state.name}
            double={true}
          />
        </div>
        <input className="form__btn" type="submit" value="Submit" />
      </form>
    );
  }
}

export default TeamForm;

TeamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

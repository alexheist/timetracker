import React from "react";
import TeamForm from "./TeamForm";

import PropTypes from "prop-types";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard dashboard--home">
        <h1 className="dashboard__heading">
          Welcome, {localStorage.getItem("user_name")}
        </h1>
        {this.props.isFetching ? (
          <div></div>
        ) : this.props.teams.length === 0 ? (
          <div className="card card--start">
            <h2 className="card__heading">Get started by creating a Team</h2>
            <TeamForm handleSubmit={this.props.handleSubmit}></TeamForm>
          </div>
        ) : (
          this.props.teams.map(team => (
            <div className="card card--team">
              <h2 className="card__heading">{team.name}</h2>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

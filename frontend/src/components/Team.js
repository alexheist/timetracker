import React from "react";
import TeamForm from "./TeamForm";
import { refreshToken } from "../utils/helpers";

import PropTypes from "prop-types";

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = { team: undefined, isFetching: true };
  }

  componentDidMount() {
    let matchId = this.props.match.params.id;

    this.setState({
      team: this.props.teams.find(team => team.id === matchId)
    });

    if (this.state.team === undefined) {
      this.fetchTeam(matchId);
    }
  }

  fetchTeam = async (id, requireNewToken = false) => {
    if (requireNewToken) {
      await refreshToken();
    }
    fetch(`http://localhost:8000/api/teams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          this.fetchTeams(true); // try again with refreshed access token
        } else {
          return res.json();
        }
      })
      .then(
        result => {
          if (result !== undefined) {
            this.setState({ team: result, isFetching: false });
          }
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  };

  render() {
    return (
      <div className="dashboard dashboard--team">
        {this.state.isFetching ? (
          <></>
        ) : this.state.team === undefined ? (
          <div className="card card--start">
            <h2 className="card__heading">Get started by creating a Team</h2>
            {/* <TeamForm handleSubmit={this.props.handleSubmit}></TeamForm> */}
          </div>
        ) : (
          <div className="card card--team">
            <h2 className="card__heading">{this.state.team.name}</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Team;

Team.propTypes = {
  teams: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
};
import React from "react";
import { refreshToken } from "../utils/helpers";

import PropTypes from "prop-types";

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      displaySettings: false,
      team: undefined,
    };
  }

  componentDidMount() {
    let matchId = this.props.match.params.id;

    this.setState({
      team: this.props.teams.find((team) => team.id === matchId),
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
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          this.fetchTeams(true); // try again with refreshed access token
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          if (result !== undefined) {
            this.setState({ team: result, isFetching: false });
          }
        },
        (error) => {
          console.log(`error: ${error}`);
        }
      );
  };

  toggleTab = () => {
    this.setState((prevState) => ({
      displaySettings: !prevState.displaySettings,
    }));
  };

  render() {
    return (
      <div className="dashboard dashboard--team">
        <div className="dashboard__tabs">
          <button
            className={
              this.state.displaySettings
                ? "dashboard__tab"
                : "dashboard__tab dashboard__tab--active"
            }
            onClick={this.toggleTab}
          >
            Details
          </button>
          <button
            className={
              this.state.displaySettings
                ? "dashboard__tab dashboard__tab--active"
                : "dashboard__tab"
            }
            onClick={this.toggleTab}
          >
            Settings
          </button>
        </div>
        {this.state.isFetching ? (
          <></>
        ) : this.state.displaySettings === true ? (
          <div className="dashboard__content settings">
            <div className="settings__member">
              <div className="settings__heading">
                <h2>Members</h2>
                <button class="settings__btn">Add</button>
              </div>
            </div>
            <div className="settings__project">
              <div className="settings__heading">
                <h2>Projects</h2>
                <button class="settings__btn">Add</button>
              </div>
            </div>
            <div className="settings__payperiod">
              <div className="settings__heading">
                <h2>Pay Period</h2>
                <button class="settings__btn">Edit</button>
              </div>
              <p>{this.state.team.pay_period_string}</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="dashboard__heading">Details</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Team;

Team.propTypes = {
  teams: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

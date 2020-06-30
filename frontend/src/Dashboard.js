import React from "react";

import Home from "./components/Home";
import Team from "./components/Team";
import { getCookie, refreshToken } from "./utils/helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      projects: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams = async (requireNewToken = false) => {
    if (requireNewToken) {
      await refreshToken();
    }
    fetch(
      `http://localhost:8000/api/teams?pk=${localStorage.getItem("user_id")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    )
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
            this.setState({ teams: result, isFetching: false });
          }
        },
        (error) => {
          console.log(`error: ${error}`);
        }
      );
  };

  /* TODO: Handle submit when access token expired */
  handleTeamSubmit = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/teams/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ teams: [...this.state.teams, result] });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Router>
        <div>
          <ul className="sidebar">
            <li className="sidebar__links">
              <NavLink
                strict
                exact
                to="/"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
              >
                Home
              </NavLink>
            </li>
            <li className="sidebar__links">
              <p className="sidebar__title">Teams</p>
            </li>
            {this.state.teams.map((team) => (
              <NavLink
                strict
                exact
                to={`/teams/${team.id}`}
                className="sidebar__link sidebar__link--dropdown"
                activeClassName="sidebar__link--active"
              >
                {team.name}
              </NavLink>
            ))}
            <li className="sidebar__links">
              <NavLink
                strict
                exact
                to="/account"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
              >
                Account
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route path="/account">
              <div className="dashboard dashboard--account">
                <h1 className="dashboard__heading">Account</h1>
              </div>
            </Route>
            <Route
              path="/teams/:id"
              children={({ match }) => (
                <Team teams={this.state.teams} match={match}></Team>
              )}
            ></Route>
            <Route path="/">
              <Home
                teams={this.state.teams}
                handleSubmit={this.handleTeamSubmit}
                isFetching={this.state.isFetching}
              ></Home>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Dashboard;

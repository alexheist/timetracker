import React from "react";

import Home from "./components/Home";
import { getCookie, refreshToken } from "./utils/helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      projects: [],
      isFetching: true
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
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      }
    )
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
            this.setState({ teams: result, isFetching: false });
          }
        },
        error => {
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
        Authorization: `Bearer ${localStorage.getItem("access")}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({ teams: [...this.state.teams, result] });
        },
        error => {
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
              <NavLink
                strict
                exact
                to="/teams"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
              >
                Teams
              </NavLink>
            </li>
            <li className="sidebar__links">
              <NavLink
                strict
                exact
                to="/projects"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
              >
                Projects
              </NavLink>
            </li>
            <li className="sidebar__links">
              <NavLink
                strict
                exact
                to="/reports"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
              >
                Reports
              </NavLink>
            </li>
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
            <Route path="/reports">
              <div className="dashboard dashboard--reports">
                <h1 className="dashboard__heading">Reports</h1>
              </div>
            </Route>
            <Route path="/projects">
              <div className="dashboard dashboard--reports">
                <h1 className="dashboard__heading">Projects</h1>
              </div>
            </Route>
            <Route path="/teams">
              <div className="dashboard dashboard--teams">
                <h1 className="dashboard__heading">Teams</h1>
              </div>
            </Route>
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

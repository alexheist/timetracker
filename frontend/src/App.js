import React from "react";

import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { getCookie } from "./utils/helpers";
import { shake } from "./utils/animations";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import "./styles/core.scss";

// https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated:
        localStorage.getItem("refresh") || localStorage.getItem("access")
          ? true
          : false
    };
  }

  handleLogin = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken")
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          shake("#login-form");
          return null;
        }
        return res.json();
      })
      .then(
        result => {
          if (result) {
            this.setInitialStorage(result);
          }
        },
        error => {
          console.log(error);
        }
      );
  };

  handleSignup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken")
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          shake("#signup-form");
          return null;
        }
        return res.json();
      })
      .then(
        result => {
          if (result) {
            this.setInitialStorage(result);
          }
        },
        error => {
          console.log(error);
        }
      );
  };

  setInitialStorage = json => {
    localStorage.setItem("refresh", json.refresh);
    localStorage.setItem("access", json.access);
    localStorage.setItem("user_id", json.user_id);
    localStorage.setItem("user_name", json.user_name);
    localStorage.setItem("user_email", json.user_email);
    this.setState({
      authenticated: true
    });
  };

  refreshToken = async () => {
    await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refresh") })
    })
      .then(res => res.json())
      .then(
        result => {
          localStorage.setItem("access", result.access);
        },
        error => {
          console.log(error);
        }
      );
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ authenticated: false });
  };

  render() {
    const authLanding = (
      <>
        <Signup handleSignup={this.handleSignup} />
        <Login handleLogin={this.handleLogin} />
      </>
    );

    const appLanding = (
      <>
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
                <Home refreshToken={this.refreshToken}></Home>
              </Route>
            </Switch>
          </div>
        </Router>
      </>
    );

    return (
      <>
        <Nav
          authenticated={this.state.authenticated}
          handleLogout={this.handleLogout}
        />
        <div className="content-wrapper">
          {this.state.authenticated ? appLanding : authLanding}
        </div>
      </>
    );
  }
}

export default App;

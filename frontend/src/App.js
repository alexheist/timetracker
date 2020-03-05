import React from "react";

import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getCookie } from "./utils/helpers";
import { shake } from "./utils/animations";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
      .then(json => {
        if (json) {
          localStorage.setItem("refresh", json.refresh);
          localStorage.setItem("access", json.access);
          this.setState({
            authenticated: true
          });
        }
      });
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
      .then(json => {
        if (json) {
          localStorage.setItem("refresh", json.refresh);
          localStorage.setItem("access", json.access);
          this.setState({
            authenticated: true
          });
        }
      });
  };

  handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
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
                <Link to="/" className="sidebar__link">
                  Home
                </Link>
              </li>
              <li className="sidebar__links">
                <Link to="/teams" className="sidebar__link">
                  Teams
                </Link>
              </li>
              <li className="sidebar__links">
                <Link to="/reports" className="sidebar__link">
                  Reports
                </Link>
              </li>
            </ul>
            <Switch>
              <Route path="/reports">
                <div className="dashboard dashboard--reports">
                  <h1 className="dashboard__heading">Reports</h1>
                </div>
              </Route>
              <Route path="/teams">
                <div className="dashboard dashboard--teams">
                  <h1 className="dashboard__heading">Teams</h1>
                </div>
              </Route>
              <Route path="/">
                <div className="dashboard dashboard--home">
                  <h1 className="dashboard__heading">Home</h1>
                </div>
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

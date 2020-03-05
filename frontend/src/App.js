import React from "react";

import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import { getCookie } from "./helpers";
import { shake } from "./animations";
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
            <ul className="sideBar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/about">
                <h1>About</h1>
              </Route>
              <Route path="/users">
                <h1>Users</h1>
              </Route>
              <Route path="/">
                <h1>Home</h1>
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

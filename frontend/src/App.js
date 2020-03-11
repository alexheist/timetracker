import React from "react";

import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./Dashboard";
import { getCookie } from "./utils/helpers";
import { shake } from "./utils/animations";
import "./styles/core.scss";

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
    setTimeout(function() {
      localStorage.clear();
    }, 60 * 60 * 1000); // 24 hours
    this.setState({
      authenticated: true
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ authenticated: false });
  };

  render() {
    const authForms = (
      <>
        <Signup handleSignup={this.handleSignup} />
        <Login handleLogin={this.handleLogin} />
      </>
    );

    return (
      <>
        <Nav
          authenticated={this.state.authenticated}
          handleLogout={this.handleLogout}
        />
        <div className="content-wrapper">
          {this.state.authenticated ? <Dashboard></Dashboard> : authForms}
        </div>
      </>
    );
  }
}

export default App;

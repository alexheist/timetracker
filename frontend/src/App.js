import React from "react";

import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import { getCookie } from "./helpers";
import "./styles/core.css";

// https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: localStorage.getItem("token") ? true : false
    };
  }

  handleLogin = (e, data) => {
    e.preventDefault();

    delete data.show;
    console.log(JSON.stringify(data));

    // TODO: Sort out Access-Control-Allow-Origin header
    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken")
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        localStorage.setItem("token", json.token);
        this.setState({
          authenticated: true
        });
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ authenticated: false });
  };

  render() {
    return (
      <>
        <Nav
          authenticated={this.state.authenticated}
          handleLogout={this.handleLogout}
        />
        <div id="page-container">
          <h1>
            Take <em>Control</em> of Your Time
          </h1>
          <Signup handleLogin={this.handleLogin} />
          <Login handleLogin={this.handleLogin} />
        </div>
      </>
    );
  }
}

export default App;

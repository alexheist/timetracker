import React from "react";

import Nav from "./Nav";
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

  handleLogin(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const csrfToken = getCookie("csrftoken");

    console.log(data);

    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken
      },
      body: data
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.token);
      });
  }

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
          handleLogin={this.handleLogin}
        />
        <div id="page-container">
          <h1>
            Take <em>Control</em> of Your Time
          </h1>
          <ul id="copy">
            <p>Here: {this.state.authenticated}</p>
            <div className="card">
              <h2>Useful Reports</h2>
              <p>Something</p>
            </div>
            <div className="card">
              <h2>Invoice Generation</h2>
              <p>To Put</p>
            </div>
            <div className="card">
              <h2>Simple Management</h2>
              <p>For Render</p>
            </div>
          </ul>
        </div>
      </>
    );
  }
}

export default App;

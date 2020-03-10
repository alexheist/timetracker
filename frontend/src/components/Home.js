import React from "react";
import TeamForm from "./TeamForm";

import { getCookie, refreshToken } from "../utils/helpers";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  fetchData = async (requireNewToken = false) => {
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
          this.fetchData(true); // try again with refreshed access token
        } else {
          return res.json();
        }
      })
      .then(
        result => {
          if (result !== undefined) {
            this.setState({ teams: result });
          }
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  };

  componentDidMount() {
    this.fetchData();
  }

  /* TODO: Handle submit when access token expired */
  handleSubmit = (e, data) => {
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
      <div className="dashboard dashboard--home">
        <h1 className="dashboard__heading">
          Welcome, {localStorage.getItem("user_name")}
        </h1>
        {this.state.teams.length === 0 ? (
          <div className="card card--start">
            <h2 className="card__heading">Get started by creating a Team</h2>
            <TeamForm handleSubmit={this.handleSubmit}></TeamForm>
          </div>
        ) : (
          this.state.teams.map(team => (
            <div className="card card--team">
              <h2 className="card__heading">{team.name}</h2>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Home;

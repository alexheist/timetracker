import React from "react";
import FormField from "./FormField";

import { refreshToken } from "../utils/helpers";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      name: ""
    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  fetchWithNewToken = async () => {
    await refreshToken();

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
        return res.json();
      })
      .then(
        result => {
          console.log(`result: ${JSON.stringify(result)}`);
          this.setState({ teams: result });
        },
        async error => {
          console.log(`error: ${error}`);
        }
      );
  };

  componentDidMount() {
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
          this.fetchWithNewToken();
        } else {
          return res.json();
        }
      })
      .then(
        result => {
          console.log(`result: ${JSON.stringify(result)}`);
          if (result !== undefined) {
            this.setState({ teams: result });
          }
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  }

  render() {
    return (
      <div className="dashboard dashboard--home">
        <h1 className="dashboard__heading">
          Welcome, {localStorage.getItem("user_name")}
        </h1>
        {this.state.teams == undefined || this.state.teams.length === 0 ? (
          <div className="card card--start">
            <h2 className="card__heading">Get started by creating a Team</h2>
            <form
              className="form"
              method="post"
              onSubmit={e => this.props.handleLogin(e, this.state)}
            >
              <div className="form__fields">
                <FormField
                  handleChange={this.handleChange}
                  id={"name"}
                  name={"name"}
                  label={"Team Name"}
                  type={"text"}
                  value={this.state.name}
                  double={true}
                />
              </div>
              <input className="form__btn" type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          this.state.teams.map((team, index) => (
            <div className="">
              <p>{team}</p>
              <p>{index}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Home;

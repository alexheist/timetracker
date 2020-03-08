import React from "react";

import PropTypes from "prop-types";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchWithNewToken = async () => {
    await this.props.refreshToken();

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
        console.log(`response: ${res}`);
        return res.json();
      })
      .then(
        result => {
          console.log(`result: ${JSON.stringify(result)}`);
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
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  refreshToken: PropTypes.func.isRequired
};

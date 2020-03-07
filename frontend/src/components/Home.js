import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      .then(res => res.json())
      .then(
        result => {
          console.log(JSON.stringify(result));
        },
        error => {
          console.log(error);
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

import React from "react";
import PropTypes from "prop-types";
import Login from "./login";
import Signup from "./signup";
import logo from "./logo.png";

function Nav(props) {
  const loggedInLinks = (
    <>
      <Login handleLogin={props.handleLogin} />
      <Signup />
    </>
  );

  const loggedOutLinks = (
    <button className="navBtn" type="button" onClick={props.handleLogout}>
      Logout
    </button>
  );

  return (
    <nav>
      <img src={logo} alt="Time Tracker" />
      <h2>Time Tracker</h2>
      <ul className={"nav-links"}>
        {props.authenticated ? loggedInLinks : loggedOutLinks}
      </ul>
    </nav>
  );
}

export default Nav;

Nav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

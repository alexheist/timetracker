import React from "react";

import PropTypes from "prop-types";

import logo from "./assets/logo.png";

function Nav(props) {
  const loggedInLinks = (
    <button className="navBtn" type="button" onClick={props.handleLogout}>
      Logout
    </button>
  );

  return (
    <nav>
      <img src={logo} alt="Time Tracker" />
      <h2>Time Tracker</h2>
      <ul className={"nav-links"}>
        {props.authenticated ? loggedInLinks : null}
      </ul>
    </nav>
  );
}

export default Nav;

Nav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

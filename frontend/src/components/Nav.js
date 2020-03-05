import React from "react";

import PropTypes from "prop-types";

import logo from "../assets/logo.png";

function Nav(props) {
  const loggedInLinks = (
    <button className="nav__btn" type="button" onClick={props.handleLogout}>
      Logout
    </button>
  );

  return (
    <nav className="nav">
      <img className="nav__logo" src={logo} alt="Time Tracker" />
      <h2 className="nav__heading">Time Tracker</h2>
      <ul className={"nav__links"}>
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

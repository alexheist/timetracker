import React from "react";
import Login from "../auth/login";
import Signup from "../auth/signup";
import logo from "./logo.png";

function Nav() {
  return (
    <nav>
      <img src={logo} alt="Time Tracker" />
      <h2>Time Tracker</h2>
      <ul className={"nav-links"}>
        <button type="button">Home</button>
        <Login />
        <Signup />
      </ul>
    </nav>
  );
}

export default Nav;

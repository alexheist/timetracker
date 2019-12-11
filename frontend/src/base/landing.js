import React from "react";
import Nav from "./nav";
import "./landing.css";

function Landing() {
  return (
    <>
      <Nav />
      <div id="page-container">
        <h1>
          Take <em>Control</em> of Your Time
        </h1>
        <ul id="copy">
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

export default Landing;

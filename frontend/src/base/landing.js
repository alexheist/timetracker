import React from 'react';
import Nav from './nav';
import './landing.css';

function Landing() {
	return (
		<div id="page-container">
			<Nav />
			<h1>Take Control of Your Time</h1>
			<div className="card">
				<h2>Useful Reports</h2>
				<p></p>
			</div>
			<div className="card">
				<h2>Invoice Generation</h2>
				<p></p>
			</div>
			<div className="card">
				<h2>Simple Management</h2>
				<p></p>
			</div>
		</div>
	);
}

export default Landing;

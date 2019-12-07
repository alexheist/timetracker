import React from 'react';
import Login from '../auth/login';
import Signup from '../auth/signup';

function Nav() {
	return (
		<nav>
			<h2>Time Tracker</h2>
			<a href="#">Home</a>
			<Login />
			<Signup />
		</nav>
	);
}

export default Nav;

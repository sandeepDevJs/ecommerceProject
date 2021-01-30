import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const userData = JSON.parse(localStorage.getItem("userInfo"))
		? JSON.parse(localStorage.getItem("userInfo"))
		: {};
	console.log(userData);
	const { name } = userData;
	return (
		<Route
			{...rest}
			render={(props) =>
				name ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;

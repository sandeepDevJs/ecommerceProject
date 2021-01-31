import React from "react";
import { Route, Redirect } from "react-router-dom";

const checkLogin = () => {
	const userData = JSON.parse(localStorage.getItem("userInfo"))
		? JSON.parse(localStorage.getItem("userInfo"))
		: {};

	if (userData) {
		if (userData.name) {
			return true;
		}
		return false;
	}
	return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				checkLogin() ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;

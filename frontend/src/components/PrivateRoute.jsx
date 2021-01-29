import React from "react";
import { Route, Redirect } from "react-router-dom";

const userData = JSON.parse(localStorage.getItem("userInfo"));

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				userData ? (
					userData.name ? (
						<Component {...props} />
					) : (
						<Redirect to="/login" />
					)
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;

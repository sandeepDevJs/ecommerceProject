import axios from "axios";
import {
	USER_LOGIN_FAILS,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAILS,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"http://localhost:4000/api/auth/login",
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data.data,
		});

		localStorage.setItem("userInfo", JSON.stringify(data.data));
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
};

export const register = (userData) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"http://localhost:4000/api/users",
			{ ...userData },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data.data,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data.data,
		});

		localStorage.setItem("userInfo", JSON.stringify(data.data));
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

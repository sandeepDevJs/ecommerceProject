import axios from "axios";
import {
	USER_DETAILS_FAILS,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAILS,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAILS,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_PROFILE_UPDATE_FAILS,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_DETAILS_RESET,
	USER_FORGOT_PASS_FAILS,
	USER_FORGOT_PASS_REQUEST,
	USER_FORGOT_PASS_SUCCESS,
	USER_RESET_PASS_REQUEST,
	USER_RESET_PASS_SUCCESS,
	USER_RESET_PASS_FAILS,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstant";
import { CART_LIST_ITEM_RESET } from "../constants/cartConstant";

import { listCart } from "./cartAction";

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

		dispatch(listCart());

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
	localStorage.removeItem("cartDetails");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_LIST_MY_RESET });
	dispatch({ type: CART_LIST_ITEM_RESET });
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

export const getUserDetails = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get("http://localhost:4000/api/me", config);
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: USER_DETAILS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_PROFILE_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			"http://localhost:4000/api/me",
			{ ...userData },
			config
		);
		dispatch({
			type: USER_PROFILE_UPDATE_SUCCESS,
			payload: data.data,
		});

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });

		localStorage.setItem("userInfo", JSON.stringify(data.data));
	} catch (err) {
		dispatch({
			type: USER_PROFILE_UPDATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const forgotPassword = (email) => async (dispatch) => {
	dispatch({
		type: USER_FORGOT_PASS_REQUEST,
	});

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		await axios.post(
			"http://localhost:4000/api/auth/forgotPassword",
			{ email },
			config
		);

		dispatch({ type: USER_FORGOT_PASS_SUCCESS });
	} catch (err) {
		dispatch({
			type: USER_FORGOT_PASS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
export const resetPassword = (token, password) => async (dispatch) => {
	dispatch({
		type: USER_RESET_PASS_REQUEST,
	});

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		await axios.put(
			`http://localhost:4000/api/auth/resetPassword/${token}`,
			{ password },
			config
		);

		dispatch({ type: USER_RESET_PASS_SUCCESS });
	} catch (err) {
		dispatch({
			type: USER_RESET_PASS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

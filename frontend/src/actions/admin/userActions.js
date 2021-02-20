import { API_PREFIX } from "../../utils/apiConstants";
import {
	USER_ALL_USERS_FAILS,
	USER_ALL_USERS_REQUEST,
	USER_ALL_USERS_SUCCESS,
	USER_ORDER_DETAILS_BY_ID_FAILS,
	USER_ORDER_DETAILS_BY_ID_REQUEST,
	USER_ORDER_DETAILS_BY_ID_SUCCESS,
} from "../../constants/userConstants";
import axios from "axios";

export const getAllUsersList = () => async (dispatch) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		dispatch({ type: USER_ALL_USERS_REQUEST });

		console.log("token", token);
		let { data } = await axios.get(`${API_PREFIX}users`, config);

		dispatch({ type: USER_ALL_USERS_SUCCESS, payload: data.data });
	} catch (err) {
		dispatch({
			type: USER_ALL_USERS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getAllOrderDetailsListById = (userId) => async (dispatch) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		dispatch({ type: USER_ORDER_DETAILS_BY_ID_REQUEST });

		let { data } = await axios.get(
			`${API_PREFIX}order/${userId}/orders`,
			config
		);

		dispatch({ type: USER_ORDER_DETAILS_BY_ID_SUCCESS, payload: data.data });
	} catch (err) {
		dispatch({
			type: USER_ORDER_DETAILS_BY_ID_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

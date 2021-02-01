import {
	USER_ALL_USERS_FAILS,
	USER_ALL_USERS_REQUEST,
	USER_ALL_USERS_SUCCESS,
	USER_ORDER_DETAILS_BY_ID_FAILS,
	USER_ORDER_DETAILS_BY_ID_REQUEST,
	USER_ORDER_DETAILS_BY_ID_RESET,
	USER_ORDER_DETAILS_BY_ID_SUCCESS,
} from "../../constants/userConstants";
import axios from "axios";

let { isAdmin, token } = JSON.parse(localStorage.getItem("userInfo"));
let config = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
};

export const getAllUsersList = () => async (dispatch) => {
	try {
		dispatch({ type: USER_ALL_USERS_REQUEST });

		let { data } = await axios.get("http://localhost:4000/api/users", config);

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
	try {
		dispatch({ type: USER_ORDER_DETAILS_BY_ID_SUCCESS });

		let { data } = await axios.get(
			`http://localhost:4000/api/order/${userId}/orders`,
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

import axios from "axios";
import {
	ORDER_CREATE_FAILS,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAILS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstant";

export const creatOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
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

		const { data } = await axios.post(
			"http://localhost:4000/api/order",
			{ ...order },
			config
		);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data.data,
		});

		localStorage.setItem(
			"orderCreate",
			JSON.stringify({ loading: false, success: true, order: data.data })
		);
	} catch (err) {
		// if () {
		// }
		dispatch({
			type: ORDER_CREATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getOrderDetails = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
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

		const { data } = await axios.get("http://localhost:4000/api/order", config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_DETAILS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

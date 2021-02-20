import axios from "axios";
import { API_PREFIX } from "../utils/apiConstants";
import {
	ORDER_CREATE_FAILS,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_RESET,
	ORDER_DETAILS_FAILS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAILS,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAILS,
	ORDER_LIST_ALL_REQUEST,
	ORDER_LIST_ALL_SUCCESS,
	ORDER_LIST_ALL_FAILS,
	ORDER_DELIVERED_REQUEST,
	ORDER_DELIVERED_SUCCESS,
	ORDER_DELIVERED_FAILS,
	ORDER_DELIVERED_RESET,
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
			`${API_PREFIX}order`,
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
		dispatch({
			type: ORDER_CREATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_PREFIX}order/${orderId}`, config);

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

export const payOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
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

		await axios.put(`${API_PREFIX}order/${orderId}/pay`, {}, config);

		dispatch({ type: ORDER_PAY_SUCCESS });
		dispatch({ type: ORDER_CREATE_RESET });
		localStorage.removeItem("orderCreate");
	} catch (err) {
		dispatch({
			type: ORDER_PAY_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const listMyOrder = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_PREFIX}order/myorders`, config);

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data.data,
		});

		dispatch({ type: ORDER_CREATE_RESET });
	} catch (err) {
		dispatch({
			type: ORDER_LIST_MY_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
export const listAllOrder = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_ALL_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_PREFIX}order/`, config);

		dispatch({
			type: ORDER_LIST_ALL_SUCCESS,
			payload: data.data,
		});

		dispatch({ type: ORDER_CREATE_RESET });
	} catch (err) {
		dispatch({
			type: ORDER_LIST_ALL_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVERED_REQUEST,
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

		await axios.put(`${API_PREFIX}order/${orderId}/delivered/`, {}, config);

		dispatch({ type: ORDER_DELIVERED_SUCCESS });
		dispatch({ type: ORDER_DELIVERED_RESET });
		localStorage.removeItem("orderCreate");
	} catch (err) {
		dispatch({
			type: ORDER_DELIVERED_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

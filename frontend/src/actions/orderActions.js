import axios from "axios";
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
	ORDER_PAY_RESET,
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

		const { data } = await axios.get(
			`http://localhost:4000/api/order/${orderId}`,
			config
		);

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

		await axios.put(
			`http://localhost:4000/api/order/${orderId}/pay`,
			{},
			config
		);

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

		const { data } = await axios.get(
			"http://localhost:4000/api/order/myorders",
			config
		);

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

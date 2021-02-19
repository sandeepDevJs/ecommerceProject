import {
	CART_LIST_ITEM_REQUEST,
	CART_LIST_ITEM_SUCCESS,
	CART_LIST_ITEM_FAILS,
	CART_INCREMENT_ITEM_REQUEST,
	CART_INCREMENT_ITEM_SUCCESS,
	CART_INCREMENT_ITEM_FAILS,
	CART_ADD_ITEM_FAILS,
	CART_ADD_ITEM_REQUEST,
	CART_ADD_ITEM_SUCCESS,
	CART_REMOVE_ITEM_FAILS,
	CART_REMOVE_ITEM_REQUEST,
	CART_REMOVE_ITEM_SUCCESS,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstant";

import {
	listCartApi,
	incrementCartApi,
	AddToCartApi,
	removeFromCartApi,
} from "../apis/cart";

export const listCart = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CART_LIST_ITEM_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		if (!userInfo) {
			throw Error("Please Sign In!");
		}

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await listCartApi(config);

		if (!data.data || data.data === null) {
			throw Error("Empty Cart");
		}

		dispatch({
			type: CART_LIST_ITEM_SUCCESS,
			payload: data.data,
		});

		localStorage.setItem("cartDetails", JSON.stringify(data.data));
	} catch (err) {
		dispatch({
			type: CART_LIST_ITEM_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const incrementCart = (productId, op = "increment") => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: CART_INCREMENT_ITEM_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await incrementCartApi(productId, op, config);

		dispatch({ type: CART_INCREMENT_ITEM_SUCCESS });
	} catch (err) {
		dispatch({
			type: CART_INCREMENT_ITEM_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const AddToCart = (productId, qty = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: CART_ADD_ITEM_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await AddToCartApi(productId, qty, config);

		dispatch({ type: CART_ADD_ITEM_SUCCESS });
	} catch (err) {
		dispatch({
			type: CART_ADD_ITEM_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const removeFromCart = (pid) => async (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	try {
		await removeFromCartApi(pid, config);
		dispatch({ type: CART_REMOVE_ITEM_SUCCESS });
	} catch (err) {
		dispatch({
			type: CART_REMOVE_ITEM_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem("paymentMethod", JSON.stringify(data));
};

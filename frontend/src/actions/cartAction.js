import axios from "axios";
import {
	CART_LIST_ITEM_REQUEST,
	CART_LIST_ITEM_SUCCESS,
	CART_LIST_ITEM_FAILS,
	CART_INCREMENT_ITEM_REQUEST,
	CART_INCREMENT_ITEM_SUCCESS,
	CART_INCREMENT_ITEM_FAILS,
} from "../constants/cartConstant";

export const listCart = () => async (dispatch) => {
	try {
		dispatch({ type: CART_LIST_ITEM_REQUEST });
		const { data } = await axios.get(`http://localhost:4000/api/carts`, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTE1MDEyMSwiZXhwIjoxNjExMTUzNzIxfQ.wBap_xT5mZW7MoPXOXpJts1P1fn4g_-Flby9kjqd2Ls`,
			},
		});
		dispatch({
			type: CART_LIST_ITEM_SUCCESS,
			payload: data.data,
		});
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
	dispatch
) => {
	try {
		dispatch({ type: CART_INCREMENT_ITEM_REQUEST });
		if (op === "increment") {
			const { data } = await axios.put(
				`http://localhost:4000/api/carts/${productId}`,
				{},
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTE1MDEyMSwiZXhwIjoxNjExMTUzNzIxfQ.wBap_xT5mZW7MoPXOXpJts1P1fn4g_-Flby9kjqd2Ls`,
					},
				}
			);
		} else if (op === "decrement") {
			const { data } = await axios.put(
				`http://localhost:4000/api/carts/${productId}?decrement=1`,
				{},
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTE1MDEyMSwiZXhwIjoxNjExMTUzNzIxfQ.wBap_xT5mZW7MoPXOXpJts1P1fn4g_-Flby9kjqd2Ls`,
					},
				}
			);
		}

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

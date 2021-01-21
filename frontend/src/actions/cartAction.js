import axios from "axios";
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
} from "../constants/cartConstant";

export const listCart = () => async (dispatch) => {
	try {
		dispatch({ type: CART_LIST_ITEM_REQUEST });
		const { data } = await axios.get(`http://localhost:4000/api/carts`, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTIyODAxM30.6G-cvpbLnxDjVjC6ZyUYslU249Wf5BVTLgfF9a4CB04`,
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
			await axios.put(
				`http://localhost:4000/api/carts/${productId}`,
				{},
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTIyODAxM30.6G-cvpbLnxDjVjC6ZyUYslU249Wf5BVTLgfF9a4CB04`,
					},
				}
			);
		} else if (op === "decrement") {
			await axios.put(
				`http://localhost:4000/api/carts/${productId}?decrement=1`,
				{},
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTIyODAxM30.6G-cvpbLnxDjVjC6ZyUYslU249Wf5BVTLgfF9a4CB04`,
					},
				}
			);
		}

		dispatch({ type: CART_INCREMENT_ITEM_SUCCESS });
		dispatch(listCart());
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

export const AddToCart = (productId, qty = 1) => async (dispatch) => {
	try {
		dispatch({ type: CART_ADD_ITEM_REQUEST });
		await axios.post(
			`http://localhost:4000/api/carts/${productId}?quantity=${qty}`,
			{},
			{
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTIyODAxM30.6G-cvpbLnxDjVjC6ZyUYslU249Wf5BVTLgfF9a4CB04`,
				},
			}
		);

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

export const removeFromCart = (pid) => async (dispatch) => {
	dispatch({ type: CART_REMOVE_ITEM_REQUEST });
	try {
		await axios.delete(`http://localhost:4000/api/carts/${pid}`, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk4ZWYwZjdjY2M4MThiODAxZTM3MyIsImVtYWlsIjoiYWJjeHl6QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMTIyODAxM30.6G-cvpbLnxDjVjC6ZyUYslU249Wf5BVTLgfF9a4CB04`,
			},
		});
		dispatch({ type: CART_REMOVE_ITEM_SUCCESS });
		dispatch(listCart());
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

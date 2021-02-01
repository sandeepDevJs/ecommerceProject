import axios from "axios";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAILS,
	PRODUCT_CREATE_REVIEW_FAILS,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_TOP_FAILS,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_ALL_LIST_REQUEST,
	PRODUCT_ALL_LIST_FAILS,
	PRODUCT_ALL_LIST_SUCCESS,
} from "../constants/productConstant";

export const listProducts = (keyword = "", page = 0) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get(
			`http://localhost:4000/api/products?limit=3&keyword=${keyword}&page=${page}`
		);
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_LIST_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const listProductDetails = (slug) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(
			`http://localhost:4000/api/products?slug=${slug}`
		);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.data[0],
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_DETAILS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const createProductReview = (productId, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.post(
			`http://localhost:4000/api/reviews/product/${productId}`,
			review,
			config
		);
		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const listTopProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_TOP_REQUEST });
		const { data } = await axios.get(
			`http://localhost:4000/api/products/topProducts`
		);
		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_TOP_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const listAllProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_ALL_LIST_REQUEST });
		const { data } = await axios.get(
			`http://localhost:4000/api/products?limit=100`
		);
		dispatch({
			type: PRODUCT_ALL_LIST_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ALL_LIST_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

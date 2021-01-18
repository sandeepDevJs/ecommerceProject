import axios from "axios";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAILS,
} from "../constants/productConstant";

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get(
			"http://localhost:4000/api/products?limit=10"
		);
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data.data,
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

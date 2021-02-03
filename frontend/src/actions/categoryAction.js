import {
	CAT_FETCH_BY_ID_SUCCESS,
	CAT_FETCH_BY_ID_REQUEST,
	CAT_FETCH_BY_ID_FAILS,
	CAT_FETCH_FAILS,
	CAT_FETCH_REQUEST,
	CAT_FETCH_SUCCESS,
} from "../constants/categoryConstants";
import axios from "axios";
let { token } = JSON.parse(localStorage.getItem("userInfo"));
let config = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
};

export const fetchCats = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CAT_FETCH_REQUEST });

		let { data } = await axios.get(
			`http://localhost:4000/api/categories/`,
			config
		);

		dispatch({ type: CAT_FETCH_SUCCESS, payload: data.data });
	} catch (err) {
		dispatch({
			type: CAT_FETCH_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const fetchCatsByIds = (catId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CAT_FETCH_BY_ID_REQUEST });

		let { data } = await axios.get(
			`http://localhost:4000/api/categories/${catId}`,
			config
		);

		dispatch({ type: CAT_FETCH_BY_ID_SUCCESS, payload: data.data });
	} catch (err) {
		dispatch({
			type: CAT_FETCH_BY_ID_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

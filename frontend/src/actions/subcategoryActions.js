import {
	SUBCAT_FETCH_FAILS,
	SUBCAT_FETCH_REQUEST,
	SUBCAT_FETCH_SUCCESS,
	SUBCAT_DELETE_REQUEST,
	SUBCAT_DELETE_SUCCESS,
	SUBCAT_DELETE_FAILS,
	SUBCAT_UPDATE_REQUEST,
	SUBCAT_UPDATE_SUCCESS,
	SUBCAT_UPDATE_FAILS,
	SUBCAT_CREATE_REQUEST,
	SUBCAT_CREATE_SUCCESS,
	SUBCAT_CREATE_FAILS,
} from "../constants/subcategoryConstants";
import axios from "axios";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let { token } = userInfo ? userInfo : { token: "" };
let config = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
};

export const fetchSubCats = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SUBCAT_FETCH_REQUEST });

		let { data } = await axios.get(
			`http://localhost:4000/api/subcategories/`,
			config
		);

		dispatch({ type: SUBCAT_FETCH_SUCCESS, payload: data.data });
	} catch (err) {
		dispatch({
			type: SUBCAT_FETCH_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const deleteSubCat = (subcatId) => async (dispatch) => {
	try {
		dispatch({ type: SUBCAT_DELETE_REQUEST });

		await axios.delete(
			`http://localhost:4000/api/subcategories/${subcatId}`,
			config
		);

		dispatch({ type: SUBCAT_DELETE_SUCCESS });
	} catch (err) {
		dispatch({
			type: SUBCAT_DELETE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateSubCat = (subcatId, body) => async (dispatch) => {
	try {
		dispatch({ type: SUBCAT_UPDATE_REQUEST });

		await axios.put(
			`http://localhost:4000/api/subcategories/${subcatId}`,
			body,
			config
		);

		dispatch({ type: SUBCAT_UPDATE_SUCCESS });
	} catch (err) {
		dispatch({
			type: SUBCAT_UPDATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const createSubCat = (body) => async (dispatch) => {
	try {
		dispatch({ type: SUBCAT_CREATE_REQUEST });

		await axios.post(`http://localhost:4000/api/subcategories/`, body, config);

		dispatch({ type: SUBCAT_CREATE_SUCCESS });
	} catch (err) {
		dispatch({
			type: SUBCAT_CREATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

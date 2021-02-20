import { API_PREFIX } from "../utils/apiConstants";
import {
	CAT_FETCH_BY_ID_SUCCESS,
	CAT_FETCH_BY_ID_REQUEST,
	CAT_FETCH_BY_ID_FAILS,
	CAT_FETCH_FAILS,
	CAT_FETCH_REQUEST,
	CAT_FETCH_SUCCESS,
	CAT_DELETE_REQUEST,
	CAT_DELETE_SUCCESS,
	CAT_DELETE_FAILS,
	CAT_UPDATE_REQUEST,
	CAT_UPDATE_SUCCESS,
	CAT_UPDATE_FAILS,
	CAT_CREATE_REQUEST,
	CAT_CREATE_SUCCESS,
	CAT_CREATE_FAILS,
} from "../constants/categoryConstants";
import axios from "axios";

export const fetchCats = () => async (dispatch, getState) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		dispatch({ type: CAT_FETCH_REQUEST });

		let { data } = await axios.get(`${API_PREFIX}categories/`, config);

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

export const fetchCatsByIds = (catId) => async (dispatch) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		dispatch({ type: CAT_FETCH_BY_ID_REQUEST });

		let { data } = await axios.get(`${API_PREFIX}categories/${catId}`, config);

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

export const deleteCat = (catId) => async (dispatch) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		dispatch({ type: CAT_DELETE_REQUEST });

		await axios.delete(`${API_PREFIX}categories/${catId}`, config);

		dispatch({ type: CAT_DELETE_SUCCESS });
	} catch (err) {
		dispatch({
			type: CAT_DELETE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateCat = (catId, body) => async (dispatch) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		dispatch({ type: CAT_UPDATE_REQUEST });

		await axios.put(`${API_PREFIX}categories/${catId}`, body, config);

		dispatch({ type: CAT_UPDATE_SUCCESS });
	} catch (err) {
		dispatch({
			type: CAT_UPDATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const createCat = (body) => async (dispatch) => {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let { token } = userInfo ? userInfo : { token: "" };
	let config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		dispatch({ type: CAT_CREATE_REQUEST });

		await axios.post(`${API_PREFIX}categories/`, body, config);

		dispatch({ type: CAT_CREATE_SUCCESS });
	} catch (err) {
		dispatch({
			type: CAT_CREATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

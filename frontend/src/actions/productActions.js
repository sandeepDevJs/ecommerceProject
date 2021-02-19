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
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAILS,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAILS,
	PRODUCT_IMAGE_UPDATE_REQUEST,
	PRODUCT_IMAGE_UPDATE_FAILS,
	PRODUCT_IMAGE_UPDATE_SUCCESS,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAILS,
} from "../constants/productConstant";

import {
	getProductsApi,
	listProductDetailsApi,
	listTopProductsApi,
	createProductReviewApi,
	listAllProductsApi,
	deleteProductApi,
	updateProductApi,
	updateImageProductApi,
	createProductApi,
} from "../apis/products";

export const listProducts = (keyword = "", page = 0) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await getProductsApi(keyword, page);
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
		const { data } = await listProductDetailsApi(slug);
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
		await createProductReviewApi(productId, review, config);
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
		const { data } = await listTopProductsApi();
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
		const { data } = await listAllProductsApi();
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

export const deleteProduct = (pid) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_DELETE_REQUEST });
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
		const { data } = await deleteProductApi(pid, config);
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_DELETE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateProduct = (pid, fdata) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_UPDATE_REQUEST });
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
		await updateProductApi(pid, fdata, config);
		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_UPDATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateImageProduct = (pid, fdata) => async (
	dispatch,
	getState
) => {
	dispatch({ type: PRODUCT_IMAGE_UPDATE_REQUEST });
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
		await updateImageProductApi(pid, fdata, config);
		dispatch({
			type: PRODUCT_IMAGE_UPDATE_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_IMAGE_UPDATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const createProduct = (body) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_CREATE_REQUEST });
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
		await createProductApi(body, config);
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_CREATE_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

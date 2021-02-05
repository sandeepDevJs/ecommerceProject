import {
	CAT_FETCH_BY_ID_FAILS,
	CAT_FETCH_BY_ID_SUCCESS,
	CAT_FETCH_BY_ID_REQUEST,
	CAT_FETCH_FAILS,
	CAT_FETCH_REQUEST,
	CAT_FETCH_SUCCESS,
	CAT_DELETE_REQUEST,
	CAT_DELETE_SUCCESS,
	CAT_DELETE_FAILS,
	CAT_DELETE_RESET,
	CAT_UPDATE_REQUEST,
	CAT_UPDATE_SUCCESS,
	CAT_UPDATE_FAILS,
	CAT_UPDATE_RESET,
	CAT_CREATE_REQUEST,
	CAT_CREATE_SUCCESS,
	CAT_CREATE_FAILS,
	CAT_CREATE_RESET,
} from "../constants/categoryConstants";

export const getCatReducer = (
	state = { cats: [{ subcategories: [{ _id: 0 }] }] },
	action
) => {
	switch (action.type) {
		case CAT_FETCH_REQUEST:
			return { loading: true, ...state };
		case CAT_FETCH_SUCCESS:
			return {
				loading: false,
				cats: action.payload,
			};

		case CAT_FETCH_FAILS:
			return { loading: false, error: action.payload, ...state };
		default:
			return state;
	}
};

export const getCatsByIdReducer = (
	state = { cats: { subcategories: [] } },
	action
) => {
	switch (action.type) {
		case CAT_FETCH_BY_ID_REQUEST:
			return { loading: true, ...state };
		case CAT_FETCH_BY_ID_SUCCESS:
			return {
				loading: false,
				cats: action.payload,
			};

		case CAT_FETCH_BY_ID_FAILS:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deleteCatReducer = (state = {}, action) => {
	switch (action.type) {
		case CAT_DELETE_REQUEST:
			return { loading: true };
		case CAT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case CAT_DELETE_FAILS:
			return { loading: false, error: action.payload };

		case CAT_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

export const updateCatReducer = (state = {}, action) => {
	switch (action.type) {
		case CAT_UPDATE_REQUEST:
			return { loading: true };
		case CAT_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case CAT_UPDATE_FAILS:
			return { loading: false, error: action.payload };

		case CAT_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};

export const createCatReducer = (state = {}, action) => {
	switch (action.type) {
		case CAT_CREATE_REQUEST:
			return { loading: true };
		case CAT_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case CAT_CREATE_FAILS:
			return { loading: false, error: action.payload };

		case CAT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

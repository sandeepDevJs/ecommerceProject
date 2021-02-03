import {
	CAT_FETCH_BY_ID_FAILS,
	CAT_FETCH_BY_ID_SUCCESS,
	CAT_FETCH_BY_ID_REQUEST,
	CAT_FETCH_FAILS,
	CAT_FETCH_REQUEST,
	CAT_FETCH_SUCCESS,
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

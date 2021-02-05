import {
	SUBCAT_FETCH_FAILS,
	SUBCAT_FETCH_REQUEST,
	SUBCAT_FETCH_SUCCESS,
	SUBCAT_DELETE_REQUEST,
	SUBCAT_DELETE_SUCCESS,
	SUBCAT_DELETE_FAILS,
	SUBCAT_DELETE_RESET,
	SUBCAT_UPDATE_REQUEST,
	SUBCAT_UPDATE_SUCCESS,
	SUBCAT_UPDATE_FAILS,
	SUBCAT_UPDATE_RESET,
} from "../constants/subcategoryConstants";

export const getSubCatReducer = (
	state = { subcats: [{ category_id: { _id: 0, category: "" } }] },
	action
) => {
	switch (action.type) {
		case SUBCAT_FETCH_REQUEST:
			return { loading: true, ...state };
		case SUBCAT_FETCH_SUCCESS:
			return {
				loading: false,
				subcats: action.payload,
			};

		case SUBCAT_FETCH_FAILS:
			return { loading: false, error: action.payload, ...state };
		default:
			return state;
	}
};

export const deleteSubCatReducer = (state = {}, action) => {
	switch (action.type) {
		case SUBCAT_DELETE_REQUEST:
			return { loading: true };
		case SUBCAT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case SUBCAT_DELETE_FAILS:
			return { loading: false, error: action.payload };

		case SUBCAT_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

export const updateSubCatReducer = (state = {}, action) => {
	switch (action.type) {
		case SUBCAT_UPDATE_REQUEST:
			return { loading: true };
		case SUBCAT_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case SUBCAT_UPDATE_FAILS:
			return { loading: false, error: action.payload };

		case SUBCAT_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};

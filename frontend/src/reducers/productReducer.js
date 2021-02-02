import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILS,
	PRODUCT_DETAILS_FAILS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILS,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAILS,
	PRODUCT_ALL_LIST_REQUEST,
	PRODUCT_ALL_LIST_SUCCESS,
	PRODUCT_ALL_LIST_FAILS,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAILS,
	PRODUCT_DELETE_RESET,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAILS,
	PRODUCT_UPDATE_RESET,
} from "../constants/productConstant";

let initStateForDetails = {
	_id: "6",
	name: "Amazon Echo Dot 3rd Generation",
	image: "/images/alexa.jpg",
	description:
		"Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
	brand: "Amazon",
	category: "Electronics",
	pricing: {
		price: 29.99,
	},
	manufacture_details: {
		model_number: "",
		release_date: "12/1/20",
	},
	countInStock: 0,
	rating: 4,
	avgRating: 0,
	reviews: [],
};

export const productListReducer = (
	state = { products: [], pagination: { page: 0 } },
	action
) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload.data,
				pagination: action.payload.pagination,
			};

		case PRODUCT_LIST_FAILS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = { product: initStateForDetails },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };

		case PRODUCT_DETAILS_FAILS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true, ...state };
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { loading: false, succes: true };

		case PRODUCT_CREATE_REVIEW_FAILS:
			return { loading: false, error: action.payload };

		case PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

export const producTopRatedReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_TOP_REQUEST:
			return { loading: true };
		case PRODUCT_TOP_SUCCESS:
			return { loading: false, products: action.payload };

		case PRODUCT_TOP_FAILS:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productListALLReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_ALL_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_ALL_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};

		case PRODUCT_ALL_LIST_FAILS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDelteReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case PRODUCT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case PRODUCT_DELETE_FAILS:
			return { loading: false, success: false, error: action.payload };

		case PRODUCT_DELETE_RESET:
			return {};

		default:
			return state;
	}
};

export const productUpdateReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case PRODUCT_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case PRODUCT_UPDATE_FAILS:
			return { loading: false, success: false, error: action.payload };

		case PRODUCT_UPDATE_RESET:
			return {};

		default:
			return state;
	}
};

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILS,
	PRODUCT_DETAILS_FAILS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
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
	countInStock: 0,
	rating: 4,
	avgRating: 0,
};

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };

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

import {
	CART_LIST_ITEM_REQUEST,
	CART_LIST_ITEM_SUCCESS,
	CART_LIST_ITEM_FAILS,
	CART_INCREMENT_ITEM_FAILS,
	CART_INCREMENT_ITEM_REQUEST,
	CART_INCREMENT_ITEM_SUCCESS,
} from "../constants/cartConstant";

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

export const initCartState = {
	products: [{ quantity: 0, productId: initStateForDetails }],
};

export const cartListReducer = (state = { cart: initCartState }, action) => {
	switch (action.type) {
		case CART_LIST_ITEM_REQUEST:
			return { loading: true, ...state };

		case CART_LIST_ITEM_SUCCESS:
			return { loading: false, cart: action.payload };

		case CART_LIST_ITEM_FAILS:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const cartIncrementReducer = (
	state = { cartIncrement: null },
	action
) => {
	switch (action.type) {
		case CART_INCREMENT_ITEM_REQUEST:
			return { cartIncrementloading: true, ...state };

		case CART_INCREMENT_ITEM_SUCCESS:
			return { cartIncrementloading: false, cartIncrement: true };

		case CART_INCREMENT_ITEM_FAILS:
			return {
				cartIncrementloading: false,
				cartIncrementerror: action.payload,
			};

		default:
			return state;
	}
};

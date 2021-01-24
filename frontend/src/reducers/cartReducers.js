import {
	CART_LIST_ITEM_REQUEST,
	CART_LIST_ITEM_SUCCESS,
	CART_LIST_ITEM_FAILS,
	CART_INCREMENT_ITEM_FAILS,
	CART_INCREMENT_ITEM_REQUEST,
	CART_INCREMENT_ITEM_SUCCESS,
	CART_ADD_ITEM_FAILS,
	CART_ADD_ITEM_REQUEST,
	CART_ADD_ITEM_SUCCESS,
	CART_REMOVE_ITEM_FAILS,
	CART_REMOVE_ITEM_REQUEST,
	CART_REMOVE_ITEM_SUCCESS,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
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

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: {};

const initCartState = {
	products: [{ quantity: 0, productId: initStateForDetails }],
};

const initialShippingAdressDetails = {
	shippingAddress: shippingAddressFromLocalStorage,
	paymentMethod: paymentMethodFromLocalStorage,
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

export const AddToCartReducer = (state = { isAdded: false }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM_REQUEST:
			return { loading: true, ...state };

		case CART_ADD_ITEM_SUCCESS:
			return { loading: false, isAdded: true };

		case CART_ADD_ITEM_FAILS:
			return { loading: false, isAdded: false, error: action.payload };

		default:
			return state;
	}
};

export const removeFromCartReducer = (state = { isRemoved: false }, action) => {
	switch (action.type) {
		case CART_REMOVE_ITEM_REQUEST:
			return { loading: true, ...state };

		case CART_REMOVE_ITEM_SUCCESS:
			return { loading: false, isRemoved: true };

		case CART_REMOVE_ITEM_FAILS:
			return { loading: false, isRemoved: false, error: action.payload };

		default:
			return state;
	}
};

export const shippingReducer = (
	state = initialShippingAdressDetails,
	action
) => {
	switch (action.type) {
		case CART_SAVE_SHIPPING_ADDRESS:
			return { shippingAddress: action.payload };

		case CART_SAVE_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload };
		default:
			return state;
	}
};

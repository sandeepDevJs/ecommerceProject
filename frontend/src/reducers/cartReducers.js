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
	CART_INCREMENT_ITEM_RESET,
	CART_REMOVE_ITEM_RESET,
	CART_ADD_ITEM_RESET,
} from "../constants/cartConstant";

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: {};

const cartDetailsFromLocalStorage = localStorage.getItem("cartDetails")
	? JSON.parse(localStorage.getItem("cartDetails"))
	: { products: [], total: 0 };

const initialShippingAdressDetails = {
	shippingAddress: shippingAddressFromLocalStorage,
	paymentMethod: paymentMethodFromLocalStorage,
};

export const cartListReducer = (
	state = { cart: cartDetailsFromLocalStorage },
	action
) => {
	switch (action.type) {
		case CART_LIST_ITEM_REQUEST:
			return { loading: true };

		case CART_LIST_ITEM_SUCCESS:
			return { loading: false, cart: action.payload };

		case CART_LIST_ITEM_FAILS:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export const incrementCartReducer = (state = {}, action) => {
	switch (action.type) {
		case CART_INCREMENT_ITEM_REQUEST:
			return { loading: true };

		case CART_INCREMENT_ITEM_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case CART_INCREMENT_ITEM_FAILS:
			return {
				loading: false,
				error: action.payload,
			};

		case CART_INCREMENT_ITEM_RESET:
			return {};

		default:
			return state;
	}
};

export const AddToCartReducer = (state = {}, action) => {
	switch (action.type) {
		case CART_ADD_ITEM_REQUEST:
			return { loading: true };

		case CART_ADD_ITEM_SUCCESS:
			return { loading: false, isAdded: true };

		case CART_ADD_ITEM_FAILS:
			return { loading: false, error: action.payload };

		case CART_ADD_ITEM_RESET:
			return {};

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

		case CART_REMOVE_ITEM_RESET:
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

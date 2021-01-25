import {
	ORDER_CREATE_FAILS,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_FAILS,
} from "../constants/orderConstant";

const orderCreateFromLocalStorage = localStorage.getItem("orderCreate")
	? JSON.parse(localStorage.getItem("orderCreate"))
	: {};

export const orderCreateReducer = (
	state = orderCreateFromLocalStorage,
	action
) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { ...state, loading: true };

		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };

		case ORDER_CREATE_FAILS:
			return { loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAdress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };

		case ORDER_DETAILS_FAILS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

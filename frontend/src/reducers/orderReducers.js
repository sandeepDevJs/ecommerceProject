import {
	ORDER_CREATE_FAILS,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_RESET,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_FAILS,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAILS,
	ORDER_PAY_RESET,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_FAILS,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_RESET,
	ORDER_LIST_ALL_REQUEST,
	ORDER_LIST_ALL_SUCCESS,
	ORDER_LIST_ALL_FAILS,
	ORDER_LIST_ALL_RESET,
	ORDER_DELIVERED_REQUEST,
	ORDER_DELIVERED_SUCCESS,
	ORDER_DELIVERED_FAILS,
	ORDER_DELIVERED_RESET,
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

		case ORDER_CREATE_RESET:
			return {};
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

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };

		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true };

		case ORDER_PAY_FAILS:
			return { loading: false, error: action.payload };

		case ORDER_PAY_RESET:
			return {};

		default:
			return state;
	}
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return { loading: true };

		case ORDER_LIST_MY_SUCCESS:
			return { loading: false, orders: action.payload };

		case ORDER_LIST_MY_FAILS:
			return { loading: false, error: action.payload };

		case ORDER_LIST_MY_RESET:
			return { orders: [] };

		default:
			return state;
	}
};

export const orderListAllReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_ALL_REQUEST:
			return { loading: true };

		case ORDER_LIST_ALL_SUCCESS:
			return { loading: false, orders: action.payload };

		case ORDER_LIST_ALL_FAILS:
			return { loading: false, error: action.payload };

		case ORDER_LIST_ALL_RESET:
			return { orders: [] };

		default:
			return state;
	}
};

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVERED_REQUEST:
			return { loading: true };

		case ORDER_DELIVERED_SUCCESS:
			return { loading: false, success: true };

		case ORDER_DELIVERED_FAILS:
			return { loading: false, error: action.payload };

		case ORDER_DELIVERED_RESET:
			return {};

		default:
			return state;
	}
};

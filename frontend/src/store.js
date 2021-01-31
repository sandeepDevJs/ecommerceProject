import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
	productReviewCreateReducer,
	producTopRatedReducer,
} from "./reducers/productReducer";

import {
	cartListReducer,
	AddToCartReducer,
	removeFromCartReducer,
	shippingReducer,
	incrementCartReducer,
} from "./reducers/cartReducers";

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
	userAllUsersReducer,
} from "./reducers/userReducers";

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListMyReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productCreateReview: productReviewCreateReducer,
	productTopRated: producTopRatedReducer,
	cartList: cartListReducer,
	incrementCart: incrementCartReducer,
	AddToCart: AddToCartReducer,
	RemoveFromCart: removeFromCartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userForgotPassword: forgotPasswordReducer,
	userResetPassword: resetPasswordReducer,
	adminUserAllUser: userAllUsersReducer,
	shippingDetails: shippingReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
});

const initialState = {};
const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

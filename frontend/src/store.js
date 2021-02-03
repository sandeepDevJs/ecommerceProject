import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
	productReviewCreateReducer,
	producTopRatedReducer,
	productListALLReducer,
	productDelteReducer,
	productUpdateReducer,
	productImageUpdateReducer,
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
	getAllOrderDetailsListByIdReducer,
} from "./reducers/userReducers";

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListMyReducer,
} from "./reducers/orderReducers";

import { getCatReducer, getCatsByIdReducer } from "./reducers/categoryReducers";

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
	adminGetAllOrderDetailsByUserId: getAllOrderDetailsListByIdReducer,
	adminAllProductList: productListALLReducer,
	adminDeleteProduct: productDelteReducer,
	adminUpdateProduct: productUpdateReducer,
	catList: getCatReducer,
	catById: getCatsByIdReducer,
	updateImage: productImageUpdateReducer,
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

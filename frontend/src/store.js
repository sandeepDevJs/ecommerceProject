import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducer";

import {
	cartListReducer,
	AddToCartReducer,
	removeFromCartReducer,
	shippingReducer,
} from "./reducers/cartReducers";

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from "./reducers/userReducers";

import {
	orderCreateReducer,
	orderDetailsReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cartList: cartListReducer,
	AddToCart: AddToCartReducer,
	RemoveFromCart: removeFromCartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	shippingDetails: shippingReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
});

const initialState = {};
const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

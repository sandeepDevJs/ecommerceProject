import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducer";

import {
	cartListReducer,
	cartIncrementReducer,
	AddToCartReducer,
	removeFromCartReducer,
} from "./reducers/cartReducers";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cartList: cartListReducer,
	isCartIncrement: cartIncrementReducer,
	AddToCart: AddToCartReducer,
	RemoveFromCart: removeFromCartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
});

const initialState = {};
const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILS,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAILS,
	USER_PROFILE_UPDATE_FAILS,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_DETAILS_RESET,
	USER_PROFILE_UPDATE_RESET,
} from "../constants/userConstants";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

export const userLoginReducer = (
	state = { userInfo: userInfoFromLocalStorage },
	action
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };

		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_LOGIN_FAILS:
			return { loading: false, error: action.payload };

		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };

		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_REGISTER_FAILS:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const userDetailsReducer = (
	state = { user: { name: undefined } },
	action
) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };

		case USER_DETAILS_FAILS:
			return { loading: false, error: action.payload };

		case USER_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};

export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return { ...state, loading: true };

		case USER_PROFILE_UPDATE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };

		case USER_PROFILE_UPDATE_FAILS:
			return { loading: false, success: false, error: action.payload };

		case USER_PROFILE_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};

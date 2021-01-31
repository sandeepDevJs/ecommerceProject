import {
	USER_ALL_USERS_FAILS,
	USER_ALL_USERS_REQUEST,
	USER_ALL_USERS_SUCCESS,
} from "../../constants/userConstants";
import axios from "axios";

let { isAdmin, token } = JSON.parse(localStorage.getItem("userInfo"));
let config = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
};

export const getAllUsersList = () => async (dispatch) => {
	try {
		dispatch({ type: USER_ALL_USERS_REQUEST });

		let { data } = await axios.get("http://localhost:4000/api/users", config);

		dispatch({ type: USER_ALL_USERS_SUCCESS, payload: data.data });
	} catch (err) {
		dispatch({
			type: USER_ALL_USERS_FAILS,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

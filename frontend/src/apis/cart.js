import axios from "axios";
import { API_PREFIX } from "../utils/apiConstants";

export const listCartApi = (config) => {
	return axios.get(`${API_PREFIX}carts/`, config);
};

export const incrementCartApi = (pid, op, config) => {
	if (op === "decrement") {
		return axios.put(`${API_PREFIX}carts/${pid}?decrement=1`, {}, config);
	} else {
		return axios.put(`${API_PREFIX}carts/${pid}`, {}, config);
	}
};

export const AddToCartApi = (pid, qty, config) => {
	return axios.post(`${API_PREFIX}carts/${pid}?quantity=${qty}`, {}, config);
};

export const removeFromCartApi = (pid, config) => {
	return axios.delete(`${API_PREFIX}carts/${pid}`, config);
};

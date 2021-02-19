import axios from "axios";
import { API_PREFIX } from "../utils/apiConstants";

export const getProductsApi = (keyword, page) => {
	return axios.get(
		`${API_PREFIX}products?limit=3&keyword=${keyword}&page=${page}`
	);
};

export const listProductDetailsApi = (slug) => {
	return axios.get(`${API_PREFIX}products?slug=${slug}`);
};

export const listTopProductsApi = () => {
	return axios.get(`${API_PREFIX}products/topProducts`);
};

export const createProductReviewApi = (productId, review, config) => {
	return axios.post(
		`${API_PREFIX}reviews/product/${productId}`,
		review,
		config
	);
};

export const listAllProductsApi = (limit) => {
	return axios.get(`${API_PREFIX}products?limit=${limit}`);
};

export const deleteProductApi = (pid, config) => {
	return axios.delete(`${API_PREFIX}products/${pid}`, config);
};

export const updateProductApi = (pid, fdata, config) => {
	return axios.put(`${API_PREFIX}products/${pid}`, fdata, config);
};

export const updateImageProductApi = (pid, fdata, config) => {
	return axios.put(`${API_PREFIX}products/updateImage/${pid}`, fdata, config);
};

export const createProductApi = (body, config) => {
	return axios.post(`${API_PREFIX}products/`, body, config);
};

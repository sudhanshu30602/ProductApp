import axios from 'axios';
const API_BASE = 'https://fakestoreapi.com/products';

export const getProducts = () => axios.get(API_BASE);
export const getProductById = (id) => axios.get(`${API_BASE}/${id}`);
export const addProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);

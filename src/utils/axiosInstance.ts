import axios from 'axios';
import { getToken } from './storage';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5143/api/',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Allow-Control-Allow-Origin': '*',
		'Access-Control-Allow-Origin': '*',
	},
});
axiosInstance.interceptors.request.use((req) => {
	const token = getToken();
	if (token) {
		req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});
export * from 'axios';
export default axiosInstance;

'use client';
import axios from 'axios';
import { getUserToken } from './utils';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

const https = () => {
	const accessToken = getUserToken();
	console.log(accessToken)

	const axiosInstance = axios.create({
		baseURL,
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${accessToken}`,
		},
		timeout: 60000,
	});

	const requestHandler = (request: any) => {
		request.headers.Authorization = `Bearer ${accessToken}`;
		return request;
	};

	const errorHandler = (error: any) => {
		// eslint-disable-next-line no-undef
		return Promise.reject(error);
	};

	axiosInstance.interceptors.request.use(
		(request) => {
			return requestHandler(request);
		},
		(error) => {
			errorHandler(error);
		},
	);

	axiosInstance.interceptors.response.use(
		(response: any) => {
			if (response.status === 204) {
				return { status: 'success' };
			}
			return {
				status: response.status,
				...response,
			};
		},
		async (err) => {
			const statusCode = err.response.status;
			if (statusCode === 400) {
				return Promise.reject({
					data: '',
					status: 400,
					message: err?.response?.data?.message,
				});
			} else if (statusCode === 401) {
				// localStorage.clear();
				// typeof window !== "undefined" ? (window.location.href = "/") : false;
			} else if (statusCode === 404) {
				return Promise.reject({
					data: '',
					status: 404,
					message: 'Resource not found',
				});
			} else if (statusCode === 403) {
				return Promise.reject({
					data: '',
					status: 403,
					message: err?.response?.data?.message,
				});
			} else {
				return Promise.reject({
					status: err.response.statusCode,
					message: err.response.statusText,
				});
			}
		},
	);

	return axiosInstance;
};

export default https;

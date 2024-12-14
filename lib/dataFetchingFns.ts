import axios from 'axios';
import https from './https';
import {
	GetAUserApiResponse,
	GetCartApiResponse,
	GetOneProductApiResponse,
	GetOrderApiResponse,
	GetOrdersApiResponse,
	GetProductApiResponse,
	GetTransactionsApiResponse,
	GetWishlistApiResponse,
	OrderItems,
} from './types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const headers = {
	// withCredentials: true,
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

const requestheaders = new Headers();
requestheaders.append('X-CSCAPI-KEY', 'QnJvdFZSNGFhSmM1RlJsSHpLbkVBS1ZjeG0xR3VtWkZEeXFUZWhPTg==');

const requestOptions = {
	method: 'GET',
	headers: requestheaders,
	redirect: 'follow',
};

export async function GetUser() {
	const response = await https().get(`/users/me`);
	return response.data as GetAUserApiResponse;
}

export async function GetHypeProducts() {
	const response = await axios.get(`${baseUrl}/products/hype`, { headers });
	return response.data as GetProductApiResponse;
}

export async function GetTrendingProducts() {
	const response = await axios.get(`${baseUrl}/products/trending`, { headers });
	return response.data as GetProductApiResponse;
}

export async function GetFrequentProducts() {
	const response = await axios.get(`${baseUrl}/products/frequent`, { headers });
	return response.data as GetProductApiResponse;
}

export async function GetAllProducts() {
	const response = await axios.get(`${baseUrl}/products`, { headers });
	return response.data as GetProductApiResponse;
}

export async function GetOneProduct(id: string) {
	const response = await axios.get(`${baseUrl}/products/${id}`, { headers });
	return response.data as GetOneProductApiResponse;
}

export async function GetProductByCategory(id: string) {
	const response = await axios.get(`${baseUrl}/products/category/${id}`, {
		headers,
	});

	return response.data as GetProductApiResponse;
}

export async function GetProductsCategories() {
	const response = await axios.get(`${baseUrl}/categories`, { headers });
	return response.data as GetProductApiResponse;
}

export async function GetProductsSubcategories(id: string) {
	const response = await axios.get(`${baseUrl}/categories/${id}/nested`, {
		headers,
	});
	return response.data as GetProductApiResponse;
}

export async function GetCart() {
	const response = await https().get(`${baseUrl}/carts`, { headers });
	return response.data as GetCartApiResponse;
}

export async function GetWishlist() {
	const response = await https().get(`${baseUrl}/wishlists`, { headers });
	return response.data as GetWishlistApiResponse;
}
export async function VerifyEmail(token: string) {
	const response = await axios.post(
		`${baseUrl}/verify-email`,
		{
			token,
		},
		{ headers },
	);
	return response.data as any;
}

export async function resendOtp(email: string) {
	const response = await axios.post(
		`${baseUrl}/verification-token`,
		{
			email,
		},
		{ headers },
	);
	return response.data as any;
}

export async function GetAllSearchedProducts(search: string) {
	const response = await axios.get(`${baseUrl}/products?search=${search}`, {
		headers,
	});
	return response.data as GetProductApiResponse;
}

export async function GetAllFilteredProducts(params: any) {
	const response = await axios.get(`${baseUrl}/products`, { params, headers });
	return response.data as GetProductApiResponse;
}

export async function GetProductReviews(productId: string) {
	const response = await https().get(`${baseUrl}/reviews/${productId}`);
	return response.data as any;
}

export async function GetAllOrders() {
	const response = await https().get(`${baseUrl}/orders?role=user`);
	return response.data as GetOrdersApiResponse;
}

export async function GetEachOrder(id: string) {
	const response = await https().get(`${baseUrl}/orders/${id}`);
	return response.data;
}

export async function GetAllOrdersParams(params: any) {
	const response = await https().get(`${baseUrl}/orders?role=user`, {
		params,
	});
	return response.data as GetOrdersApiResponse;
}

export async function GetAllTransactions() {
	const response = await https().get(`${baseUrl}/transactions`);
	return response.data as GetTransactionsApiResponse;
}

export async function GetAllTransactionsWithParams(params: any) {
	const response = await https().get(`${baseUrl}/transactions`, {
		params,
	});
	return response.data as GetTransactionsApiResponse;
}

export async function GetOrder(reference: string) {
	const response = await https().get(`${baseUrl}/orders/${reference}`);
	return response.data as GetOrderApiResponse;
}

export async function GetSession(reference: string) {
	const response = await https().get(`${baseUrl}/orders/session/${reference}`);
	return response.data as GetOrderApiResponse;
}

export async function TrackOrders(reference: string) {
	const response = await https().get(`${baseUrl}/orders/track/${reference}`);
	return response.data?.data as any;
}

export async function GetStates(country: string) {
	const response = await axios.get(
		`https://api.countrystatecity.in/v1/countries/${country}/states`,
		requestOptions as any,
	);

	return response.data as any;
}

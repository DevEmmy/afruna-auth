import axios from 'axios';
import https from './https';
import {
	CartApiResponse,
	DeliveryInforApiCredentails,
	DeliveryinfoApiResponse,
	FollowuserApiCredentails,
	FollowuserApiResponse,
	ForgotPasswordApiCredentails,
	ForgotPasswordApiResponse,
	PaymentApiResponse,
	ResetPasswordApiCredentails,
	SigninApiCredentails,
	SigninApiResponse,
	SignupApiCredentails,
	SignupApiResponse,
	UpdatePasswordApiCredentails,
	UpdatePasswordApiResponse,
	addToCartCredentails,
	createReviewtCredentails,
	resetPasswordApiResponse,
} from './types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const headers = {
	// withCredentials: true,
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export async function Signup(credentials: SignupApiCredentails) {
	const response = await axios.post(`${baseUrl}/signup`, credentials, {
		headers,
	});
	return response.data as SignupApiResponse;
}

export async function SignIn(credentials: SigninApiCredentails) {
	const response = await axios.post(`${baseUrl}/signin`, credentials, {
		headers,
	});
	return response.data as SigninApiResponse;
}

export async function ForgotPassword(credentials: ForgotPasswordApiCredentails) {
	const response = await axios.post(`${baseUrl}/forgot-password/`, credentials, {
		headers,
	});
	return response.data as ForgotPasswordApiResponse;
}

export async function ResetPassword(credentials: ResetPasswordApiCredentails) {
	const body = {
		password: credentials.password,
	};
	const response = await axios.post(`${baseUrl}/reset-password/${credentials?.token}`, body, {
		headers,
	});
	return response.data as resetPasswordApiResponse;
}

export async function AddItemToCart(credentials: addToCartCredentails) {
	const response = await https().post(`${baseUrl}/carts/`, credentials);
	return response.data as CartApiResponse;
}

export async function RemoveUnitItemFromCart(productId: string) {
	const response = await https().delete(`${baseUrl}/carts/${productId}`);
	return response.data as any;
}

export async function AddUnitItemFromCart(id: string) {
	const body = {
		productId: id,
	};
	const response = await https().post(`${baseUrl}/carts`, body);
	return response.data as any;
}

export async function ClearToCart() {
	const response = await https().delete(`${baseUrl}/carts`);
	return response.data as CartApiResponse;
}

export async function RemoveItemFromCart(productId: string) {
	const response = await https().delete(`${baseUrl}/carts/${productId}`);
	return response.data as any;
}

export async function AddItemToWishlist(credentials: any) {
	const response = await https().post(`${baseUrl}/wishlists/`, credentials);
	return response.data as any;
}

export async function RemoveItemFromWishlist(productId: string) {
	const response = await https().delete(`${baseUrl}/wishlists/${productId}`);
	return response.data as any;
}

export async function CreateReview(credentials: createReviewtCredentails) {
	const response = await https().post(`${baseUrl}/reviews/`, credentials);
	return response.data as any;
}

export async function UpdatePassword(credentials: UpdatePasswordApiCredentails) {
	const response = await https().put(`${baseUrl}/password`, credentials);
	return response.data as UpdatePasswordApiResponse;
}

export async function FollowUser(credentials: FollowuserApiCredentails) {
	const response = await https().put(`${baseUrl}/users/follow`, credentials);
	return response.data as FollowuserApiResponse;
}

export async function DeliveryInformation(credentials: DeliveryInforApiCredentails) {
	const response = await https().post(`${baseUrl}/orders/checkout`, credentials);
	return response.data as DeliveryinfoApiResponse;
}
export async function OrderPayment(credentials: any) {
	const body = {
		orderId: credentials.orderId,
	};
	const response = await https().post(
		`${baseUrl}/transactions?url=${credentials.url}?orderRef=${credentials.orderId}`,
		body,
	);
	return response.data as PaymentApiResponse;
}

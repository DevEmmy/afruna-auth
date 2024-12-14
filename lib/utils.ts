import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import moment from 'moment';
import {setCookie, getCookie, deleteCookie} from 'cookies-next'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setToken(userToken: string) {
	if (typeof window !== 'undefined') {
		// Set token in localStorage for client-side usage
		localStorage.setItem('accessToken', userToken);
	} else {
		// Handle cookies for server-side rendering scenarios if needed
		return false;
	}

	// Set token as a cookie with subdomain support
	setCookie('accessToken', userToken, {
		maxAge: 60 * 60 * 24 * 30, // 30 days
		path: '/', // Make it available on all paths
		domain: '.afruna.com', // Replace with your root domain
		secure: true, // Required for sameSite: 'none'
		sameSite: 'none', // Allow cookie to be sent on cross-origin requests
	});
}

export function getUserToken(): string | null {
	let tokenString: string | null = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

	if (!tokenString) {
		tokenString = (getCookie('accessToken') as string) || null; // Type assertion with a fallback to null
	}

	return tokenString;
}
export function capitalize(str: string) {
	return str?.charAt(0).toUpperCase() + str.slice(1);
}

export function logout() {
	// if (typeof window !== 'undefined') {
	// 	localStorage.removeItem('accessToken');
	// 	// window.location.reload();
	// }
	deleteCookie('accessToken');
}

export function convertBytes(size: number, unit: string = 'kb'): number {
	if (unit === 'kb') {
		return Number((size / 1024).toFixed());
	} else if (unit === 'mb') {
		return Number((size / (1024 * 1024)).toFixed());
	} else {
		return Number(size.toFixed());
	}
}

// hide secret key
const secretKey = 'secret';
const encodedKey = new TextEncoder().encode(secretKey);

export const encrypt = (payload: any): Promise<string> => {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey);
};

export const decrypt = async (token: string): Promise<JWTPayload> => {
	const { payload } = await jwtVerify(token, encodedKey);
	return payload;
};

export const formatDateObjectHandler = (dateObj: string, format = 'YYYY-MM-DD') => {
	if (!dateObj) {
		return undefined;
	}
	if (!moment.isMoment(dateObj)) {
		return moment(dateObj).format(format);
	}
	return dateObj.format(format);
};

export const isObject = (value: any) => {
	return (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value) &&
		!(value instanceof RegExp) &&
		!(value instanceof Date) &&
		!(value instanceof Set) &&
		!(value instanceof Map)
	);
};

export const emptyResponse = () => {
	return { success: true, data: [] };
};

export const copierHelper = (text: string, toast: any) => {
	if (text) {
		navigator.clipboard.writeText(text);
		toast({
			title: 'Copied Successfully',
			variant: 'success',
		});
	} else {
		toast({
			title: 'Copied Successfully',
			variant: 'success',
		});
	}
};

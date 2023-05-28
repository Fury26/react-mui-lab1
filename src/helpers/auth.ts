import axios, { AxiosError } from 'axios';
import { getAccessToken, setAccessToken } from 'store/auth';
import { Credentials, User } from 'store/auth/types';

import { ERRORS } from './messages';

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL + '/api',
	timeout: 30000,
});

export const logout = (withLogoutMessage = false) => {
	const logoutEvent = new CustomEvent('logout', { detail: { withLogoutMessage } });
	window.dispatchEvent(logoutEvent);
};

axiosInstance.interceptors.request.use((_request) => {
	const request = { ..._request, headers: _request.headers || {} };
	request.headers.authorization = `Bearer ${getAccessToken()?.token}`;

	return request;
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		if (error?.response?.status === 401) {
			if (!error?.request?.responseURL?.includes('logout')) {
				logout(true);
			}
		}
		return Promise.reject(error);
	},
);

export const fetchUser = async (cred: Credentials) => {
	try {
		const res = await axiosInstance.get<{ user: User }>('/users/me');
		return { user: res.data.user };
	} catch (error) {
		throw error;
	}
};

export type LoginInput = {
	email: string;
	password: string;
};

export type RegisterInput = LoginInput & {
	name: string;
};

export const loginUser = async (input: LoginInput) => {
	try {
		const res = await axiosInstance.post<{ token: string }>('/auth/login', input);
		setAccessToken({ token: res.data.token });
		return { token: res.data.token, error: '' };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error || ERRORS.DEFAULT, token: '' };
	}
};

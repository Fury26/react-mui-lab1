import { toast } from 'react-toastify';
import axios from 'axios';

import { getAccessToken, setAccessToken } from '../store/auth';
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

export const fetchUser = async (cred) => {
	try {
		const res = await axiosInstance.get('/users/me');
		return { user: res.data.user };
	} catch (error) {
		console.log('toast', error.response?.data.error);

		toast(error.response?.data.error, { type: 'error' });
		throw error;
	}
};

export const loginUser = async (input) => {
	try {
		const res = await axiosInstance.post('/auth/login', input);
		setAccessToken({ token: res.data.token });
		return { token: res.data.token, error: '' };
	} catch (error) {
		toast(error.response?.data.error, { type: 'error' });
		return { error: error.response?.data.error || ERRORS.DEFAULT, token: '' };
	}
};

export const registerUser = async (input) => {
	try {
		const res = await axiosInstance.post('/auth', input);
		setAccessToken({ token: res.data.token });
		return { token: res.data.token, error: '' };
	} catch (error) {
		return { error: error.response?.data.error || ERRORS.DEFAULT, token: '' };
	}
};

export const getInitials = (name) =>
	name
		.split(' ')
		.map((str) => str[0].toUpperCase())
		.join('');

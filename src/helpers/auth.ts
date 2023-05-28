import axios, { AxiosError } from 'axios';
import { getAccessToken } from 'store/auth';
import { Credentials } from 'store/auth/types';

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
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

export const fetchUser = async (cred: Credentials) => {
	return { user: null };
};

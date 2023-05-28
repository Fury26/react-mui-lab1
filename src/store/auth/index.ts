import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, GetState, ResponseCallback, RootState, store } from 'store';

import { axiosInstance, fetchUser } from 'helpers/auth';
import { ERRORS } from 'helpers/messages';

import { AuthState, Credentials, User } from './types';
export * from './types';

export const initialState: AuthState = {
	user: null,
	isLoadingUser: false,
};

const key = 'credentials';

export const setAccessToken = (cred: Credentials) => {
	localStorage.setItem(key, JSON.stringify(cred));
};

export const getAccessToken = () => {
	const cred = localStorage.getItem(key);
	if (!cred) {
		return null;
	}
	const res: Credentials = JSON.parse(cred);
	return res;
};

export const removeAccessToken = () => {
	localStorage.removeItem(key);
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoading: (state: AuthState, action: PayloadAction<boolean>) => {
			state.isLoadingUser = action.payload;
		},
		setUser: (state: AuthState, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		clearUser: (state: AuthState) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser, setIsLoading } = authSlice.actions;

export default authSlice.reducer;

export const getUser = (cred: Credentials) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true));
	try {
		const { user } = await fetchUser(cred);
		dispatch(setUser(user));
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		removeAccessToken();
		dispatch(clearUser());
		toast(error.response?.data.error || ERRORS.DEFAULT, { type: 'error' });
	}
	dispatch(setIsLoading(false));
};

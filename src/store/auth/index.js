import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from '../../helpers/auth';
import { ERRORS } from '../../helpers/messages';

export const initialState = {
	user: null,
	isLoadingUser: false,
};

const key = 'credentials';

export const setAccessToken = (cred) => {
	localStorage.setItem(key, JSON.stringify(cred));
};

export const getAccessToken = () => {
	const cred = localStorage.getItem(key);
	if (!cred) {
		return null;
	}
	const res = JSON.parse(cred);
	return res;
};

export const removeAccessToken = () => {
	localStorage.removeItem(key);
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoadingUser = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser, setIsLoading } = authSlice.actions;

export default authSlice.reducer;

export const getUser = (cred) => async (dispatch) => {
	dispatch(setIsLoading(true));
	try {
		const { user } = await fetchUser(cred);
		dispatch(setUser(user));
	} catch (error) {
		removeAccessToken();
		dispatch(clearUser());
		toast(error.response?.data.error || ERRORS.DEFAULT, { type: 'error' });
	}
	dispatch(setIsLoading(false));
};

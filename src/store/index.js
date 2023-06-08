import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer, { initialState as authInit } from './auth/index.js';
import postReducer, { initialState as postInit } from './posts/index.js';

const combinedReducer = combineReducers({
	auth: authReducer,
	post: postReducer,
});

const rootReducer = (state, action) => {
	let newState = { ...state };
	if (action.type === 'logout') {
		newState = {
			auth: authInit,
			post: postInit,
		};
	}
	return combinedReducer(newState, action);
};

export function setupStore(preloadedState) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}

export const store = configureStore({
	reducer: rootReducer,
});

export const logoutAction = () => ({ type: 'logout' });
export const useAppDispatch = () => useDispatch();
export const useSelector = useReduxSelector;

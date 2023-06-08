import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { Action, combineReducers, configureStore, PreloadedState, Reducer } from '@reduxjs/toolkit';

import authReducer, { AuthState, initialState as authInit } from './auth';
import postReducer, { initialState as postInit, PostState } from './posts';

const combinedReducer = combineReducers({
	auth: authReducer,
	post: postReducer,
});

const rootReducer: Reducer = (state: RootState, action: Action) => {
	let newState = { ...state };
	if (action.type === 'logout') {
		newState = {
			auth: authInit,
			post: postInit,
		};
	}
	return combinedReducer(newState, action);
};

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
}

export const store = configureStore({
	reducer: rootReducer,
});

export type ResponseCallback = {
	success?: () => any;
	error?: (error: { error: string }) => any;
};

export type DispatchReturn<T> = {
	isError: boolean;
	error?: string;
	data?: T;
};

export const logoutAction = () => ({ type: 'logout' });

export type RootState = { auth: AuthState; post: PostState };
export type AppDispatch = typeof store.dispatch;
export type GetState = () => RootState;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export type AppStore = ReturnType<typeof setupStore>;

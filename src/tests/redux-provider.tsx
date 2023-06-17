import { PropsWithChildren } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';

import authReducer from '../store/auth';
import postReducer from '../store/posts';
import { DefaultState } from './constants';

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = DefaultState,
		// Automatically create a store instance if no store was passed in
		store = configureStore({ reducer: { auth: authReducer, post: postReducer }, preloadedState }),
		...renderOptions
	} = {},
) {
	const Wrapper = ({ children }: PropsWithChildren<{}>) => {
		return (
			<BrowserRouter>
				<Provider store={store}>{children}</Provider>
			</BrowserRouter>
		);
	};

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

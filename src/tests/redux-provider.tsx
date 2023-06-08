import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { AppStore, RootState } from 'store';
import userReducer, { initialState as UserState } from 'store/auth';
import postReducer, { initialState as PostState } from 'store/posts';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export const defaultState = { auth: UserState, post: PostState };
export const TestUser = {
	_id: '1',
	name: 'User 1',
	email: 'email1@gmail.com',
	dislikedPosts: [],
	likedPosts: [],
};
export const TestUser2 = {
	_id: '2',
	name: 'User 2',
	email: 'email2@gmail.com',
	dislikedPosts: [],
	likedPosts: [],
};
export const LoadedUser: typeof UserState = {
	user: TestUser,
	isLoadingUser: false,
};

export const UserPosts: typeof PostState = {
	feed: {
		metadata: {
			page: 1,
			perPage: 30,
		},
		posts: [
			{
				owner: TestUser,
				body: 'Body text',
				comments: [],
				title: 'Title',
				_id: 'post_1',
				likes: 0,
				dislikes: 0,
				created_at: Date.now().toString(),
				updated_at: Date.now.toString(),
			},
			{
				owner: TestUser2,
				body: 'Body text 2',
				comments: [],
				title: 'Title 2',
				_id: 'post_2',
				likes: 0,
				dislikes: 0,
				created_at: Date.now().toString(),
				updated_at: Date.now.toString(),
			},
		],
	},
	isLoadingPosts: false,
	activePost: null,
	activePostComments: null,
};

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = defaultState,
		// Automatically create a store instance if no store was passed in
		store = configureStore({ reducer: { user: userReducer, post: postReducer }, preloadedState: defaultState }),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	const Wrapper = ({ children }: PropsWithChildren<{}>) => {
		return <Provider store={store}>{children}</Provider>;
	};

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

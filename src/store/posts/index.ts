import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, GetState } from 'store';
import { setUser } from 'store/auth';

import { fetchUser } from 'helpers/auth';
import { ERRORS } from 'helpers/messages';
import { dislikePostRequest, fetchFeed, likePostRequest } from 'helpers/posts';

import { MetaData, Post, PostQuery, PostState } from './types';
export * from './types';

export const initialState: PostState = {
	feed: { posts: [], metadata: { page: 1, perPage: 30 } },
	isLoadingPosts: false,
};

export const postsSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoading: (state: PostState, action: PayloadAction<boolean>) => {
			state.isLoadingPosts = action.payload;
		},
		addFeedPosts: (state: PostState, action: PayloadAction<{ posts: Post[]; metadata: MetaData }>) => {
			state.feed.posts.push(...action.payload.posts);
			state.feed.metadata = action.payload.metadata;
		},
		updateFeedById: (state: PostState, action: PayloadAction<Post>) => {
			const ind = state.feed.posts.findIndex(({ _id }) => _id === action.payload._id);
			if (ind < 0) {
				return;
			}
			state.feed.posts[ind] = action.payload;
		},
	},
});

export const { setIsLoading, addFeedPosts, updateFeedById } = postsSlice.actions;

export default postsSlice.reducer;

export const getFeedPosts = (params: PostQuery) => async (dispatch: AppDispatch, GetState: GetState) => {
	dispatch(setIsLoading(true));
	const res = await fetchFeed(params);
	if (res.posts) {
		dispatch(addFeedPosts(res));
	} else {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	}

	dispatch(setIsLoading(false));
};

export const likePost = (postId: string) => async (dispatch: AppDispatch, GetState: GetState) => {
	dispatch(setIsLoading(true));
	const res = await likePostRequest(postId);
	if (res.post) {
		dispatch(updateFeedById(res.post));
	}
	dispatch(setIsLoading(false));
};

export const dislikePost = (postId: string) => async (dispatch: AppDispatch, GetState: GetState) => {
	dispatch(setIsLoading(true));
	const res = await dislikePostRequest(postId);
	if (res.post) {
		dispatch(updateFeedById(res.post));
	}
	if (res.user) {
		dispatch(setUser(res.user));
	}

	dispatch(setIsLoading(false));
};

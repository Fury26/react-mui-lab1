import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, GetState } from 'store';
import { setUser } from 'store/auth';

import { fetchUser } from 'helpers/auth';
import { ERRORS } from 'helpers/messages';
import { dislikePostRequest, fetchComments, fetchFeed, fetchPost, likePostRequest, sendComment } from 'helpers/posts';

import { Comment, MetaData, Post, PostQuery, PostState } from './types';
export * from './types';

export const initialState: PostState = {
	feed: { posts: [], metadata: { page: 1, perPage: 30 } },
	isLoadingPosts: false,
	activePost: null,
	activePostComments: null,
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
		setActivePost: (state: PostState, action: PayloadAction<Post | null>) => {
			state.activePost = action.payload;
		},
		updateFeedById: (state: PostState, action: PayloadAction<Post>) => {
			const ind = state.feed.posts.findIndex(({ _id }) => _id === action.payload._id);
			if (ind < 0) {
				return;
			}
			state.feed.posts[ind] = action.payload;
		},
		setActiveComments: (state: PostState, action: PayloadAction<{ comments: Comment[]; metadata: MetaData }>) => {
			const data = {
				comments: action.payload.comments,
				metadata: action.payload.metadata,
			};
			state.activePostComments = data;
		},
	},
});

export const { setIsLoading, addFeedPosts, updateFeedById, setActiveComments, setActivePost } = postsSlice.actions;

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
	const res = await likePostRequest(postId);
	if (res.post) {
		dispatch(updateFeedById(res.post));
	}
	if (res.user) {
		dispatch(setUser(res.user));
	}
};

export const dislikePost = (postId: string) => async (dispatch: AppDispatch, GetState: GetState) => {
	const res = await dislikePostRequest(postId);
	if (res.post) {
		dispatch(updateFeedById(res.post));
	}
	if (res.user) {
		dispatch(setUser(res.user));
	}
};

export const addComment = (postId: string, text: string) => async (dispatch: AppDispatch, getState: GetState) => {
	dispatch(setIsLoading(true));
	const res = await sendComment(postId, text);
	if (res.comment) {
		const activeComments = getState().post.activePostComments;
		if (activeComments) {
			dispatch(
				setActiveComments({ comments: [...activeComments.comments, res.comment], metadata: activeComments.metadata }),
			);
		}
	}
	if (res.error) {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	}

	dispatch(setIsLoading(false));
};

export const getPost = (postId: string) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true));
	const res = await fetchPost(postId);
	if (res.post) {
		dispatch(setActivePost(res.post));
	}
	if (res.error) {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	}

	dispatch(setIsLoading(false));
};

export const getComments = (postId: string, params: PostQuery) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true));
	const res = await fetchComments(postId, params);
	if (res.comments && res.metadata) {
		dispatch(setActiveComments({ ...res }));
	}
	if (res.error) {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	}

	dispatch(setIsLoading(false));
};

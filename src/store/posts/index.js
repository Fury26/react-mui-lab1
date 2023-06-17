import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

import { ERRORS } from '../../helpers/messages';
import {
	createPostRequest,
	deletePostRequest,
	dislikePostRequest,
	fetchFeed,
	fetchPost,
	likePostRequest,
} from '../../helpers/posts';
import { setUser } from '../auth';

export const initialState = {
	feed: { posts: [], metadata: { page: 1, perPage: 30 } },
	isLoadingPosts: false,
	activePost: null,
};

export const postsSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoadingPosts = action.payload;
		},
		addFeedPosts: (state, action) => {
			const posts = [...state.feed.posts, ...action.payload.posts];
			state.feed.posts = posts.filter((obj, index, arr) => arr.findIndex((item) => item._id === obj._id) === index);
			if (!action.payload.metadata) {
				state.feed.metadata = {
					...state.feed.metadata,
					count: state.feed.metadata.count || 0 + action.payload.posts.length,
				};
			} else {
				state.feed.metadata = action.payload.metadata;
			}
		},
		setActivePost: (state, action) => {
			state.activePost = action.payload;
		},
		updateFeedById: (state, action) => {
			const ind = state.feed.posts.findIndex(({ _id }) => _id === action.payload._id);
			if (ind < 0) {
				return;
			}
			state.feed.posts[ind] = action.payload;
		},
		removePostById: (state, action) => {
			state.feed.posts = state.feed.posts.filter(({ _id }) => _id !== action.payload);
			if (state.activePost?._id === action.payload) {
				state.activePost = null;
				state.activePostComments = null;
			}
		},
	},
});

export const { setIsLoading, addFeedPosts, updateFeedById, setActivePost, removePostById } = postsSlice.actions;

export default postsSlice.reducer;

export const getFeedPosts = (params) => async (dispatch, GetState) => {
	dispatch(setIsLoading(true));
	const res = await fetchFeed(params);
	if (res.posts) {
		dispatch(addFeedPosts(res));
	} else {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	}

	dispatch(setIsLoading(false));
};

export const likePost = (postId) => async (dispatch, GetState) => {
	const res = await likePostRequest(postId);
	if (res.post) {
		dispatch(updateFeedById(res.post));
	}
	if (res.user) {
		dispatch(setUser(res.user));
	}
};

export const dislikePost = (postId) => async (dispatch, GetState) => {
	const res = await dislikePostRequest(postId);
	if (res.post) {
		dispatch(updateFeedById(res.post));
	}
	if (res.user) {
		dispatch(setUser(res.user));
	}
};

export const getPost = (postId) => async (dispatch) => {
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

export const createPost = (input) => async (dispatch, getState) => {
	const res = await createPostRequest(input);
	if (res.error) {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	}
	if (res.post) {
		const metadata = getState().post.feed.metadata;
		dispatch(addFeedPosts({ posts: [res.post], metadata: { ...metadata, count: metadata.count || 0 + 1 } }));
	}
	return !!res.error;
};

export const deletePost = (postId) => async (dispatch) => {
	const res = await deletePostRequest(postId);
	if (res.error) {
		toast(res.error || ERRORS.DEFAULT, { type: 'error' });
	} else {
		dispatch(removePostById(postId));
	}
};

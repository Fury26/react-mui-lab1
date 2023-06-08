import { axiosInstance } from './auth';
import { ERRORS } from './messages';

export const fetchFeed = async (params) => {
	try {
		const res = await axiosInstance.get('posts/feed', { params });
		return { ...res.data, error: undefined };
	} catch (error) {
		return { error: error.response?.data.error || ERRORS.DEFAULT, posts: undefined, metadata: undefined };
	}
};

export const likePostRequest = async (postId) => {
	try {
		const res = await axiosInstance.patch(`posts/${postId}/statistics`, { type: 'like' });
		return { ...res.data, error: undefined };
	} catch (error) {
		console.log('error', error.response);

		return { error: error.response?.data.error || ERRORS.DEFAULT, post: undefined, user: undefined };
	}
};

export const dislikePostRequest = async (postId) => {
	try {
		const res = await axiosInstance.patch(`posts/${postId}/statistics`, { type: 'dislike' });
		return { ...res.data, error: undefined };
	} catch (error) {
		return { error: error.response?.data.error || ERRORS.DEFAULT, post: undefined, user: undefined };
	}
};

export const fetchPost = async (postId) => {
	try {
		const res = await axiosInstance.get(`posts/${postId}`);
		return { ...res.data, error: undefined };
	} catch (error) {
		return { error: error.response?.data.error || ERRORS.DEFAULT, post: undefined };
	}
};

export const deletePostRequest = async (postId) => {
	try {
		await axiosInstance.delete(`posts/${postId}`);
		return { error: undefined };
	} catch (error) {
		return { error: error.response?.data.error };
	}
};

export const createPostRequest = async (input) => {
	try {
		const res = await axiosInstance.post(`posts`, input);
		return { error: undefined, ...res.data };
	} catch (error) {
		return { error: error.response?.data.error, post: undefined };
	}
};

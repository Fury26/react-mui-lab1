import { AxiosError } from 'axios';
import { User } from 'store/auth';
import { Comment, MetaData, Post, PostQuery } from 'store/posts';

import { axiosInstance } from './auth';
import { ERRORS } from './messages';

export const fetchFeed = async (params: PostQuery) => {
	try {
		const res = await axiosInstance.get<{ posts: Post[]; metadata: MetaData }>('posts/feed', { params });
		return { ...res.data, error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error || ERRORS.DEFAULT, posts: undefined, metadata: undefined };
	}
};

export const likePostRequest = async (postId: string) => {
	try {
		const res = await axiosInstance.patch<{ post: Post; user: User }>(`posts/${postId}/statistics`, { type: 'like' });
		return { ...res.data, error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		console.log('error', error.response);

		return { error: error.response?.data.error || ERRORS.DEFAULT, post: undefined, user: undefined };
	}
};

export const dislikePostRequest = async (postId: string) => {
	try {
		const res = await axiosInstance.patch<{ post: Post; user: User }>(`posts/${postId}/statistics`, { type: 'dislike' });
		return { ...res.data, error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error || ERRORS.DEFAULT, post: undefined, user: undefined };
	}
};

export const sendComment = async (postId: string, text: string) => {
	try {
		const res = await axiosInstance.post<{ comment: Comment }>(`posts/${postId}/comment`, { text });
		return { ...res.data, error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error || ERRORS.DEFAULT, comment: undefined };
	}
};

export const fetchPost = async (postId: string) => {
	try {
		const res = await axiosInstance.get<{ post: Post }>(`posts/${postId}`);
		return { ...res.data, error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error || ERRORS.DEFAULT, post: undefined };
	}
};

export const fetchComments = async (postId: string, params: PostQuery) => {
	try {
		const res = await axiosInstance.get<{ comments: Comment[]; metadata: MetaData }>(`posts/${postId}/comments`, { params });
		return { ...res.data, error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error || ERRORS.DEFAULT, comments: undefined, metadata: undefined };
	}
};

export const deleteCommentRequest = async (commentId: string) => {
	try {
		await axiosInstance.delete<string>(`posts/comment/${commentId}`);
		return { error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error };
	}
};

export const deletePostRequest = async (postId: string) => {
	try {
		await axiosInstance.delete<string>(`posts/${postId}`);
		return { error: undefined };
	} catch (e) {
		const error = e as AxiosError<{ error: string }>;
		return { error: error.response?.data.error };
	}
};

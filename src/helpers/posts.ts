import { AxiosError } from 'axios';
import { User } from 'store/auth';
import { MetaData, Post, PostQuery } from 'store/posts';

import { axiosInstance } from './auth';
import { ERRORS } from './messages';

export const fetchFeed = async (params: PostQuery) => {
	try {
		const res = await axiosInstance.get<{ posts: Post[]; metadata: MetaData }>('posts/feed');
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

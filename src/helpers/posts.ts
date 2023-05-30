import { AxiosError } from 'axios';
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

import { User } from 'store/auth';

export type Post = {
	_id: string;
	title: string;
	body: string;
	owner: User;
	likes: number;
	dislikes: number;
	created_at: string;
	updated_at: string;
};

export type MetaData = {
	page: number;
	perPage: number;
};

export type PostState = {
	feed: {
		posts: Post[];
		metadata: MetaData;
	};
	isLoadingPosts: boolean;
};

export type PostQuery = {
	perPage?: number;
	page?: number;
};

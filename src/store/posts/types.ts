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
	comments: Comment[];
};

export type CreatePostInput = {
	title: string;
	body: string;
};

export type MetaData = {
	page: number;
	perPage: number;
	count?: number;
};

export type PostState = {
	feed: {
		posts: Post[];
		metadata: MetaData;
	};
	isLoadingPosts: boolean;
	activePost: Post | null;
	activePostComments: {
		comments: Comment[];
		metadata: MetaData;
	} | null;
};

export type PostQuery = {
	perPage?: number;
	page?: number;
};

export type Comment = {
	_id: string;
	creator: User;
	text: string;
	created_at: string;
	updated_at: string;
};

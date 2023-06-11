import authReducer, { initialState as UserState } from 'store/auth';
import postReducer, { initialState as PostState } from 'store/posts';

export const DefaultState = { auth: UserState, post: PostState };
export const TestUser = {
	_id: '1',
	name: 'User 1',
	email: 'email1@gmail.com',
	dislikedPosts: ['post_1'],
	likedPosts: ['post_2'],
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

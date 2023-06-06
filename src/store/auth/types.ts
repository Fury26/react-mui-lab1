export type User = {
	_id: string;
	name: string;
	email: string;
	likedPosts: string[];
	dislikedPosts: string[];
	roles?: string[];
};

export type Credentials = {
	token: string;
};

export type AuthState = {
	user: User | null;
	isLoadingUser: boolean;
};

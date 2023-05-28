export type User = {
	id: string;
	name: string;
	email: string;
};

export type Credentials = {
	token: string;
};

export type AuthState = {
	user: User | null;
	isLoadingUser: boolean;
};

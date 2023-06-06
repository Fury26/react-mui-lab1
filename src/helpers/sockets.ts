import { io, Socket } from 'socket.io-client';
import { getAccessToken, User } from 'store/auth';
import { Post } from 'store/posts';

export enum MessagesSubscribe {
	NewPost = 'newPostCreated',
	Error = 'error',
	Connect = 'connect',
	OnlineChanged = 'onlineUserChanged',
}

export enum MessagesSend {
	requestUsers = 'requestUsers',
}

class IServer {
	connection: Socket = io('http://localhost:4001', {
		autoConnect: false,
		extraHeaders: { Authorization: getAccessToken()?.token || '' },
	});

	#usersOnline = 0;
	user: User | null = null;
	get UsersOnline() {
		return this.#usersOnline;
	}

	connect(user: User) {
		this.user = user;
		if (this.connection.connected) {
			return this;
		}
		console.log('connect');

		this.connection.connect();
		this.requestUsersOnline();
		return this;
	}

	close() {
		this.connection?.close();
		return this;
	}

	requestUsersOnline() {
		console.log('request');

		this.connection.send(MessagesSend.requestUsers);
	}

	onUsersOnlineChanged(cb: (newCount: number) => void) {
		console.log('user', this.user);

		if (!this.user?.roles?.includes('admin')) {
			return;
		}
		this.connection.on(MessagesSubscribe.OnlineChanged, (data) => {
			console.log('onlineChanged', data);

			if (typeof data === 'number') {
				this.#usersOnline = data;
				cb(data);
			}
		});
		this.requestUsersOnline();
	}

	onNewPost(cb: (post: Post) => void) {
		this.connection.on(MessagesSubscribe.NewPost, (data) => {
			console.log('New Post was created!', data);
			if (data) {
				cb(data as Post);
			}
		});
		return this;
	}

	constructor() {
		this.connection.on(MessagesSubscribe.Error, (data) => {
			console.log('Socket error handler: ', data);
		});
		this.connection.on(MessagesSubscribe.Connect, () => {
			console.log('connected with id: ', this.connection.id);
		});
	}
}

const SocketConnection = new IServer();

export default SocketConnection;

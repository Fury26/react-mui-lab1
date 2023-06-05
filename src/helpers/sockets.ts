import { io, Socket } from 'socket.io-client';
import { getAccessToken } from 'store/auth';
import { Post } from 'store/posts';

export enum MessagesSubscribe {
	NewPost = 'newPostCreated',
	Error = 'error',
	Connect = 'connect',
}

export enum MessagesSend {}

class IServer {
	connection: Socket = io('http://localhost:4001', { extraHeaders: { Authorization: getAccessToken()?.token || '' } });

	connect() {
		if (this.connection.disconnected) {
			return this;
		}
		this.connection = io('http://localhost:4001', { extraHeaders: { Authorization: getAccessToken()?.token || '' } });
		return this;
	}

	close() {
		this.connection?.close();
		return this;
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
		this.connect();

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

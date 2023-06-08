import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useAppDispatch, useSelector } from 'store';
import { addFeedPosts, getFeedPosts, Post } from 'store/posts';

import SocketConnection from 'helpers/sockets';
import { useFirstNonFalsyRender } from 'hooks/use-first-render';

import PostList from 'components/post-list';

import AppWrapper from 'feature/app-wrapper';

const HomePage = () => {
	const { user } = useSelector((state) => state.auth);
	const { feed } = useSelector((state) => state.post);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!user?._id || feed.posts.length) {
			return;
		}
		dispatch(getFeedPosts({}));
	}, [dispatch, feed.posts.length, user?._id]);

	const addPost = (post) => {
		console.log('onAddPost', feed.posts, post._id);

		if (feed.posts.find(({ _id }) => _id === post._id)) {
			return;
		}
		dispatch(addFeedPosts({ posts: [post] }));
	};

	useFirstNonFalsyRender(user, () => {
		SocketConnection.connect(user);
		SocketConnection.onNewPost(addPost);
	});

	return (
		<AppWrapper>
			<Container sx={{ mt: 2 }}>
				<PostList posts={feed.posts} />
			</Container>
		</AppWrapper>
	);
};

export default HomePage;

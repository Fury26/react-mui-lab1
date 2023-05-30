import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useAppDispatch, useSelector } from 'store';
import { getFeedPosts } from 'store/posts';

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

	return (
		<AppWrapper>
			<Container sx={{ mt: 2 }}>
				<PostList posts={feed.posts} />
			</Container>
		</AppWrapper>
	);
};

export default HomePage;

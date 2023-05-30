import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useSelector } from 'store';
import { getAccessToken } from 'store/auth';
import posts, { getFeedPosts } from 'store/posts';

import Post from 'components/post';
import PostList from 'components/post-list';

const HomePage = () => {
	const { user } = useSelector((state) => state.auth);
	const { feed } = useSelector((state) => state.post);

	const token = getAccessToken();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!user) {
			return;
		}
		dispatch(getFeedPosts({}));
	}, [dispatch, user]);

	return (
		<Stack sx={{ overflow: 'hidden', width: '100vw', pb: 2 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Feed
					</Typography>
					<Button color="inherit">My Posts</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ mt: 2 }}>
				<PostList posts={feed.posts} />
			</Container>
		</Stack>
	);
};

export default HomePage;

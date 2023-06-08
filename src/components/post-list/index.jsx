import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useSelector } from 'store';

import Post from '../post';

const PostList = ({ posts }) => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	if (!user) {
		return null;
	}
	return (
		<Grid container spacing={2} data-testid="feed-stack">
			{posts.map((p) => {
				return (
					<Grid item xs={6} key={p._id}>
						<Post userId={user._id} post={p} onClick={() => navigate(`post/${p._id}`)} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default PostList;

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Stack, Typography } from '@mui/material';
import { useAppDispatch, useSelector } from 'store';
import { getComments, getPost } from 'store/posts';

import Comment from 'components/comment';
import Post from 'components/post';

import AppWrapper from 'feature/app-wrapper';

const PostPage = () => {
	const dispatch = useAppDispatch();
	const { postId } = useParams();
	const { activePost, activePostComments } = useSelector((state) => state.post);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!postId || !user?._id) {
			return;
		}
		dispatch(getPost(postId));
		dispatch(getComments(postId, { page: 1, perPage: 30 }));
	}, [dispatch, postId, user?._id]);

	if (!user) {
		return null;
	}

	return (
		<AppWrapper header={{ title: 'View Post' }}>
			{activePost && (
				<Container sx={{ mt: 2 }}>
					<Post
						userId={user._id}
						post={activePost}
						isLiked={user.likedPosts.includes(activePost._id)}
						isDisliked={user.dislikedPosts.includes(activePost._id)}
						withAddComment
					/>
					<Stack sx={{ mt: 2 }} spacing={2}>
						<Typography variant="h6">Comments</Typography>
						{activePostComments?.comments.map((c) => (
							<Comment comment={c} key={c._id} />
						))}
					</Stack>
				</Container>
			)}
		</AppWrapper>
	);
};

export default PostPage;

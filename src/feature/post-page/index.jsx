import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useAppDispatch, useSelector } from 'store';
import { getPost } from 'store/posts';

import Post from 'components/post';

import AppWrapper from 'feature/app-wrapper';

const PostPage = () => {
	const dispatch = useAppDispatch();
	const { postId } = useParams();
	const { activePost } = useSelector((state) => state.post);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!postId || !user?._id) {
			return;
		}
		dispatch(getPost(postId));
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
				</Container>
			)}
		</AppWrapper>
	);
};

export default PostPage;

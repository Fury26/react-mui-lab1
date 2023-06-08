import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useSelector } from 'store';
import { Post as IPost } from 'store/posts';

import Post from '../post';

type Props = {
	posts: IPost[];
};

const PostList: React.FC<Props> = ({ posts }) => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	if (!user) {
		return null;
	}
	return (
		<Stack spacing={2} data-testid="feed-stack">
			{posts.map((p) => {
				return (
					<Post
						userId={user._id}
						post={p}
						key={p._id}
						isDisliked={user.dislikedPosts.includes(p._id)}
						isLiked={user.likedPosts.includes(p._id)}
						onClick={() => navigate(`post/${p._id}`)}
					/>
				);
			})}
		</Stack>
	);
};

export default PostList;

import React from 'react';
import { Stack } from '@mui/material';
import { useSelector } from 'store';
import { Post as IPost } from 'store/posts';

import Post from './post';

type Props = {
	posts: IPost[];
};

const PostList: React.FC<Props> = ({ posts }) => {
	const { user } = useSelector((state) => state.auth);
	if (!user) {
		return null;
	}
	return (
		<Stack spacing={2}>
			{posts.map((p) => {
				return (
					<Post
						post={p}
						key={p._id}
						isDisliked={user.dislikedPosts.includes(p._id)}
						isLiked={user.likedPosts.includes(p._id)}
					/>
				);
			})}
		</Stack>
	);
};

export default PostList;

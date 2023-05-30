import React from 'react';
import { Stack } from '@mui/material';
import { Post as IPost } from 'store/posts';

import Post from './post';

type Props = {
	posts: IPost[];
};

const PostList: React.FC<Props> = ({ posts }) => {
	return (
		<Stack spacing={2}>
			{posts.map((p) => {
				return <Post post={p} key={p.id} />;
			})}
		</Stack>
	);
};

export default PostList;

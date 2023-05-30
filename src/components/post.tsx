import React, { useCallback, useMemo } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Post as IPost } from 'store/posts';

type Props = {
	post: IPost;
};

const Post: React.FC<Props> = ({ post }) => {
	const initials = useMemo(
		() =>
			post.owner.name
				.split(' ')
				.map((str) => str[0].toUpperCase())
				.join(''),
		[post.owner],
	);

	const time = useMemo(() => dayjs(post.created_at).format('DD MMM, YYYY'), [post.created_at]);

	const onLikeHandler = useCallback(() => {}, []);

	return (
		<Card>
			<CardHeader avatar={<Avatar>{initials}</Avatar>} title={post.owner.name} subheader={time} />
			<CardContent>
				<Typography variant="h5" color="text.secondary">
					{post.title}
				</Typography>
				<Typography variant="body2" color="text.primary">
					{post.body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="like">
					<FavoriteIcon />
				</IconButton>
				<Typography sx={{ mr: 1 }}>{post.likes}</Typography>
				<IconButton aria-label="dislike">
					<DislikeIcon />
				</IconButton>
				<Typography>{post.dislikes}</Typography>
			</CardActions>
		</Card>
	);
};

export default Post;

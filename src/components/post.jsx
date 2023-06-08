import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch } from 'store';
import { deletePost } from 'store/posts';

import { ROUTES } from 'helpers/routes';

import ActionMenu from './action-menu';

const Post = ({ userId, post, onClick }) => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const initials = useMemo(
		() =>
			post.owner.name
				.split(' ')
				.map((str) => str[0].toUpperCase())
				.join(''),
		[post.owner],
	);

	const time = useMemo(() => dayjs(post.created_at).format('DD MMM, YYYY'), [post.created_at]);

	const onDeletePost = () => {
		dispatch(deletePost(post._id));
		navigate(ROUTES.HOME);
	};

	return (
		<Card sx={{ cursor: onClick ? 'pointer' : undefined }} onClick={onClick}>
			<CardHeader
				avatar={<Avatar color="text.primary">{initials}</Avatar>}
				title={post.owner.name}
				subheader={time}
				color="text.secondary"
				action={post.owner._id === userId ? <ActionMenu onDelete={onDeletePost} /> : undefined}
			/>
			<CardContent>
				<Typography variant="h5" color="text.secondary">
					{post.title}
				</Typography>
				<Typography variant="body2" color="text.primary">
					{post.body}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Post;

import React, { useMemo, useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useSelector } from 'store';
import { Comment as IComment, deleteComment } from 'store/posts';

import { getInitials } from 'helpers/auth';

import ActionMenu from './action-menu';

type Props = {
	comment: IComment;
};

const Comment: React.FC<Props> = ({ comment }) => {
	const initials = useMemo(() => getInitials(comment.creator.name), [comment.creator.name]);
	const time = useMemo(() => dayjs(comment.created_at).format('DD MMM, YYYY'), [comment.created_at]);

	const dispatch = useAppDispatch();

	const { user } = useSelector((state) => state.auth);

	const onDeleteComment = async () => {
		await dispatch(deleteComment(comment._id));
	};

	return (
		<Card variant="outlined">
			<CardHeader
				avatar={<Avatar>{initials}</Avatar>}
				title={comment.creator.name}
				subheader={time}
				action={comment.creator._id === user?._id ? <ActionMenu onDelete={onDeleteComment} /> : undefined}
			/>
			<CardContent>
				<Typography variant="body2" color="text.primary">
					{comment.text}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Comment;

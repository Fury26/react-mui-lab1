import React, { useCallback, useMemo, useState } from 'react';
import PlusIcon from '@mui/icons-material/AddBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	IconButtonProps,
	Input,
	Stack,
	styled,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch } from 'store';
import { addComment, dislikePost, likePost, Post as IPost } from 'store/posts';

type Props = {
	post: IPost;
	isLiked: boolean;
	isDisliked: boolean;
	onClick?: () => void;
};
interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const Post: React.FC<Props> = ({ post, isDisliked, isLiked, onClick }) => {
	const dispatch = useAppDispatch();
	const [expanded, setExpanded] = React.useState(false);

	const [comment, setComment] = useState('');

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const initials = useMemo(
		() =>
			post.owner.name
				.split(' ')
				.map((str) => str[0].toUpperCase())
				.join(''),
		[post.owner],
	);

	const time = useMemo(() => dayjs(post.created_at).format('DD MMM, YYYY'), [post.created_at]);

	const onSendComment = () => {
		dispatch(addComment(post._id, comment));
		setComment('');
	};

	const onLikeHandler = useCallback(() => {
		dispatch(likePost(post._id));
	}, [post._id, dispatch]);

	const onDislikeHandler = useCallback(() => {
		dispatch(dislikePost(post._id));
	}, [post._id, dispatch]);

	return (
		<Card sx={{ cursor: onClick ? 'pointer' : undefined }} onClick={onClick}>
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
				<IconButton aria-label="like" onClick={onLikeHandler}>
					<FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
				</IconButton>
				<Typography sx={{ mr: 1 }}>{post.likes}</Typography>
				<IconButton aria-label="dislike" onClick={onDislikeHandler}>
					<DislikeIcon color={isDisliked ? 'error' : 'inherit'} />
				</IconButton>
				<Typography>{post.dislikes}</Typography>
				<ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
					{!expanded ? <PlusIcon /> : <ExpandMoreIcon />}
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
					<Typography>Add comment</Typography>
					<Input
						placeholder="Type your comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						sx={{ flexGrow: 1 }}
					/>
					<IconButton onClick={onSendComment}>
						<SendIcon color="info" sx={{ rotate: '-90deg' }} />
					</IconButton>
				</Stack>
			</Collapse>
		</Card>
	);
};

export default Post;

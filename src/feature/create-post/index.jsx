import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '../../store';
import { createPost } from '../../store/posts';
import AppWrapper from '../app-wrapper';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [titleError, setTitleError] = useState('');
	const [body, setBody] = useState('');

	const dispatch = useAppDispatch();

	const onTitleChange = (val) => {
		setTitle((prev) => {
			if (val.length > 40) {
				setTitleError('Too many characters');
				return prev;
			}
			setTitleError('');
			return val;
		});
	};

	const onTextChange = (val) => {
		setBody((prev) => {
			if (val.length > 240) {
				return prev;
			}
			return val;
		});
	};

	const onClearHandler = () => {
		setTitle('');
		setBody('');
		setTitleError('');
	};

	const onSubmitHandler = async () => {
		const isError = await dispatch(createPost({ title, body }));
		if (!isError) {
			onClearHandler();
		}
	};

	return (
		<AppWrapper header={{ title: 'New Post' }}>
			<Container sx={{ maxWidth: '1000px', mt: 4 }}>
				<Stack direction="row" spacing={2}>
					<Stack direction="column" flexGrow={1}>
						<Typography variant="h6">Title</Typography>
						<TextField
							variant="outlined"
							value={title}
							label="Title"
							onChange={(e) => onTitleChange(e.target.value)}
							error={!!titleError}
							helperText={titleError}
							aria-multiline
						/>
					</Stack>
					<Stack direction="column" flexGrow={1}>
						<Typography variant="h6">Body</Typography>
						<TextareaAutosize
							value={body}
							onChange={(e) => onTextChange(e.target.value)}
							maxLength={240}
							minRows={10}
						/>
					</Stack>
				</Stack>
				<Stack direction="row" justifyContent="flex-end" alignItems="center" mt={2} spacing={2}>
					<Button variant="outlined" onClick={onClearHandler}>
						Clear
					</Button>
					<Button variant="contained" onClick={onSubmitHandler}>
						Submit
					</Button>
				</Stack>
			</Container>
		</AppWrapper>
	);
};

export default CreatePost;

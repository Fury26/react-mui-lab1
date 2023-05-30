import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'store';
import { getUser } from 'store/auth';

import { registerUser } from 'helpers/auth';
import { ROUTES } from 'helpers/routes';

import Field from './field';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [input, setInput] = useState({ email: '', password: '', name: '' });

	const handleInput = (key: keyof typeof input, value: string) => {
		setInput((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const onRegisterHandler = async () => {
		const res = await registerUser(input);
		if (res.token) {
			dispatch(getUser(res));
			navigate(ROUTES.HOME);
		}
		if (res.error) {
			toast(res.error, { type: 'error' });
		}
	};

	return (
		<Box className="container large">
			<Typography sx={{ mb: 2, fontSize: 24 }} component="h1">
				Registration Form
			</Typography>
			<Container className="border">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Field value={input.email} onChange={(value) => handleInput('email', value)} label="Email" />
					</Grid>
					<Grid item xs={12}>
						<Field
							value={input.password}
							onChange={(value) => handleInput('password', value)}
							label="Password"
							type="password"
						/>
					</Grid>
					<Grid item xs={12}>
						<Field value={input.name} onChange={(value) => handleInput('name', value)} label="Username" />
					</Grid>
				</Grid>
				<Stack direction="row" sx={{ mt: 2 }} spacing={2}>
					<Button variant="contained" onClick={onRegisterHandler}>
						Sign Up
					</Button>

					<Button variant="outlined" onClick={() => navigate(ROUTES.LOGIN)}>
						I am already have an account
					</Button>
				</Stack>
			</Container>
		</Box>
	);
};

export default Register;

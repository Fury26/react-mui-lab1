import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'store';
import { getUser } from 'store/auth';

import { loginUser } from 'helpers/auth';
import { ROUTES } from 'helpers/routes';

import Field from './field';

import './index.css';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [input, setInput] = useState({ email: '', password: '' });

	const handleInput = (key: keyof typeof input, value: string) => {
		setInput((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const onLoginHandler = async () => {
		const res = await loginUser(input);
		if (res.token) {
			dispatch(getUser(res));
			navigate(ROUTES.HOME);
		}
	};

	return (
		<Box className="container large">
			<Typography sx={{ mb: 2, fontSize: 24 }} component="h1">
				Login
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
				</Grid>
				<Stack direction="row" sx={{ mt: 2 }} spacing={2}>
					<Button variant="contained" onClick={onLoginHandler}>
						Login
					</Button>

					<Button variant="outlined" onClick={() => navigate(ROUTES.REGISTER)}>
						...or Sign Up
					</Button>
				</Stack>
			</Container>
		</Box>
	);
};

export default Login;

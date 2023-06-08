import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@mui/icons-material';
import { Box, Button, Container, Grid, Input, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAppDispatch } from 'store';
import { getUser } from 'store/auth';

import { loginUser } from 'helpers/auth';
import { ROUTES } from 'helpers/routes';

import Field from './field';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [input, setInput] = useState({ email: '', password: '' });

	const handleInput = (key, value) => {
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
		<Stack alignItems="center" sx={(theme) => ({ background: theme.palette.primary.light, minHeight: '100vh', p: 2 })}>
			<Typography sx={{ mb: 2, fontSize: 24, mt: 10, color: '#fff' }} component="h1">
				Login
			</Typography>
			<Container sx={{ p: 2, background: '#fff', borderRadius: 4, py: 5 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							value={input.email}
							onChange={(e) => handleInput('email', e.target.value)}
							label="Email"
							sx={{ width: '100%' }}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							sx={{ width: '100%' }}
							value={input.password}
							onChange={(e) => handleInput('password', e.target.value)}
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
		</Stack>
	);
};

export default Login;

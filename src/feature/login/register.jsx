import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';

import { registerUser } from '../../helpers/auth';
import { ROUTES } from '../../helpers/routes';
import { useAppDispatch } from '../../store';
import { getUser } from '../../store/auth';
import Field from './field';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [input, setInput] = useState({ email: '', password: '', name: '' });

	const handleInput = (key, value) => {
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
		<Stack alignItems="center" sx={(theme) => ({ background: theme.palette.primary.light, minHeight: '100vh', p: 2 })}>
			<Typography sx={{ mb: 2, fontSize: 24, mt: 10, color: '#fff' }} component="h1">
				Registration Form
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
					<Grid item xs={12}>
						<TextField
							value={input.name}
							onChange={(e) => handleInput('name', e.target.value)}
							label="Username"
							sx={{ width: '100%' }}
						/>
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
		</Stack>
	);
};

export default Register;

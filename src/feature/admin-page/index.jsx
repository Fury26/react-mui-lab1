import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Stack, Typography } from '@mui/material';

import AppWrapper from '../../feature/app-wrapper';
import { ERRORS } from '../../helpers/messages';
import { ROUTES } from '../../helpers/routes';
import SocketConnection from '../../helpers/sockets';
import { useFirstNonFalsyRender } from '../../hooks/use-first-render';
import { useSelector } from '../../store';

const AdminPage = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [usersOnline, setUsersOnline] = useState(0);

	useEffect(() => {
		if (!user) {
			return;
		}
		if (!user.roles?.includes('admin')) {
			navigate(ROUTES.HOME);
			toast(ERRORS.NOT_ADMIN);
		}
	}, [navigate, user]);

	useFirstNonFalsyRender(user, () => {
		SocketConnection.connect(user);
		SocketConnection.onUsersOnlineChanged(setUsersOnline);
	});
	return (
		<AppWrapper>
			<Stack justifyContent="center" alignItems="center" sx={{ height: '70vh' }}>
				<Typography variant="h2">Web site online:&nbsp;{usersOnline}</Typography>
			</Stack>
		</AppWrapper>
	);
};

export default AdminPage;

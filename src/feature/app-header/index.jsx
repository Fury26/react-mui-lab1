import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { ROUTES } from '../../helpers/routes';

const AppHeader = ({ title: _title }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const title = useMemo(() => {
		if (_title) {
			return _title;
		}
		switch (location.pathname) {
			case ROUTES.HOME: {
				return 'Posts';
			}
			case ROUTES.NEW_POST: {
				return 'Creating post...';
			}
			default: {
				return 'Posts';
			}
		}
	}, [location.pathname, _title]);

	return (
		<AppBar position="static">
			<Toolbar>
				<img src="/images/post-logo.png" alt="logo" style={{ maxHeight: '48px', transform: 'translateY(-2px)' }} />
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
					{title}
				</Typography>
				<Button color="inherit" onClick={() => navigate(ROUTES.NEW_POST)}>
					Create
				</Button>
				<Button color="inherit" onClick={() => navigate(ROUTES.HOME)}>
					Posts
				</Button>
				<Button color="inherit" variant="outlined" onClick={() => navigate(ROUTES.LOGIN)}>
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;

import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';

import { ROUTES } from 'helpers/routes';

export type AppHeaderProps = {
	title?: string;
};

const AppHeader: React.FC<AppHeaderProps> = ({ title: _title }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const title = useMemo(() => {
		if (_title) {
			return _title;
		}
		switch (location.pathname) {
			case ROUTES.HOME: {
				return 'Feed';
			}
			default: {
				return 'Feed';
			}
		}
	}, [location.pathname, _title]);

	return (
		<AppBar position="static">
			<Toolbar>
				<img src="/images/logo.png" alt="logo" style={{ maxHeight: '48px', transform: 'translateY(-2px)' }} />
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{title}
				</Typography>
				<Button color="inherit" onClick={() => navigate(ROUTES.NEW_POST)}>
					Create
				</Button>
				<Button color="inherit" onClick={() => navigate(ROUTES.HOME)}>
					Feed
				</Button>
				<Button color="inherit" variant="outlined" onClick={() => navigate(ROUTES.LOGIN)}>
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;

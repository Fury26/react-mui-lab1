import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';

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
				<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{title}
				</Typography>
				<Button color="inherit" onClick={() => navigate('manage')}>
					My Posts
				</Button>
				<Button color="inherit" onClick={() => navigate(ROUTES.HOME)}>
					Feed
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;

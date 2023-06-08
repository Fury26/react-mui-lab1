import React from 'react';
import { Stack } from '@mui/material';

import AppHeader from './app-header';

const AppWrapper = ({ children, header }) => {
	return (
		<Stack sx={{ overflowX: 'hidden', width: '100vw', pb: 2 }}>
			<AppHeader {...header} />
			{children}
		</Stack>
	);
};

export default AppWrapper;

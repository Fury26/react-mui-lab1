import React from 'react';
import { Stack } from '@mui/material';

import AppHeader, { AppHeaderProps } from './app-header';

type Props = {
	children: React.ReactNode;
	header?: AppHeaderProps;
};

const AppWrapper: React.FC<Props> = ({ children, header }) => {
	return (
		<Stack sx={{ overflowX: 'hidden', width: '100vw', pb: 2 }}>
			<AppHeader {...header} />
			{children}
		</Stack>
	);
};

export default AppWrapper;

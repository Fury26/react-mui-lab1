import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

const Loader = () => {
	return (
		<Stack
			sx={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				left: 0,
				top: 0,
				zIndex: 100,
				background: 'rgba(0, 0, 0, 0.32)',
			}}
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress />
		</Stack>
	);
};

export default Loader;

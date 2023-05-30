import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	palette: {
		text: {
			secondary: '#556cd6',
			primary: '#000',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#556cd6',
			paper: '#fff',
		},
	},
});

export default theme;

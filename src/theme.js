import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			light: '#ce93d8',
			main: '#9c27b0',
			dark: '#4a148c',
		},
		secondary: {
			light: '#33eb91',
			main: '#00e676',
			dark: '#00a152',
		},
		text: {
			primary: '#000',
			secondary: '#ce93d8',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#ce93d8',
			paper: '#fff',
		},
	},
});

export default theme;

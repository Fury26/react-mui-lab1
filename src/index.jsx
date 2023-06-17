import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';

import App from './App';
import { store } from './store';
import theme from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<ReduxProvider store={store}>
				<App />
				<ToastContainer
					className="toast-cy"
					position="top-center"
					// autoClose={5000}
					autoClose={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					theme="light"
				/>
			</ReduxProvider>
		</ThemeProvider>
	</BrowserRouter>,
);

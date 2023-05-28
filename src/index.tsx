import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from 'store';

import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<BrowserRouter>
		<ReduxProvider store={store}>
			<App />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				theme="light"
			/>
		</ReduxProvider>
	</BrowserRouter>,
);

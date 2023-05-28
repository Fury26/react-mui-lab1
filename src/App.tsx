import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { logoutAction, RootState, useAppDispatch } from 'store';
import { getAccessToken, getUser, removeAccessToken } from 'store/auth';
import { Credentials } from 'store/auth/types';

import { axiosInstance } from 'helpers/auth';
import { ROUTES } from 'helpers/routes';

const App: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { isLoadingUser, user } = useSelector((state: RootState) => state.auth);
	const redirectWithMessage = useRef(false);

	const loadUser = useCallback(
		async (cred: Credentials) => {
			dispatch(getUser(cred));
		},
		[dispatch],
	);

	useEffect(() => {
		const cred = getAccessToken();

		if (cred) {
			loadUser(cred);
		}
	}, [loadUser]);

	useEffect(() => {
		const logout = async ({ detail }: any) => {
			const withMessage = detail?.withLogoutMessage;
			const isToken = getAccessToken();
			if (withMessage !== undefined) {
				redirectWithMessage.current = withMessage;
			}
			if (!isToken) {
				redirectWithMessage.current = false;
			}
			try {
				await axiosInstance.post('/logout');
			} finally {
				removeAccessToken();
				dispatch(logoutAction());
				navigate('/login', { state: { from: location.pathname, withLogoutMessage: redirectWithMessage.current } });
			}
		};
		window.addEventListener('logout', logout);
		return () => window.removeEventListener('logout', logout);
	}, [dispatch, location.pathname, navigate]);

	const protectedRoutes = () => {
		if (!getAccessToken()) {
			return null;
		}
		redirectWithMessage.current = true;

		return (
			<>
				<Route path={ROUTES.HOME} element={<>HOME</>} />
				<Route path="*" element={<Navigate to={ROUTES.HOME} />} />
			</>
		);
	};

	return (
		<>
			<Routes>
				<Route path={ROUTES.LOGIN} element={<>LOGIN</>} />
				<Route
					path="*"
					element={
						<Navigate
							to={ROUTES.LOGIN}
							state={{ from: location.pathname, withLogoutMessage: redirectWithMessage.current }}
						/>
					}
				/>
				{protectedRoutes()}
			</Routes>
			{/* <UserLoader>
				<Loader isLoading={isLoading} size="lg" />
			</UserLoader> */}
		</>
	);
};

export default App;

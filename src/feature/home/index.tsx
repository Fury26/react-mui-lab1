import React from 'react';
import { getAccessToken } from 'store/auth';

const HomePage = () => {
	const token = getAccessToken();
	return <div>HomePage: token = {token?.token}</div>;
};

export default HomePage;

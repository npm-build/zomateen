import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Route, useHistory } from 'react-router-dom';

export const ProtectedRoute: FC<{ path: string; isExact: boolean; Component: FC }> = ({ path, isExact, Component }) => {
	const history = useHistory();

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const refreshToken = Cookies.get('refreshToken');
		console.log(accessToken, refreshToken);

		if (!accessToken) history.push('/user/login');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Route path={path} exact={isExact}>
			<Component />
		</Route>
	);
};

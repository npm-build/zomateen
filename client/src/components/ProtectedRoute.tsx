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

		// async function getUser() {
		// 	await fetch('/api/getUser', {
		// 		method: 'GET',
		// 		mode: 'cors',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: 'Bearer ' + accessToken
		// 		}
		// 	})
		// 		.then(res => {
		// 			console.log(res);
		// 			return res.json();
		// 		})
		// 		.then(usr => setUser(usr))
		// 		.catch(e => {
		// 			console.log(e);
		// 			throw new Error(e);
		// 		});
		// }

		// if (accessToken) {
		// 	getUser();
		// 	console.log('Pushing...');
		// 	if (!user?.usn) history.push('/user/login');
		// }
	}, []);

	return <Route path={path} exact={isExact} component={Component} />;

	// return accessToken ? (
	// 	<Route path={path} exact={isExact} component={Component} />
	// ) : (
	// 	<h1>
	// 		{/* {history.push('/user/login')} */}
	// 		Please Login to view this page
	// 	</h1>
	// );
};

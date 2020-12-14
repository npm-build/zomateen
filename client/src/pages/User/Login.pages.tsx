import React, { useRef, RefObject } from 'react';
import { useCookies } from 'react-cookie';
import '../../styles/App.scss';
// import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
	const [accessToken, setAccessToken] = useCookies(['accessToken']);
	const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);
	const userNameRef: RefObject<HTMLInputElement> = useRef(null);
	const passwordRef: RefObject<HTMLInputElement> = useRef(null);

	async function handleLogin() {
		const data = { userName: userNameRef.current?.value, password: passwordRef.current?.value };

		await fetch('/api/user/login', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(tokens => {
				setAccessToken('accessToken', tokens.accessToken, { path: '/', expires: new Date(40) });
				setRefreshToken('refreshToken', tokens.refreshToken, { path: '/', expires: new Date(40) });
			})
			.catch(e => {
				console.log(e);
				throw new Error(e);
			});
	}

	return (
		<div className='container'>
			<div className='base-container'>
				<div className='header'>Login</div>
				<div className='info'>
					<div className='form'>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input ref={userNameRef} type='text' name='username' placeholder='Username' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input ref={passwordRef} type='password' name='password' placeholder='Password' />
						</div>
					</div>
				</div>
				<div className='footer'>
					<button onClick={() => handleLogin()} className='btn'>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

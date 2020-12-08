import React from 'react';
// import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
	return (
		<div id='container'>
			<div className='base-container'>
				<div className='header'>Login</div>
				<div className='info'>
					<div className='form'>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input type='text' name='username' placeholder='Username' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' name='password' placeholder='Password' />
						</div>
					</div>
				</div>
				<div className='footer'>
					<button type='submit' className='btn'>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

import React from 'react';

const Signup: React.FC = () => {
	return (
		<div className='container'>
			<div className='base-container'>
				<div className='header'>Register</div>
				<div className='info'>
					<div className='form'>
						<div className='form-group'>
							<label htmlFor='firstname'>First Name</label>
							<input type='text' name='firstname' placeholder='First Name' />
						</div>
						<div className='form-group'>
							<label htmlFor='lastname'>Last Name</label>
							<input type='text' name='lastname' placeholder='Last Name' />
						</div>
						<div className='form-group'>
							<label htmlFor='emailid'>Email ID</label>
							<input type='email' name='emailid' placeholder='Email Address' />
						</div>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input type='text' name='username' placeholder='Username' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' name='password' placeholder='Password' />
						</div>
						<div className='form-group'>
							<label htmlFor='passwordconf'>Re-enter Password</label>
							<input type='password' name='passwordconf' placeholder='Password' />
						</div>
						<div className='form-group'>
							<label htmlFor='mobno'>Mobile Number</label>
							<input type='number' name='mobno' placeholder='Eg. 7891205465' />
						</div>
					</div>
				</div>
				<div className='footer'>
					<button type='submit' className='btn'>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;

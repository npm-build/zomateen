import React, { RefObject, useRef } from 'react';
import '../../styles/App.scss';

const Signup: React.FC = () => {
	const firstNameRef: RefObject<HTMLInputElement> = useRef(null);
	const lastNameRef: RefObject<HTMLInputElement> = useRef(null);
	const emailRef: RefObject<HTMLInputElement> = useRef(null);
	const userNameRef: RefObject<HTMLInputElement> = useRef(null);
	const usnRef: RefObject<HTMLInputElement> = useRef(null);
	const passwordRef: RefObject<HTMLInputElement> = useRef(null);
	const confirmPasswordRef: RefObject<HTMLInputElement> = useRef(null);
	const PhoneNumberRef: RefObject<HTMLInputElement> = useRef(null);

	async function handleSignUp() {
		const data = {
			firstName: firstNameRef.current?.value,
			lastName: lastNameRef.current?.value,
			userName: userNameRef.current?.value,
			usn: usnRef.current?.value,
			password: passwordRef.current?.value,
			phone: PhoneNumberRef.current?.value
		};

		if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
			console.log('Passwords do not match');
			return false;
		}

		await fetch('/api/user/signup', {
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
			.then(data => console.log(data.message))
			.catch(e => {
				console.log(e);
				throw new Error(e);
			});
	}

	return (
		<div className='container'>
			<div className='base-container'>
				<div className='header'>Register</div>
				<div className='info'>
					<div className='form'>
						<div className='form-group'>
							<label htmlFor='firstname'>First Name</label>
							<input ref={firstNameRef} type='text' name='firstname' placeholder='First Name' />
						</div>
						<div className='form-group'>
							<label htmlFor='lastname'>Last Name</label>
							<input ref={lastNameRef} type='text' name='lastname' placeholder='Last Name' />
						</div>
						<div className='form-group'>
							<label htmlFor='emailid'>Email ID</label>
							<input ref={emailRef} type='email' name='emailid' placeholder='Email Address' />
						</div>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input ref={userNameRef} type='text' name='username' placeholder='Username' />
						</div>
						<div className='form-group'>
							<label htmlFor='usn'>USN</label>
							<input ref={usnRef} type='text' name='usn' placeholder='USN' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input ref={passwordRef} type='password' name='password' placeholder='Password' />
						</div>
						<div className='form-group'>
							<label htmlFor='passwordconf'>Re-enter Password</label>
							<input
								ref={confirmPasswordRef}
								type='password'
								name='passwordconf'
								placeholder='Password'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='mobno'>Mobile Number</label>
							<input ref={PhoneNumberRef} type='number' name='mobno' placeholder='Eg. 7891205465' />
						</div>
					</div>
				</div>
				<div className='footer'>
					<button onClick={() => handleSignUp()} className='btn'>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;

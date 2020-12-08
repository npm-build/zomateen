import React from 'react';
import '../styles/Header.styles.scss';
import shebin from '../assets/img/sheb.jpg';

const Header: React.FC = () => {
	return (
		<header id='header'>
			<div id='logo'>
				<p id='logo-head'>ZOMATEEN</p>
				<div id='status'>
					<i className='fas fa-circle' /> <p>Online</p>
				</div>
			</div>
			<div className='search-container'>
				<form id='search-bar' action=''>
					<button type='submit'>
						<i className='fa fa-search' />
					</button>
					<input type='text' placeholder='Search..' name='search' />
				</form>

				<div id='profile'>
					<img id='profile-pic' src={shebin} alt='' />
					<p>Hi, Shebin</p>
				</div>
			</div>
		</header>
	);
};

export default Header;

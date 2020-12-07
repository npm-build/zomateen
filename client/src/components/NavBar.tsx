import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideNavbar.styles.scss';

const NavBar: React.FC = () => {
	// NavBar Animation

	useEffect(() => {
		const burger = document.querySelector('#burger');
		const nav = document.querySelector('#nav-links');
		const navLinks = document.querySelectorAll('#nav-links a li');
		const body = document.querySelector('body');
		// const width = window.screen.width;

		// if (width < 900) {
		// navLinks.forEach(link => {
		// 	link.addEventListener('click', () => {
		// 		//to stop scrolling
		// 		body!.classList.toggle('fixed-position');
		// 		// Toggle Nav
		// 		nav!.classList.toggle('open');
		// 		// Burger Animation
		// 		burger!.classList.toggle('toggle');
		// 	});
		// });

		burger!.addEventListener('click', () => {
			//to stop scrolling
			body!.classList.toggle('fixed-position');
			// Toggle Nav
			nav!.classList.toggle('open');
			// Burger Animation
			burger!.classList.toggle('toggle');
		});

		// selecting each navLink
		const walletLink = document.getElementById('wallet-link');
		const favoriteLink = document.getElementById('favorite-link');
		const cartLink = document.getElementById('cart-link');

		walletLink!.addEventListener('click', () => {
			walletLink!.classList.toggle('selected-div');
			const selected_div_1 = document.getElementById('1');

			selected_div_1!.classList.toggle('highlight');
		});

		favoriteLink!.addEventListener('click', () => {
			favoriteLink!.classList.toggle('selected-div');
			const selected_div_2 = document.getElementById('2');

			selected_div_2!.classList.toggle('highlight');
		});

		cartLink!.addEventListener('click', () => {
			cartLink!.classList.toggle('selected-div');
			const selected_div_3 = document.getElementById('3');

			selected_div_3!.classList.toggle('highlight');
		});
	}, []);

	return (
		<nav id='sidenav'>
			<div id='burger'>
				<div className='line toggle line1' />
				<div className='line toggle line2' />
				<div className='line toggle line3' />
			</div>

			<ul id='selected-divs'>
				<li id='1' className='div' />
				<li id='2' className='div' />
				<li id='3' className='div' />
			</ul>

			<ul id='nav-links'>
				<Link id='wallet-link' to='/'>
					<i className='fas fa-lg fa-wallet' />
					<li>Wallet</li>
				</Link>
				<Link id='favorite-link' to='/'>
					<i className='far fa-lg fa-heart' />
					<li>Favorites</li>
				</Link>
				<Link id='cart-link' to='/'>
					<i className='fas fa-lg fa-shopping-cart' />
					<li>Cart</li>
				</Link>
			</ul>
		</nav>
	);
};

export default NavBar;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import wallet from '../assets/img/wallet.svg';
import favorite from '../assets/img/heart.svg';
import cart from '../assets/img/shopping-cart.svg';
import '../styles/SideNavbar.styles.scss';

const NavBar: React.FC = () => {
	// NavBar Animation

	useEffect(() => {
		const sideNav = document.querySelector('#sidenav');
		const burger = document.querySelector('#burger');
		// const navLinks = document.querySelectorAll('#nav-links a li');
		// const body = document.querySelector('body');
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
			// Toggle Nav
			sideNav!.classList.toggle('close');
			sideNav!.classList.toggle('open');
			// Burger Animation
			burger!.classList.toggle('toggle');
		});

		// selecting each navLink
		const walletLink = document.getElementById('wallet-link');
		const favoriteLink = document.getElementById('favorite-link');
		const cartLink = document.getElementById('cart-link');
		const selected_div_1 = document.getElementById('1');
		const selected_div_2 = document.getElementById('2');
		const selected_div_3 = document.getElementById('3');

		walletLink!.addEventListener('click', () => {
			if (favoriteLink!.classList.contains('selected-div')) {
				favoriteLink!.classList.toggle('selected-div');
				walletLink!.classList.toggle('selected-div');

				selected_div_2!.classList.toggle('highlight');
				selected_div_1!.classList.toggle('highlight');
			} else if (cartLink!.classList.contains('selected-div')) {
				cartLink!.classList.toggle('selected-div');
				walletLink!.classList.toggle('selected-div');

				selected_div_3!.classList.toggle('highlight');
				selected_div_1!.classList.toggle('highlight');
			} else {
				walletLink!.classList.toggle('selected-div');

				selected_div_1!.classList.toggle('highlight');
			}
		});

		favoriteLink!.addEventListener('click', () => {
			if (walletLink!.classList.contains('selected-div')) {
				walletLink!.classList.toggle('selected-div');
				favoriteLink!.classList.toggle('selected-div');

				selected_div_1!.classList.toggle('highlight');
				selected_div_2!.classList.toggle('highlight');
			} else if (cartLink!.classList.contains('selected-div')) {
				cartLink!.classList.toggle('selected-div');
				favoriteLink!.classList.toggle('selected-div');

				selected_div_3!.classList.toggle('highlight');
				selected_div_2!.classList.toggle('highlight');
			} else {
				favoriteLink!.classList.toggle('selected-div');

				selected_div_2!.classList.toggle('highlight');
			}
		});

		cartLink!.addEventListener('click', () => {
			if (walletLink!.classList.contains('selected-div')) {
				walletLink!.classList.toggle('selected-div');
				cartLink!.classList.toggle('selected-div');

				selected_div_1!.classList.toggle('highlight');
				selected_div_3!.classList.toggle('highlight');
			} else if (favoriteLink!.classList.contains('selected-div')) {
				favoriteLink!.classList.toggle('selected-div');
				cartLink!.classList.toggle('selected-div');

				selected_div_2!.classList.toggle('highlight');
				selected_div_3!.classList.toggle('highlight');
			} else {
				cartLink!.classList.toggle('selected-div');
				selected_div_3!.classList.toggle('highlight');
			}
		});

		return () => {
			burger?.removeEventListener('click', () => console.log('Event Listener removed'));
			favoriteLink?.removeEventListener('click', () => console.log('Event Listener removed'));
			walletLink?.removeEventListener('click', () => console.log('Event Listener removed'));
			cartLink?.removeEventListener('click', () => console.log('Event Listener removed'));
		};
	}, []);

	return (
		<div id='nav'>
			<nav id='sidenav' className='close'>
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
						<img src={wallet} alt='wallet' />
						<li>Wallet</li>
					</Link>
					<Link id='favorite-link' to='/favorites'>
						<img src={favorite} alt='favorite' />
						<li>Favorites</li>
					</Link>
					<Link id='cart-link' to='/'>
						<img src={cart} alt='cart' />
						<li>Cart</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;

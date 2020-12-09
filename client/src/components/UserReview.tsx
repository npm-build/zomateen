import React from 'react';
import sheb from '../assets/img/sheb.jpg';
import quotes from '../assets//img/quotes.png';
import { Image } from 'react-bootstrap';

function UserReview() {
	return (
		<div className='user-review'>
			<Image src={sheb} roundedCircle />
			<img className='quotes' src={quotes} alt='quotes' />
			<div className='user-review-text'>
				<div className='text'>
					<h4>Shebin Joseph</h4>
					<p>4 Star</p>
					<p>
						The Best Briyani in Bangalore. I eat three briyani daily from our canteen. My only motivation to
						go to college is now Dum Briyani in our canteen
					</p>
				</div>
			</div>
		</div>
	);
}

export default UserReview;

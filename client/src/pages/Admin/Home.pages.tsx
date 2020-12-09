import React from 'react';
import FoodProgress from '../../components/FoodProgress';
import '../../styles/AdminHome.styles.scss';

const Home: React.FC = () => {
	return (
		<main id='admin-home-content'>
			<div id='pending' className='column'>
				<div id='pending-header' className='header'>
					Pending Request
				</div>
				<FoodProgress type='pending' />
			</div>
			<div id='progress' className='column'>
				<div id='progress-header' className='header'>
					In Progress
				</div>
				<FoodProgress type='progress' />
			</div>
			<div id='ready' className='column'>
				<div id='ready-header' className='header'>
					Ready
				</div>
				<FoodProgress type='ready' />
			</div>
		</main>
	);
};

export default Home;

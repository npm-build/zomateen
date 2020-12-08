import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, Tab } from 'react-bootstrap';
import FoodItem from '../components/FoodItem';
import '../styles/Home.styles.scss';

const HomePage: React.FC = () => {
	const [key, setKey] = useState<string | null>('breakfast');

	return (
		<motion.div
			exit={{ opacity: 0, x: '-100vw', scale: 0.8 }}
			initial={{ opacity: 0, x: '-100vw', scale: 0.8 }}
			animate={{ opacity: 1, x: 0, scale: 1 }}
			transition={{ type: 'tween', ease: 'anticipate', duration: 1 }}
		>
			<main id='home-content'>
				<div id='categories'>
					<Tabs activeKey={key} onSelect={k => setKey(k)}>
						<Tab eventKey='breakfast' title='Breakfast' />
						<Tab eventKey='lunch' title='Lunch' />
						<Tab eventKey='snacks' title='Snacks' />
					</Tabs>
				</div>

				<div id='menu'>
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
					<FoodItem />
				</div>
			</main>
		</motion.div>
	);
};

export default HomePage;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { Tabs, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import FoodItem from '../../components/FoodItem';
import '../../styles/Home.styles.scss';

interface FoodType {
	name: string;
	foodId: number;
	tags: string[];
	imgUrl: string;
	price: number;
	isAvailable: boolean;
	day: string;
	reviews: { userName: string; review: string }[];
	addOns: string[];
}

const item: FoodType = {
	name: 'Dosa',
	foodId: 1,
	tags: ['dosa', 'lunch'],
	imgUrl: '',
	price: 40,
	isAvailable: true,
	day: 'Monday',
	reviews: [],
	addOns: []
};

const HomePage: React.FC = () => {
	const [key, setKey] = useState<string | null>('breakfast');
	const [food, setFood] = useState<FoodType[]>();
	const accessToken = Cookies.get('accessToken');
	const refreshToken = Cookies.get('refreshToken');

	const history = useHistory();

	async function getFood() {
		await fetch('/api/getfoodies', {
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(foodies => {
				console.log(foodies);
				setFood(foodies);
			})
			.catch(e => {
				console.log(e);
				throw new Error(e);
			});
	}

	useEffect(() => {
		getFood();
	}, []);

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
					{/* {food && food.map(fd => <FoodItem key={fd.foodId} data={fd} link={`/user/food/${fd.foodId}`} />)} */}
					{/* <FoodItem data={item} link='/user/food/1' /> */}
					{/* <FoodItem link='/user/food/1' />
					<FoodItem link='/user/food/1' />
					<FoodItem link='/user/food/1' /> */}
				</div>
			</main>
		</motion.div>
	);
};

export default HomePage;

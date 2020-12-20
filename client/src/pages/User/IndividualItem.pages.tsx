import React, { useEffect, useState } from 'react';
import dosa from '../../assets/img/dosa.png';
import back from '../../assets/img/arrow-left.svg';
import AddToCartBtn from '../../components/AddToCartButton';
import UserReview from '../../components/UserReview';
import FoodItem from '../../components/FoodItem';
import { pageVariants, pageTransition } from '../../utils/Animations';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import '../../styles/IndividualItem.styles.scss';

const IndividualItem: React.FC<any> = ({ match }) => {
	const {
		params: { foodId }
	} = match;

	// Get the food using the FoodId from server
	const [food, setFood] = useState();
	const history = useHistory();

	async function getFood() {}

	useEffect(() => {
		console.log(foodId);
		getFood();
	}, []);

	return (
		<motion.div
			initial='initial'
			animate='in'
			exit='out'
			variants={pageVariants}
			transition={pageTransition}
			className='individual-food-item'
		>
			<button className='back-btn' onClick={() => history.goBack()}>
				<img src={back} alt='go back' />
			</button>

			<main className='individual-food-item-content'>
				<div className='item'>
					<img className='individual-food-item-img' src={dosa} alt='food img' />
					<div className='individual-food-item-text'>
						<h5 className='individual-food-item-text-title'>Masala Dosa</h5>
						<h5 className='individual-food-item-text-rating'>4 Star</h5>
						<h5 className='individual-food-item-text-tried-by'>Tried by: </h5>
						<div>
							<h5 className='individual-food-item-text-price'>Rs 40</h5>
							<AddToCartBtn />
						</div>
					</div>
				</div>
				<div className='individual-food-item-reviews'>
					<h3>Reviews</h3>
					<UserReview />
					<UserReview />
					<UserReview />
					<UserReview />
				</div>

				<div className='individual-food-item-similar-food'>
					{/* <FoodItem link='/food/1' />
					<FoodItem link='/food/1' />
					<FoodItem link='/food/1' />
					<FoodItem link='/food/1' />
					<FoodItem link='/food/1' /> */}
				</div>
			</main>
		</motion.div>
	);
};

export default IndividualItem;

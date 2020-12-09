import dosa from '../assets/img/dosa.png';
import AddToCartBtn from '../components/AddToCartButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/FoodItem.styles.scss';

const pageVariants = {
	initial: {
		opacity: 0,
		x: '-100vw',
		scale: 0.8
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1
	},
	out: {
		opacity: 0,
		x: '100vw',
		scale: 1.2
	}
};

const pageTransition = {
	type: 'tween',
	ease: 'anticipate',
	duration: 0.5
};

const FoodItem: React.FC<{ link: string }> = ({ link }) => {
	return (
		<motion.div
			initial='initial'
			animate='in'
			exit='out'
			variants={pageVariants}
			transition={pageTransition}
			whileHover={{ scale: 1.1 }}
			className='food-item'
		>
			<Link to={link}>
				<img className='food-item-img' src={dosa} alt='dosa' />
				<div className='text-holder'>
					<h5 className='food-item-title'>Masala&nbsp;Dosa</h5>
					<p>
						<span className='food-item-price'>Rs&nbsp;40</span>
						<span className='food-item-rating'>4&nbsp;Star</span>
					</p>
				</div>
			</Link>
			<AddToCartBtn />
		</motion.div>
	);
};

export default FoodItem;

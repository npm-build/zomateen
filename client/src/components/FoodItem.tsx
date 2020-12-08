import dosa from '../assets/img/dosa.png';
import add from '../assets/img/plus.svg';

function FoodItem() {
	return (
		<div className='menu-food-item'>
			<img className='menu-food-item-img' src={dosa} alt='dosa' />
			<div className='text-holder'>
				<h5 className='menu-food-item-title'>Masala&nbsp;Dosa</h5>
				<p>
					<span className='menu-food-item-price'>Rs&nbsp;40</span>
					<span className='menu-food-item-rating'>4&nbsp;Star</span>
				</p>
				<button>
					<img src={add} alt='+' /> <span>Add to Cart</span>
				</button>
			</div>
		</div>
	);
}

export default FoodItem;

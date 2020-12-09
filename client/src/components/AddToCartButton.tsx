import add from '../assets/img/plus.svg';
import '../styles/AddToCart.styles.scss';

function AddToCartButton() {
	return (
		<button className='add-to-cart-btn'>
			<img className='add-to-cart-btn-img' src={add} alt='+' /> <span>Add to Cart</span>
		</button>
	);
}

export default AddToCartButton;

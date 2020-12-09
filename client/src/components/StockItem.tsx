import React from 'react';
import dosa from '../assets/img/dosa.png';
import { Dropdown } from 'react-bootstrap';
import '../styles/StockItem.styles.scss';

const StockItem: React.FC<{ inStock: boolean }> = ({ inStock }) => {
	return (
		<div className='stock-item'>
			<img src={dosa} alt='' className='stock-item-img' />
			<h4>Masala Dosa</h4>
			{inStock ? (
				<Dropdown>
					<Dropdown.Toggle variant='success' id='dropdown-basic'>
						In Stock
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href='#'>In Stock</Dropdown.Item>
						<Dropdown.Item href='#'>Out of Stock</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			) : (
				<Dropdown>
					<Dropdown.Toggle variant='danger' id='dropdown-basic'>
						In Stock
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href='#'>In Stock</Dropdown.Item>
						<Dropdown.Item href='#'>Out of Stock</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</div>
	);
};

export default StockItem;

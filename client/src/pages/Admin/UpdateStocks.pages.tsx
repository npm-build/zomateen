import React from 'react';
import StockItem from '../../components/StockItem';
import '../../styles/UpdateStocks.styles.scss';

const UpdateStocks: React.FC = () => {
	return (
		<main>
			<div id='search-box'>
				<form className='search-bar' action=''>
					<button type='submit'>
						<i className='fa fa-search' />
					</button>
					<input type='text' placeholder='Search..' name='search' />
				</form>
			</div>
			<div id='stocks'>
				<div id='in-stock'>
					<h4>In Stock</h4>
					<div className='stock-column'>
						<StockItem inStock={true} />
						<StockItem inStock={true} />
						<StockItem inStock={true} />
						<StockItem inStock={true} />
						<StockItem inStock={true} />
						<StockItem inStock={true} />
						<StockItem inStock={true} />
						<StockItem inStock={true} />
					</div>
				</div>
				<div id='out-of-stock'>
					<h4>Out of Stock</h4>
					<div className='stock-column'>
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
						<StockItem inStock={false} />
					</div>
				</div>
			</div>
		</main>
	);
};

export default UpdateStocks;

import React from 'react';
import '../styles/IndividualItem.styles.scss';

const IndividualItem: React.FC<any> = ({ match }) => {
	const {
		params: { foodId }
	} = match;

	return <div className='individual-food-item'></div>;
};

export default IndividualItem;

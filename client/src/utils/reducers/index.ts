import { combineReducers } from 'redux';
import { isLoggedReducer } from './isLogged';

const allReducers = () => {
	return combineReducers({
		isLogged: isLoggedReducer
	});
};

export default allReducers;

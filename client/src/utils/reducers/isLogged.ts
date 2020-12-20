import { Action } from 'redux';

export const isLoggedReducer = (state = false, action: Action) => {
	switch (action.type) {
		case 'SIGN_IN':
			return !state;
		default:
			return state;
	}
};

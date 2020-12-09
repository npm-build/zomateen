import React from 'react';
import dosa from '../assets/img/dosa.png';
import '../styles/FoodProgress.styles.scss';

const pendingStyles = {
	ProgressBarStyle: { backgroundColor: '#ee3d22' },
	AcceptBtnStyles: { backgroundColor: '#ee3d22', border: 'none', color: 'white', borderRadius: '10px' },
	CancelBtnStyles: {
		backgroundColor: 'white',
		marginTop: '10px',
		border: '1px solid #ee3d22',
		color: '#ee3d22',
		borderRadius: '10px'
	}
};

const progressStyles = {
	ProgressBarStyle: { backgroundColor: '#fbb346' },
	DoneBtnStyles: { backgroundColor: '#fbb346', border: 'none', color: 'white', borderRadius: '10px' }
};

const readyStyles = {
	ProgressBarStyle: { backgroundColor: '#5db140' },
	NotifyBtnStyles: { backgroundColor: 'white', border: '1px solid #5db140', color: '#5db140', borderRadius: '10px' }
};

const FoodProgress: React.FC<{ type: string }> = ({ type }) => {
	return type === 'pending' ? (
		<div className='FoodProgress'>
			<div style={pendingStyles.ProgressBarStyle} className='progress-bar' />
			<div className='FoodProgressContent'>
				<img className='FoodProgressImg' src={dosa} alt='img' />
				<div className='FoodProgressText'>
					<h6>#01</h6>
					<h6>Masala Dosa</h6>
					<p>Roshan Jose</p>
				</div>
				<div className='FoodProgressExtra'>
					<h4>In Cash</h4>
					<button style={pendingStyles.AcceptBtnStyles} className='food-progress-btn'>
						Accept
					</button>
					<button style={pendingStyles.CancelBtnStyles} className='food-progress-btn'>
						Cancel
					</button>
				</div>
			</div>
		</div>
	) : type === 'progress' ? (
		<div className='FoodProgress'>
			<div style={progressStyles.ProgressBarStyle} className='progress-bar' />
			<div className='FoodProgressContent'>
				<img className='FoodProgressImg' src={dosa} alt='img' />
				<div className='FoodProgressText'>
					<h6>#01</h6>
					<h6>Masala Dosa</h6>
					<p>Roshan Jose</p>
				</div>
				<div className='FoodProgressExtra'>
					<h4>In Cash</h4>
					<button style={progressStyles.DoneBtnStyles} className='food-progress-btn'>
						Done
					</button>
				</div>
			</div>
		</div>
	) : (
		<div className='FoodProgress'>
			<div style={readyStyles.ProgressBarStyle} className='progress-bar' />
			<div className='FoodProgressContent'>
				<img className='FoodProgressImg' src={dosa} alt='img' />
				<div className='FoodProgressText'>
					<h6>#01</h6>
					<h6>Masala Dosa</h6>
					<p>Roshan Jose</p>
				</div>
				<div className='FoodProgressExtra'>
					<h4>In Cash</h4>
					<button style={readyStyles.NotifyBtnStyles} className='food-progress-btn'>
						Notify
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodProgress;

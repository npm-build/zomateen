import { pageVariants, pageTransition } from '../../utils/Animations';
import { motion } from 'framer-motion';
import '../../styles/Home.styles.scss';

const AboutPage: React.FC = () => {
	return (
		<motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
			<h1>About Page</h1>
		</motion.div>
	);
};

export default AboutPage;

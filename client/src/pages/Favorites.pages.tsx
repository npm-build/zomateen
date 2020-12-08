import { motion } from 'framer-motion';
import '../styles/Home.styles.scss';

const AboutPage: React.FC = () => {
	//   const product = "cool";
	return (
		<motion.div
			exit={{ opacity: 0, x: '-100vw', scale: 0.8 }}
			initial={{ opacity: 0, x: '-100vw', scale: 0.8 }}
			animate={{ opacity: 1, x: 0, scale: 1 }}
			transition={{ type: 'tween', ease: 'anticipate', duration: 1 }}
		>
			<h1>About Page</h1>
		</motion.div>
	);
};

export default AboutPage;

import Header from '../components/Header';
import Navbar from '../components/NavBar';
import '../styles/Home.styles.scss';

const HomePage: React.FC = () => {
	return (
		<div id='home-grid'>
			<Navbar />
			<Header />
		</div>
	);
};

export default HomePage;

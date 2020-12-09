import Header from './components/Header';
import Navbar from './components/NavBar';
import UserHome from './pages/User/Home.pages';
import UserIndividualItem from './pages/User/IndividualItem.pages';
import UserFavoritesPage from './pages/User/Favorites.pages';
import AdminHome from './pages/Admin/Home.pages';
import UpdateStocks from './pages/Admin/UpdateStocks.pages';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/Home.styles.scss';

function App() {
	const location = useLocation();

	return (
		<div id='home-grid'>
			<Navbar />
			<Header />
			<div id='content'>
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
						<Route path='/user/home' exact component={UserHome} />
						<Route path='/user/food/:foodId' exact component={UserIndividualItem} />
						<Route path='/user/favorites' component={UserFavoritesPage} />
						<Route path='/admin/home' component={AdminHome} />
						<Route path='/admin/updatestocks' component={UpdateStocks} />
					</Switch>
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;

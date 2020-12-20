import Header from './components/Header';
import Navbar from './components/NavBar';
import UserHome from './pages/User/Home.pages';
import UserIndividualItem from './pages/User/IndividualItem.pages';
import UserFavoritesPage from './pages/User/Favorites.pages';
import AdminHome from './pages/Admin/Home.pages';
import AddFood from './pages/Admin/UpdateItems.pages';
import UpdateStocks from './pages/Admin/UpdateStocks.pages';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
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
						<Route path='/' exact render={() => <Redirect to='/user/login'></Redirect>} />
						<ProtectedRoute path='/user/home' isExact={true} Component={UserHome} />
						<ProtectedRoute path='/user/food/:foodId' isExact={true} Component={UserIndividualItem} />
						<ProtectedRoute path='/user/favorites' isExact={true} Component={UserFavoritesPage} />
						<ProtectedRoute path='/admin/home' isExact={true} Component={AdminHome} />
						<ProtectedRoute path='/admin/addfood' isExact={true} Component={AddFood} />
						<ProtectedRoute path='/admin/updatestocks' isExact={true} Component={UpdateStocks} />
					</Switch>
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;

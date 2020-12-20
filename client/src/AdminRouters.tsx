import AdminHeader from './components/AdminHeader';
import AdminNavbar from './components/AdminNavbar';
import AdminHome from './pages/Admin/Home.pages';
import AddFood from './pages/Admin/UpdateItems.pages';
import UpdateStocks from './pages/Admin/UpdateStocks.pages';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/Home.styles.scss';

function App() {
	const location = useLocation();

	return (
		<div id='home-grid'>
			<AdminNavbar />
			<AdminHeader />
			<div id='content'>
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
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

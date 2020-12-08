import React from 'react';
import Header from './components/Header';
import Navbar from './components/NavBar';
import FavoritesPage from './pages/Favorites.pages';
import Home from './pages/Home.pages';
import IndividualItem from './pages/IndividualItem.pages';
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
						<Route path='/' exact component={Home} />
						<Route path='/food/:foodId' exact component={IndividualItem} />
						<Route path='/favorites' component={FavoritesPage} />
					</Switch>
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;

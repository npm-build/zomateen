import React from 'react';
import Header from './components/Header';
import Navbar from './components/NavBar';
import Home from './pages/Home.pages';
import { Route, Switch } from 'react-router-dom';
import { AnimateSharedLayout } from 'framer-motion';
import './styles/Home.styles.scss';

function App() {
	return (
		<AnimateSharedLayout>
			<div id='home-grid'>
				<Navbar />
				<Header />
				<div id='content'>
					<Switch>
						<Route path='/' exact component={Home} />
					</Switch>
				</div>
			</div>
		</AnimateSharedLayout>
	);
}

export default App;

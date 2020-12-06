import React from 'react';
import './App.scss';
import Home from './pages/Home.pages';
import Login from './pages/Login.pages';
import SignUp from './pages/Signup.pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={SignUp} />
			</Switch>
		</Router>
	);
}

export default App;

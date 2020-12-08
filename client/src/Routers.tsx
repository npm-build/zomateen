import Login from './pages/Login.pages';
import SignUp from './pages/Signup.pages';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import './styles/App.scss';

function Routers() {
	return (
		<Switch>
			<Route path='/user/login' exact component={Login} />
			<Route path='/user/signup' exact component={SignUp} />
			<Route path='/admin/login' exact component={Login} />
			<Route path='/admin/signup' exact component={SignUp} />
			<Route path='/*' component={App} />
		</Switch>
	);
}

export default Routers;

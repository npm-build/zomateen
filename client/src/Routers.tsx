import UserLogin from './pages/User/Login.pages';
import UserSignUp from './pages/User/Signup.pages';
import AdminLogin from './pages/Admin/Login.pages';
import AdminSignUp from './pages/Admin/Signup.pages';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import './styles/App.scss';

function Routers() {
	return (
		<Switch>
			<Route path='/user/login' exact component={UserLogin} />
			<Route path='/user/signup' exact component={UserSignUp} />
			<Route path='/admin/login' exact component={AdminLogin} />
			<Route path='/admin/signup' exact component={AdminSignUp} />
			<Route path='/*' component={App} />
		</Switch>
	);
}

export default Routers;

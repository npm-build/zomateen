import { Route, Redirect, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import UserLogin from './pages/User/Login.pages';
import UserSignUp from './pages/User/Signup.pages';
import AdminLogin from './pages/Admin/Login.pages';
import AdminSignUp from './pages/Admin/Signup.pages';
import UserRouter from './UserRouters';
import AdminRouter from './AdminRouters';
import './styles/App.scss';

function Routers() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact render={() => <Redirect to='/user/login'></Redirect>} />
				<Route path='/user/login' exact component={UserLogin} />
				<Route path='/user/signup' exact component={UserSignUp} />
				<Route path='/admin/login' exact component={AdminLogin} />
				<Route path='/admin/signup' exact component={AdminSignUp} />
				<Route path='/user' component={UserRouter} />
				<Route path='/admin' component={AdminRouter} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routers;
